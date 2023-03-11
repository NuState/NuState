<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";
    import {CompanyStates} from "french-company-types";

    export let triggeredBy
</script>

<Popover class="w-64 text-sm font-light" placement="top" title="État administratif" transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.sirene.fr/sirene/public/variable/etatAdministratifUniteLegale">Source</A>
    <p class="w-full">
        <span class="font-bold">Description</span> : Le passage à l'état « Cessée » découle de la prise en compte d'une
        déclaration de cessation administrative. Pour les personnes morales, cela correspond au dépôt de la déclaration
        de disparition de la personne morale. Pour les personnes physiques, cela correspond soit à la prise en compte de
        la déclaration de cessation d'activité déposée par l'exploitant soit au décès de l'exploitant conformément à la
        réglementation. En dehors de ces cas, l'unité légale est toujours à l'état administratif « Active ».
        Pour les personnes morales, la cessation administrative est, en théorie, définitive, l'état administratif
        "Cessée" est irréversible.
    </p>
    {#each Object.entries(CompanyStates) as ce}
        <p class="w-full"><span class="font-bold">{ce[0]}</span> : {ce[1]}</p>
    {/each}
</Popover>
