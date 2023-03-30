<script lang="ts">
    import {Indicator} from "flowbite-svelte";
    import {InfoSvg} from "$components/svg/public-api.js";

    export let className = undefined
    export let pId = undefined
    export let indicatorColor = undefined
    export let hasInfoIcon = false
</script>

<p class="!font-kbd relative w-fit px-2.5 py-1.5 drop-shadow-md shadow font-semibold text-gray-800 dark:text-neutral-200 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded-lg max-sm:text-xs sm:text-sm {className ?? ''}"
   id={pId}>
    <slot/>
    {#if indicatorColor}
        <Indicator class="-mt-1 -mr-0.5" color={indicatorColor} placement="top-right" size="md"/>
    {/if}
    {#if hasInfoIcon}
        <InfoSvg className="-m-1.5 absolute bottom-0 right-0 w-3 h-3 text-gray-600 dark:text-gray-300"/>
    {/if}
</p>
