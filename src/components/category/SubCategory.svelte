<script lang="ts">
    import {Indicator} from "flowbite-svelte";
    import {InfoSvg} from "$components/svg/public-api.js";

    export let pId
    export let indicatorColor
    export let hasInfoIcon = false
</script>

<p class="!font-kbd relative w-fit px-2.5 py-1.5 drop-shadow-md shadow font-semibold text-gray-800 dark:text-neutral-200 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
   id={pId}>
    <slot/>
    <Indicator class="-mt-1 -mr-0.5" color={indicatorColor} placement="top-right" size="md"/>
    {#if hasInfoIcon}
        <InfoSvg className="-m-2 absolute bottom-0 right-0 w-4 h-4 text-gray-600 dark:text-gray-300"/>
    {/if}
</p>
