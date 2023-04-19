import {NafEnginesMap} from "$libs/interfaces/utils/naf";

export const nafCodes = NafEnginesMap.map(e => ({
    value: e.code,
    name: e.name,
}))
