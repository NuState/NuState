import {environment} from "../../../environments/environment-server";
import {error} from "@sveltejs/kit";
import {dev} from "$app/environment";

/** @type {import('./$types').RequestHandler} */
export async function GET({fetch}: { fetch: any }) {
    if (!environment.betteruptime) throw error(503, 'Error 503: Missing ENV_X397X0')

    let find: any | undefined

    try {
        find = await (await fetch(encodeURI(`https://betteruptime.com/api/v2/status-pages/160728`), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${environment.betteruptime}`,
            }
        })).json()
    } catch (reason: any) {
        if (dev) console.log(reason)
        throw error(500, {message: reason.stack})
    }

    if (!find) throw error(404, {message: "Error 404 : Not found"})

    let status_color = "dark"
    switch (find?.data?.attributes?.['aggregate_state'] ?? "") {
        case "operational":
            status_color = "green"
            break
        case "maintenance":
            status_color = "blue"
            break
        case "downtime":
            status_color = "red"
            break
    }

    return new Response(JSON.stringify({
        aggregate_state: find?.data?.attributes,
        status_color: status_color
    }), {status: 200})
}
