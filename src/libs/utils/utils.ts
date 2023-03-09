/**
 * Formats a SIREN number.
 *
 * @param str The string to format.
 * @returns The formatted string or `undefined` if the input is not valid.
 */
export const formatSiren = (str?: string): string | undefined => {
    if (!str || str.length !== 9) return str
    return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6, 9)}`
}

/**
 * Formats a SIRET number.
 *
 * @param str The string to format.
 * @returns The formatted string or `undefined` if the input is not valid.
 */
export const formatSiret = (str?: string): string | undefined => {
    if (!str || str.length !== 14) return str
    return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6, 9)} ${str.slice(9, 12)} ${str.slice(12)}`
}

/**
 * Generate a version 4 UUID.
 * @returns A version 4 UUID.
 */
export function uuid_e4(): string {
    const h = '0123456789abcdef';
    let u = '';
    for (let i = 0; i < 36; i++) {
        const c = i === 8 || i === 13 || i === 18 || i === 23 ? '-' : i === 14 ? '4' : 'x';
        u += c === '-' || c === '4' ? c : h[Math.floor(Math.random() * 16)];
    }
    return u;
}
