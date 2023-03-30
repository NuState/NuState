export const nafCodes = [
    {value: 'naf-rev2', name: 'NAF - Rev2'},
    {value: 'naf-rev1', name: 'NAF - Rev1'},
    {value: 'naf-1993', name: 'NAF - 1993'},
    {value: 'naf-nap', name: 'NAP'},
]

export const nafIndexCodes = [
    {code: 'naf-rev2', index: 'search-code-naf-rev2'},
    {code: 'naf-rev1', index: 'search-code-naf-rev1'},
    {code: 'naf-1993', index: 'search-code-naf-1993'},
    {code: 'naf-nap', index: 'search-code-naf-nap'},
]

export const nafSchemaCodes = [
    {
        code: 'naf-rev2', schema: {
            id: {
                label: 'Code',
                pre_raw: 'id',
            },
            n1: {
                label: 'Niveau 1',
                pre_raw: 'n1.label',
            },
            n2: {
                label: 'Niveau 2',
                pre_raw: 'n2.label',
            },
            n3: {
                label: 'Niveau 3',
                pre_raw: 'n3.label',
            },
            n4: {
                label: 'Niveau 4',
                pre_raw: 'n4.label',
            },
            n5: {
                label: 'Niveau 5',
                pre_raw: 'n5.label',
            },
        }
    },
    {
        code: 'naf-rev1', schema: {
            id: {
                label: 'Code',
                pre_raw: 'id',
            },
            n1: {
                label: 'Niveau 17',
                pre_raw: 'n17.label',
            },
            n2: {
                label: 'Niveau 31',
                pre_raw: 'n31.label',
            },
            n3: {
                label: 'Niveau 60',
                pre_raw: 'n60.label',
            },
            n4: {
                label: 'Niveau 220',
                pre_raw: 'n220.label',
            },
            n5: {
                label: 'Niveau 700',
                pre_raw: 'n700.label',
            },
        }
    },
    {
        code: 'naf-1993', schema: {
            id: {
                label: 'Code',
                pre_raw: 'id',
            },
            n1: {
                label: 'Niveau 17',
                pre_raw: 'n17.label',
            },
            n2: {
                label: 'Niveau 31',
                pre_raw: 'n31.label',
            },
            n3: {
                label: 'Niveau 60',
                pre_raw: 'n60.label',
            },
            n4: {
                label: 'Niveau 220',
                pre_raw: 'n220.label',
            },
            n5: {
                label: 'Niveau 700',
                pre_raw: 'n700.label',
            },
        }
    },
    {
        code: 'naf-nap', schema: {
            id: {
                label: 'Code',
                pre_raw: 'id',
            },
            n1: {
                label: 'Niveau 15',
                pre_raw: 'nap15.label',
            },
            n2: {
                label: 'Niveau 40',
                pre_raw: 'nap40.label',
            },
            n3: {
                label: 'Niveau 100',
                pre_raw: 'nap100.label',
            },
            n4: {
                label: 'Niveau 600',
                pre_raw: 'nap600.label',
            },
            n5: {
                label: undefined,
                pre_raw: undefined,
            },
        }
    },
]
