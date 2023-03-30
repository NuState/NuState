<script>
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";
    import {isActiveEstablishment} from "french-company-types";
    import {
        CircleCheckSvg,
        CircleXMarkSvg,
        PopoverAPE,
        PopoverEAEstablishment,
        PopoverSIRET,
        SubCategory
    } from "$components/public-api";
    import {formatSiret} from "$libs/public-api";

    export let establishments
</script>

{#if establishments}
    <Table shadow>
        <TableHead>
            <TableHeadCell>État administratif</TableHeadCell>
            <TableHeadCell>Nom commercial</TableHeadCell>
            <TableHeadCell>SIRET</TableHeadCell>
            <TableHeadCell>APE</TableHeadCell>
            <TableHeadCell>Siège?</TableHeadCell>
            <TableHeadCell>Adresse</TableHeadCell>
            <TableHeadCell>Commune</TableHeadCell>
            <TableHeadCell>GeoID</TableHeadCell>
            <TableHeadCell>Latitude</TableHeadCell>
            <TableHeadCell>Longitude</TableHeadCell>
            <TableHeadCell>Enseignes</TableHeadCell>
            <TableHeadCell>Fitness</TableHeadCell>
            <TableHeadCell>IDCC</TableHeadCell>
            <TableHeadCell>RGE</TableHeadCell>
            <TableHeadCell>UAI</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each establishments as establishment, i}
                <TableBodyRow>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center" hasInfoIcon={true}
                                     indicatorColor={isActiveEstablishment(establishment) ? 'green': 'red'}
                                     pId={`ea_establishment_${i}`}>
                            {#if isActiveEstablishment(establishment)}
                                <CircleCheckSvg className="h-4 mr-1.5 text-green-500"></CircleCheckSvg>
                            {:else}
                                <CircleXMarkSvg className="h-4 mr-1.5 text-red-500"></CircleXMarkSvg>
                            {/if}
                            <p>{establishment?.etat_administratif ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.nom_commercial ? 'green': 'red'}>
                            <p>{establishment?.nom_commercial ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center" hasInfoIcon={true}
                                     indicatorColor={establishment?.siret ? 'green': 'red'}
                                     pId={`siret_establishment_${i}`}>
                            <p>{formatSiret(establishment?.siret) ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center" hasInfoIcon={true}
                                     indicatorColor={establishment?.activite_principale ? 'green': 'red'}
                                     pId={`ape_establishment_${i}`}>
                            <p>{establishment?.activite_principale ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={typeof establishment?.est_siege === "boolean" ? 'green': 'red'}>
                            <p>
                                {typeof establishment?.est_siege === "boolean" ? establishment?.est_siege ? 'Oui' : 'Non' : 'N/A'}
                            </p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.adresse ? 'green': 'red'}>
                            <p>{establishment?.adresse ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.commune ? 'green': 'red'}>
                            <p>{establishment?.commune ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.geo_id ? 'green': 'red'}>
                            <p>{establishment?.geo_id?.replaceAll('_', ',') ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.latitude ? 'green': 'red'}>
                            <p>{establishment?.latitude ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.longitude ? 'green': 'red'}>
                            <p>{establishment?.longitude ?? 'N/A'}</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.liste_enseignes ? 'green': 'red'}>
                            <p>[{establishment?.liste_enseignes ?? 'N/A'}]</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.liste_finess ? 'green': 'red'}>
                            <p>[{establishment?.liste_finess ?? 'N/A'}]</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.liste_idcc ? 'green': 'red'}>
                            <p>[{establishment?.liste_idcc ?? 'N/A'}]</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.liste_rge ? 'green': 'red'}>
                            <p>[{establishment?.liste_rge ?? 'N/A'}]</p>
                        </SubCategory>
                    </TableBodyCell>
                    <TableBodyCell>
                        <SubCategory className="flex inline-flex items-center"
                                     indicatorColor={establishment?.liste_uai ? 'green': 'red'}>
                            <p>[{establishment?.liste_uai ?? 'N/A'}]</p>
                        </SubCategory>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    {#each establishments as _, i}
        <PopoverEAEstablishment triggeredBy="{`#ea_establishment_${i}`}"></PopoverEAEstablishment>
        <PopoverSIRET placement="top" triggeredBy="{`#siret_establishment_${i}`}"></PopoverSIRET>
        <PopoverAPE placement="top" triggeredBy="{`#ape_establishment_${i}`}"></PopoverAPE>
    {/each}
{/if}
