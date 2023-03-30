<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";
    import {SalaryStaffRanges} from "french-company-types";

    export let triggeredBy
    export let placement = undefined
</script>

<Popover class="w-64 text-sm font-light" placement={placement ?? 'top'} title="Tranche d'effectif salarié"
         transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.sirene.fr/sirene/public/variable/trancheEffectifsEtablissement">Source</A>
    <p class="w-full">
        <span class="font-bold">Description</span>
        : Il s'agit d'une variable statistique, millésimée au 31/12 d'une année donnée.
    </p>
    {#each Object.entries(SalaryStaffRanges) as ssr}
        <p class="w-full"><span class="font-bold">{ssr[0]}</span> : {ssr[1]}</p>
    {/each}
</Popover>
