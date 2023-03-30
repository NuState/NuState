<script>
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";
    import {isPhysicalPerson} from "french-company-types";
    import {formatSiren} from "$libs/public-api";
    import {PopoverSIREN, SubCategory} from "$components/public-api";

    export let leaders
</script>

{#if leaders}
    <Table shadow>
        <TableHead>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Dénomination / Nom - Prénom</TableHeadCell>
            <TableHeadCell>Qualité</TableHeadCell>
            <TableHeadCell>Date de naissance</TableHeadCell>
            <TableHeadCell>SIREN</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each leaders as leader, i}
                <TableBodyRow>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center">
                            <p>{leader?.type_dirigeant?.split(' ')?.map(e => e.at(0))?.join('')?.toUpperCase()}</p>
                        </SubCategory>
                    </TableBodyCell>
                    {#if isPhysicalPerson(leader)}
                        <TableBodyCell>
                            <SubCategory className="flex inline-flex items-center"
                                         indicatorColor={leader?.prenoms ? 'green': 'red'}>
                                <p>{leader?.nom ?? 'N/A'} {leader?.prenoms?.toUpperCase() ?? 'N/A'}</p>
                            </SubCategory>
                        </TableBodyCell>
                        <TableBodyCell>
                            <SubCategory className="flex inline-flex items-center"
                                         indicatorColor={leader?.qualite ? 'green': 'red'}>
                                <p>{leader?.qualite ?? 'N/A'}</p>
                            </SubCategory>
                        </TableBodyCell>
                        <TableBodyCell>
                            <SubCategory className="flex inline-flex items-center"
                                         indicatorColor={leader?.annee_de_naissance ? 'green': 'red'}>
                                <p>{leader?.annee_de_naissance ?? 'N/A'}</p>
                            </SubCategory>
                        </TableBodyCell>
                        <TableBodyCell>
                            <SubCategory className="flex inline-flex items-center">
                                <p>/</p>
                            </SubCategory>
                        </TableBodyCell>
                    {:else}
                        <TableBodyCell>
                            <SubCategory className="flex inline-flex items-center"
                                         indicatorColor={leader?.denomination ? 'green': 'red'}>
                                <p>{leader?.denomination ?? 'N/A'}</p>
                            </SubCategory>
                        </TableBodyCell>
                        <TableBodyCell>
                            <SubCategory className="flex inline-flex items-center"
                                         indicatorColor={leader?.qualite ? 'green': 'red'}>
                                <p>{leader?.qualite ?? 'N/A'}</p>
                            </SubCategory>
                        </TableBodyCell>
                        <TableBodyCell>
                            <SubCategory className="flex inline-flex items-center">
                                <p>/</p>
                            </SubCategory>
                        </TableBodyCell>
                        <TableBodyCell>
                            {#if !leader?.denomination?.toUpperCase?.()?.includes?.('L\'ETAT')}
                                <SubCategory className="flex inline-flex items-center" hasInfoIcon={true}
                                             indicatorColor={leader?.siren ? 'green': 'red'} pId={`siren_leader_${i}`}>
                                    <p>{formatSiren(leader?.siren) ?? 'N/A'}</p>
                                </SubCategory>
                            {:else if leader?.denomination?.toUpperCase?.()?.includes?.('L\'ETAT')}
                                <SubCategory className="flex inline-flex items-center">
                                    <p>/</p>
                                </SubCategory>
                            {/if}
                        </TableBodyCell>
                    {/if}
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    {#each leaders as _, i}
        <PopoverSIREN placement="top" triggeredBy="{`#siren_leader_${i}`}"></PopoverSIREN>
    {/each}
{/if}
