<script>
    import {Footer, FooterCopyright, FooterLink, FooterLinkGroup, Indicator} from "flowbite-svelte";
    import {RssSvg} from "$components/public-api";
</script>

<section class="mx-auto w-3/4 lg:w-1/2 drop-shadow-md">
    <article class="my-2 w-full">
        <Footer class="!bg-transparent text-center">
            <FooterCopyright by="NuState" href="https://github.com/NuState/NuStateAPI"
                             year={new Date().getFullYear()}/>
            <FooterLinkGroup
                    ulClass="flex flex-wrap justify-center items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <FooterLink href="https://github.com/NuState/NuStateAPI">Github</FooterLink>
                <FooterLink href="/atom1">
                    <p class="flex inline-flex">Feed
                        <RssSvg className="h-2 ml-0.5"></RssSvg>
                    </p>
                </FooterLink>
                <FooterLink href="/">
                    <p class="flex inline-flex">Status
                        <Indicator color="red" size="xs"/>
                    </p>
                </FooterLink>
                <FooterLink href="/">
                    <p class="flex inline-flex">API
                        <Indicator color="red" size="xs"/>
                    </p>
                </FooterLink>
            </FooterLinkGroup>
        </Footer>
    </article>
</section>
