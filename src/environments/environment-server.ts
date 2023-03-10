// noinspection SpellCheckingInspection

import {env} from "$env/dynamic/private";
import type {AppOptions} from "firebase-admin";

export const environment = {
    firebaseConfig: {
        type: 'service_account',
        project_id: env['FBA_SDK_project_id'],
        private_key_id: env['FBA_SDK_private_key_id'],
        private_key: env['FBA_SDK_private_key'],
        client_email: env['FBA_SDK_client_email'],
        client_id: env['FBA_SDK_client_id'],
        auth_uri: env['FBA_SDK_auth_uri'],
        token_uri: env['FBA_SDK_token_uri'],
        auth_provider_x509_cert_url: env['FBA_SDK_auth_provider_x509_cert_url'],
        client_x509_cert_url: env['FBA_SDK_client_x509_cert_url'],
    } as AppOptions,
    firebaseDatabaseURL: env['FBA_SDK_databaseURL']
}
