<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";

    export let triggeredBy
    export let placement = undefined
</script>

<Popover class="w-64 text-sm font-light" placement={placement ?? 'bottom'} title="Numéro SIRET" transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.insee.fr/fr/metadonnees/definition/c1841">Source</A>
    Le numéro Siret est un identifiant d'établissement.

    Cet identifiant numérique de 14 chiffres est articulé en deux parties : la première est le numéro Siren de l'unité
    légale à laquelle appartient l'unité Siret ; la seconde, habituellement appelée NIC (Numéro Interne de Classement),
    se compose d'un numéro d'ordre à quatre chiffres attribué à l'établissement et d'un chiffre de contrôle, qui permet
    de vérifier la validité de l'ensemble du numéro Siret.
</Popover>
