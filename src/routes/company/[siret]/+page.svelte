<script lang="ts">
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import type {ICompany} from "../../../libs/company/Company";
    import {
        A,
        Accordion,
        AccordionItem,
        Alert,
        Badge,
        Card,
        DarkMode,
        Heading,
        Indicator,
        Kbd,
        Li,
        List,
        P,
        Popover,
        Spinner,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from 'flowbite-svelte';
    import InfoSvg from "../../components/svg/InfoSvg.svelte";
    import {CompanyCategory, isActiveCompany, isPhysicalPerson} from "../../../libs/company/Company.js";
    import {dev} from "$app/environment";
    import ClockSvg from "../../components/svg/ClockSvg.svelte";
    import dateFormat from "dateformat";
    import {formatSiren} from "../../../libs/utils/Utils.js";
    import BuildingSvg from "../../components/svg/BuildingSvg.svelte";
    import BuildingCircleCheckSvg from "../../components/svg/BuildingCircleCheckSvg.svelte";
    import BuildingCircleXMarkSvg from "../../components/svg/BuildingCircleXMarkSvg.svelte";
    import UsersSvg from "../../components/svg/UsersSvg.svelte";
    import TagSvg from "../../components/svg/TagSvg.svelte";
    import CircleCheckSvg from "../../components/svg/CircleCheckSvg.svelte";
    import CircleXMarkSvg from "../../components/svg/CircleXMarkSvg.svelte";
    import {slide} from "svelte/transition";
    import FooterComponent from "../../components/FooterComponent.svelte";

    const scoreLog: any[] = []
    let score: number | undefined
    let maxScore: number | undefined
    let isError = false
    let isFetch = false
    const siret: string | undefined = $page.params.siret
    let company: ICompany | undefined = undefined

    onMount(async () => {
        if (!siret) return isFetch = true
        try {
            const response: Response = await fetch(encodeURI(`${$page.url.origin}/api/company?q=${siret}`))
            const _temps = await response.json()
            if (!_temps || _temps.length < 1) return isFetch = true
            company = _temps[0]
            isFetch = true

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
                {label: 'tat administratif', value: company?.etat_administratif},
                {label: 'Dirigeants', value: company?.dirigeants},
                {label: 'Établissements lié', value: company?.matching_etablisssements},
            ];
            score = testValue.length * 10
            maxScore = testValue.length * 10

            for (let testValueElement of testValue) {
                if (!testValueElement.value) score -= 10
                scoreLog.push({
                    initialScoreValue: score + (!testValueElement.value ? 10 : 0),
                    scoreValue: score,
                    label: testValueElement.label
                })
            }

            score += 100
            scoreLog.push({
                initialScoreValue: score - 100,
                scoreValue: score,
                label: 'Ratio Nombre d\'établissements'
            })
            maxScore += 100
            if (company && company.nombre_etablissements && company.nombre_etablissements_ouverts) {
                const _t = 100 - (((company.nombre_etablissements - company.nombre_etablissements_ouverts) / company.nombre_etablissements * 100).toFixed(0))
                console.log(_t)
                score -= _t
                scoreLog.push({
                    initialScoreValue: score + _t,
                    scoreValue: score,
                    label: 'Ratio Nombre d\'établissements'
                })
            } else {
                score -= 100
                scoreLog.push({
                    initialScoreValue: score + 100,
                    scoreValue: score,
                    label: 'Ratio Nombre d\'établissements'
                })
            }

        } catch (reason) {
            if (dev) console.log(reason)
            isError = true
        }
    })

    const getScoreRatio = () => {
        if (!score || !maxScore) return 0
        return (score / maxScore) * 100
    }

    const getDateFormat = (date?: string): string => {
        if (!date) return ''
        return dateFormat(new Date(date), '"le" dd/mm/yyyy "à" hh:mm:ss "("Z")"', false, true)
    }
</script>

<svelte:head>
    <title>NuStateAPI | Company</title>
