// noinspection SpellCheckingInspection,JSUnusedGlobalSymbols

/**
 * The API URL for the company search API.
 */
export const COMPANY_API_URL = "https://recherche-entreprises.api.gouv.fr/search?q="

/**
 * Check if a company is an association.
 *
 * @param company - The company object to check.
 * @returns True if the company is an association, false otherwise.
 */
export const isAssociation = (company: ICompany) => typeof company.complements?.identifiant_association === "string"

/**
 * Check if a leader is a moral person.
 *
 * @param leader - The leader object to check.
 * @returns True if the leader is a moral person, false otherwise.
 */
export const isMoralPerson = (leader: ILeader) => leader.type_dirigeant === "personne morale"

/**
 * Check if a leader is a physical person.
 *
 * @param leader - The leader object to check.
 * @returns True if the leader is a physical person, false otherwise.
 */
export const isPhysicalPerson = (leader: ILeader) => leader.type_dirigeant === "personne physique"


/**
 * Check if a company is active.
 *
 * @param company - The company object to check.
 * @returns True if the company is active, false otherwise.
 */
export const isActiveCompany = (company: ICompany) => company.etat_administratif?.toUpperCase() === "A"

/**
 * Interface representing an APE
 */
export interface IApe {
    /**
     * The code of the activity at level 1.
     */
    n1_code?: string;

    /**
     * The label of the activity at level 1.
     */
    n1_label?: string;

    /**
     * The code of the activity at level 2.
     */
    n2_code?: number;

    /**
     * The label of the activity at level 2.
     */
    n2_label?: string;

    /**
     * The code of the activity at level 3.
     */
    n3_code?: number;

    /**
     * The label of the activity at level 3.
     */
    n3_label?: string;

    /**
     * The code of the activity at level 4.
     */
    n4_code?: number;

    /**
     * The label of the activity at level 4.
     */
    n4_label?: string;

    /**
     * The code of the activity at level 5.
     */
    n5_code?: string;

    /**
     * The label of the activity at level 5.
     */
    n5_label?: string;
}

/**
 * Interface representing a Legal Category
 */
export interface ICjItem {
    /**
     * The code
     * @type {string | undefined}
     */
    code?: string;
    /**
     * The label or name of the Legal Category
     * @type {string | undefined}
     */
    label?: string;
}

/**
 * Interface representing a Legal Category Collection
 */
export interface ICjQuery {
    /**
     * The collection of Legal Categories for section I
     * @type {ICjItem[] | undefined}
     */
    "I"?: ICjItem[];
    /**
     * The collection of Legal Categories for section II
     * @type {ICjItem[] | undefined}
     */
    "II"?: ICjItem[];
    /**
     * The collection of Legal Categories for section III
     * @type {ICjItem[] | undefined}
     */
    "III"?: ICjItem[];
}

/**
 * Interface representing a Legal Category Object
 */
export interface ICj {
    /**
     * The Legal Category for section I
     * @type {ICjItem | undefined}
     */
    "I"?: ICjItem;
    /**
     * The Legal Category for section II
     * @type {ICjItem | undefined}
     */
    "II"?: ICjItem;
    /**
     * The Legal Category for section III
     * @type {ICjItem | undefined}
     */
    "III"?: ICjItem;
}


/**
 * Interface representing an elected person.
 */
export interface IElected {
    /**
     * The last name of the elected person.
     */
    nom?: string | null;

    /**
     * The first name(s) of the elected person.
     */
    prenoms?: string | null;

    /**
     * The year of birth of the elected person.
     */
    annee_de_naissance?: string | null;

    /**
     * The function/position held by the elected person.
     */
    fonction?: string | null;

    /**
     * The gender of the elected person.
     */
    sexe?: string | null;
}


/**
 * Interface representing a territorial entity.
 *
 * @interface
 */
export interface ITerritorial {
    /** The INSEE code of the territorial entity. */
    code_insee?: string | null;
    /** The code of the territorial entity. */
    code?: string | null;
    /** The level of the territorial entity. */
    niveau?: string | null;
    /** An array of elected officials in the territorial entity. */
    elus?: IElected[] | null;
}


/**
 * Additional information about a user or entity
 *
 * @interface IComplements
 */
