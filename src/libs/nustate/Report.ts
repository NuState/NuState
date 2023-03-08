/**
 * Interface representing a report.
 */
export interface IReport {
    /**
     * Information about the client.
     */
    clientInformation?: any

    /**
     * The client's IP address.
     */
    clientIp?: any

    /**
     * The date and time of the report.
     */
    at?: string
}
