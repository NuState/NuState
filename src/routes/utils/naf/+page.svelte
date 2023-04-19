<script lang='ts'>
    import {FooterComponent, HeaderComponent} from '$components/public-api';
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
    } from 'flowbite-svelte';
    import {page} from "$app/stores";
    import {nafCodes} from "$functions/public-api";
    import {type ElasticsearchResponse, NafEnginesMap, type NafSchemaT1, type NafSchemaT2} from "$libs/public-api";

    let searchValue
    let selectedValue = 'naf-rev2'
    let resultData: ElasticsearchResponse<NafSchemaT1 | NafSchemaT2> | undefined
    let suggestsData
    let currentSchema: {
        n1: { code: string; label: string };
        n2: { code: string; label: string };
        n3: { code: string; label: string };
        n4: { code: string; label: string };
        n5: { code: string; label: string };
        id: { code: string; label: string }
    } | {} = NafEnginesMap.find(f => f.code == 'naf-rev2')?.schema

    let buffer
    let startBuffer = false
    const getFiltered = async () => {
        if (searchValue?.length > 0 && !startBuffer) {
            if (buffer) clearInterval(buffer)
            resultData = undefined
            buffer = setTimeout(async () => {
                startBuffer = true
                resultData = await (await fetch(encodeURI(`${$page.url.origin}/api/utils/naf?engine=${NafEnginesMap.find(f => f.code == selectedValue).engine}&q=${searchValue}`))).json()
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
        currentSchema = NafEnginesMap.find(f => f.code == selectedValue)?.schema
    }
</script>

<svelte:head>
    <title>NuState | Utils | NAF/NAP</title>
</svelte:head>

<HeaderComponent></HeaderComponent>

<section class='mt-12 h-full mx-3 flex flex-col items-center justify-center'>
    <article class='my-12'>
        <Heading class='mb-4 flex-1' customSize='text-4xl font-extrabold md:text-5xl lg:text-6xl' tag='h1'>
            <span class='drop-shadow-md'>NAF/NAP
                <span class='relative inline-block -skew-y-6 px-3 py-1 bg-blue-500 text-neutral-100'>Search</span>
            </span>
        </Heading>
        <P class='italic drop-shadow-md'>Données disponibles :</P>
        <List class='ml-4 text-xs sm:text-sm drop-shadow-md' shadow tag='ul'>
            <Li>
                <span class='font-bold'>NAF - Rev2</span>
                : Nomenclature d'activités française (2008-{new Date().getFullYear()})
            </Li>
            <Li>
                <span class='font-bold'>NAF - Rev1</span>
                : Nomenclature d'activités française (2003-2007)
            </Li>
            <Li>
                <span class='font-bold'>NAF - 1993</span>
                : Nomenclature d'activités française (1993-2002)
            </Li>
            <Li>
                <span class='font-bold'>NAP</span>
                : Nomenclature d'Activités et de Produits (1973-1992)
            </Li>
        </List>
    </article>
    <article class='px-6 lg:px-24 w-full sm:w-3/4 mb-12'>
        <form autocomplete='off' class='w-full mb-3' on:submit|preventDefault={getFiltered}>
            <Select bind:value={selectedValue} class='dark:!bg-gray-800 my-3 sm:hidden drop-shadow-md' items={nafCodes}
                    on:change={cleanFiltered} placeholder='----'
                    shadow/>
            <Search bind:value={searchValue}
                    class='transition-all duration-300 ease-in-out shadow dark:!bg-transparent w-full'
                    on:input={getFiltered}
                    placeholder='Référence ou libellée'>
                <Select bind:value={selectedValue} class='dark:!bg-gray-800 mx-3 max-sm:hidden drop-shadow-md'
                        items={nafCodes}
                        on:change={cleanFiltered} placeholder='----'
                        shadow/>
                <Button class='drop-shadow-md shadow transition-all duration-300 ease-in-out' type='submit'>Rechercher
                </Button>
            </Search>
        </form>
        {#if resultData && resultData.results.length > 0}
            <Table class="transition-all duration-300 ease-in-out" shadow>
                <TableHead>
                    <TableHeadCell>{currentSchema.id?.label}</TableHeadCell>
                    {#if currentSchema.n5?.label}
                        <TableHeadCell>{currentSchema.n5?.label}</TableHeadCell>
                    {/if}
                    <TableHeadCell>{currentSchema.n4?.label}</TableHeadCell>
                    <TableHeadCell>{currentSchema.n3?.label}</TableHeadCell>
                    <TableHeadCell>{currentSchema.n2?.label}</TableHeadCell>
                    <TableHeadCell>{currentSchema.n1?.label}</TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each resultData.results as result}
                        <TableBodyRow>
                            <TableBodyCell>{result?.[currentSchema.id?.code]}</TableBodyCell>
                            {#if currentSchema.n5?.label}
                                <TableBodyCell>{result?.[currentSchema.n5?.code]}</TableBodyCell>
                            {/if}
                            <TableBodyCell>{result?.[currentSchema.n4?.code]}</TableBodyCell>
                            <TableBodyCell>{result?.[currentSchema.n3?.code]}</TableBodyCell>
                            <TableBodyCell>{result?.[currentSchema.n2?.code]}</TableBodyCell>
                            <TableBodyCell>{result?.[currentSchema.n1?.code]}</TableBodyCell>
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
