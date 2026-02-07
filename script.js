// Elements Selection
const navLinks = document.querySelectorAll('nav ul li a');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');
const header = document.querySelector('header');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Sticky Header
function updateHeaderStyle() {
    const isDarkMode = document.documentElement.hasAttribute('data-theme');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        if (isDarkMode) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    } else {
        header.style.padding = '20px 0';
        if (isDarkMode) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }
}

window.addEventListener('scroll', updateHeaderStyle);

// Smooth Scrolling for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if it's open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const offsetTop = targetSection.offsetTop - 80;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Portfolio Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillsSection = document.querySelector('.skills');
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPos < screenPosition) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('style').match(/width: (.+)%/)[1];
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });
        window.removeEventListener('scroll', animateSkillBars);
    }
}

window.addEventListener('scroll', animateSkillBars);

// Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Here you would typically send the form data to a server
    // For now, just show an alert
    alert(
      "Thank you for your message! In a real website, this would be sent to the server."
    );

    // Reset form
    contactForm.reset();
  });
}
// Back to Top Button
window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Animate elements on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.about-image, .about-text, .skill-category, .project-card, .timeline-item, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
});

// Typing animation for hero text
function typeWriter(textElement, text, i, fnCallback) {
    if (i < text.length) {
        textElement.innerHTML = text.substring(0, i+1) + '<span class="cursor"></span>';
        
        setTimeout(function() {
            typeWriter(textElement, text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

// Dark Mode Functionality
function initTheme() {
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Toggle theme function
function toggleTheme() {
    if (document.documentElement.hasAttribute('data-theme')) {
        // Switch to light mode
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        // Switch to dark mode
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Update header style when theme changes
    updateHeaderStyle();
}

// Add event listener for theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Update header style initially
    updateHeaderStyle();
    
    const textElement = document.querySelector('.typing-text');
    if (textElement) {
        const text = textElement.textContent;
        textElement.innerHTML = '';
        typeWriter(textElement, text, 0, function() {
            textElement.classList.add('done');
        });
    }
    
    // Set initial styles for project cards
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.transition = 'all 0.3s ease';
    });
});
// Animation Control Functionality
document.addEventListener('DOMContentLoaded', function() {
    const orbitControl = document.getElementById('orbitControl');
    const circle = document.querySelector('.circle');
    let isPlaying = true;
    
    orbitControl.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            circle.classList.remove('paused');
            orbitControl.innerHTML = '<i class="fas fa-pause"></i>';
            orbitControl.setAttribute('aria-label', 'Pause animation');
        } else {
            circle.classList.add('paused');
            orbitControl.innerHTML = '<i class="fas fa-play"></i>';
            orbitControl.setAttribute('aria-label', 'Play animation');
        }
    });
    
    // Add slight delay to each tool's animation for staggered effect
    document.querySelectorAll('.orbiting-tool').forEach((tool, index) => {
        tool.style.animationDelay = `${index * -2.5}s`;
    });
});
