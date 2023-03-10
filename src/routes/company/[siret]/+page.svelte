<!--suppress JSDeprecatedSymbols, JSDeprecatedSymbols -->
<script lang="ts">
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {
        Accordion,
        AccordionItem,
        Alert,
        Button,
        Card,
        DarkMode,
        Heading,
        Indicator,
        Kbd,
        P,
        Popover,
        Spinner
    } from 'flowbite-svelte';
    import {browser, dev} from "$app/environment";
    import {type Report, uuid_e4} from "$libs/public-api";
    import {type FirebaseApp, initializeApp} from "firebase/app";
    import {type Analytics, getAnalytics} from "@firebase/analytics";
    import {type FirebasePerformance, getPerformance} from "@firebase/performance";
    import {environment} from "../../../environments/environment";
    import {Database, DataSnapshot, getDatabase, onValue, ref, set} from "@firebase/database";
    import {type Company} from "french-company-types";
    import {FooterComponent, InfoSvg, TableLeaders, TableLogs} from "$components/public-api";
    import Tab1 from "./Tab1.svelte";
    import {slide} from "svelte/transition";

    let firebaseApp: FirebaseApp | undefined
    let firebaseAnalytics: Analytics | undefined
    let firebaseDatabase: Database | undefined
    let firebasePerformance: FirebasePerformance | undefined
    if (browser) {
        firebaseApp = initializeApp(environment.firebaseConfig)
        firebaseAnalytics = getAnalytics(firebaseApp)
        firebaseDatabase = getDatabase(firebaseApp)
        firebasePerformance = getPerformance(firebaseApp)
    }

    /** @type {import('./$types').PageServerData} */
    export let data

    const scoreLogs: any[] = []
    let score: number | undefined
    let maxScore: number | undefined

    let isError: boolean = false
    let isFetch: boolean = false

    const siret: string | undefined = $page.params.siret

    let company: Company | undefined = undefined
    let companyReportCount: number = 0

    let currentTab = 0

    onMount(async () => {
        if (!siret) return isFetch = true
        try {
            const response: Response = await fetch(encodeURI(`${$page.url.origin}/api/company?q=${siret}`))
            const _temps = await response.json()
            if (!_temps || _temps.length < 1) return isFetch = true
            company = _temps[0]
            isFetch = true

            const _startTime = new Date().getMilliseconds()
            const testValue = [
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
                {label: 'Établissements lié', value: company?.matching_etablisssements},
            ]
            score = testValue.length * 10
            maxScore = testValue.length * 10

            for (let testValueElement of testValue) {
                if (!testValueElement.value) score -= 10
                scoreLogs.push({
                    initialScoreValue: score + (!testValueElement.value ? 10 : 0),
                    scoreValue: score,
                    label: testValueElement.label,
                    at: Math.abs(_startTime - new Date().getMilliseconds())
                })
            }

            score += 100
            scoreLogs.push({
                initialScoreValue: score - 100,
                scoreValue: score,
                label: 'Ratio Nombre d\'établissements',
                at: Math.abs(_startTime - new Date().getMilliseconds())
            })
            maxScore += 100
            if (company && company.nombre_etablissements && company.nombre_etablissements_ouverts) {
                const _t = 100 - (((company.nombre_etablissements - company.nombre_etablissements_ouverts) / company.nombre_etablissements * 100).toFixed(0))
                score -= _t
                scoreLogs.push({
                    initialScoreValue: score + _t,
                    scoreValue: score,
                    label: 'Ratio Nombre d\'établissements',
                    at: Math.abs(_startTime - new Date().getMilliseconds())
                })
            } else {
                score -= 100
                scoreLogs.push({
                    initialScoreValue: score + 100,
                    scoreValue: score,
                    label: 'Ratio Nombre d\'établissements',
                    at: Math.abs(_startTime - new Date().getMilliseconds())
                })
            }

            try {
                if (siret && firebaseDatabase) {
                    onValue(ref(firebaseDatabase, `reports/${siret}`), (dataSnapshot: DataSnapshot) => {
                        let data: Record<string, Report> | undefined | null
                        if (dataSnapshot.exists() && (data = dataSnapshot.val()) && data && Object.values(data) && Object.values(data).length) {
                            companyReportCount = Object.values(data).length
                        }
                    })
                }
            } catch (reason) {
                if (dev) console.log(reason)
            }

        } catch (reason) {
            if (dev) console.log(reason)
            isError = true
        }
    })

    const reportCompany = async () => {
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
                clientIp: data.clientIp,
                at: new Date(Date.now()).toISOString()
            })
        } catch (reason) {
            if (dev) console.log(reason)
        }
    }

    const getScoreRatio = () => {
        if (!score || !maxScore) return 0
        return (score / maxScore) * 100
    }

</script>

<svelte:head>
    <title>NuStateAPI | Company</title>
</svelte:head>

