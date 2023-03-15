<script>
    import {Footer, FooterBrand, FooterCopyright, FooterLink, FooterLinkGroup, Indicator, P} from "flowbite-svelte";
    import {RssSvg} from "$components/public-api";
</script>

<section class="mx-auto flex px-6">
    <article class="my-2 mx-auto">
        <Footer class="!bg-transparent drop-shadow-md shadow shadow-md rounded-lg" footerType="socialmedia" shadow>
            <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0 mr-3 drop-shadow-md">
                    <FooterBrand
                            alt="NuState icon"
                            href="https://flowbite.com"
                            imgClass="mr-3 h-10 rounded-lg"
                            name="NuState"
                            src="/icons/NuState.webp"/>
                    <P class="max-w-xs my-2">
                        Une application innovante qui a été conçue pour faciliter la recherche et la vérification des
                        entreprises.
                    </P>
                </div>
                <div class="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3 drop-shadow-md">
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Ressources</h2>
                        <FooterLinkGroup>
                            <FooterLink href="/atom1" liClass="mb-2">
                                <a class="sr-only" href="/rss"></a>
                                <a class="sr-only" href="/atom1"></a>
                                <a class="sr-only" href="/json1"></a>
                                <p class="flex inline-flex">
                                    Feed
                                    <RssSvg className="h-2 ml-0.5"></RssSvg>
                                </p>
                            </FooterLink>
                            <FooterLink href="/" liClass="mb-2">
                                <p class="flex inline-flex">
                                    Status
                                    <Indicator color="red" size="xs"/>
                                </p>
                            </FooterLink>
                            <FooterLink href="/" liClass="mb-2">
                                <p class="flex inline-flex">
                                    API
                                    <Indicator color="red" size="xs"/>
                                </p>
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Suivez-nous</h2>
                        <FooterLinkGroup>
                            <FooterLink href="https://github.com/NuState" liClass="mb-2">GitHub</FooterLink>
                            <FooterLink href="https://discord.gg/TYawnWfhRg" liClass="mb-2">Discord</FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Juridique</h2>
                        <FooterLinkGroup>
                            <FooterLink href="/legals" liClass="mb-2">Politique de Confidentialité</FooterLink>
                            <FooterLink href="/legals" liClass="mb-2">Termes et Conditions</FooterLink>
                        </FooterLinkGroup>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
            <FooterCopyright by="NuState" class="drop-shadow-md" href="https://nustate.eu"/>
        </Footer>
    </article>
</section>
