import {Feed, type Item} from "feed";
import admin from "firebase-admin/app";
import {environment} from "../../environments/environment-server";
import {dev} from "$app/environment";
import {environmentDev} from "../../environments/environment-dev-server";
import {getDatabase} from "firebase-admin/database";

/** @type {import('../../../.svelte-kit/types/src/routes').RequestHandler} */
export async function GET({url}: { url: URL }) {

    let firebaseApp: admin.App | undefined
    try {
        firebaseApp = admin.getApp('[ADMIN_DEFAULT]')
    } catch (reason) {
        if (dev) console.log(reason)
    }

    if (firebaseApp) await admin.deleteApp(firebaseApp)

    if (dev) {
        firebaseApp = admin.initializeApp({
            credential: admin.cert(environmentDev.firebaseConfig),
            databaseURL: environmentDev.firebaseDatabaseURL
        }, '[ADMIN_DEFAULT]')
    } else {
        firebaseApp = admin.initializeApp({
            credential: admin.cert(environment.firebaseConfig),
            databaseURL: environment.firebaseDatabaseURL
        }, '[ADMIN_DEFAULT]')
    }

    const rss = new Feed({
        title: 'NuStateAPI',
        description: 'Rechercher et vérifier des entreprises, en toute simplicité.',
        language: 'fr',
        id: `${url.origin}/rss`,
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
        _item.id = `${url.origin}/rss`
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

    await admin.deleteApp(firebaseApp)

    return new Response(rss.rss2(), {
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8'
        }
    })
}
