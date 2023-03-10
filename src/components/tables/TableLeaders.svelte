<script>
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";
    import {isPhysicalPerson} from "french-company-types";
    import {formatSiren} from "$libs/public-api";

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
            {#each leaders as leader}
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
                        <TableBodyCell>{formatSiren(leader?.siren) ?? 'N/A'}</TableBodyCell>
                    {/if}
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
{/if}
