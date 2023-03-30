import dateFormat from "dateformat";
import type {Company} from "french-company-types";
import {isActiveEstablishment, isPhysicalPerson} from "french-company-types";
import {type Database, ref, set} from "@firebase/database";
import {type Log, uuid_e4} from "$libs/public-api";
import type {FirebaseApp} from "firebase/app";
import {dev} from "$app/environment";
import {to_number} from "svelte/internal";

export const getDateFormat = (date?: string): string => {
    if (!date) return ''
    return dateFormat(new Date(date), '"le" dd/mm/yyyy "à" hh:mm:ss "("Z")"', false, true)
}

export const getEstablishmentClosed = (company?: Company): number | undefined => {
    if (!company || company?.nombre_etablissements == undefined || company?.nombre_etablissements_ouverts == undefined) return undefined
    return company.nombre_etablissements - company.nombre_etablissements_ouverts
}

export const getScoreRatio = (score?: number, maxScore?: number) => {
    return !score || !maxScore ? 0 : (score / maxScore) * 100;
}

export const reportCompany = async (siret?: string, clientIp?: string, firebaseApp?: FirebaseApp, firebaseDatabase?: Database) => {
    if (!siret || !firebaseApp || !firebaseDatabase) return
    try {
        await set(ref(firebaseDatabase, `reports/${siret}/${uuid_e4()}`), {
            clientInformation: {
                appCodeName: navigator.appCodeName,
                appName: navigator.appName,
                appVersion: navigator.appVersion,
                platform: navigator.platform,
                userAgent: navigator.userAgent,
                languages: navigator.languages,
                cookieEnabled: navigator.cookieEnabled,
                geolocation: navigator.geolocation,
                doNotTrack: navigator.doNotTrack,
                history: window.history,
                caches: window.caches,
            },
            clientIp: clientIp,
            at: new Date(Date.now()).toISOString()
        })
    } catch (reason) {
        if (dev) console.log(reason)
    }
}

