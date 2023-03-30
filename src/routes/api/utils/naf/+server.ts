import {error} from "@sveltejs/kit";
import {environment} from "../../../../environments/environment-server";

const engines = ["search-code-naf-rev2", "search-code-naf-rev1", "search-code-naf-1993", "search-code-naf-nap"]

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: typeof window.fetch }) {
    const q: string | null = url.searchParams.get('q')
    const engine: string | null = url.searchParams.get('engine')

    if (!q || !engine) throw error(400, {message: 'Error 400 : Bad request'})
    if (!engines.includes(engine)) throw error(400, {message: 'Error 400 : Bad request (Wrong engine)'})

    return new Response(JSON.stringify(await (await fetch(encodeURI(`https://${environment.engines.endpoint}/api/as/v1/engines/${engine}/search?query=${q}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${environment.engines.searchCodes}`,
        },
        body: JSON.stringify({
            page: {
                size: 10
            }
        })
    })).json()))
}
