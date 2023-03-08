/** @type {import('./$types').PageServerLoad} */
export async function load({getClientAddress}: any) {
    return {
        clientIp: getClientAddress()
    }
}
