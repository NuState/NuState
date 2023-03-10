<script>
    import {Footer, FooterCopyright, FooterLink, FooterLinkGroup, Indicator} from "flowbite-svelte";
</script>

<section class="mx-auto w-3/4 lg:w-1/2 drop-shadow-md">
    <article class="my-2 w-full">
        <Footer class="!bg-transparent text-center">
            <FooterCopyright by="NuState" href="https://github.com/NuState/NuStateAPI"
                             year={new Date().getFullYear()}/>
            <FooterLinkGroup
                    ulClass="flex flex-wrap justify-center items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <FooterLink href="https://github.com/NuState/NuStateAPI">Github</FooterLink>
                <FooterLink href="/"><span class="flex inline-flex">Status<Indicator color="red" size="xs"/></span>
                </FooterLink>
                <FooterLink href="/"><span class="flex inline-flex">API<Indicator color="red" size="xs"/></span>
                </FooterLink>
            </FooterLinkGroup>
        </Footer>
    </article>
</section>
