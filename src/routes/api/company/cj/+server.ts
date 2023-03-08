import {dev} from '$app/environment';
import {error} from '@sveltejs/kit';
import type {ICjItem, ICjQuery} from '../../../../libs/company/Company';

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: any }) {
    const code: string | null = url.searchParams.get('code')

    if (!code || code.length !== 4) throw error(400, {message: "Error 400 : Bad request"})

    const code1: string = code.slice(0, 1)
    const code2: string = code.slice(1, 3)
    const code3: string = code

    let find: ICjQuery | undefined

    try {
        const response: Response = await fetch("/cj.min.json")
        find = await response.json()
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    const found1: ICjItem | undefined = find.I?.find((value: ICjItem) => value.code?.toLowerCase() === code1.toLowerCase())
    const found2: ICjItem | undefined = find.II?.find((value: ICjItem) => value.code?.toLowerCase() === code2.toLowerCase())
    const found3: ICjItem | undefined = find.III?.find((value: ICjItem) => value.code?.toLowerCase() === code3.toLowerCase())

    return new Response(JSON.stringify({
        "I": found1,
        "II": found2,
        "III": found3,
    }), {status: 200})
}
