import {Feed} from "feed";

/** @type {import('./$types').RequestHandler} */
export async function GET({url}: { url: URL }) {
    const rss = new Feed({
        title: 'NuStateAPI',
        description: 'Rechercher et vérifier des entreprises, en toute simplicité.',
        language: 'fr',
        id: `${url.origin}/api/rss`,
        link: url.origin,
        image: `${url.origin}/icons/NuStateAPI-White.png`,
        copyright: `All rights reserved © ${new Date().getFullYear()} NuStateAPI`,
        author: {
            name: 'NuStateAPI',
            link: url.origin
        }
    })
    //TODO: Feed items
    return new Response(rss.rss2())
}
