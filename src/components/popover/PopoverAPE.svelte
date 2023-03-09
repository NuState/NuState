<script>
    import {A, Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";

    export let triggeredBy
</script>

<Popover class="w-64 text-sm font-light" placement="bottom" title="Activité principale exercée" transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <A class="w-full" href="https://www.insee.fr/fr/metadonnees/definition/c1888">Source</A>
    L'activité principale exercée (APE) par une unité, est, parmi ses activités, celle qui génère le plus de valeur
    ajoutée. Elle est déterminée en fonction de la ventilation des différentes activités de l'unité statistique
    concernée (entreprise, unité légale, établissement). En pratique, comme la valeur ajoutée des
    différentes branches d'activité est souvent difficile à déterminer à partir des enquêtes statistiques,
    c'est la ventilation du chiffre d'affaires selon les branches qui est utilisée comme critère de détermination.
</Popover>
