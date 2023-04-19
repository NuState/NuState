<script lang='ts'>
    import {FooterComponent, HeaderComponent} from '$components/public-api';
    import {
        Button,
        Heading,
        Li,
        List,
        P,
        Search,
        Spinner,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from 'flowbite-svelte';
    import {page} from "$app/stores";
    import type {Cj, ElasticsearchResponse} from "$libs/public-api";


    let searchValue
    let resultData: ElasticsearchResponse<Cj> | undefined
    let suggestsData
    let buffer
    let startBuffer = false
    const getFiltered = async () => {
        if (searchValue?.length > 0 && !startBuffer) {
            if (buffer) clearInterval(buffer)
            resultData = undefined
            buffer = setTimeout(async () => {
                startBuffer = true
                resultData = await (await fetch(encodeURI(`${$page.url.origin}/api/utils/cj?q=${searchValue}`))).json()
                clearInterval(buffer)
                buffer = null
                startBuffer = false
            }, 500)
        } else {
            if (buffer) {
                clearInterval(buffer)
                buffer = null
                startBuffer = false
            }
            if (!searchValue || searchValue.length == 0) cleanFiltered()
        }
    }

    const cleanFiltered = () => {
        searchValue = null
        resultData = undefined
    }
</script>

<svelte:head>
    <title>NuState | Utils | CJ</title>
</svelte:head>

<HeaderComponent></HeaderComponent>

<section class='mt-12 h-full mx-3 flex flex-col items-center justify-center'>
    <article class='my-12'>
        <Heading class='mb-4 flex-1' customSize='text-4xl font-extrabold md:text-5xl lg:text-6xl' tag='h1'>
            <span class='drop-shadow-md'>CJ
                <span class='relative inline-block -skew-y-6 px-3 py-1 bg-blue-500 text-neutral-100'>Search</span>
            </span>
        </Heading>
        <P class='italic drop-shadow-md'>Données disponibles :</P>
        <List class='ml-4 text-xs sm:text-sm drop-shadow-md' shadow tag='ul'>
            <Li>
                <span class='font-bold'>CJ</span>
                : Catégories Juridiques
            </Li>
        </List>
    </article>
    <article class='px-6 lg:px-24 w-full sm:w-3/4 mb-12'>
        <form autocomplete='off' class='w-full mb-3' on:submit|preventDefault={getFiltered}>
            <Search bind:value={searchValue}
                    class='transition-all duration-300 ease-in-out shadow dark:!bg-transparent w-full'
                    on:input={getFiltered}
                    placeholder='Référence ou libellée'>
                <Button class='drop-shadow-md shadow transition-all duration-300 ease-in-out' type='submit'>Rechercher
                </Button>
            </Search>
        </form>
        {#if resultData && resultData?.results?.length > 0}
            <Table class="transition-all duration-300 ease-in-out" shadow>
                <TableHead>
                    <TableHeadCell>Code</TableHeadCell>
                    <TableHeadCell>Niveau 3</TableHeadCell>
                    <TableHeadCell>Niveau 2</TableHeadCell>
                    <TableHeadCell>Niveau 1</TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each resultData.results as result}
                        <TableBodyRow>
                            <TableBodyCell>{result?.['code']}</TableBodyCell>
                            <TableBodyCell>{result?.['n3.label'] ?? 'Non communiqué'}</TableBodyCell>
                            <TableBodyCell>{result?.['n2.label'] ?? 'Non communiqué'}</TableBodyCell>
                            <TableBodyCell>{result?.['n1.label'] ?? 'Non communiqué'}</TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        {:else if resultData && resultData.results.length === 0}
            <P class="drop-shadow-md">Aucun résultat trouvé.</P>
            <P class='italic !text-gray-500 drop-shadow-md'>Le moteur de recherche est en version bêta.</P>
        {:else if (startBuffer || buffer) && searchValue?.length > 0}
            <Spinner class="drop-shadow-md m-6"></Spinner>
        {/if}
    </article>
</section>

<FooterComponent></FooterComponent>
