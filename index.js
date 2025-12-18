document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    //MENU MOBILE + OVERLAY (BLUR)
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("menu");
    const overlay = document.getElementById("menuOverlay");

    const closeMenu = () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.classList.toggle("open");
        overlay.classList.toggle("active");
        document.body.classList.toggle("menu-open");

        hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Fecha menu ao clicar em link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Fecha menu ao clicar no fundo (blur)
    overlay.addEventListener("click", closeMenu);


    // =========================================
    //FILTRO DE PROJETOS
    const filterBtns = document.querySelectorAll(".filter-buttons .filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                if (filterValue === "all" || itemCategory.includes(filterValue)) {
                    item.style.display = "block";
                    item.style.opacity = "1";
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    document.querySelector('.filter-btn[data-filter="all"]').click();


    // =========================================
    //DARK MODE
    const themeToggle = document.getElementById('theme-toggle');

    const setIcon = (isLight) => {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            setIcon(isLight);
        });

        const storedTheme = localStorage.getItem('theme') === 'light';
        if (storedTheme) {
            document.body.classList.add('light-mode');
        }
        setIcon(storedTheme);
    }


    // =========================================
    // SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
        });
    });


    // =========================================
    // VOLTAR AO TOPO
    const backToTopButton = document.querySelector('.back-to-top');

    const toggleBackToTop = () => {
        if (!backToTopButton) return;
        backToTopButton.style.display = window.scrollY > 500 ? 'block' : 'none';
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
});
