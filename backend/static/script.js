document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('checkbox');
    const html = document.documentElement;

    // -- THEME SWITCHER --
    // Function to set the theme
    const setTheme = (theme) => {
        if (theme === 'dark') {
            html.classList.add('dark');
            themeSwitcher.checked = true;
        } else {
            html.classList.remove('dark');
            themeSwitcher.checked = false;
        }
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme in local storage or user's OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Theme switcher event listener
    themeSwitcher.addEventListener('change', () => {
        const newTheme = themeSwitcher.checked ? 'dark' : 'light';
        setTheme(newTheme);
    });


    // -- HEADER SCROLL EFFECT --
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // -- ACTIVE NAV LINK HIGHLIGHTING --
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) { // 60 is header height
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // -- 3D TILT EFFECT --
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const height = card.clientHeight;
        const width = card.clientWidth;

        card.addEventListener('mousemove', (e) => {
            // Using offsetX/Y provides position relative to the element
            const { offsetX, offsetY } = e;
            const multiplier = 15; // Adjust for more/less tilt

            const xRotate = multiplier * ((offsetX - width / 2) / width);
            const yRotate = -multiplier * ((offsetY - height / 2) / height);

            card.style.transform = `perspective(1000px) rotateY(${xRotate}deg) rotateX(${yRotate}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    });
});
