<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";
    import {CompanyEstablishmentStates} from "french-company-types";

    export let triggeredBy
    export let placement = undefined
</script>

<Popover class="w-64 text-sm font-light" placement={placement ?? 'top'} title="État administratif" transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.sirene.fr/sirene/public/variable/etatAdministratifEtablissement">Source</A>
    <p class="w-full">
        <span class="font-bold">Description</span> : Lors de son inscription au répertoire, un établissement est, sauf
        exception, à l'état « Actif ». Le passage à l'état « Fermé » découle de la prise en compte d'une déclaration de
        fermeture.

        À noter qu'un établissement fermé peut être rouvert.
    </p>
    {#each Object.entries(CompanyEstablishmentStates) as ces}
        <p class="w-full"><span class="font-bold">{ces[0]}</span> : {ces[1]}</p>
    {/each}
</Popover>
