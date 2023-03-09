<script>
    import {Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";

    export let triggeredBy
</script>

<Popover class="w-64 text-sm font-light" placement="top" title="Catégorie juridique" transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <span class="font-bold">Niveau I</span> : 9 positions définissant les grandes familles de formes juridiques.
</Popover>