</svelte:head>

{#if !siret || !company || !isFetch}
    {#if !isFetch}
        <div class="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <div class="relative">
                <Spinner class="drop-shadow-md" size={12}></Spinner>
            </div>
        </div>
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
    <div class="relative mx-6 lg:mx-24 mt-14 mb-3 transition-all duration-300 ease-in-out flex flex-col-reverse lg:flex-row lg:space-x-3 ">
        <Card class="max-lg:mt-3 !bg-transparent text-left items-start gap-y-3 lg:!w-[calc(50%-1rem)] drop-shadow-md"
              size="full">

            <Heading class="flex inline-flex" tag="h1">
                {company?.nom_raison_sociale ?? 'N/A'}
                <Indicator size="sm" color={company?.nom_raison_sociale ? 'green' : 'red'}/>
            </Heading>
            <P color="gray" class="flex inline-flex" tag="h2">
                {company?.nom_complet ?? 'N/A'}
                <Indicator size="sm" color={company?.nom_complet ? 'green' : 'red'}/>
            </P>

            <span class="flex inline-flex" id="siren1">
                <Kbd class="px-2.5 py-1.5 !bg-transparent !text-lg">
                   N° SIREN : {formatSiren(company?.siren) ?? 'N/A'}
                </Kbd>
                <Indicator class="-m-1" size="sm" color={company?.siren ? 'green' : 'red'}/>
            </span>

            <span class="flex inline-flex" id="cj">
                <Kbd class="px-2.5 py-1.5 mb-3 !bg-transparent !text-lg">
                    Catégorie juridique : {formatSiren(company?.nature_juridique) ?? 'N/A'}
                </Kbd>
                <Indicator class="-m-1" size="sm" color={company?.nature_juridique ? 'green' : 'red'}/>
            </span>
            <Popover transition={slide} placement="bottom" class="w-64 text-sm font-light "
                     title="Catégorie juridique"
                     trigger="hover"
                     triggeredBy="#cj">
                <A class="w-full" href="https://www.sirene.fr/sirene/public/variable/etatAdministratifUniteLegale">Source</A>
                La nomenclature des catégories juridiques retenue dans la gestion du répertoire Sirene, répertoire
                officiel d'immatriculation des entreprises et des établissements, a été élaborée sous l'égide du comité
                interministériel Sirene.
                C'est une nomenclature à vocation inter-administrative, utilisée aussi dans la gestion du Registre du
                Commerce et des Sociétés. Elle sert de référence aux Centres de Formalités des Entreprises (CFE) pour
                recueillir les déclarations des entreprises.
            </Popover>
            {#if company.nature_juridique}
                <div class="-mt-3 ml-2.5 flex flex-col space-y-3">
                    <span class="flex inline-flex w-fit" id="cj1">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_nature_juridique_n1 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_nature_juridique_n1 ? 'green' : 'red'}/>
                    </span>
                    <Popover transition={slide} class="w-64 text-sm font-light " title="Catégorie juridique (Niveau I)"
                             trigger="hover"
                             triggeredBy="#cj1">
                        <span class="font-bold">Niveau I</span> : 9 positions définissant les grandes familles de formes
                        juridiques.
                    </Popover>
                    <span class="flex inline-flex w-fit" id="cj2">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_nature_juridique_n2 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_nature_juridique_n2 ? 'green' : 'red'}/>
                    </span>
                    <Popover transition={slide} class="w-64 text-sm font-light " title="Catégorie juridique (Niveau II)"
                             trigger="hover"
                             triggeredBy="#cj2">
                        <span class="font-bold">Niveau II</span> : 37 positions définissant des catégories juridiques
                        par rapport aux critères juridiques fondamentaux du droit.
                    </Popover>
                    <span class="flex inline-flex w-fit" id="cj3">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_nature_juridique_n3 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_nature_juridique_n3 ? 'green' : 'red'}/>
                    </span>
                    <Popover transition={slide} class="w-64 text-sm font-light "
                             title="Catégorie juridique (Niveau III)"
                             trigger="hover"
                             triggeredBy="#cj3">
                        <span class="font-bold">Niveau III</span> : 260 positions permettant de préciser la catégorie
                        juridique en tenant compte de la spécificité des dispositions juridiques concernant les unités
                        concernées.
                    </Popover>
                </div>
            {/if}

            <span class="flex inline-flex" id="ape">
            <Kbd class="px-2.5 py-1.5 mb-3 !bg-transparent !text-lg">
                    Activité principale exercée : {company.activite_principale ?? 'N/A'}
                </Kbd>
                <Indicator class="-m-1" size="sm" color={company?.nature_juridique ? 'green' : 'red'}/>
            </span>
            <Popover transition={slide} placement="bottom" class="w-64 text-sm font-light "
                     title="Activité principale exercée"
                     trigger="hover"
                     triggeredBy="#ape">
                <A class="w-full" href="https://www.insee.fr/fr/metadonnees/definition/c1888">Source</A>
                L'activité principale exercée (APE) par une unité, est, parmi ses activités, celle qui génère le plus de
                valeur ajoutée.
                Elle est déterminée en fonction de la ventilation des différentes activités de l'unité statistique
                concernée (entreprise, unité légale, établissement). En pratique, comme la valeur ajoutée des
                différentes branches d'activité est souvent difficile à déterminer à partir des enquêtes statistiques,
                c'est la ventilation du chiffre d'affaires selon les branches qui est utilisée comme critère de
                détermination.
            </Popover>
            {#if company.activite_principale}
                <div class="-mt-3 ml-2.5 flex flex-col space-y-3">
                    <span class="flex inline-flex w-fit">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_activite_principale_n1 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_activite_principale_n1 ? 'green' : 'red'}/>
                    </span>
                    <span class="flex inline-flex w-fit">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_activite_principale_n2 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_activite_principale_n2 ? 'green' : 'red'}/>
                    </span>
                    <span class="flex inline-flex w-fit">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_activite_principale_n3 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_activite_principale_n3 ? 'green' : 'red'}/>
                    </span>
                    <span class="flex inline-flex w-fit">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_activite_principale_n4 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_activite_principale_n4 ? 'green' : 'red'}/>
                    </span>
                    <span class="flex inline-flex w-fit">
                        <Kbd class="px-2.5 py-1.5 dark:!bg-gray-800 !text-sm">{company.libelle_activite_principale_n5 ?? 'N/A'}</Kbd>
                        <Indicator class="-m-1" size="sm"
                                   color={company?.libelle_activite_principale_n5 ? 'green' : 'red'}/>
                    </span>
                </div>
            {/if}

            <Heading tag="h3">Informations sur l'entreprise</Heading>
            <List tag="ul" class="space-y-3 ml-4" list="none">
                <Li icon>
                    <BuildingSvg className="h-4 w-5"></BuildingSvg>
                    <span class="ml-2 flex inline-flex">
                        Nombre d'établissement{company?.nombre_etablissements > 1 ? 's' : ''}
                        <Indicator size="sm" color={company?.nombre_etablissements > 0 ? 'green' : 'red'}/>
                    </span>
                    <Kbd class="ml-2 px-2.5 py-1 dark:!bg-gray-800">{company?.nombre_etablissements ?? 'N/A'}</Kbd>
                </Li>
                <Li icon>
                    <BuildingCircleCheckSvg className="h-4"></BuildingCircleCheckSvg>
                    <span class="ml-2 flex inline-flex">
                        Établissement{company?.nombre_etablissements_ouverts > 1 ? 's' : ''} ouvert
                        <Indicator size="sm" color={company?.nombre_etablissements > 0 ? 'green' : 'red'}/>
                    </span>
                    <Kbd class="ml-2 px-2.5 py-1 dark:!bg-gray-800">{company?.nombre_etablissements_ouverts ?? 'N/A'}</Kbd>
                </Li>
                <Li icon>
                    <BuildingCircleXMarkSvg className="h-4"></BuildingCircleXMarkSvg>
                    <span class="ml-2 flex inline-flex">
                        Établissement{(company?.nombre_etablissements - company?.nombre_etablissements_ouverts) > 1 ? 's' : ''}
                        fermé
                        <Indicator size="sm"
                                   color={(company?.nombre_etablissements - company?.nombre_etablissements_ouverts) > 0 ? 'red' : 'green'}/>
                    </span>
                    <Kbd class="ml-2 px-2.5 py-1 dark:!bg-gray-800">{(company?.nombre_etablissements - company?.nombre_etablissements_ouverts) ?? 'N/A'}</Kbd>
                </Li>
                <Li icon>
                    <UsersSvg className="h-4"></UsersSvg>
                    <span class="ml-2 flex inline-flex">
                        Tranche d'effectif{company?.tranche_effectif_salarie > 1 ? 's' : ''} salarié
                        <Indicator size="sm" color={company?.tranche_effectif_salarie > 0 ? 'green' : 'red'}/>
                    </span>
                    <Kbd class="ml-2 px-2.5 py-1 dark:!bg-gray-800">{company?.tranche_effectif_salarie ?? 'N/A'}</Kbd>
                </Li>
                <Li icon>
                    <TagSvg className="h-4 w-5"></TagSvg>
                    <span class="ml-2 flex inline-flex">
                        Catégorie d'entreprise
                        <Indicator size="sm"
                                   color={CompanyCategory.includes(company?.categorie_entreprise) ? 'green' : 'red'}/>
                    </span>
                    <span id="ce">
                        <Kbd class="ml-2 px-2.5 py-1 dark:!bg-gray-800">{company?.categorie_entreprise ?? 'N/A'}</Kbd>
                    </span>
                    <Popover transition={slide} class="w-64 text-sm font-light " title="Catégorie d'entreprise"
                             trigger="hover"
                             triggeredBy="#ce">
                        <A class="w-full" href="https://www.insee.fr/fr/metadonnees/definition/c1057">Source</A>
                        <p class="w-full"><span class="font-bold">PME</span> : Les petites et moyennes entreprises dont
                            les microentreprises.</p>
                        <p class="w-full"><span class="font-bold">ETI</span> : Les entreprises de taille intermédiaire.
                        </p>
                        <p class="w-full"><span class="font-bold">GE</span> : Les grandes entreprises.</p>
                    </Popover>
                </Li>
                <Li icon>
                    {#if isActiveCompany(company)}
                        <CircleCheckSvg className="h-4 w-5 text-green-500"></CircleCheckSvg>
                    {:else}
                        <CircleXMarkSvg className="h-4 w-5 text-red-500"></CircleXMarkSvg>
                    {/if}
                    <span class="ml-2 flex inline-flex">
                        État administratif
                        <Indicator size="sm"
                                   color={isActiveCompany(company) ? 'green' : 'red'}/>
                    </span>
                    {#if company.etat_administratif}
                        <span id="ea">
                            <Kbd class="ml-2 px-2.5 py-1 dark:!bg-gray-800">
                                {company.etat_administratif} - {isActiveCompany(company) ? 'Active' : 'Cessée'}
                            </Kbd>
                        </span>
                        <Popover transition={slide} class="w-64 text-sm font-light " title="État administratif"
                                 trigger="hover"
                                 triggeredBy="#ea">
                            <A class="w-full"
                               href="https://www.sirene.fr/sirene/public/variable/etatAdministratifUniteLegale">Source</A>
                            Le passage à l'état « Cessée » découle de la prise en compte d'une déclaration de cessation
                            administrative. Pour les personnes morales, cela correspond au dépôt de la déclaration de
                            disparition de la personne morale. Pour les personnes physiques, cela correspond soit à la
                            prise en compte de la déclaration de cessation d'activité déposée par l'exploitant soit au
                            décès de l'exploitant conformément à la réglementation. En dehors de ces cas, l'unité légale
                            est toujours à l'état administratif « Active ».
                            Pour les personnes morales, la cessation administrative est, en théorie, définitive, l'état
                            administratif "Cessée" est irréversible.
                        </Popover>
                    {:else}
                        <Kbd class="ml-2 px-2.5 py-1 dark:!bg-gray-800">N/A</Kbd>
                    {/if}
                </Li>
            </List>

            <Badge class="pl-0 ml-0 mt-3" color="gray">
                <ClockSvg className="w-3 h-3 mr-1.5"></ClockSvg>
                Date de création de l'entreprise: {getDateFormat(company.date_creation)}
            </Badge>
        </Card>
        <div class="lg:!w-[calc(50%-1rem)] flex flex-col space-y-3">
            <Card class="!bg-transparent text-left items-start gap-y-3 drop-shadow-md" size="full">
                <Heading tag="h1">SCORE</Heading>
                <Heading tag="h2">
                    <span class="{getScoreRatio() <  75 ? getScoreRatio() <  50 ? getScoreRatio() <  25 ? 'text-red-500' : 'text-orange-500' : 'text-yellow-500' : 'text-green-500'}">{score ?? 'N/A'}</span>
                    <span class="text-gray-400 dark:text-gray-500">/{maxScore ?? 'N/A'} - {getScoreRatio()?.toFixed(2)}
                        %</span>
                </Heading>
            </Card>
            <Card class="!bg-transparent text-left items-start gap-y-4" size="full">
                <Heading class="drop-shadow-md" tag="h1">Logs</Heading>
                <div class="italic drop-shadow-md">
                    <P color="gray"><span class="font-bold">IS</span> : Valeur initial du score</P>
                    <P color="gray"><span class="font-bold">AS</span> : Valeur après le test du score</P>
                </div>
                <Accordion class="relative w-full transition-all duration-300 ease-in-out">
                    <AccordionItem>
                        <div slot="header drop-shadow-md">Détails</div>
                        <div class="max-h-72 overflow-y-auto drop-shadow-md">
                            {#each scoreLog as log}
                                <P class="py-1 px-3 bg-gray-100 dark:bg-gray-800" size="lg">
                                <span class="inline-block text-2xl w-[24px] items-center justify-center text-center {log.scoreValue > log.initialScoreValue ? 'text-green-500' : log.scoreValue < log.initialScoreValue ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}">
                                    {log.scoreValue > log.initialScoreValue ? '+' : log.scoreValue < log.initialScoreValue ? '-' : '='}
                                </span>
                                    {log.label}
                                    <span class="{log.scoreValue > log.initialScoreValue ? 'text-green-500' : log.scoreValue < log.initialScoreValue ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}">
                                    ( IS: {log.initialScoreValue} , <span class="font-bold">AS</span>: {log.scoreValue}
                                        )
                                </span>
                                </P>
                            {/each}
                        </div>
                    </AccordionItem>
                </Accordion>
            </Card>
        </div>
    </div>
    <div class="relative mx-6 lg:mx-12 mb-3 transition-all duration-300 ease-in-out">
        <Accordion class="w-full transition-all duration-300 ease-in-out">
            {#if company?.dirigeants && company.dirigeants.length > 0}
                <AccordionItem>
                    <div slot="header">Détails sur {company.dirigeants.length > 1 ? 'les' : 'le/la'}
                        dirigeant{company.dirigeants.length > 1 ? 's' : '(e)'}</div>
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell>Type</TableHeadCell>
                            <TableHeadCell>Dénomination / Nom - Prénom</TableHeadCell>
                            <TableHeadCell>Qualité</TableHeadCell>
                            <TableHeadCell>Date de naissance</TableHeadCell>
                            <TableHeadCell>SIREN</TableHeadCell>
                        </TableHead>
                        <TableBody class="divide-y">
                            {#each company.dirigeants as leader}
                                <TableBodyRow>
                                    <TableBodyCell>{leader?.type_dirigeant?.split(' ')?.map(e => e.at(0))?.join('')?.toUpperCase()}</TableBodyCell>
                                    {#if isPhysicalPerson(leader)}
                                        <TableBodyCell>{leader?.nom ?? 'N/A'} {leader?.prenoms?.toUpperCase() ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>{leader?.qualite ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>{leader?.annee_de_naissance ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>/</TableBodyCell>
                                    {:else}
                                        <TableBodyCell>{leader?.denomination ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>{leader?.qualite ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>/</TableBodyCell>
                                        <TableBodyCell>{leader?.siren ?? 'N/A'}</TableBodyCell>
                                    {/if}
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </AccordionItem>
            {:else}
                <AccordionItem class>
                    <div slot="header">Aucune information sur la/le(s) dirigeant(e/s)</div>
                    <Alert shadow color="red">
                        <span slot="icon"><InfoSvg></InfoSvg></span>
                        <span class="font-medium">Dirigeant(s) inconnu(e/s)</span>, le <Kbd
                            class="px-2.5 py-1.5">score</Kbd> de
                        l'entreprise est affecté.
                    </Alert>
                </AccordionItem>
            {/if}

            {#if company?.matching_etablisssements && company.matching_etablisssements.length > 0}
                <AccordionItem>
                    <div slot="header">Détails sur le{company.dirigeants.length > 1 ? 's' : ''}
                        dirigeant{company.dirigeants.length > 1 ? 's' : ''}</div>
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell>Type</TableHeadCell>
                            <TableHeadCell>Dénomination / Nom - Prénom</TableHeadCell>
                            <TableHeadCell>Qualité</TableHeadCell>
                            <TableHeadCell>Date de naissance</TableHeadCell>
                            <TableHeadCell>SIREN</TableHeadCell>
                        </TableHead>
                        <TableBody class="divide-y">
                            {#each company.dirigeants as leader}
                                <TableBodyRow>
                                    <TableBodyCell>{leader?.type_dirigeant?.split(' ')?.map(e => e.at(0))?.join('')?.toUpperCase()}</TableBodyCell>
                                    {#if isPhysicalPerson(leader)}
                                        <TableBodyCell>{leader?.nom ?? 'N/A'} {leader?.prenoms?.toUpperCase() ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>{leader?.qualite ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>{leader?.annee_de_naissance ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>/</TableBodyCell>
                                    {:else}
                                        <TableBodyCell>{leader?.denomination ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>{leader?.qualite ?? 'N/A'}</TableBodyCell>
                                        <TableBodyCell>/</TableBodyCell>
                                        <TableBodyCell>{leader?.siren ?? 'N/A'}</TableBodyCell>
                                    {/if}
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </AccordionItem>
            {:else}
                <AccordionItem>
                    <div slot="header">Aucune information sur un/des établissement(s) lié</div>
                    <Alert shadow color="red">
                        <span slot="icon"><InfoSvg></InfoSvg></span>
                        <span class="font-medium">Établissement(s) lié inconnu(s)</span>, le <Kbd
                            class="px-2.5 py-1.5">score</Kbd> de
                        l'entreprise est affecté.
                    </Alert>
                </AccordionItem>
            {/if}
        </Accordion>
        <Badge class="my-3 drop-shadow-md" color="gray">
            <ClockSvg className="w-3 h-3 mr-1.5"></ClockSvg>
            Dernière modification {getDateFormat(company.date_mise_a_jour)}
        </Badge>
    </div>
{/if}

{#if isFetch}
    <FooterComponent></FooterComponent>
{/if}

<div class="absolute top-0 right-0 m-2">
    <DarkMode></DarkMode>
</div>
