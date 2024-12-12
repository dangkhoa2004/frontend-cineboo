export default function mainjs() {
    /*=============== SHOW SIDEBAR ===============*/
    const showSidebar = (toggleId: string, sidebarId: string, headerId: string, mainId: string) => {
        const toggle = document.getElementById(toggleId),
            sidebar = document.getElementById(sidebarId),
            header = document.getElementById(headerId),
            main = document.getElementById(mainId);

        if (toggle && sidebar && header && main) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('show-sidebar');
                header.classList.toggle('left-pd');
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
            const isOpen = navLinks.classList.toggle("open");
            menuBtnIcon.className = isOpen ? "fas fa-times" : "fas fa-bars";  // Directly toggle class
        });

        navLinks.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtnIcon.className = "fas fa-bars"; // Reset icon on link click
        });
    }

    /*=============== LINK ACTIVE ===============*/
    const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>('.sidebar__list a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            sidebarLinks.forEach(l => l.classList.remove('active-link'));
            (event.currentTarget as HTMLAnchorElement).classList.add('active-link');
        });
    });
}
