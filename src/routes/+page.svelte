<script lang="ts">
    import {Button, Card, Heading, P, Spinner, Timeline, TimelineItem} from "flowbite-svelte";
    import {ArrowRightSvg, FooterComponent, HeaderComponent} from "$components/public-api";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {extract, type FeedData, type FeedEntry} from '@extractus/feed-extractor'
    import {CountUp} from "countup.js";

    let rssEntries: FeedEntry[] = []

    onMount(async () => {
        new CountUp('etablissements', (await (await fetch(`${$page.url.origin}/api/establishments/count`)).json())?.document_count ?? 0, {enableScrollSpy: true})//.start();
        new CountUp('entreprises', (await (await fetch(`${$page.url.origin}/api/companies/count`)).json())?.document_count ?? 0, {enableScrollSpy: true})//.start();

        const response: FeedData = (await extract(`${$page.url.origin}/rss`, {descriptionMaxLen: (Number.MAX_SAFE_INTEGER)}))
        rssEntries = response.entries
    })
</script>

<svelte:head>
    <title>NuState</title>
</svelte:head>

<HeaderComponent></HeaderComponent>

<section class="min-h-screen grid bg-gradient-to-br from-blue-200 to-sky-100 dark:from-blue-800 dark:to-sky-900">
    <article
            class="text-center flex flex-col items-center justify-center">
        <Heading class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl" tag="h1">
            <span class="drop-shadow-md">NuState
                <span class="relative inline-block -skew-y-6 px-3 py-1 bg-blue-500 text-neutral-100">Search</span>
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
        <Button class="transition-all duration-300 ease-in-out drop-shadow-md shadow" href="/search">Continuer
            <ArrowRightSvg className="ml-2 -mr-1 w-5 h-5"></ArrowRightSvg>
        </Button>
    </article>
</section>

<section class="mt-12 h-full mx-3 flex flex-col items-center justify-center">
    <article class="my-12">
        <Heading class="mb-4 flex-1" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl" tag="h1">
            <span class="drop-shadow-md">NuState
                <span class="relative inline-block -skew-y-6 px-3 py-1 bg-blue-500 text-neutral-100">Stats</span>
            </span>
        </Heading>
    </article>
    <article class="my-12 flex space-x-3">
        <Card class="dark:!bg-transparent" shadow>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white drop-shadow-md"
                id="entreprises">
                0
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight drop-shadow-md">
                Entreprises enregistrées
            </p>
        </Card>
        <Card class="dark:!bg-transparent" shadow>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white drop-shadow-md"
                id="etablissements">
                0
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight drop-shadow-md">
                Établissements enregistrés
            </p>
        </Card>
    </article>
</section>

<section class="mt-12 h-full mx-3 flex flex-col items-center justify-center">
    <article class="my-12">
        <Heading class="mb-4 flex-1" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl" tag="h1">
            <span class="drop-shadow-md">NuState
                <span class="relative inline-block -skew-y-6 px-3 py-1 bg-blue-500 text-neutral-100">Timeline</span>
            </span>
        </Heading>
    </article>
    <article class="max-w-sm">
        {#if rssEntries.length > 0}
            <Timeline>
                {#each rssEntries as entry}
                    <TimelineItem
                            date="{new Date(entry.published).getTime() > new Date().getTime() ? 'Features : ' : ''} {new Date(entry.published).toLocaleDateString()}"
                            title={entry.title}>
                        {#if entry?.description && entry.description.split('\\n')?.length}
                            {#each entry.description.split('\\n') as str}
                                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 max-w-md">
                                    {str ?? ''}
                                </p>
                            {/each}
                        {:else}
                            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 max-w-md">
                                {entry.description ?? ''}
                            </p>
                        {/if}
                    </TimelineItem>
                {/each}
            </Timeline>
        {:else}
            <Spinner></Spinner>
        {/if}
    </article>
</section>

<FooterComponent></FooterComponent>
