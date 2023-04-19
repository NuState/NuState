/**
 * Represents a Cj object with optional properties.
 * @interface Cj
 */
export interface Cj {
    /**
     * The code property of the Cj object.
     * @type {string  | undefined}
     * @memberOf Cj
     */
    code?: string

    /**
     * The code property of the nested n1 object of the Cj object.
     * @type {string  | undefined}
     * @memberOf Cj
     */
    'n1.code'?: string

    /**
     * The label property of the nested n1 object of the Cj object.
     * @type {string | undefined}
     * @memberOf Cj
     */
    'n1.label'?: string

    /**
     * The code property of the nested n2 object of the Cj object.
     * @type {string | undefined}
     * @memberOf Cj
     */
    'n2.code'?: string

    /**
     * The label property of the nested n2 object of the Cj object.
     * @type {string | undefined}
     * @memberOf Cj
     */
    'n2.label'?: string

    /**
     * The code property of the nested n3 object of the Cj object.
     * @type {string | undefined}
     * @memberOf Cj
     */
    'n3.code'?: string

    /**
     * The label property of the nested n3 object of the Cj object.
     * @type {string | undefined}
     * @memberOf Cj
     */
    'n3.label'?: string

    /**
     * The date_dernier_traitement property of the Cj object.
     * @type {Object | undefined}
     * @memberOf Cj
     * @property {string} insee - The insee property of the date_dernier_traitement object.
     * @property {string} server - The server property of the date_dernier_traitement object.
     */
    date_dernier_traitement: {
        /**
         * The insee property of the date_dernier_traitement object.
         * @type {string | undefined}
         * @memberOf Cj.date_dernier_traitement
         */
        insee?: string

        /**
         * The server property of the date_dernier_traitement object.
         * @type {string | undefined}
         * @memberOf Cj.date_dernier_traitement
         */
        server?: string
    }
}
