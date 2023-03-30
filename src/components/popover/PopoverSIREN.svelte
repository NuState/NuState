<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";

    export let triggeredBy
    export let placement = undefined
</script>

<Popover class="w-64 text-sm font-light" placement={placement ?? 'bottom'} title="Numéro SIREN" transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.insee.fr/fr/metadonnees/definition/c2047">Source</A>
    Le numéro Siren est un identifiant de neuf chiffres attribué à chaque unité légale. Les huit premiers chiffres n'ont
    aucune signification, excepté pour les organismes publics (communes,...) dont le numéro Siren commence
    obligatoirement par 1 ou 2. Le neuvième chiffre est un chiffre de contrôle de validité du numéro.
</Popover>
