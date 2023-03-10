import dateFormat from "dateformat";
import type {Company} from "french-company-types";

export const getDateFormat = (date?: string): string => {
    if (!date) return ''
    return dateFormat(new Date(date), '"le" dd/mm/yyyy "à" hh:mm:ss "("Z")"', false, true)
}

export const getEstablishmentClosed = (company?: Company): number | undefined => {
    if (!company || company?.nombre_etablissements == undefined || company?.nombre_etablissements_ouverts == undefined) return undefined
    return company.nombre_etablissements - company.nombre_etablissements_ouverts
}
