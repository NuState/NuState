import {dev} from '$app/environment';
import {error} from '@sveltejs/kit';
import {environment} from "../../../../environments/environment-server";

/** @type {import('./$types').RequestHandler} */
export async function GET({fetch}: { fetch: any }) {
    if (!environment.engines.endpointKey) throw error(503, 'Error 503: Missing ENV_X205X0')
    if (!environment.engines.stockKey) throw error(503, 'Error 503: Missing ENV_X469X1')

    let find: any | undefined

    try {
        find = await (await fetch(encodeURI(`https://${environment.engines.endpointKey}/api/as/v1/engines/search-stock-etablissements`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment.engines.stockKey}`,
            }
        })).json()
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    return new Response(JSON.stringify({document_count: find?.document_count ?? 0}), {status: 200})
}
