export const formatSiren = (str?: string): string | undefined => {
    if (!str || str.length !== 9) return str
    return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6, 9)}`
}

export const formatSiret = (str?: string): string | undefined => {
    if (!str || str.length !== 14) return str
    return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6, 9)} ${str.slice(9, 12)} ${str.slice(12)}`
}
