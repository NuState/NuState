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
        Span,
        Spinner
    } from 'flowbite-svelte';
    import {browser, dev} from "$app/environment";
    import {type Log, type Report} from "$libs/public-api";
    import {type FirebaseApp, initializeApp} from "firebase/app";
    import {type Analytics, getAnalytics} from "@firebase/analytics";
    import {type FirebasePerformance, getPerformance} from "@firebase/performance";
    import {environment} from "../../../environments/environment";
    import {type Database, type DataSnapshot, getDatabase, onValue, ref} from "@firebase/database";
    import {type Company} from "french-company-types";
    import {FooterComponent, InfoSvg, TableEstablishments, TableLeaders, TableLogs} from "$components/public-api";
    import Tab1 from "./Tab1.svelte";
    import {slide} from "svelte/transition";
    import {type AppCheck, initializeAppCheck, ReCaptchaV3Provider} from "@firebase/app-check";
    import {getScoreRatio, reportCompany, testCompany} from "$functions/public-api";

    let firebaseApp: FirebaseApp | undefined
    let firebaseAppCheck: AppCheck | undefined
    let firebaseAnalytics: Analytics | undefined
    let firebasePerformance: FirebasePerformance | undefined
    let firebaseDatabase: Database | undefined

    /** @type {import('./$types').PageServerData} */
    export let data

    let scoreLogs: Log[] = []
    let score: number | undefined
    let maxScore: number | undefined

    let isError: boolean = false
    let isFetch: boolean = false
    let isTest: boolean = false

    const siret: string | undefined = $page.params.siret

    let company: Company | undefined = undefined
    let companyReportCount = undefined

    let currentTab = 0

    onMount(async () => {
        if (dev) self["FIREBASE_APPCHECK_DEBUG_TOKEN"] = true

        if (browser) {
            firebaseApp = initializeApp(environment.firebaseConfig)
            firebaseAppCheck = initializeAppCheck(firebaseApp, {
                provider: new ReCaptchaV3Provider('6LeN3u8kAAAAAMqcFHooMnaEGk2j_MNAZpUQFD_X'),
                isTokenAutoRefreshEnabled: true
            })
            firebaseAnalytics = getAnalytics(firebaseApp)
            firebasePerformance = getPerformance(firebaseApp)
            firebaseDatabase = getDatabase(firebaseApp)
        }

        if (!siret) return isFetch = true
        try {
            const response: Response = await fetch(encodeURI(`${$page.url.origin}/api/company?q=${siret}`))
            const _temps = await response.json()
            if (!_temps || _temps.length < 1) return isFetch = true
            company = _temps[0]
            isFetch = true

            if (company) testCompany(company).then((value: { score: number, maxScore: number, scoreLogs: any[] }) => {
                score = value.score
                maxScore = value.maxScore
                scoreLogs = value.scoreLogs
                isTest = true
            })

            try {
                if (siret && firebaseDatabase) {
                    onValue(ref(firebaseDatabase, `reports/${siret}`), (dataSnapshot: DataSnapshot) => {
                        let data: Record<string, Report> | undefined | null
                        companyReportCount = 0
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
</script>

<svelte:head>
    <title>NuState | Company | {siret}</title>
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
                <Heading class="flex inline-flex drop-shadow-md !text-lg !text-gray-500" tag="h2">
                    {company?.nom_complet ?? 'N/A'}
                    <Indicator size="sm" color={company?.nom_complet ? 'green' : 'red'}/>
                </Heading>

                <div class="my-3 mb-4 w-full flex inline-flex max-sm:space-x-1.5 sm:space-x-3">
                    <Button on:click={() => currentTab = 0} color={currentTab === 0 ? 'blue' : 'alternative'}
                            class="w-full max-sm:text-xs shadow drop-shadow-md transition-all duration-300 ease-in-out">
                        Entreprise
                    </Button>
                    <span class="w-full" id="btnTab2">
                        <Button disabled on:click={() => currentTab = 1}
                                color={currentTab === 1 ? 'blue' : 'alternative'}
                                class="w-full max-sm:text-xs shadow drop-shadow-md duration-300 ease-in-out">
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
                                class="w-full max-sm:text-xs shadow drop-shadow-md duration-300 ease-in-out">
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
                            {#if isTest}
                                <Span class="{getScoreRatio(score, maxScore) <  75 ? getScoreRatio(score, maxScore) <  50 ? getScoreRatio(score, maxScore) <  25 ? '!text-red-500' : '!text-orange-500' : '!text-yellow-500' : '!text-green-500'}">
                                    {score ?? 'N/A'}
                                </Span>
                                <Span class="!text-gray-400 dark:!text-gray-500">
                                    /{maxScore ?? 'N/A'} - {getScoreRatio(score, maxScore)?.toFixed(2)}%
                                </Span>
                            {:else}
                                <Spinner></Spinner>
                            {/if}
                        </Heading>
                    </Card>
                </article>
            </section>
            <section class="shadow-md rounded-lg">
                <article>
                    <Card shadow class="!bg-transparent text-left items-start gap-y-3 shadow-inner" size="full">
                        <Heading class="flex inline-flex justify-between drop-shadow-md" tag="h1">
                            Rapport
                            {#if typeof companyReportCount === 'number' && firebaseApp && firebaseDatabase}
                                <Button type="button"
                                        on:click={() => reportCompany(siret, data?.clientIp, firebaseApp, firebaseDatabase)}
                                        color="red"
                                        class="transition-all duration-300 ease-in-out drop-shadow-md shadow dark:hover:opacity-75">
                                    Signaler
                                </Button>
                            {/if}
                        </Heading>
                        <Heading tag="h2"
                                 class="drop-shadow-md {companyReportCount <  75 ? companyReportCount <  50 ? companyReportCount <  25 ? '!text-green-500' : '!text-yellow-500': '!text-orange-500' : '!text-red-500' }">
                            {#if typeof companyReportCount === 'number'}
                                {companyReportCount ?? 'N/A'}
                            {:else}
                                <Spinner></Spinner>
                            {/if}
                        </Heading>
                    </Card>
                </article>
            </section>
        </article>
    </section>
    <section class="relative shadow-md rounded-lg mx-6 lg:mx-12 mb-3 transition-all duration-300 ease-in-out">
        <article>
            <Card shadow class="!bg-transparent text-left items-start gap-y-4 shadow-inner" size="full">
                <Heading class="drop-shadow-md" tag="h3">Logs</Heading>
                <div class="italic drop-shadow-md">
                    <P color="gray"><Span class="font-bold">IS</Span> : Valeur initial du score</P>
                    <P color="gray"><Span class="font-bold">AS</Span> : Valeur après le test du score</P>
                </div>
                <Accordion
                        class="relative w-full transition-all duration-300 ease-in-out">
                    <AccordionItem>
                        <div slot="header">Détails</div>
                        {#if isTest}
                            <TableLogs scoreLogs={scoreLogs}></TableLogs>
                        {:else}
                            <Spinner></Spinner>
                        {/if}
                    </AccordionItem>
                </Accordion>
            </Card>
        </article>
    </section>
    <section class="relative mx-6 lg:mx-12 mb-3 transition-all duration-300 ease-in-out">
        <article>
            <Card shadow class="!bg-transparent text-left items-start gap-y-4 shadow-inner" size="full">
                <Heading class="drop-shadow-md" tag="h3">
                    Dirigeant{company.dirigeants.length > 1 ? 's' : '(e)'}</Heading>
                <div class="italic drop-shadow-md">
                    <P color="gray"><Span class="font-bold">PP</Span> : Personne Physique</P>
                    <P color="gray"><Span class="font-bold">PM</Span> : Personne Morale</P>
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
                <Heading class="drop-shadow-md" tag="h3">Établissement(s) lié</Heading>
                <!--div class="italic drop-shadow-md">
                    <P color="gray"><span class="font-bold">PP</span> : Personne Physique</P>
                    <P color="gray"><span class="font-bold">PM</span> : Personne Morale</P>
                </div-->
                <Accordion
                        class="relative w-full transition-all duration-300 ease-in-out">
                    {#if company?.matching_etablissements && company.matching_etablissements.length > 0}
                        <AccordionItem>
                            <div slot="header">Détails sur {company.matching_etablissements.length > 1 ? 'les' : 'l\''}
                                établissement{company.matching_etablissements.length > 1 ? 's' : '(e)'} lié
                            </div>
                            <TableEstablishments establishments={company?.matching_etablissements}>
                            </TableEstablishments>
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
