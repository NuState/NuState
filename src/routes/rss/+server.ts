import {Feed, type Item} from "feed";
import {type App, cert, deleteApp, getApp, initializeApp} from 'firebase-admin/app';
import {environment} from "../../environments/environment-server";
import {environment as environmentClient} from "../../environments/environment";
import {dev} from "$app/environment";
import {environmentDev} from "../../environments/environment-dev-server";
import {getDatabase} from "firebase-admin/database";
import {type AppCheck, getAppCheck} from "firebase-admin/app-check";

/** @type {import('../../../.svelte-kit/types/src/routes').RequestHandler} */
export async function GET({url}: { url: URL }) {

    let firebaseApp: App | undefined

    try {
        firebaseApp = getApp('[ADMIN_DEFAULT]')
    } catch (reason) {
        if (dev) console.log(reason)
    }

    if (firebaseApp) await deleteApp(firebaseApp)

    if (dev) {
        firebaseApp = initializeApp({
            credential: cert(environmentDev.firebaseConfig),
            databaseURL: environmentDev.firebaseDatabaseURL
        }, '[ADMIN_DEFAULT]')
    } else {
        firebaseApp = initializeApp({
            credential: cert(environment.firebaseConfig),
            databaseURL: environment.firebaseDatabaseURL
        }, '[ADMIN_DEFAULT]')
    }

    let firebaseAppCheck: AppCheck = getAppCheck(firebaseApp)
    await firebaseAppCheck.verifyToken((await firebaseAppCheck.createToken(environmentClient.firebaseConfig.appId)).token)

    const rss = new Feed({
        title: 'NuState',
        description: 'Rechercher et vérifier des entreprises, en toute simplicité.',
        language: 'fr',
        id: `${url.origin}/rss`,
        link: url.origin,
        image: `${url.origin}/icons/NuState.png`,
        favicon: `${url.origin}/favicon.ico`,
        copyright: `All rights reserved © ${new Date().getFullYear()} NuState`,
        author: {
            name: 'NuState',
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
                name: 'NuState',
                link: url.origin
            }
        ]
        _item.date = new Date(_item.date)
        rss.addItem(_item)
    }

    await deleteApp(firebaseApp)

    return new Response(rss.rss2(), {
        headers: {
            'Content-Type': 'application/xml;charset=UTF-8'
        }
    })
}
