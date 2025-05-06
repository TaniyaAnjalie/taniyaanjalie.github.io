// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.padding = '0.5rem 0';
    navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = 'none';
  }
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    
    // Toggle hamburger/close icon
    const spans = mobileMenuButton.querySelectorAll('span');
    if (navLinks.classList.contains('show')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('show') && 
      !navLinks.contains(e.target) && 
      !mobileMenuButton.contains(e.target)) {
    navLinks.classList.remove('show');
    
    // Reset hamburger icon
    const spans = mobileMenuButton.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// Skills progress bars animation
const progressBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('#skills');

const animateProgressBars = () => {
  progressBars.forEach((bar) => {
    const progress = bar.parentElement.previousElementSibling.querySelector('.skill-level').textContent;
    bar.style.width = progress;
  });
};

// Animate skills when they come into view
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(animateProgressBars, 300);
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Back to top button
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Typing animation for hero section
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const phrases = [
    'I create smart digital solutions.',
    'I develop Android applications.',
    'I maintain and design websites.',
    'I explore creative IT solutions.'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of typing
      isDeleting = true;
      typeSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
  }
  
  setTimeout(typeEffect, 1000);
}