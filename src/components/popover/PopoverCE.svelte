<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";
    import {CompanyCategories} from "french-company-types";

    export let triggeredBy
    export let placement = undefined
</script>

<Popover class="w-64 text-sm font-light" placement={placement ?? 'top'} title="Catégorie d'entreprise"
         transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.insee.fr/fr/metadonnees/definition/c1057">Source</A>
    <p class="w-full">
        <span class="font-bold">Description</span> : Quatre catégories d'entreprises sont définies dans le décret
        d'application de la loi de modernisation de l'économie (décret n°2008-1354) pour les besoins de l'analyse
        statistique et économique.
    </p>
    {#each Object.entries(CompanyCategories) as ce}
        <p class="w-full"><span class="font-bold">{ce[0]}</span> : {ce[1]}</p>
    {/each}
</Popover>
