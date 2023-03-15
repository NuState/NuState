<script lang="ts">
    import FooterComponent from "$components/FooterComponent.svelte";
    import {
        Button,
        DarkMode,
        Li,
        List,
        Search,
        Spinner,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from "flowbite-svelte";
    import {page} from "$app/stores";
    import {browser, dev} from "$app/environment";
    import {formatSiret} from "$libs/public-api";
    import {ArrowRightSvg} from "$components/public-api";
    import type {Company} from "french-company-types";
    import {type FirebaseApp, initializeApp} from "firebase/app";
    import {type Analytics, getAnalytics, logEvent} from "@firebase/analytics";
    import {type FirebasePerformance, getPerformance} from "@firebase/performance";
    import {environment} from "../../environments/environment";
    import {type AppCheck, initializeAppCheck, ReCaptchaV3Provider} from "@firebase/app-check";
    import {onMount} from "svelte";

    let firebaseApp: FirebaseApp | undefined
    let firebaseAppCheck: AppCheck | undefined
    let firebaseAnalytics: Analytics | undefined
    let firebasePerformance: FirebasePerformance | undefined

    onMount(() => {
        if (dev) self["FIREBASE_APPCHECK_DEBUG_TOKEN"] = true

        if (browser) {
            firebaseApp = initializeApp(environment.firebaseConfig)
            firebaseAppCheck = initializeAppCheck(firebaseApp, {
                provider: new ReCaptchaV3Provider('6LeN3u8kAAAAAMqcFHooMnaEGk2j_MNAZpUQFD_X'),
                isTokenAutoRefreshEnabled: true
            })
            firebaseAnalytics = getAnalytics(firebaseApp)
            firebasePerformance = getPerformance(firebaseApp)
        }
    })

    let value: string | undefined
    let isError: boolean = false
    let buffer: any | undefined
    let companies: Company[] = []

    const getFilteredCompanies = () => {
        if (firebaseAnalytics) logEvent(firebaseAnalytics, 'search_company_input')
        companies = []
        if (buffer) {
            clearInterval(buffer)
            buffer = undefined
        }
        if (value && value.length >= 3) buffer = setTimeout(async () => {
            try {
                isError = false
                companies = await (await fetch(encodeURI(`${$page.url.origin}/api/company?q=${value}`))).json()
            } catch (reason) {
                if (dev) console.log(reason)
                isError = true
            }
            buffer = undefined
        }, 1000)
    }

    const toCompanyDetails = async (siret?: string) => {
        if (!siret) return
        if (firebaseAnalytics) await logEvent(firebaseAnalytics, 'search_company', {
            siret: siret,
            at: new Date().toISOString()
        }, {global: true})
        window.location.assign(`/company/${siret}`)
    }

</script>

<svelte:head>
    <title>NuState | Company</title>
</svelte:head>

<section class="relative mx-6 lg:mx-24 mt-14 mb-3 transition-all duration-300 ease-in-out">
    <article class="flex flex-col items-center justify-center space-y-3">
        <form autocomplete="off" class="w-full" on:submit|preventDefault={getFilteredCompanies}>
            <Search bind:value={value} class="transition-all duration-300 ease-in-out shadow dark:!bg-transparent"
                    on:input={getFilteredCompanies}>
                <Button class="drop-shadow-md shadow transition-all duration-300 ease-in-out">Rechercher</Button>
            </Search>
        </form>
        {#if value && value.length >= 3 && companies.length > 0}
            <section class="overflow-x-auto w-screen px-3 sm:px-6 lg:px-9 py-2">
                <article class="relative w-full flex items-center justify-center">
                    <Table class="transition-all duration-300 ease-in-out" shadow>
                        <TableHead>
                            <TableHeadCell>SIRET</TableHeadCell>
                            <TableHeadCell>Dénomination</TableHeadCell>
                            <TableHeadCell>Activité principale exercée</TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                        </TableHead>
                        <TableBody>
                            {#each companies as company}
                                <TableBodyRow>
                                    <TableBodyCell>{formatSiret(company?.siege?.siret)}</TableBodyCell>
                                    <TableBodyCell>{company?.nom_complet}</TableBodyCell>
                                    <TableBodyCell>{company?.libelle_activite_principale_n5}</TableBodyCell>
                                    <TableBodyCell>
                                        <Button type="button"
                                                class="drop-shadow-md shadow transition-all duration-300 ease-in-out"
                                                on:click={() => toCompanyDetails(company?.siege?.siret)}>Continuer
                                            <ArrowRightSvg className="ml-1 h-4 w-4"></ArrowRightSvg>
                                        </Button>
                                    </TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                </article>
            </section>
        {:else if value && value.length >= 3 && buffer}
            <Spinner class="drop-shadow-md m-6" size={8}></Spinner>
        {:else if value && value.length >= 3}
            <div class="text-start self-start">
                <p>Aucun résultat, essayez:</p>
                <List tag="ul" class="ml-4" shadow>
                    <Li>SIREN</Li>
                    <Li>SIRET</Li>
                    <Li>Dénomination</Li>
                    <Li>Adresse</Li>
                    <Li>Dirigeants</Li>
                    <Li>Élus</Li>
                </List>
            </div>
        {/if}
    </article>
</section>

<FooterComponent></FooterComponent>

<div class="absolute top-0 right-0 m-2">
    <DarkMode></DarkMode>
</div>
