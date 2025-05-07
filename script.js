document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations and interactions
  initializeNavbar();
  initializeTypeEffect();
  initializeSlider();
  initializeSkillBars();
  initializeBackToTop();
  updateYear();
});

// Navbar handling
function initializeNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const mobileMenuBtn = document.querySelector('.mobile-menu-button');
  const navLinksContainer = document.querySelector('.nav-links');
  
  // Handle scroll events to change navbar style
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Highlight active section in navbar
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
  
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', function() {
    navLinksContainer.classList.toggle('active');
    this.classList.toggle('active');
  });
}

// Typing effect
function initializeTypeEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;
  
  const phrases = [
    'Build things for the web.',
    'Create web applications.',
    'Design user interfaces.',
    'Develop mobile apps.'
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      // Deleting text
      typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
    } else {
      // Typing text
      typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    
    // Check if word is complete
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next word
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  // Start the typing effect
  setTimeout(typeEffect, 1000);
}

// Projects Slider
function initializeSlider() {
  const track = document.querySelector('.projects-track');
  const slides = document.querySelectorAll('.project-card');
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (!track || slides.length === 0) return;
  
  let slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft) * 2;
  let slidesToShow = getSlidesToShow();
  let currentPosition = 0;
  let maxPosition = slides.length - slidesToShow;
  
  // Responsive handling
  function getSlidesToShow() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 992) {
      return 2;
    } else {
      return 3;
    }
  }
  
  // Update slider on resize
  window.addEventListener('resize', function() {
    slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft) * 2;
    slidesToShow = getSlidesToShow();
    maxPosition = slides.length - slidesToShow;
    
    // Ensure current position is valid
    if (currentPosition > maxPosition) {
      currentPosition = maxPosition;
    }
    
    updateSliderPosition();
  });
  
  // Move slider to current position
  function updateSliderPosition() {
    track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
    
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentPosition]) {
      dots[currentPosition].classList.add('active');
    }
    
    // Disable/enable buttons
    if (currentPosition === 0) {
      prevButton.style.opacity = '0.5';
      prevButton.style.pointerEvents = 'none';
    } else {
      prevButton.style.opacity = '1';
      prevButton.style.pointerEvents = 'all';
    }
    
    if (currentPosition >= maxPosition) {
      nextButton.style.opacity = '0.5';
      nextButton.style.pointerEvents = 'none';
    } else {
      nextButton.style.opacity = '1';
      nextButton.style.pointerEvents = 'all';
    }
  }
  
  // Next button click
  nextButton.addEventListener('click', function() {
    if (currentPosition < maxPosition) {
      currentPosition++;
      updateSliderPosition();
    }
  });
  
  // Previous button click
  prevButton.addEventListener('click', function() {
    if (currentPosition > 0) {
      currentPosition--;
      updateSliderPosition();
    }
  });
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      if (index <= maxPosition) {
        currentPosition = index;
        updateSliderPosition();
      }
    });
  });
  
  // Initialize slider
  updateSliderPosition();
  
  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      if (currentPosition < maxPosition) {
        currentPosition++;
        updateSliderPosition();
      }
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      if (currentPosition > 0) {
        currentPosition--;
        updateSliderPosition();
      }
    }
  }
}

// Animate skill bars on scroll
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const position = bar.getBoundingClientRect();
      
      // Check if element is in viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        const level = bar.getAttribute('data-level');
        bar.style.width = level;
      }
    });
  }
  
  // Initial check
  animateSkillBars();
  
  // Check on scroll
  window.addEventListener('scroll', animateSkillBars);
}

// Back to top button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Update copyright year
function updateYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}