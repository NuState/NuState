<script lang="ts">
    import '../app.postcss'
    import {browser, dev} from "$app/environment";
    import {type FirebaseApp, initializeApp} from "firebase/app";
    import {environment} from "../environments/environment.js";
    import {type Analytics, getAnalytics} from "@firebase/analytics";
    import {type FirebasePerformance, getPerformance} from "@firebase/performance";
    import {type AppCheck, initializeAppCheck, ReCaptchaV3Provider} from "@firebase/app-check";
    import {onMount} from "svelte";

    onMount(() => {
        if(dev) self["FIREBASE_APPCHECK_DEBUG_TOKEN"] = true

        let firebaseApp: FirebaseApp | undefined
        let firebaseAppCheck: AppCheck | undefined
        let firebaseAnalytics: Analytics | undefined
        let firebasePerformance: FirebasePerformance | undefined
        if (browser) {
            firebaseApp = initializeApp(environment.firebaseConfig)
            firebaseAppCheck = initializeAppCheck(firebaseApp, {
                provider: new ReCaptchaV3Provider('6LeN3u8kAAAAAMqcFHooMnaEGk2j_MNAZpUQFD_X'),
                isTokenAutoRefreshEnabled: true
            })
            firebaseAnalytics = getAnalytics(firebaseApp)
            firebasePerformance = getPerformance(firebaseApp)
        }
    })
</script>

<slot/>
