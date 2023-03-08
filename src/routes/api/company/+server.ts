import {dev} from '$app/environment';
import {error} from '@sveltejs/kit';
import {COMPANY_API_URL, type IApe, type ICj, type ICompany} from '../../../libs/company/Company';

/** @type {import('./$types').RequestHandler} */
export async function GET({url, fetch}: { url: URL, fetch: any }) {
    const q: string | null = url.searchParams.get('q')

    if (!q) throw error(400, {message: "Error 400 : Bad request"})

    let find: ICompany[] | undefined

    try {
        const response: Response = await fetch(encodeURI(`${COMPANY_API_URL}${q}`))
        find = (await response.json()).results
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    for (let i = 0; i < find.length; i++) {
        try {
            const ape: IApe = await (await fetch(encodeURI(`/api/company/ape?code=${find[i].activite_principale}`))).json()
            find[i].libelle_activite_principale_n1 = ape.n1_label
            find[i].libelle_activite_principale_n2 = ape.n2_label
            find[i].libelle_activite_principale_n3 = ape.n3_label
            find[i].libelle_activite_principale_n4 = ape.n4_label
            find[i].libelle_activite_principale_n5 = ape.n5_label
        } catch (reason) {
            if (dev) console.log(reason)
        }
        try {
            const cj: ICj = await (await fetch(encodeURI(`/api/company/cj?code=${find[i].nature_juridique}`))).json()
            find[i].libelle_nature_juridique_n1 = cj.I?.label
            find[i].libelle_nature_juridique_n2 = cj.II?.label
            find[i].libelle_nature_juridique_n3 = cj.III?.label
        } catch (reason) {
            if (dev) console.log(reason)
        }
    }

    return new Response(JSON.stringify(find), {status: 200})
}
