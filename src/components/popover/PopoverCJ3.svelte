<script>
    import {Popover} from "flowbite-svelte";
    import {slide} from "svelte/transition";

    export let triggeredBy
    export let placement = undefined
</script>

<Popover class="w-64 text-sm font-light" placement={placement ?? 'top'} title="Catégorie juridique" transition={slide}
         trigger="hover" triggeredBy={triggeredBy}>
    <span class="font-bold">Niveau III</span> : 260 positions permettant de préciser la catégorie juridique en tenant
    compte de la spécificité des dispositions juridiques concernant les unités concernées.
</Popover>
