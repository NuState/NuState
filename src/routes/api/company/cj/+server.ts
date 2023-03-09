import {dev} from '$app/environment';
import {error} from '@sveltejs/kit';
import type {CJ_N3} from "french-company-types";

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: any }) {
    const code: string | null = url.searchParams.get('code')

    if (!code || code.length !== 4) throw error(400, {message: "Error 400 : Bad request"})

    let find: CJ_N3[] | undefined

    try {
        const response: Response = await fetch("/cj/cj_n3.all.min.json")
        find = await response.json()
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    const found: CJ_N3 | undefined = find.find((value: CJ_N3) => value.code?.toLowerCase() === code.toLowerCase())

    return new Response(JSON.stringify(found), {status: 200})
}