export const testCompany = async (company?: Company): Promise<{ score: number, maxScore: number, scoreLogs: Log[] }> => {
    let score = 0, maxScore = 0, scoreLogs: Log[] = []
    const _startTime = new Date().getTime()

    const pushLog = (initialScoreValue: number, label: string) => {
        scoreLogs.push({
            initialScoreValue: initialScoreValue,
            scoreValue: score,
            label: label,
            at: Math.abs(_startTime - new Date().getTime())
        })
    }

    const testValue: { label: string, value: unknown | undefined }[] = [
        {label: 'Raison sociale', value: company?.nom_raison_sociale},
        {label: 'Nom complet', value: company?.nom_complet},
        {label: 'Siren', value: company?.siren},
        {label: 'Nature juridique', value: company?.nature_juridique},
        {label: 'Libellé nature juridique N1', value: company?.libelle_nature_juridique_n1},
        {label: 'Libellé nature juridique N2', value: company?.libelle_nature_juridique_n2},
        {label: 'Libellé nature juridique N3', value: company?.libelle_nature_juridique_n3},
        {label: 'Activité principale', value: company?.activite_principale},
        {label: 'Libellé activité principale N1', value: company?.libelle_activite_principale_n1},
        {label: 'Libellé activité principale N2', value: company?.libelle_activite_principale_n2},
        {label: 'Libellé activité principale N3', value: company?.libelle_activite_principale_n3},
        {label: 'Libellé activité principale N4', value: company?.libelle_activite_principale_n4},
        {label: 'Libellé activité principale N5', value: company?.libelle_activite_principale_n5},
        {label: 'Nombre d\'établissements', value: company?.nombre_etablissements},
        {label: 'Nombre d\'établissements ouverts', value: company?.nombre_etablissements_ouverts},
        {label: 'Tranche effectif salarié', value: company?.tranche_effectif_salarie},
        {label: 'Catégorie d\'entreprise', value: company?.categorie_entreprise},
        {label: 'État administratif', value: company?.etat_administratif},
        {label: 'Dirigeants', value: company?.dirigeants},
        {label: 'Établissements lié', value: company?.matching_etablissements},
    ]
    score = testValue.length * 10
    maxScore = testValue.length * 10

    for (let testValueElement of testValue) {
        if (!testValueElement.value) score -= 10
        pushLog(score + (!testValueElement.value ? 10 : 0), testValueElement.label)
    }

    score += 100
    maxScore += 100
    pushLog(score - 100, 'Ratio Nombre d\'établissements')

    if (company && company?.nombre_etablissements && company?.nombre_etablissements_ouverts) {
        const _t: number = to_number((100 - (company.nombre_etablissements - getEstablishmentClosed(company)!) / company.nombre_etablissements * 100).toFixed(0))
        score -= _t
        pushLog(score + _t, 'Ratio Nombre d\'établissements')
    } else {
        score -= 100
        pushLog(score + 100, 'Ratio Nombre d\'établissements')
    }

    if (company?.dirigeants && company.dirigeants.length > 0) {
        score += company.dirigeants.length * 30
        maxScore += company.dirigeants.length * 30
        pushLog(score - company.dirigeants.length * 40, 'Test Dirigeants')

        for (let i = 0; i < company.dirigeants.length; i++) {
            if (isPhysicalPerson(company.dirigeants[i])) {
                if (!company.dirigeants[i].nom || !company.dirigeants[i].prenoms) {
                    score -= 10
                    pushLog(score + 10, 'Test Dirigeants | Nom - Prénoms')
                }
                if (!company.dirigeants[i].annee_de_naissance) {
                    score -= 10
                    pushLog(score + 10, 'Test Dirigeants | Date de naissance')
                }
            } else {
                if (!company.dirigeants[i].denomination) {
                    score -= 10
                    pushLog(score + 10, 'Test Dirigeants | Dénomination')
                }
                if (!company.dirigeants[i].siren && !company.dirigeants[i]?.denomination?.toUpperCase?.()?.includes?.('L\'ETAT')) {
                    score -= 10
                    pushLog(score + 10, 'Test Dirigeants | SIREN')
                }
            }
            if (!company.dirigeants[i].qualite) {
                score -= 10
                pushLog(score + 10, 'Test Dirigeants | Qualité')
            }
        }
    }

    if (company?.matching_etablissements && company.matching_etablissements.length > 0) {
        score += company.matching_etablissements.length * 150
        maxScore += company.matching_etablissements.length * 150
        pushLog(score - company.matching_etablissements.length * 150, 'Test Établissements lié')

        for (let i = 0; i < company.matching_etablissements.length; i++) {
            if (!isActiveEstablishment(company.matching_etablissements[i])) {
                score -= 10
                pushLog(score + 10, 'Test Établissements lié | État administratif')
            }

            const testValue: { label: string, value: unknown | undefined }[] = [
                {
                    label: 'Test Établissements lié | Nom commercial',
                    value: company.matching_etablissements[i].nom_commercial
                },
                {label: 'Test Établissements lié | SIRET', value: company.matching_etablissements[i].siret}
            ]

            for (let testValueElement of testValue) {
                if (!testValueElement.value) {
                    score -= 10
                    pushLog(score + (!testValueElement.value ? 10 : 0), testValueElement.label)
                }
            }

            if (!company.matching_etablissements[i].siret) {
                score -= 10
                pushLog(score + 10, 'Test Établissements lié | SIRET')
            }
            if (!company.matching_etablissements[i].activite_principale) {
                score -= 10
                pushLog(score + 10, 'Test Établissements lié | APE')
            }
            if (typeof company.matching_etablissements[i].est_siege !== 'boolean') {
                score -= 10
                pushLog(score + 10, 'Test Établissements lié | Siège?')
            }
            if (!company.matching_etablissements[i].adresse) {
                score -= 10
                pushLog(score + 10, 'Test Établissements lié | Adresse')
            }
            if (!company.matching_etablissements[i].commune) {
                score -= 10
                pushLog(score + 10, 'Test Établissements lié | Nom commercial')
            }
        }
    }

    return {
        score: score,
        maxScore: maxScore,
        scoreLogs: scoreLogs
    }
}