export interface IComplements {
    /**
     * The territorial entities associated with the user or entity
     *
     * @type {ITerritorial[] | undefined | null}
     * @memberof IComplements
     */
    collectivite_territoriale?: ITerritorial[] | null;
    /**
     * Whether the entity has specified their collective bargaining agreement
     *
     * @type {boolean | undefined | null}
     * @memberof IComplements
     */
    convention_collective_renseignee?: boolean | null;
    /**
     * Whether the entity is an individual entrepreneur
     *
     * @type {boolean | undefined | null}
     * @memberof IComplements
     */
    est_entrepreneur_individuel?: boolean | null;
    /**
     * Whether the entity is an entertainment entrepreneur
     *
     * @type {boolean | undefined | null}
     * @memberof IComplements
     */
    est_entrepreneur_spectacle?: boolean | null;
    /**
     * Whether the entity is an 'ESS' (social and solidarity-based economy) entity
     *
     * @type {boolean | undefined | null}
     * @memberof IComplements
     */
    est_ess?: boolean | null;
    /**
     * Whether the entity is registered in the FINESS (National Health Establishment Identification) directory
     *
     * @type {boolean | undefined | null}
     * @memberof IComplements
     */
    est_finess?: boolean | null;
    /**
     * Whether the entity is a Recognized Guarantor of the Environment (RGE)
     *
     * @type {boolean | undefined | null}
     * @memberof IComplements
     */
    est_rge?: boolean | null;
    /**
     * Whether the entity has a UAI (Unique Establishment Identifier) code
     *
     * @type {boolean | undefined | null}
     * @memberof IComplements
     */
    est_uai?: boolean | null;
    /**
     * The identifier of an association associated with the user or entity
     *
     * @type {string | undefined | null}
     * @memberof IComplements
     */
    identifiant_association?: string | null;
}

/**
 * Represents a leader associated with an entity or user
 *
 * @interface ILeader
 */
export interface ILeader {
    /**
     * The last name of the leader
     *
     * @type {string | null}
     * @memberof ILeader
     */
    nom?: string | null;
    /**
     * The first name(s) of the leader
     *
     * @type {string | null}
     * @memberof ILeader
     */
    prenoms?: string | null;
    /**
     * The year of birth of the leader
     *
     * @type {string | null}
     * @memberof ILeader
     */
    annee_de_naissance?: string | null;
    /**
     * The quality (title) of the leader
     *
     * @type {string | null}
     * @memberof ILeader
     */
    qualite?: string | null;
    /**
     * The type of leader
     *
     * @type {string | null}
     * @memberof ILeader
     */
    type_dirigeant?: string | null;
    /**
     * The name of the entity or organization the leader is associated with
     *
     * @type {string | null}
     * @memberof ILeader
     */
    denomination?: string | null;
    /**
     * The acronym of the entity or organization the leader is associated with
     *
     * @type {unknown | null}
     * @memberof ILeader
     */
    sigle?: unknown | null; //TODO: FIND TYPE (string?)
    /**
     * The SIREN (Business Identification System) number of the entity or organization the leader is associated with
     *
     * @type {string | null}
     * @memberof ILeader
     */
    siren?: string | null;
}

/**
 * Represents an establishment.
 */
export interface IEstablishment {
    /**
     * The primary activity of the establishment.
     */
    activite_principale?: string | null;
    /**
     * The address of the establishment.
     */
    adresse?: string | null;
    /**
     * The postal code of the establishment.
     */
    code_postal?: string | null;
    /**
     * Indicates whether the establishment is the main office or not.
     */
    est_siege?: boolean | null;
    /**
     * The administrative state of the establishment.
     */
    etat_administratif?: string | null;
    /**
     * The geo ID of the establishment.
     */
    geo_id?: string | null;
    /**
     * The latitude of the establishment's location.
     */
    latitude?: number | null;
    /**
     * The longitude of the establishment's location.
     */
    longitude?: number | null;
    /**
     * The list of brands associated with the establishment.
     */
    liste_enseignes?: string[] | null;
    /**
     * The list of FINESS codes associated with the establishment.
     */
    liste_finess?: string[] | null;
    /**
     * The list of IDCC codes associated with the establishment.
     */
    liste_idcc?: string[] | null;
    /**
     * The list of RGE codes associated with the establishment.
     */
    liste_rge?: string[] | null;
    /**
     * The list of UAI codes associated with the establishment.
     */
    liste_uai?: string[] | null;
    /**
     * The commercial name of the establishment.
     */
    nom_commercial?: unknown | null; // TODO: FIND TYPE
    /**
     * The SIRET code of the establishment.
     */
    siret?: string | null;
}


/**
 * Represents the seat of an establishment.
 */
