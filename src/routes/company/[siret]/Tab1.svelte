<script lang="ts">
    import type {Company} from "french-company-types";
    import {CompanyCategoryCodes, isActiveCompany, SalaryStaffRangeCodes} from "french-company-types";
    import {formatSiren} from "$libs/public-api";
    import {
        BriefCase,
        BuildingCircleCheckSvg,
        BuildingCircleXMarkSvg,
        BuildingShield,
        BuildingSvg,
        Category,
        CircleCheckSvg,
        CircleXMarkSvg,
        ClockSvg,
        PopoverAPE,
        PopoverCE,
        PopoverCJ,
        PopoverCJ1,
        PopoverCJ2,
        PopoverCJ3,
        PopoverSalaryStaffRangeCode,
        PopoverSIREN,
        SubCategory,
        TagSvg,
        UsersSvg
    } from "$components/public-api";
    import {Badge} from "flowbite-svelte";
    import {getDateFormat, getEstablishmentClosed} from "$functions/public-api";

    export let company: Company | undefined

</script>

<div class="relative w-full h-full flex flex-col space-y-5">
    <Category hasInfoIcon={true} indicatorColor={company?.siren ? 'green' : 'red'}
              pId="siren_1">
        N° SIREN : {formatSiren(company?.siren) ?? 'N/A'}
    </Category>
    <PopoverSIREN triggeredBy="#siren_1"></PopoverSIREN>

    <Category className="flex inline-flex items-center" hasInfoIcon={true}
              indicatorColor={company?.nature_juridique ? 'green' : 'red'}
              pId="cj_1">
        <BuildingShield className="h-4 w-fit mr-1.5"></BuildingShield>
        Catégorie juridique : {formatSiren(company?.nature_juridique) ?? 'N/A'}
    </Category>
    <PopoverCJ triggeredBy="#cj_1"></PopoverCJ>

    {#if company?.nature_juridique}
        <div class="ml-2.5 mb-0.5 flex flex-col space-y-4">
            <SubCategory pId="cj1_1" hasInfoIcon={true}
                         indicatorColor={company?.libelle_nature_juridique_n1 ? 'green' : 'red'}>
                {company?.libelle_nature_juridique_n1 ?? 'N/A'}
            </SubCategory>
            <PopoverCJ1 triggeredBy="#cj1_1"></PopoverCJ1>

            <SubCategory pId="cj2_1" hasInfoIcon={true}
                         indicatorColor={company?.libelle_nature_juridique_n2 ? 'green' : 'red'}>
                {company?.libelle_nature_juridique_n2 ?? 'N/A'}
            </SubCategory>
            <PopoverCJ2 triggeredBy="#cj2_1"></PopoverCJ2>

            <SubCategory pId="cj3_1" hasInfoIcon={true}
                         indicatorColor={company?.libelle_nature_juridique_n3 ? 'green' : 'red'}>
                {company?.libelle_nature_juridique_n3 ?? 'N/A'}
            </SubCategory>
            <PopoverCJ3 triggeredBy="#cj3_1"></PopoverCJ3>
        </div>
    {/if}

    <Category className="flex inline-flex items-center" hasInfoIcon={true}
              indicatorColor={company?.activite_principale ? 'green' : 'red'}
              pId="ape_1">
        <BriefCase className="h-4 w-fit mr-1.5"></BriefCase>
        Activité principale exercée : {company?.activite_principale ?? 'N/A'}
    </Category>
    <PopoverAPE triggeredBy="#ape_1"></PopoverAPE>

    {#if company?.activite_principale}
        <div class="ml-2.5 mb-0.5 flex flex-col space-y-4">
            <SubCategory
                    indicatorColor={company?.libelle_activite_principale_n1 ? 'green' : 'red'}>
                {company?.libelle_activite_principale_n1 ?? 'N/A'}
            </SubCategory>

            <SubCategory
                    indicatorColor={company?.libelle_activite_principale_n2 ? 'green' : 'red'}>
                {company?.libelle_activite_principale_n2 ?? 'N/A'}
            </SubCategory>

            <SubCategory
                    indicatorColor={company?.libelle_activite_principale_n3 ? 'green' : 'red'}>
                {company?.libelle_activite_principale_n3 ?? 'N/A'}
            </SubCategory>

            <SubCategory
                    indicatorColor={company?.libelle_activite_principale_n4 ? 'green' : 'red'}>
                {company?.libelle_activite_principale_n4 ?? 'N/A'}
            </SubCategory>

            <SubCategory
                    indicatorColor={company?.libelle_activite_principale_n5 ? 'green' : 'red'}>
                {company?.libelle_activite_principale_n5 ?? 'N/A'}
            </SubCategory>
        </div>
    {/if}

    <Category className="flex inline-flex items-center"
              indicatorColor={company?.nombre_etablissements ? 'green' : 'red'}>
        <BuildingSvg className="h-4 w-fit mr-1.5"></BuildingSvg>
        Nombre d'établissement{company?.nombre_etablissements > 1 ? 's' : ''}
        : {company?.nombre_etablissements ?? 'N/A'}
    </Category>
    <div class="ml-2.5 mb-0.5 flex flex-col space-y-4">
        <SubCategory className="flex inline-flex items-center"
                     indicatorColor={company?.nombre_etablissements > 0 ? 'green' : 'red'}>
            <BuildingCircleCheckSvg className="h-4 w-fit mr-1.5"></BuildingCircleCheckSvg>
            Établissement{company?.nombre_etablissements_ouverts > 1 ? 's' : ''} ouvert
            : {company?.nombre_etablissements_ouverts ?? 'N/A'}
        </SubCategory>

        <SubCategory className="flex inline-flex items-center"
                     indicatorColor={getEstablishmentClosed(company) > 0 ? 'red' : 'green'}>
            <BuildingCircleXMarkSvg className="h-4 w-fit mr-1.5"></BuildingCircleXMarkSvg>
            Établissement{getEstablishmentClosed(company) > 1 ? 's' : ''} fermé
            : {getEstablishmentClosed(company) ?? 'N/A'}
        </SubCategory>
    </div>

    <!--suppress JSCheckFunctionSignatures -->
    <Category className="flex inline-flex items-center" hasInfoIcon={true}
              indicatorColor={SalaryStaffRangeCodes.includes(company?.tranche_effectif_salarie) ? 'green' : 'red'}
              pId="sscr_1">
        <UsersSvg className="h-4 w-fit mr-1.5"></UsersSvg>
        Tranche d'effectif{company?.tranche_effectif_salarie > 1 ? 's' : ''} salarié
        : {company?.tranche_effectif_salarie ?? 'N/A'}
    </Category>
    <PopoverSalaryStaffRangeCode triggeredBy="#sscr_1"></PopoverSalaryStaffRangeCode>

    <!--suppress JSCheckFunctionSignatures -->
    <Category className="flex inline-flex items-center" hasInfoIcon={true}
              indicatorColor={CompanyCategoryCodes.includes(company?.categorie_entreprise) ? 'green' : 'red'}
              pId="ce_1">
        <TagSvg className="h-4 w-fit mr-1.5"></TagSvg>
        Catégorie d'entreprise : {company?.categorie_entreprise ?? 'N/A'}
    </Category>
    <PopoverCE triggeredBy="#ce_1"></PopoverCE>

    <!--suppress JSCheckFunctionSignatures -->
    <Category className="flex inline-flex items-center" hasInfoIcon={true}
              indicatorColor={isActiveCompany(company) ? 'green' : 'red'}
              pId="ce_1">
        {#if isActiveCompany(company)}
            <CircleCheckSvg className="h-4 w-fit mr-1.5 text-green-500"></CircleCheckSvg>
        {:else}
            <CircleXMarkSvg className="h-4 w-fit mr-1.5 text-red-500"></CircleXMarkSvg>
        {/if}
        État administratif : {company?.etat_administratif}
    </Category>

    <Badge class="self-start drop-shadow-md" color="gray">
        <ClockSvg className="h-3 mr-1.5"></ClockSvg>
        Date de création de l'entreprise: {getDateFormat(company.date_creation)}
    </Badge>

    <Badge class="self-start drop-shadow-md" color="gray">
        <ClockSvg className="h-3 mr-1.5"></ClockSvg>
        Dernière modification {getDateFormat(company.date_mise_a_jour)}
    </Badge>
</div>
