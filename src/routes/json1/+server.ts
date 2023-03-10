import {Feed, type Item} from "feed";
import * as admin from "firebase-admin";
import {environment} from "../../environments/environment-server";
import {dev} from "$app/environment";
import {environmentDev} from "../../environments/environment-dev-server";
import {getDatabase} from "firebase-admin/database";

/** @type {import('../../../.svelte-kit/types/src/routes').RequestHandler} */
export async function GET({url}: { url: URL }) {

    let firebaseApp: admin.app.App | undefined
    try {
        firebaseApp = admin.app('[ADMIN_DEFAULT]')
    } catch (reason) {
        if (dev) console.log(reason)
    }

    if (firebaseApp) await firebaseApp.delete()

    if (dev) {
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(environmentDev.firebaseConfig),
            databaseURL: environmentDev.firebaseDatabaseURL
        }, '[ADMIN_DEFAULT]')
    } else {
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(environment.firebaseConfig),
            databaseURL: environment.firebaseDatabaseURL
        }, '[ADMIN_DEFAULT]')
    }

    const rss = new Feed({
        title: 'NuStateAPI',
        description: 'Rechercher et vérifier des entreprises, en toute simplicité.',
        language: 'fr',
        id: `${url.origin}/json1`,
        link: url.origin,
        image: `${url.origin}/icons/NuStateAPI-White.png`,
        favicon: `${url.origin}/favicon.ico`,
        copyright: `All rights reserved © ${new Date().getFullYear()} NuStateAPI`,
        author: {
            name: 'NuStateAPI',
            link: url.origin
        }
    })

    const items: Item[] = await (await getDatabase(firebaseApp).ref('feed/index').get()).val()

    for (const item of items.reverse()) {
        const _item = item
        _item.id = `${url.origin}/json1`
        _item.link = url.origin
        _item.author = [
            {
                name: 'NuStateAPI',
                link: url.origin
            }
        ]
        _item.date = new Date(_item.date)
        rss.addItem(_item)
    }

    await firebaseApp.delete()

    return new Response(rss.json1(), {
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8'
        }
    })
}
