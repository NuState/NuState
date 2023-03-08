<script lang="ts">
    import '../app.postcss'
    import {browser} from "$app/environment";
    import {type FirebaseApp, initializeApp} from "firebase/app";
    import {environment} from "../environments/environment.js";
    import {type Analytics, getAnalytics} from "@firebase/analytics";
    import {type FirebasePerformance, getPerformance} from "@firebase/performance";

    let firebaseApp: FirebaseApp | undefined
    let firebaseAnalytics: Analytics | undefined
    let firebasePerformance: FirebasePerformance | undefined
    if (browser) {
        firebaseApp = initializeApp(environment.firebaseConfig)
        firebaseAnalytics = getAnalytics(firebaseApp)
        firebasePerformance = getPerformance(firebaseApp)
    }

</script>

<slot/>
