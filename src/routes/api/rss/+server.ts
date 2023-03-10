import RSS from "rss";

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: any }) {
    const rss = new RSS({
        title: 'NuStateAPI',
        description: 'Rechercher et vérifier des entreprises, en toute simplicité.',
        feed_url: `${url.origin}/api/rss`,
        site_url: url.origin,
        image_url: `${url.origin}/icons/NuStateAPI-White.png`,
        managingEditor: 'NuStateAPI',
        webMaster: 'NuStateAPI',
        copyright: '2023 NuStateAPI',
        language: 'fr'
    })
    //TODO: Feed items
    return new Response(rss.xml())
}
