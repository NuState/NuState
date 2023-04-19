import {error} from "@sveltejs/kit";
import {environment} from "../../../../environments/environment-server";
import {dev} from "$app/environment";
import {
    type ElasticsearchResponse,
    type NafEngine,
    NafEngines,
    type NafSchemaT1,
    type NafSchemaT2
} from "$libs/public-api";

const MAX_SIZE = 80;
const DEFAULT_SIZE = 10;

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: typeof window.fetch }) {
    const q: string | null = url.searchParams.get('q')
    const engine: string | null = url.searchParams.get('engine')

    const size: string | null = url.searchParams.get('size')
    const parsedSize = size ? parseInt(size) : DEFAULT_SIZE;
    const validSize = parsedSize <= MAX_SIZE ? parsedSize : DEFAULT_SIZE;

    if (!q || !engine) throw error(400, {message: 'Error 400 : Bad request'})
    if (!NafEngines.includes(engine as NafEngine)) throw error(400, {message: 'Error 400 : Bad request (Wrong engine)'})

    if (!environment.engines.endpoint) throw error(503, 'Error 503: Missing ENV_X205X0')
    if (!environment.engines.searchCodes) throw error(503, 'Error 503: Missing ENV_X693X1')

    let find: ElasticsearchResponse<NafSchemaT1 | NafSchemaT2>

    try {
        find = await (await fetch(encodeURI(`https://${environment.engines.endpoint}/api/as/v1/engines/${engine}/search?query=${q}`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment.engines.searchCodes}`,
            },
            body: JSON.stringify({
                page: {
                    size: validSize
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
