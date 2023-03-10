<script lang="ts">
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte"
    import {EqualsSvg, MinusSvg, PlusSvg} from "$components/public-api";

    export let scoreLogs
</script>

{#if scoreLogs}
    <Table shadow>
        <TableHead>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell>Libellé</TableHeadCell>
            <TableHeadCell>IS</TableHeadCell>
            <TableHeadCell>AS</TableHeadCell>
            <TableHeadCell>Différence</TableHeadCell>
            <TableHeadCell>Temps</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each scoreLogs as log}
                <TableBodyRow>
                    <TableBodyCell
                            class="!flex !items-center !justify-center {log.scoreValue > log.initialScoreValue ? '!text-green-500' : log.scoreValue < log.initialScoreValue ? '!text-red-500' : '!text-gray-400 dark:!text-gray-500'}">
                        {#if log.scoreValue > log.initialScoreValue}
                            <PlusSvg className="h-4"></PlusSvg>
                        {:else if log.scoreValue < log.initialScoreValue}
                            <MinusSvg className="h-4"></MinusSvg>
                        {:else}
                            <EqualsSvg className="h-4"></EqualsSvg>
                        {/if}
                    </TableBodyCell>
                    <TableBodyCell>{log.label}</TableBodyCell>
                    <TableBodyCell
                            class={log.scoreValue > log.initialScoreValue ? '!text-green-500 !font-bold' : log.scoreValue < log.initialScoreValue ? '!text-red-500 !font-bold' : '!text-gray-400 dark:!text-gray-500'}>
                        {log.initialScoreValue}
                    </TableBodyCell>
                    <TableBodyCell
                            class={log.scoreValue > log.initialScoreValue ? '!text-green-500 !font-bold' : log.scoreValue < log.initialScoreValue ? '!text-red-500 !font-bold' : '!text-gray-400 dark:!text-gray-500'}>
                        {log.scoreValue}
                    </TableBodyCell>
                    <TableBodyCell
                            class={log.scoreValue > log.initialScoreValue ? '!text-green-500 !font-bold' : log.scoreValue < log.initialScoreValue ? '!text-red-500 !font-bold' : '!text-gray-400 dark:!text-gray-500'}>
                        {log.scoreValue - log.initialScoreValue > 0 ? '+' : ''}{log.scoreValue - log.initialScoreValue}
                    </TableBodyCell>
                    <TableBodyCell class="!text-gray-500">
                        {log.at}ms
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
{/if}
