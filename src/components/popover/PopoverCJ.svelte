<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";

    export let triggeredBy
    export let placement = undefined
</script>

<Popover class="w-64 text-sm font-light" placement={placement ?? 'bottom'} title="Catégorie juridique"
         transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.sirene.fr/sirene/public/variable/etatAdministratifUniteLegale">Source</A>
    La nomenclature des catégories juridiques retenue dans la gestion du répertoire Sirene, répertoire officiel
    d'immatriculation des entreprises et des établissements, a été élaborée sous l'égide du comité interministériel
    Sirene. C'est une nomenclature à vocation inter-administrative, utilisée aussi dans la gestion du Registre du
    Commerce et des Sociétés. Elle sert de référence aux Centres de Formalités des Entreprises (CFE) pour recueillir les
    déclarations des entreprises.
</Popover>
