/**
 * Represents a response from API with optional properties.
 * @interface ElasticsearchResponse
 * @template T
 */
export interface ElasticsearchResponse<T> {
    /**
     * The meta-object of the {T} response.
     * @type {Object | undefined}
     * @memberOf ElasticsearchResponse
     */
    meta?: {
        /**
         * An array of alerts for the response.
         * @type {any[] | undefined}
         * @memberOf ElasticsearchResponse.meta
         */
        alerts?: any[]
        /**
         * An array of warnings for the response.
         * @type {any[] | undefined}
         * @memberOf ElasticsearchResponse.meta
         */
        warnings?: any[]
        /**
         * The precision of the response.
         * @type {string | undefined}
         * @memberOf ElasticsearchResponse.meta
         */
        precision?: string
        /**
         * The engine object of the response.
         * @type {Object | undefined}
         * @memberOf ElasticsearchResponse.meta
         */
        engine: {
            /**
             * The name of the engine.
             * @type {string | undefined}
             * @memberOf ElasticsearchResponse.meta.engine

             */
            name?: string
            /**
             * The type of the engine.
             * @type {string | undefined}
             * @memberOf ElasticsearchResponse.meta.engine
             */
            type?: string
        }
        /**
         * The page object of the response.
         * @type {Object | undefined}
         * @memberOf ElasticsearchResponse.meta
         */
        page: {
            /**
             * The current page of the response.
             * @type {number | undefined}
             * @memberOf ElasticsearchResponse.meta.page
             */
            current?: number
            /**
             * The total of pages for the response.
             * @type {number | undefined}
             * @memberOf ElasticsearchResponse.meta.page
             */
            total_pages?: number
            /**
             * The total of results for the response.
             * @type {number | undefined}
             * @memberOf ElasticsearchResponse.meta.page
             */
            total_results?: number
            /**
             * The size of the page.
             * @type {number | undefined}
             * @memberOf ElasticsearchResponse.meta.page
             */
            size?: number
        }
        /**
         * The request ID of the response.
         * @type {string | undefined}
         * @memberOf ElasticsearchResponse.meta
         */
        request_id?: string
    }

    /**
     * The results array of the {T} response.
     * @type {{T}[] | undefined}
     * @memberOf ElasticsearchResponse
     */
    results?: T[]
}
