<script lang="ts">
    import FooterComponent from "$components/FooterComponent.svelte";
    import {
        Button,
        Heading,
        Li,
        List,
        P,
        Search,
        Select,
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
    import {ArrowRightSvg, HeaderComponent} from "$components/public-api";
    import {type FirebaseApp, initializeApp} from "firebase/app";
    import {type Analytics, getAnalytics, logEvent} from "@firebase/analytics";
    import {type FirebasePerformance, getPerformance} from "@firebase/performance";
    import {environment} from "../../environments/environment";
    import {type AppCheck, initializeAppCheck, ReCaptchaV3Provider} from "@firebase/app-check";
    import {onMount} from "svelte";
    import {searchCodes, searchCodesMap} from "$functions/public-api";

    let selectedValue = 'Ent'

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
    let companies: any[] = []

    const getFiltered = () => {
        if (firebaseAnalytics) logEvent(firebaseAnalytics, `search_${searchCodesMap.find(f => f.code === selectedValue)?.details}_input`)
        companies = []
        if (buffer) {
            clearInterval(buffer)
            buffer = undefined
        }
        if (value && value.length >= 3) buffer = setTimeout(async () => {
            try {
                isError = false
                companies = (await (await fetch(encodeURI(`${$page.url.origin}/api/${searchCodesMap.find(f => f.code === selectedValue)?.filtered}?q=${value}`))).json()).results
            } catch (reason) {
                if (dev) console.log(reason)
                isError = true
            }
            buffer = undefined
        }, 1000)
    }

    const toDetails = async (siret?: string) => {
        if (!siret) return
        if (firebaseAnalytics) await logEvent(firebaseAnalytics, `search_${searchCodesMap.find(f => f.code === selectedValue)?.details}`, {
            siret: siret,
            at: new Date().toISOString()
        }, {global: true})
        window.location.assign(`/search/${searchCodesMap.find(f => f.code === selectedValue)?.details}/${siret}`)
    }

    const cleanFiltered = () => {
        value = undefined
        companies = []
    }

</script>

<svelte:head>
    <title>NuState | Search | {selectedValue}</title>
</svelte:head>

<HeaderComponent></HeaderComponent>

<section class='mt-12 h-full mx-3 flex flex-col items-center justify-center'>
    <article class='my-12'>
        <Heading class='mb-4 flex-1' customSize='text-4xl font-extrabold md:text-5xl lg:text-6xl' tag='h1'>
            <span class='drop-shadow-md'>Rechercher
                <span class='relative inline-block -skew-y-6 px-3 py-1 bg-blue-500 text-neutral-100 transition-all duration-300 ease-in-out'>{selectedValue}</span>
            </span>
        </Heading>
        <P class='italic drop-shadow-md'>Données disponibles :</P>
        <List class='ml-4 text-xs sm:text-sm drop-shadow-md' shadow tag='ul'>
            <Li>
                <span class='font-bold'>Entreprise</span>
                : 23,987,284 entreprises enregistrées
            </Li>
            <Li>
                <span class='font-bold'>Établissements</span>
                : 34,056,238 établissements enregistrés
            </Li>
        </List>
    </article>
    <article class='px-6 lg:px-24 w-full sm:w-3/4 mb-12'>
        <form autocomplete="off" class="w-full mb-3" on:submit|preventDefault={getFiltered}>
            <Select bind:value={selectedValue} class='dark:!bg-gray-800 my-3 sm:hidden drop-shadow-md'
                    items={searchCodes}
                    on:change={cleanFiltered} placeholder='----'
                    shadow/>
            <Search bind:value={value} class="transition-all duration-300 ease-in-out shadow dark:!bg-transparent"
                    on:input={getFiltered}
                    placeholder="SIRET / SIREN / Dénomination / ...">
                <Select bind:value={selectedValue} class='dark:!bg-gray-800 mx-3 max-sm:hidden drop-shadow-md'
                        items={searchCodes}
                        on:change={cleanFiltered} placeholder='----'
                        shadow/>
                <Button class="drop-shadow-md shadow transition-all duration-300 ease-in-out">Rechercher</Button>
            </Search>
        </form>
        {#if value && value.length >= 3 && companies.length > 0}
            <Table class="transition-all duration-300 ease-in-out" shadow>
                <TableHead>
                    <TableHeadCell>SIRET</TableHeadCell>
                    <TableHeadCell>Dénomination</TableHeadCell>
                    <TableHeadCell>Activité principale exercée</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each companies as company}
                        {#if selectedValue === 'Ent'}
                            <TableBodyRow>
                                <TableBodyCell>{formatSiret(company?.['siret_siege'] ?? 'Non communiqué')}</TableBodyCell>
                                <TableBodyCell>{company?.['denomination'] ?? (`${company?.['prenom1']} ${company?.['nom_usage'] ?? company?.['nom']}`)}</TableBodyCell>
                                <TableBodyCell>{company?.['code_naf']?.[`${company?.['version_nomenclature'] === 'NAFRev2' ? 'n5' : company?.['version_nomenclature'] === 'NAFRev1' ? 'n700' : company?.['version_nomenclature'] === 'NAF1993' ? 'n700' : 'n600'}.label`] ?? 'Non communiqué'}</TableBodyCell>
                                <TableBodyCell>
                                    <Button type="button"
                                            class="drop-shadow-md shadow transition-all duration-300 ease-in-out"
                                            on:click={() => toDetails(company?.['siret_siege'])}>Continuer
                                        <ArrowRightSvg className="ml-1 h-4 w-4"></ArrowRightSvg>
                                    </Button>
                                </TableBodyCell>
                            </TableBodyRow>
                        {:else}
                            <TableBodyRow>
                                <TableBodyCell>{formatSiret(company?.['siret'] ?? 'Non communiqué')}</TableBodyCell>
                                <TableBodyCell>{company?.['denomination_usuelle'] ?? 'Non communiqué'}</TableBodyCell>
                                <TableBodyCell>{company?.['code_naf']?.[`${company?.['version_nomenclature'] === 'NAFRev2' ? 'n5' : company?.['version_nomenclature'] === 'NAFRev1' ? 'n700' : company?.['version_nomenclature'] === 'NAF1993' ? 'n700' : 'n600'}.label`] ?? 'Non communiqué'}</TableBodyCell>
                                <TableBodyCell>
                                    <Button type="button"
                                            class="drop-shadow-md shadow transition-all duration-300 ease-in-out"
                                            on:click={() => toDetails(company?.['siret'])}>Continuer
                                        <ArrowRightSvg className="ml-1 h-4 w-4"></ArrowRightSvg>
                                    </Button>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/if}
                    {/each}
                </TableBody>
            </Table>
        {:else if value && value.length >= 3 && buffer}
            <Spinner class="drop-shadow-md m-6"></Spinner>
        {:else if value && value.length >= 3}
            <div class="text-start self-start drop-shadow-md ml-1.5">
                <P class='italic !text-gray-500 drop-shadow-md'>Le moteur de recherche est en version bêta.</P>
                <P class="drop-shadow-md">Aucun résultat, essayez:</P>
                <List tag="ul" class="ml-4" shadow>
                    <Li>SIREN</Li>
                    <Li>SIRET</Li>
                    <Li>Dénomination</Li>
                    <Li>Adresse</Li>
                    <Li class="line-through">Dirigeants</Li>
                    <Li class="line-through">Élus</Li>
                </List>
            </div>
        {/if}
    </article>
</section>

<FooterComponent></FooterComponent>
