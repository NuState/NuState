import {error} from "@sveltejs/kit";
import {environment} from "../../../../environments/environment-server";
import {dev} from "$app/environment";
import type {ElasticsearchResponse, Nafa} from "$libs/public-api";

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: typeof window.fetch }) {
    const q: string | null = url.searchParams.get('q')

    if (!q) throw error(400, {message: 'Error 400 : Bad request'})

    if (!environment.engines.endpointKey) throw error(503, 'Error 503: Missing ENV_X205X0')
    if (!environment.engines.searchCodesKey) throw error(503, 'Error 503: Missing ENV_X693X1')

    let find: ElasticsearchResponse<Nafa>

    try {
        find = await (await fetch(encodeURI(`https://${environment.engines.endpointKey}/api/as/v1/engines/search-code-nafa-rev2/search?query=${q}`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment.engines.searchCodesKey}`,
            },
            body: JSON.stringify({
                page: {
                    size: 10
                }
            })
        })).json()
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find || !find.results) throw error(404, {message: "Error 404 : Not found"})

    find.results = find.results.map((result: any) => {
        return {
            ...Object
                .entries(result)
                .filter(([key]) => key !== '_meta' && key !== 'id')
                .reduce((acc, [key, value]: [key: string, value: any]) => ({...acc, [key]: value?.raw}), {})
        }
    })

    return new Response(JSON.stringify(find))
}