export interface ISeat {
    /** The main activity of the establishment. */
    activite_principale?: string | null;
    /** The main activity of the establishment in the trades register. */
    activite_principale_registre_metier?: unknown | null; // TODO: FIND TYPE (string?)
    /** The street address of the seat. */
    adresse?: string | null;
    /** The special distribution. */
    cedex?: unknown | null; // TODO: FIND TYPE (string?)
    /** The country code for foreign countries. */
    code_pays_etranger?: unknown | null; // TODO: FIND TYPE (string?)
    /** The postal code of the seat. */
    code_postal?: string | null;
    /** The name of the city of the seat. */
    commune?: string | null;
    /** Additional information about the address. */
    complement_adresse?: string | null;
    /** The creation date of the establishment. */
    date_creation?: string | null;
    /** The start date of the establishment's activity. */
    date_debut_activite?: string | null;
    /** The department of the seat. */
    departement?: string | null;
    /** The geo ID of the seat. */
    geo_id?: string | null;
    /** The repetition index. */
    indice_repetition?: unknown | null; // TODO: FIND TYPE (string? number?)
    /** The latitude of the seat. */
    latitude?: number | null;
    /** The longitude of the seat. */
    longitude?: number | null;
    /** The label for special distribution. */
    libelle_cedex?: unknown | null; // TODO: FIND TYPE (string?)
    /** The label for the city. */
    libelle_commune?: string | null;
    /** The label for the foreign city. */
    libelle_commune_etranger?: unknown | null; // TODO: FIND TYPE (string?)
    /** The label for the foreign country. */
    libelle_pays_etranger?: unknown | null; // TODO: FIND TYPE (string?)
    /** The label for the street. */
    libelle_voie?: string | null;
    /** The list of the establishment's brand names. */
    liste_enseignes?: string[] | null;
    /** The list of the establishment's FINESS numbers. */
    liste_finess?: string[] | null;
    /** The list of the establishment's IDCC codes. */
    liste_idcc?: string[] | null;
    /** The list of the establishment's RGE codes. */
    liste_rge?: string[] | null;
    /** The list of the establishment's UAI codes. */
    liste_uai?: string[] | null;
    /** The commercial name of the establishment. */
    nom_commercial?: unknown | null; // TODO: FIND TYPE (string?)
    /** The street number of the address. */
    numero_voie?: string | null;
    /** The SIRET number of the establishment. */
    siret?: string | null;
    /** The number of employees of the establishment. */
    tranche_effectif_salarie?: string | null;
    /** The type of the street. */
    type_voie?: string | null;
}

/**
 * Represents a company.
 */
export interface ICompany {
    /**
     * The SIREN (Système d'Identification du Répertoire des ENtreprises) number of the company.
     */
    siren?: string | null;

    /**
     * The full name of the company.
     */
    nom_complet?: string | null;

    /**
     * The number of establishments of the company.
     */
    nombre_etablissements?: number | null;

    /**
     * The number of open establishments of the company.
     */
    nombre_etablissements_ouverts?: number | null;

    /**
     * The registered seat of the company.
     */
    siege?: ISeat | null;

    /**
     * The date of creation of the company.
     */
    date_creation?: string | null;

    /**
     * The employee headcount range of the company.
     */
    tranche_effectif_salarie?: string | null;

    /**
     * The date of last update of the company data.
     */
    date_mise_a_jour?: string | null;

    /**
     * The category of the company.
     */
    categorie_entreprise?: ICompanyCategory | string | null;

    /**
     * The administrative status of the company.
     */
    etat_administratif?: string | null;

    /**
     * The name or business name of the company.
     */
    nom_raison_sociale?: string | null;

    /**
     * The legal nature of the company.
     */
    nature_juridique?: string | null;

    /**
     * Represents the legal nature of a company at level 1.
     * @type {string | null}
     */
    libelle_nature_juridique_n1?: string | null;

    /**
     * Represents the legal nature of a company at level 2.
     * @type {string | null}
     */
    libelle_nature_juridique_n2?: string | null;

    /**
     * Represents the legal nature of a company at level 3.
     * @type {string | null}
     */
    libelle_nature_juridique_n3?: string | null;


    /**
     * The main activity of the company (code).
     */
    activite_principale?: string | null;

    /**
     * The label of the main activity at level 1.
     * @type {string | null}
     */
    libelle_activite_principale_n1?: string | null;

    /**
     * The label of the main activity at level 2.
     * @type {string | null}
     */
    libelle_activite_principale_n2?: string | null;

    /**
     * The label of the main activity at level 3.
     * @type {string | null}
     */
    libelle_activite_principale_n3?: string | null;

    /**
     * The label of the main activity at level 4.
     * @type {string | null}
     */
    libelle_activite_principale_n4?: string | null;

    /**
     * The label of the main activity at level 5.
     * @type {string | null}
     */
    libelle_activite_principale_n5?: string | null;

    /**
     * The section of the main activity of the company.
     */
    section_activite_principale?: string | null;

    /**
     * The establishments of the company that matched the search query.
     */
    matching_etablisssements?: IEstablishment[] | null;

    /**
     * The leaders of the company.
     */
    dirigeants?: ILeader[] | null;

    /**
     * The additional information about the company.
     */
    complements?: IComplements | null;
}

export const CompanyCategory = <const>[
    /**
     * Petites et Moyennes Entreprises
     *
     */
    'PME',
    /**
     * Entreprises de Taille Intermédiaire
     */
    'ETI',
    /**
     * Grandes Entreprises
     */
    'GE'
]

export type ICompanyCategory = typeof CompanyCategory[number]
