/**
 * Interface representing a report.
 * @interface Report
 */
export interface Report {
    /**
     * Information about the client.
     *
     * @type {any | undefined}
     * @memberOf Report
     */
    clientInformation?: any

    /**
     * The client's IP address.
     *
     * @type {any | undefined}
     * @memberOf Report
     */
    clientIp?: any

    /**
     * The date and time of the report.
     *
     * @type {string | undefined}
     * @memberOf Report
     */
    at?: string
}
