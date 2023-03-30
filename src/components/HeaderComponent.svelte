<script>
    import {Chevron, DarkMode, MegaMenu, Navbar, NavBrand, NavHamburger, NavLi, NavUl} from "flowbite-svelte";

    let menu = [
        {name: 'NAF/NAP', href: '/utils/naf'},
        {name: 'NAFA', href: '/utils/nafa'},
    ];
</script>

<section class="sticky top-0 z-10">
    <article>
        <Navbar let:hidden let:toggle shadow>
            <NavBrand href="https://nustate.eu">
                <img alt="NuState logo" class="mr-3 h-6 sm:h-9 rounded-lg" src="/icons/NuState.webp"/>
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white drop-shadow-md">NuState</span>
            </NavBrand>
            <NavHamburger on:click={toggle}/>
            <NavUl {hidden}>
                <NavLi class="transition-all duration-300 ease-in-out w-fit drop-shadow-md" href="/">Accueil</NavLi>
                <NavLi class="transition-all duration-300 ease-in-out w-fit drop-shadow-md" href="/search">Rechercher
                </NavLi>
                <NavLi class="transition-all duration-300 ease-in-out cursor-pointer w-fit drop-shadow-md">
                    <Chevron aligned>Utilitaires</Chevron>
                </NavLi>
                <MegaMenu class="rounded-lg w-fit" items={menu} let:item shadow>
                    <a class="hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-300 ease-in-out drop-shadow-md w-fit mx-1"
                       href={item.href}>{item.name}</a>
                </MegaMenu>
                <!--NavLi href="/services">Services</NavLi-->
                <!--NavLi href="/services">Products</NavLi-->
                <!--NavLi href="/services">Contact</NavLi-->
                <NavLi class="w-fit !p-0">
                    <DarkMode class="md:!p-0 transition-all duration-300 ease-in-out drop-shadow-md"></DarkMode>
                </NavLi>
            </NavUl>
        </Navbar>
    </article>
</section>
