import { dev } from '$app/environment';
import { error, type HandleFetch } from '@sveltejs/kit';
import { COMPANY_API_URL, type ICompany } from '../../../libs/company/Company';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ url, fetch }:{url: URL, fetch :any}) {
  const q: string | null = url.searchParams.get('q')

  if(!q) throw error(400, {message:"Error 400 : Bad request"})

  let find : ICompany[] | undefined

  try {
    const response: Response = await fetch(encodeURI(`${COMPANY_API_URL}${q}`))
    find = (await response.json()).results
  } catch (reason:any) {
    if (dev) console.log(reason)
    throw error(500, {message:reason.stack})
  }

  if(!find) throw error(404, {message:"Error 404 : Not found"})

  for(let i = 0; i < find.length; i++) {
    console.log(i)
    try {
        find[i].libelle_activite_principale = (await (await fetch(encodeURI(`/api/company/ape?code=${find[i].activite_principale}`))).json()).label
    } catch(reason) {
        if(dev) console.log(reason)
    }
  }

  return new Response(JSON.stringify(find), {status:200})
}