<script lang="ts">
    import {Button, DarkMode, Heading, Kbd, P, Timeline, TimelineItem} from "flowbite-svelte";
    import ArrowRightSvg from "./components/svg/ArrowRightSvg.svelte";
    import FooterComponent from "./components/FooterComponent.svelte";
</script>

<svelte:head>
    <title>NuStateAPI</title>
</svelte:head>

<section class="min-h-screen grid bg-gradient-to-br from-blue-200 to-sky-100 dark:from-blue-800 dark:to-sky-900">
    <article
            class="text-center flex flex-col items-center justify-center">
        <Heading class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl" tag="h1">
            <span class="drop-shadow-md">NuState
                <span class="relative inline-block -skew-y-6 px-3 py-1 bg-blue-500 text-neutral-100">API</span>
            </span>
        </Heading>
        <P class="drop-shadow-md mb-6 text-lg text-center lg:text-xl w-3/4 lg:w-1/2 mx-auto">
            Une application innovante qui a été conçue pour faciliter la recherche et la vérification des entreprises.
        </P>
        <P class="drop-shadow-md mb-6 text-lg text-center lg:text-xl w-3/4 lg:w-1/2 mx-auto">
            Cette application est un outil pratique. Elle offre une solution simple et efficace et peut être améliorée
            en intégrant des fonctionnalités supplémentaires. Elle peut également être intégrée à d'autres systèmes pour
            offrir une solution complète.
        </P>
        <Button class="transition-all duration-300 ease-in-out drop-shadow-md shadow" href="/company">Continuer
            <ArrowRightSvg className="ml-2 -mr-1 w-5 h-5"></ArrowRightSvg>
        </Button>
    </article>
</section>

<section class="mt-12 h-full flex flex-col items-center justify-center">
    <article>
        <Timeline>
            <TimelineItem date="Features : Mars 2023" title="v1.0.0">
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Début des lancements en <Kbd class="px-2.5 py-1.5 !bg-transparent">release</Kbd>
                </p>
            </TimelineItem>
            <TimelineItem date="Mars 2023" title="v1.0.0-b">
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Début des lancements en <Kbd class="px-2.5 py-1.5 !bg-transparent">bêta</Kbd>
                </p>
            </TimelineItem>
            <TimelineItem date="07 Mars 2023" title="Commencement du projet...">
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Il faut bien un début à tout.
                </p>
            </TimelineItem>
        </Timeline>
    </article>
</section>

<FooterComponent></FooterComponent>


<div class="absolute top-0 right-0 m-2">
    <DarkMode></DarkMode>
</div>