{#if !siret || !company || !isFetch}
    {#if !isFetch}
        <section class="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <article class="relative">
                <Spinner class="drop-shadow-md" size={12}></Spinner>
            </article>
        </section>
    {:else}
        {#if isError}
            <section class="mx-auto w-1/2 my-6 drop-shadow-md">
                <article>
                    <Alert class="drop-shadow-md" color="red">
                        <span slot="icon"><InfoSvg></InfoSvg></span>
                        <span class="font-medium">Erreur</span> interne survenue.
                    </Alert>
                </article>
            </section>
        {:else}
            <section class="mx-auto w-1/2 my-6 drop-shadow-md">
                <article>
                    <Alert class="drop-shadow-md" color="red">
                        <span slot="icon"><InfoSvg></InfoSvg></span>
                        <span class="font-medium">Numéro de SIRET</span> invalide.
                    </Alert>
                </article>
            </section>
        {/if}
    {/if}
{:else if isFetch && company}
    <section class="relative mx-6 lg:mx-24 mt-14 mb-3 flex flex-col-reverse lg:flex-row lg:space-x-3
                    transition-all duration-300 ease-in-out">
        <article class="max-lg:mt-3 lg:!w-[calc(50%-1rem)] h-fit shadow-inner rounded-lg">
            <Card class="max-lg:mt-3 !bg-transparent text-left items-start"
                  size="full">
                <Heading class="flex inline-flex drop-shadow-md" tag="h1">
                    {company?.nom_raison_sociale ?? 'N/A'}
                    <Indicator size="lg" color={company?.nom_raison_sociale ? 'green' : 'red'}/>
                </Heading>
                <P color="gray" class="flex inline-flex drop-shadow-md" tag="h2">
                    {company?.nom_complet ?? 'N/A'}
                    <Indicator size="sm" color={company?.nom_complet ? 'green' : 'red'}/>
                </P>

                <div class="my-3 mb-4 w-full flex inline-flex space-x-3">
                    <Button on:click={() => currentTab = 0} color={currentTab === 0 ? 'blue' : 'alternative'}
                            class="w-full shadow drop-shadow-md transition-all duration-300 ease-in-out">
                        Entreprise
                    </Button>
                    <span class="w-full" id="btnTab2">
                        <Button disabled on:click={() => currentTab = 1}
                                color={currentTab === 1 ? 'blue' : 'alternative'}
                                class="w-full shadow drop-shadow-md duration-300 ease-in-out">
                            Siège
                        </Button>
                    </span>
                    <Popover class="w-64 text-sm font-light" placement="top" title="Bientôt" transition={slide}
                             trigger="hover" triggeredBy="#btnTab2">
                        Prochainement les informations sur le siège.
                    </Popover>

                    <span class="w-full" id="btnTab3">
                        <Button disabled on:click={() => currentTab = 2}
                                color={currentTab === 2 ? 'blue' : 'alternative'}
                                class="w-full shadow drop-shadow-md duration-300 ease-in-out">
                            Compléments
                        </Button>
                    </span>
                    <Popover class="w-64 text-sm font-light" placement="top" title="Bientôt" transition={slide}
                             trigger="hover" triggeredBy="#btnTab3">
                        Prochainement les informations complémentaires.
                    </Popover>
                </div>

                {#if currentTab === 0}
                    <Tab1 company={company}></Tab1>
                {/if}
                {#if currentTab === 1}

                {/if}
                {#if currentTab === 2}
                {/if}
            </Card>
        </article>
        <article class="lg:!w-[calc(50%-1rem)] flex flex-col space-y-3">
            <section class="shadow-md rounded-lg">
                <article>
                    <Card class="!bg-transparent text-left items-start gap-y-3 shadow-inner" size="full">
                        <Heading class="drop-shadow-md" tag="h1">SCORE</Heading>
                        <Heading class="drop-shadow-md" tag="h2">
                            <span class="{getScoreRatio() <  75 ? getScoreRatio() <  50 ? getScoreRatio() <  25 ? 'text-red-500' : 'text-orange-500' : 'text-yellow-500' : 'text-green-500'}">
                                {score ?? 'N/A'}
                            </span>
                            <span class="text-gray-400 dark:text-gray-500">
                                /{maxScore ?? 'N/A'} - {getScoreRatio()?.toFixed(2)}%
                            </span>
                        </Heading>
                    </Card>
                </article>
            </section>
            <section class="shadow-md rounded-lg">
                <article>
                    <Card shadow class="!bg-transparent text-left items-start gap-y-3 shadow-inner" size="full">
                        <Heading class="flex inline-flex justify-between drop-shadow-md" tag="h1">
                            Rapport
                            {#if firebaseApp && firebaseDatabase}
                                <Button on:click={reportCompany} color="red"
                                        class="transition-all duration-300 ease-in-out drop-shadow-md shadow dark:hover:opacity-75">
                                    Signaler
                                </Button>
                            {/if}
                        </Heading>
                        <Heading tag="h2"
                                 class="drop-shadow-md {companyReportCount <  75 ? companyReportCount <  50 ? companyReportCount <  25 ? '!text-green-500' : '!text-yellow-500': '!text-orange-500' : '!text-red-500' }">
                            {companyReportCount}
                        </Heading>
                    </Card>
                </article>
            </section>
        </article>
    </section>
    <section class="relative shadow-md rounded-lg mx-6 lg:mx-12 mb-3 transition-all duration-300 ease-in-out">
        <article>
            <Card shadow class="!bg-transparent text-left items-start gap-y-4 shadow-inner" size="full">
                <Heading class="drop-shadow-md" tag="h1">Logs</Heading>
                <div class="italic drop-shadow-md">
                    <P color="gray"><span class="font-bold">IS</span> : Valeur initial du score</P>
                    <P color="gray"><span class="font-bold">AS</span> : Valeur après le test du score</P>
                </div>
                <Accordion
                        class="relative w-full transition-all duration-300 ease-in-out">
                    <AccordionItem>
                        <div slot="header">Détails</div>
                        <TableLogs scoreLogs={scoreLogs}></TableLogs>
                    </AccordionItem>
                </Accordion>
            </Card>
        </article>
    </section>
    <section class="relative mx-6 lg:mx-12 mb-3 transition-all duration-300 ease-in-out">
        <article>
            <Card shadow class="!bg-transparent text-left items-start gap-y-4 shadow-inner" size="full">
                <Heading class="drop-shadow-md" tag="h1">
                    Dirigeant{company.dirigeants.length > 1 ? 's' : '(e)'}</Heading>
                <div class="italic drop-shadow-md">
                    <P color="gray"><span class="font-bold">PP</span> : Personne Physique</P>
                    <P color="gray"><span class="font-bold">PM</span> : Personne Morale</P>
                </div>
                <Accordion
                        class="relative w-full transition-all duration-300 ease-in-out">
                    {#if company?.dirigeants && company.dirigeants.length > 0}
                        <AccordionItem>
                            <div slot="header">Détails sur {company.dirigeants.length > 1 ? 'les' : 'le/la'}
                                dirigeant{company.dirigeants.length > 1 ? 's' : '(e)'}</div>
                            <TableLeaders leaders={company?.dirigeants}></TableLeaders>
                        </AccordionItem>
                    {:else}
                        <AccordionItem class>
                            <div slot="header">Aucune information sur la/le(s) dirigeant(e/s)</div>
                            <Alert shadow color="red">
                                <span slot="icon"><InfoSvg className="h-4 w-4"></InfoSvg></span>
                                <p class="text-start">
                                    <span class="-ml-1 font-medium">Dirigeant(s) inconnu(e/s)</span>, le <Kbd
                                        class="px-2 py-1 max-sm:mt-1">score</Kbd> de l'entreprise est affecté.
                                </p>
                            </Alert>
                        </AccordionItem>
                    {/if}
                </Accordion>
            </Card>
        </article>
    </section>
    <section class="relative mx-6 lg:mx-12 mb-3 transition-all duration-300 ease-in-out">
        <article>
            <Card shadow class="!bg-transparent text-left items-start gap-y-4 shadow-inner" size="full">
                <Heading class="drop-shadow-md" tag="h1">Établissement(s) lié</Heading>
                <!--div class="italic drop-shadow-md">
                    <P color="gray"><span class="font-bold">PP</span> : Personne Physique</P>
                    <P color="gray"><span class="font-bold">PM</span> : Personne Morale</P>
                </div-->
                <Accordion
                        class="relative w-full transition-all duration-300 ease-in-out">
                    {#if company?.matching_etablisssements && company.matching_etablisssements.length > 0}
                        <AccordionItem>
                            <div slot="header">Détails sur {company.matching_etablisssements.length > 1 ? 'les' : 'l\''}
                                établissement{company.matching_etablisssements.length > 1 ? 's' : '(e)'} lié
                            </div>
                            <!--TODO TableLeaders leaders={company?.dirigeants}></TableLeaders-->
                        </AccordionItem>
                    {:else}
                        <AccordionItem class>
                            <div slot="header">Aucune information sur un/des établissement(s) lié</div>
                            <Alert shadow color="red">
                                <span slot="icon"><InfoSvg className="h-4 w-4"></InfoSvg></span>
                                <p class="text-start">
                                    <span class="-ml-1 font-medium">Établissement(s) lié inconnu(s)</span>, le <Kbd
                                        class="px-2 py-1 max-sm:mt-1">score</Kbd> de l'entreprise est affecté.
                                </p>
                            </Alert>
                        </AccordionItem>
                    {/if}
                </Accordion>
            </Card>
        </article>
    </section>
{/if}

{#if isFetch}
    <FooterComponent></FooterComponent>
{/if}

<div class="absolute top-0 right-0 m-2">
    <DarkMode></DarkMode>
</div>
