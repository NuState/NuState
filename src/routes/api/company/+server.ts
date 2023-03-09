import {dev} from '$app/environment';
import {error} from '@sveltejs/kit';
import type {APE_N5, CJ_N3, Company} from "french-company-types";
import {environment} from "../../../environments/environment";

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: any }) {
    const q: string | null = url.searchParams.get('q')

    if (!q) throw error(400, {message: "Error 400 : Bad request"})

    let find: Company[] | undefined

    try {
        const response: Response = await fetch(encodeURI(`${environment.company_api_url}${q}`))
        find = (await response.json()).results
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    for (let i = 0; i < find.length; i++) {
        try {
            const ape: APE_N5 = await (await fetch(encodeURI(`/api/company/ape?code=${find[i].activite_principale}`))).json()
            find[i].libelle_activite_principale_n1 = ape.I.label
            find[i].libelle_activite_principale_n2 = ape.II.label
            find[i].libelle_activite_principale_n3 = ape.III.label
            find[i].libelle_activite_principale_n4 = ape.IV.label
            find[i].libelle_activite_principale_n5 = ape.V.label
        } catch (reason) {
            if (dev) console.log(reason)
        }
        try {
            const cj: CJ_N3 = await (await fetch(encodeURI(`/api/company/cj?code=${find[i].nature_juridique}`))).json()
            find[i].libelle_nature_juridique_n1 = cj.I?.label
            find[i].libelle_nature_juridique_n2 = cj.II?.label
            find[i].libelle_nature_juridique_n3 = cj.III?.label
        } catch (reason) {
            if (dev) console.log(reason)
        }
    }

    return new Response(JSON.stringify(find), {status: 200})
}
