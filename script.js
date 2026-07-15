// Typing effect
const roles = [
    "DevOps Engineer",
    "Cloud Architect",
    "Linux Administrator",
    "CI/CD Specialist",
    "Kubernetes Engineer",
    "Automation Expert"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
}

type();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Fade in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Animate skill bars when visible
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => skillObserver.observe(bar));

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Display deployed date
document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('deploy-date');
    if (dateEl) {
        dateEl.textContent = new Date().toUTCString();
    }
});
