import {dev} from '$app/environment';
import {error} from '@sveltejs/kit';
import {environment} from "../../../environments/environment-server";

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: any }) {
    const q: string | null = url.searchParams.get('q')

    if (!q) throw error(400, {message: "Error 400 : Bad request"})

    if (!environment.engines.endpointKey) throw error(503, 'Error 503: Missing ENV_X205X0')
    if (!environment.engines.searchStockKey) throw error(503, 'Error 503: Missing ENV_X916X1')

    let find: any | undefined

    try {
        find = await (await fetch(encodeURI(`https://${environment.engines.endpointKey}/api/as/v1/engines/search-stock-entreprises/search?query=${q}`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment.engines.searchStockKey}`,
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

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    for (let i = 0; i < find?.results.length; i++) {
        try {
            const engines = [{code: 'NAFRev2', value: 'search-code-naf-rev2'}, {
                code: 'NAFRev1',
                value: 'search-code-naf-rev1'
            }, {code: 'NAF1993', value: 'search-code-naf-1993'}, {code: 'NAP', value: 'search-code-naf-nap'}]

            const naf = await (await fetch(encodeURI(`/api/utils/naf?engine=${engines.find(engine => engine.code === find.results[i]?.version_nomenclature?.raw)?.value}&q=${find.results[i]?.code_naf?.raw}`))).json()
            const result = naf?.results?.[0]
            if (result) find.results[i].code_naf = {raw: result}
        } catch (reason) {
            if (dev) console.log(reason)
        }
        try {
            const cj = await (await fetch(encodeURI(`/api/utils/cj?q=${find.results[i]?.code_juridique?.raw}`))).json()
            const result = cj?.results?.[0]
            if (result) find.results[i].code_juridique = {raw: result}
        } catch (reason) {
            if (dev) console.log(reason)
        }
    }

    find.results = find.results.map((result: any) => {
        return {
            ...Object
                .entries(result)
                .filter(([key]) => key !== '_meta' && key !== 'id')
                .reduce((acc, [key, value]: [key: string, value: any]) => ({...acc, [key]: value?.raw}), {})
        }
    })

    return new Response(JSON.stringify(find), {status: 200})
}
