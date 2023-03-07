import { dev } from '$app/environment';
import { error, type HandleFetch } from '@sveltejs/kit';
import type { IApe } from '../../../../libs/company/Company';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ url, fetch }:{url: URL, fetch :any}) {
  const code: string | null = url.searchParams.get('code')

  if(!code) throw error(400, {message:"Error 400 : Bad request"})

  let find : IApe[] | undefined

  try {
    const response: Response = await fetch("/ape.min.json")
    find = await response.json()
  } catch (reason:any) {
    if (dev) console.log(reason)
    throw error(500, {message:reason.stack})
  }

  if(!find) throw error(404, {message:"Error 404 : Not found"})

  const found:IApe | undefined = find.find((value:IApe) => value.code?.toLowerCase() === code.toLowerCase())

  if(!found) throw error(404, {message:"Error 404 : Not found"})

  return new Response(JSON.stringify(found), {status:200})
}