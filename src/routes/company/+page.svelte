<script lang="ts">
    import FooterComponent from "$components/FooterComponent.svelte";
    import {
        Button,
        DarkMode,
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
    import {dev} from "$app/environment";
    import type {ICompany} from "$libs/company/Company";
    import {formatSiret} from "$libs/utils/Utils";
    import ArrowRightSvg from "$components/svg/ArrowRightSvg.svelte";


    let value: string | undefined
    let isError: boolean = false
    let buffer: any | undefined
    let companies: ICompany[] = []

    const getFilteredCompanies = () => {
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

</script>

<svelte:head>
    <title>NuStateAPI | Company</title>
</svelte:head>

<section class="relative mx-6 lg:mx-24 mt-14 mb-3 transition-all duration-300 ease-in-out">
    <article class="flex flex-col items-center justify-center space-y-3">
        <form autocomplete="off" class="w-full" on:submit|preventDefault={getFilteredCompanies}>
            <Search bind:value={value} class="transition-all duration-300 ease-in-out shadow"
                    on:input={getFilteredCompanies}>
                <Button class="drop-shadow-md shadow transition-all duration-300 ease-in-out">Rechercher</Button>
            </Search>
        </form>
        {#if value && value.length >= 3 && companies.length > 0}
            <Table class="transition-all duration-300 ease-in-out" shadow>
                <TableHead>
                    <TableHeadCell>SIRET</TableHeadCell>
                    <TableHeadCell>Dénominations</TableHeadCell>
                    <TableHeadCell>Activité principale exercée</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody class="divide-y">
                    {#each companies as company}
                        <TableBodyRow>
                            <TableBodyCell>{formatSiret(company?.siege?.siret)}</TableBodyCell>
                            <TableBodyCell>{company?.nom_complet}</TableBodyCell>
                            <TableBodyCell>{company?.libelle_activite_principale_n5}</TableBodyCell>
                            <TableBodyCell>
                                <Button class="drop-shadow-md shadow transition-all duration-300 ease-in-out"
                                        href="/company/{company?.siege?.siret}">Continuer
                                    <ArrowRightSvg className="h-4 w-4"></ArrowRightSvg>
                                </Button>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        {:else if value && value.length >= 3 && buffer}
            <Spinner class="drop-shadow-md m-6" size={8}></Spinner>
        {:else if value && value.length >= 3}
            <div class="text-start self-start">
                <p>Aucun résultat, essayez:</p>
                <ul>
                    <li>- SIREN</li>
                    <li>- SIRET</li>
                    <li>- Dénomination</li>
                    <li>- Adresse</li>
                    <li>- Dirigeants</li>
                    <li>- Élus</li>
                </ul>
            </div>
        {/if}
    </article>
</section>

<FooterComponent></FooterComponent>

<div class="absolute top-0 right-0 m-2">
    <DarkMode></DarkMode>
</div>
