import {dev} from '$app/environment';
import {error} from '@sveltejs/kit';
import type {APE_N5} from "french-company-types";

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: any }) {
    const code: string | null = url.searchParams.get('code')

    if (!code || code.length !== 6) throw error(400, {message: "Error 400 : Bad request"})

    let find: APE_N5[] | undefined

    try {
        const response: Response = await fetch("/ape/ape_n5.all.min.json")
        find = await response.json()
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    const found: APE_N5 | undefined = find.find((value: APE_N5) => value.code?.toLowerCase() === code.toLowerCase())

    if (!found) throw error(404, {message: "Error 404 : Not found"})

    return new Response(JSON.stringify(found), {status: 200})
}
