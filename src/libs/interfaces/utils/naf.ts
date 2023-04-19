export const NafEngines = ['search-code-naf-rev2', 'search-code-naf-rev1', 'search-code-naf-1993', 'search-code-naf-nap'] as const
export type NafEngine = typeof NafEngines[number]

/**
 * Interface representing a NAF schema T1.
 * @interface NafSchemaT1
 */
export interface NafSchemaT1 {
    /**
     * Id of the NAF schema T1.
     * @type {object | undefined}
     * @memberOf NafSchemaT1
     */
    id?: {
        /**
         * The label of the id.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.id
         */
        label?: string
        /**
         * The code of the id.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.id
         */
        code?: string
    }

    /**
     * The first level of the NAF schema T1.
     * @type {object | undefined}
     */
    n1?: {
        /**
         * The label of the first level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n1
         */
        label?: string
        /**
         * The code of the first level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n1
         */
        code?: string
    }

    /**
     * The second level of the NAF schema T1.
     * @type {object | undefined}
     * @memberOf NafSchemaT1
     */
    n2?: {
        /**
         * The label of the second level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n2
         */
        label?: string
        /**
         * The code of the second level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n2
         */
        code?: string
    }

    /**
     * The third level of the NAF schema T1.
     * @type {object | undefined}
     * @memberOf NafSchemaT1
     */
    n3?: {
        /**
         * The label of the third level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n3
         */
        label?: string
        /**
         * The code of the third level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n3
         */
        code?: string
    }

    /**
     * The fourth level of the NAF schema T1.
     * @type {object | undefined}
     * @memberOf NafSchemaT1
     */
    n4?: {
        /**
         * The label of the fourth level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n4
         */
        label?: string
        /**
         * The code of the fourth level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n4
         */
        code?: string
    }

    /**
     * The fifth level of the NAF schema T1.
     * @type {object | undefined}
     * @memberOf NafSchemaT1
     */
    n5?: {
        /**
         * The label of the fifth level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n5
         */
        label?: string
        /**
         * The code of the fifth level.
         * @type {string | undefined}
         * @memberOf NafSchemaT1.n5
         */
        code?: string
    }
}

/**
 * Represents a NAF schema T2 data structure
 * @interface NafSchemaT2
 */
export interface NafSchemaT2 {
    /**
     * The ID of the NAF schema T2
     * @type {object | undefined}
     * @memberOf NafSchemaT2
     */
    id?: {
        /**
         * The label of the ID of the NAF schema T2
         * @type {string | undefined}
         * @memberOf NafSchemaT2.id
         */
        label?: string
        /**
         * The code of the ID of the NAF schema T2
         * @type {string | undefined}
         * @memberOf NafSchemaT2.id
         */
        code?: string
    }
    /**
     * The NAF schema T2's n17 data
     * @type {object | undefined}
     * @memberOf NafSchemaT2
     */
    n17?: {
        /**
         * The label of the NAF schema T2's n17 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n17
         */
        label?: string
        /**
         * The code of the NAF schema T2's n17 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n17
         */
        code?: string
    }
    /**
     * The NAF schema T2's n31 data
     * @type {object | undefined}
     * @memberOf NafSchemaT2
     */
    n31?: {
        /**
         * The label of the NAF schema T2's n31 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n31
         */
        label?: string
        /**
         * The code of the NAF schema T2's n31 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n31
         */
        code?: string
    }
    /**
     * The NAF schema T2's n60 data
     * @type {object | undefined}
     * @memberOf NafSchemaT2
     */
    n60?: {
        /**
         * The label of the NAF schema T2's n60 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n60
         */
        label?: string
        /**
         * The code of the NAF schema T2's n60 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n60
         */
        code?: string
    }
    /**
     * The NAF schema T2's n220 data
     * @type {object | undefined}
     * @memberOf NafSchemaT2
     */
    n220?: {
        /**
         * The label of the NAF schema T2's n220 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n220
         */
        label?: string
        /**
         * The code of the NAF schema T2's n220 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n220
         */
        code?: string
    }
    /**
     * The NAF schema T2's n700 data
     * @type {object | undefined}
     * @memberOf NafSchemaT2
     */
    n700?: {
        /**
         * The label of the NAF schema T2's n700 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n700
         */

        label?: string
        /**
         * The code of the NAF schema T2's n700 data
         * @type {string | undefined}
         * @memberOf NafSchemaT2.n700
         */
        code?: string
    }
}

export const NafEnginesMap = [
    {
        name: 'NAF - Rev2', code: 'naf-rev2', engine: 'search-code-naf-rev2', schema: {
            id: {
                label: 'Code',
                code: 'code',
            },
            n1: {
                label: 'Niveau 1',
                code: 'n1.label',
            },
            n2: {
                label: 'Niveau 2',
                code: 'n2.label',
            },
            n3: {
                label: 'Niveau 3',
                code: 'n3.label',
            },
            n4: {
                label: 'Niveau 4',
                code: 'n4.label',
            },
            n5: {
                label: 'Niveau 5',
                code: 'n5.label',
            },
        }
    },
    {
        name: 'NAF - Rev1', code: 'naf-rev1', engine: 'search-code-naf-rev1', schema: {
            id: {
                label: 'Code',
                code: 'code',
            },
            n1: {
                label: 'Niveau 17',
                code: 'n17.label',
            },
            n2: {
                label: 'Niveau 31',
                code: 'n31.label',
            },
            n3: {
                label: 'Niveau 60',
                code: 'n60.label',
            },
            n4: {
                label: 'Niveau 220',
                code: 'n220.label',
            },
            n5: {
                label: 'Niveau 700',
                code: 'n700.label',
            },
        }
    },
    {
        name: 'NAF - 1993', code: 'naf-1993', engine: 'search-code-naf-1993', schema: {
            id: {
                label: 'Code',
                code: 'code',
            },
            n1: {
                label: 'Niveau 17',
                code: 'n17.label',
            },
            n2: {
                label: 'Niveau 31',
                code: 'n31.label',
            },
            n3: {
                label: 'Niveau 60',
                code: 'n60.label',
            },
            n4: {
                label: 'Niveau 220',
                code: 'n220.label',
            },
            n5: {
                label: 'Niveau 700',
                code: 'n700.label',
            },
        }
    },
    {
        name: 'NAF - NAP', code: 'naf-nap', engine: 'search-code-naf-nap', schema: {
            id: {
                label: 'Code',
                code: 'code',
            },
            n1: {
                label: 'Niveau 15',
                code: 'nap15.label',
            },
            n2: {
                label: 'Niveau 40',
                code: 'nap40.label',
            },
            n3: {
                label: 'Niveau 100',
                code: 'nap100.label',
            },
            n4: {
                label: 'Niveau 600',
                code: 'nap600.label',
            },
            n5: {
                label: undefined,
                code: undefined,
            },
        }
    }
] as const
