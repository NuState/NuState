<script lang="ts">
    import {Indicator} from "flowbite-svelte";
    import {InfoSvg} from "$components/svg/public-api.js";

    export let pId
    export let indicatorColor
    export let hasInfoIcon = false
</script>

<p class="!font-kbd relative w-fit px-2.5 py-1.5 drop-shadow-md shadow font-semibold text-gray-900 dark:text-neutral-100 border border-gray-200 dark:border-gray-600 rounded-lg text-lg"
   id={pId}>
    <slot/>
    <Indicator class="-mt-1 -mr-0.5" color={indicatorColor} placement="top-right" size="lg"/>
    {#if hasInfoIcon}
        <InfoSvg className="-m-2.5 absolute bottom-0 right-0 w-5 h-5 text-gray-500 dark:text-gray-400"/>
    {/if}
</p>
