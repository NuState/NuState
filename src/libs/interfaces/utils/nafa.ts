/**
 * Represents an NAFA code with optional properties.
 * @interface Nafa
 */
export interface Nafa {
    /**
     * The code of the NAFA.
     * @type {string | undefined}
     * @memberOf Nafa
     */
    code?: string;
    /**
     * The label of the NAFA.
     * @type {string | undefined}
     * @memberOf Nafa
     */
    label?: string;
}
