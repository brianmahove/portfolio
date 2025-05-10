// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile nav if open
                const mobileNav = document.querySelector('header nav ul');
                if (mobileNav.classList.contains('show')) {
                    mobileNav.classList.remove('show');
                    document.querySelector('.nav-toggle').innerHTML = '<i class="fas fa-bars"></i>';
                }

                // Scroll to element with offset for sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight - 20; // Added extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active class in nav (optional, based on scroll position)
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 2. Mobile Navigation Toggle (Hamburger Menu)
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Hamburger icon
    document.querySelector('header .container').appendChild(navToggle);

    navToggle.addEventListener('click', () => {
        const navList = document.querySelector('header nav ul');
        navList.classList.toggle('show');
        if (navList.classList.contains('show')) {
            navToggle.innerHTML = '<i class="fas fa-times"></i>'; // Close icon
        } else {
            navToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Hamburger icon
        }
    });

    // 3. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.portfolio-filters button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.dataset.filter; // e.g., 'all', 'coded', 'designed'

            portfolioItems.forEach(item => {
                const categories = item.dataset.category.split(' '); // Get all categories for an item

                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block'; // Show item
                    item.style.animation = 'fadeIn 0.5s ease-in-out'; // Re-animate on filter
                } else {
                    item.style.display = 'none'; // Hide item
                }
            });
        });
    });

    // Initialize with 'ALL' filter active
    document.querySelector('.portfolio-filters button[data-filter="all"]').click();


    // 4. Simple "Animate on Scroll" (Intersection Observer)
    const animateElements = document.querySelectorAll('.hero-section .name, .hero-section .title, .hero-section .right-half img, .social-icon, .it-berries-section h2, .it-berries-section p, .about-me-section h2, .about-me-section .section-description, .service-item, .skill-item, .portfolio-item, .contact-section h2, #contact-form');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Element visible by 20%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing once animated (optional)
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class to re-animate on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Add 'animated' class to elements to be animated
    animateElements.forEach(el => {
        if (el.classList.contains('name') || el.classList.contains('title') || el.classList.contains('right-half')) {
            // These are already handled by specific hero animations in CSS
        } else {
            el.classList.add('animated');
            el.classList.add('fade-in-up'); // Default animation
            observer.observe(el);
        }
    });

    // Special handling for individual social icons and hero elements that might be too fast
    document.querySelectorAll('.social-icon').forEach((icon, index) => {
        icon.style.animationDelay = `${0.2 * index}s`;
    });

    // Set initial active navigation link based on URL hash
    if (window.location.hash) {
        const initialLink = document.querySelector(`nav a[href="${window.location.hash}"]`);
        if (initialLink) {
            initialLink.classList.add('active');
            // Trigger scroll to make sure it's correct
            setTimeout(() => {
                initialLink.click();
            }, 100); // Small delay to ensure header is rendered
        }
    } else {
        // If no hash, set 'About me' or first link as active
        document.querySelector('nav a[href="#about"]').classList.add('active');
    }

    // Update active navigation link on scroll (advanced, optional)
    // This part requires more complex logic to detect which section is currently in view.
    // A simpler approach is to only set the active class on click.
    // For a more robust solution, consider a library like 'scrollspy' or implement more detailed IntersectionObserver logic.
});