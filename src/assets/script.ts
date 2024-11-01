export default function mainjs() {
    /*=============== SHOW SIDEBAR ===============*/
    const showSidebar = (toggleId: string, sidebarId: string, headerId: string, mainId: string) => {
        const toggle = document.getElementById(toggleId),
            sidebar = document.getElementById(sidebarId),
            header = document.getElementById(headerId),
            main = document.getElementById(mainId);

        if (toggle && sidebar && header && main) {
            toggle.addEventListener('click', () => {
                /* Show sidebar */
                sidebar.classList.toggle('show-sidebar');
                /* Add padding header */
                header.classList.toggle('left-pd');
                /* Add padding main */
                main.classList.toggle('left-pd');
            });
        }
    };

    showSidebar('header-toggle', 'sidebar', 'header', 'main');

    /*=============== MENU BUTTON ===============*/
    const menuBtn = document.querySelector<HTMLElement>(".menu_btn");
    const navLinks = document.querySelector<HTMLElement>(".links");
    const menuBtnIcon = document.querySelector<HTMLElement>(".menu_btn i");

    if (menuBtn && navLinks && menuBtnIcon) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            const isOpen = navLinks.classList.contains("open");
            menuBtnIcon.setAttribute("class", isOpen ? "fas fa-times" : "fas fa-bars");
        });

        navLinks.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtnIcon.setAttribute("class", "fas fa-bars");
        });
    }

    /*=============== LINK ACTIVE ===============*/
    const sidebarLink = document.querySelectorAll<HTMLAnchorElement>('.sidebar__list a');

    const linkColor = (event: Event) => {
        sidebarLink.forEach(l => l.classList.remove('active-link'));
        (event.currentTarget as HTMLAnchorElement).classList.add('active-link');
    };

    sidebarLink.forEach(l => l.addEventListener('click', linkColor));
}
