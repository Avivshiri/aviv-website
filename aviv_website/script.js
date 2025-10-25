// DOM Elements
const body = document.body;
const btnTheme = document.querySelector('.fa-moon');
const btnHamburger = document.querySelector('.fa-bars');
const navList = document.querySelector('.nav__list');

// Theme Management
const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  if (btnTheme) btnTheme.classList.add(btnClass);
};

const getBodyTheme = localStorage.getItem('portfolio-theme');
const getBtnTheme = localStorage.getItem('portfolio-btn-theme');

if (getBodyTheme && getBtnTheme) {
  addThemeClass(getBodyTheme, getBtnTheme);
} else {
  addThemeClass('light', 'fa-moon');
}

const isDark = () => body.classList.contains('dark');

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove('light', 'dark');
  if (btnTheme) {
    btnTheme.classList.remove('fa-moon', 'fa-sun');
    addThemeClass(bodyClass, btnClass);
  }
  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
};

const toggleTheme = () => {
  isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');
};

if (btnTheme) {
  btnTheme.addEventListener('click', toggleTheme);
}

// Mobile Navigation
const displayList = () => {
  if (btnHamburger && navList) {
	if (btnHamburger.classList.contains('fa-bars')) {
      btnHamburger.classList.remove('fa-bars');
      btnHamburger.classList.add('fa-times');
      navList.classList.add('display-nav-list');
    } else {
      btnHamburger.classList.remove('fa-times');
      btnHamburger.classList.add('fa-bars');
      navList.classList.remove('display-nav-list');
    }
  }
};

if (btnHamburger) {
  btnHamburger.addEventListener('click', displayList);
}

// Typing Animation
class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = this.txt;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 300;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize Typing Animation
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const words = [
      'Sales Professional',
      'Enterprise Sales Manager',
      'Business Development Expert',
      'Channel Partner Specialist',
      'Revenue Growth Leader',
      'Cyber Security Enthusiast'
    ];
    new TypeWriter(typingElement, words, 2000);
  }
});

// Animated Counter
class AnimatedCounter {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseInt(target);
    this.duration = duration;
    this.current = 0;
    this.increment = this.target / (this.duration / 16);
  }

  start() {
    const timer = setInterval(() => {
      this.current += this.increment;
      if (this.current >= this.target) {
        this.current = this.target;
        clearInterval(timer);
      }
      this.element.textContent = Math.floor(this.current);
    }, 16);
  }
}

// Skill Progress Animation
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 300);
  });
};

// Project Filtering
const initProjectFilter = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  const filterProjects = (category) => {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 100);
      } else {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(button => button.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });
};

// Contact Form Handler
const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Update button to show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Show success message
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
};

// Notification System
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#48bb78' : '#667eea'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
};

// Scroll to Top Functionality
const initScrollToTop = () => {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;

  const toggleScrollButton = () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  };

  window.addEventListener('scroll', toggleScrollButton);
  
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Intersection Observer for Animations
const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Animate skill bars
        if (target.classList.contains('skills')) {
          animateSkillBars();
        }
        
        // Animate counters
        if (target.classList.contains('about-section')) {
          const counters = target.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const targetValue = counter.getAttribute('data-target');
            const animatedCounter = new AnimatedCounter(counter, targetValue);
            animatedCounter.start();
          });
        }
        
        // Add animation class to sections
        target.classList.add('animate-in');
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => observer.observe(section));
};

// Smooth Scrolling for Navigation Links
const initSmoothScrolling = () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navList && navList.classList.contains('display-nav-list')) {
          displayList();
        }
      }
    });
  });
};

// Active Navigation Highlighting
const initActiveNavigation = () => {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav__list a');

  const highlightNavigation = () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Check initial state
};

// Header Background on Scroll
const initHeaderScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
};

// Parallax Effect for Hero Section
const initParallax = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const handleParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = hero.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
      const speed = element.getAttribute('data-speed') || 1;
      const yPos = -(scrolled * speed * 0.1);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };

  window.addEventListener('scroll', handleParallax);
};

// Subtle Background Pattern (replaces particles)
const initSubtleBackground = () => {
  // Simple dot pattern background is already handled in CSS
  // This function is kept for potential future enhancements
};

// AOS (Animate On Scroll) Initialization
const initAOS = () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });
  }
};

// Advanced Loading Screen
const initLoadingScreen = () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (!loadingScreen) return;

  // Hide loading screen after everything is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.classList.add('loaded');
      }, 500);
    }, 1500);
  });
};

// Enhanced Skill Animation with Intersection Observer
const initAdvancedSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        
        // Check if already animated to prevent duplicate animations
        if (!bar.dataset.animated) {
          bar.dataset.animated = 'true';
          
          setTimeout(() => {
            bar.style.width = width + '%';
            
            // Add number counting animation
            const parentSkill = bar.closest('.skill-item');
            const percentage = parentSkill?.querySelector('.skill-percentage');
            if (percentage) {
              animateNumber(percentage, 0, parseInt(width), 1000);
            }
          }, 300);
        }
        
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));
};

// Number Animation Function
const animateNumber = (element, start, end, duration) => {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + '%';
  }, 16);
};

// Enhanced Project Filter with Animation
const initAdvancedProjectFilter = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  const filterProjects = (category) => {
    projectCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category');
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
	} else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });
};

// Parallax Text Effect
const initTextParallax = () => {
  const textElements = document.querySelectorAll('.section__title, .hero__greeting');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    textElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const speed = 0.5;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  });
};

// Advanced Form Validation and Submission
const initAdvancedContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const inputs = contactForm.querySelectorAll('input, textarea');
  
  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    if (!value) {
      showFieldError(field, 'This field is required');
      return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }
    
    return true;
  }

  function clearErrors(e) {
    clearFieldError(e.target);
  }

  function showFieldError(field, message) {
    field.style.borderColor = 'var(--clr-accent)';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      errorElement.style.cssText = 'color: var(--clr-accent); font-size: 0.8rem; margin-top: 0.25rem; display: block;';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  function clearFieldError(field) {
    field.style.borderColor = 'rgba(102, 126, 234, 0.2)';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField({ target: input })) {
        isValid = false;
      }
    });

    if (!isValid) {
      showAdvancedNotification('Please correct the errors above', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      showAdvancedNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
};

// Advanced Notification System
const showAdvancedNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `advanced-notification notification--${type}`;
  
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle';
  
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${icon}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    z-index: 10000;
    transform: translateX(400px);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    max-width: 350px;
    animation: slideIn 0.5s ease;
  `;
  
  function getNotificationColor(type) {
    switch(type) {
      case 'success': return '#48bb78';
      case 'error': return '#f56565';
      case 'warning': return '#ed8936';
      default: return '#667eea';
    }
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => removeNotification(notification));
  
  setTimeout(() => removeNotification(notification), 6000);
};

const removeNotification = (notification) => {
  notification.style.transform = 'translateX(400px)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
};

// Scroll Progress Bar
const initScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  let lastUpdateTime = 0;
  const updateScrollProgress = () => {
    const now = performance.now();
    // Throttle updates to 60fps
    if (now - lastUpdateTime < 16) return;
    lastUpdateTime = now;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
};

// Custom Cursor - COMPLETELY DISABLED
const initCustomCursor = () => {
  // Remove any existing cursor elements immediately
  const existingCursors = document.querySelectorAll('.custom-cursor, .custom-cursor-follower, [class*="cursor"], [id*="cursor"]');
  existingCursors.forEach(el => el.remove());
  
  // Disable all cursor functionality
  return;
};

// Aggressive cursor cleanup
const removeAllCursors = () => {
  const cursors = document.querySelectorAll('.custom-cursor, .custom-cursor-follower, [class*="cursor"], [id*="cursor"]');
  cursors.forEach(el => {
    el.remove();
    el.style.display = 'none';
    el.style.visibility = 'hidden';
    el.style.opacity = '0';
  });
};

// Run cleanup immediately and continuously
removeAllCursors();
setInterval(removeAllCursors, 50);
document.addEventListener('mousemove', removeAllCursors);

// Particle Background Effect
const initParticles = () => {
  // Disable particles on mobile for performance
  if (window.innerWidth < 768) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.3';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let resizeTimeout;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 200);
  }, { passive: true });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      const isDark = body.classList.contains('dark');
      ctx.fillStyle = isDark ? `rgba(160, 174, 192, ${this.opacity})` : `rgba(102, 126, 234, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const createParticles = () => {
    const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle());
    }
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections between nearby particles
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const isDark = body.classList.contains('dark');
          ctx.strokeStyle = isDark 
            ? `rgba(160, 174, 192, ${0.1 * (1 - distance / 100)})` 
            : `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    animationId = requestAnimationFrame(animateParticles);
  };

  createParticles();
  animateParticles();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
  });
};

// Enhanced Section Reveal Animations
const initEnhancedScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Stagger animation for children
        const children = entry.target.querySelectorAll('.project-card, .skill-item, .timeline__item, .testimonial__card, .cert__card, .highlight');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
};

// Magnetic Button Effect
const initMagneticButtons = () => {
  const buttons = document.querySelectorAll('.btn--primary, .btn--outline');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
};

// Tilt Effect on Cards
const initTiltEffect = () => {
  const cards = document.querySelectorAll('.project-card, .skills__category, .testimonial__card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
};

// Text Animation on Scroll
const initTextAnimations = () => {
  const animateText = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        entry.target.textContent = '';
        entry.target.style.opacity = '1';
        
        text.split('').forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
          entry.target.appendChild(span);
        });
        
        observer.unobserve(entry.target);
      }
    });
  };

  const textObserver = new IntersectionObserver(animateText, {
    threshold: 0.5
  });

  // Add CSS for character animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInChar {
      to {
        opacity: 1;
        transform: translateY(0);
      }
      from {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `;
  document.head.appendChild(style);

  // Observe section titles (optional - can be intensive)
  // const titles = document.querySelectorAll('.section__title');
  // titles.forEach(title => textObserver.observe(title));
};

// Initialize All Functions
document.addEventListener('DOMContentLoaded', () => {
  // Aggressive cursor cleanup
  removeAllCursors();
  setInterval(removeAllCursors, 100);
  document.addEventListener('mousemove', removeAllCursors);
  
  initLoadingScreen();
  initSubtleBackground();
  initAOS();
  initAdvancedProjectFilter();
  initAdvancedContactForm();
  initScrollToTop();
  initScrollAnimations();
  initAdvancedSkillBars();
  initSmoothScrolling();
  initActiveNavigation();
  initHeaderScroll();
  
  // New enhancements
  initScrollProgress();
  initCustomCursor();
  initParticles();
  initEnhancedScrollAnimations();
  initMagneticButtons();
  initTiltEffect();
  initTextAnimations();

  // Add loading complete class to body
  setTimeout(() => {
    body.classList.add('loaded');
  }, 1500);
});

// Loading Animation
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
});

// Add some additional CSS for active navigation via JavaScript
const style = document.createElement('style');
style.textContent = `
  .nav__list a.active {
    color: var(--clr-primary) !important;
  }
  
  .nav__list a.active::before {
    width: 100% !important;
  }
  
  .notification {
    animation: slideInRight 0.3s ease;
  }
  
  .section.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .loaded .hero__greeting,
  .loaded .hero__typing-container,
  .loaded .hero__desc,
  .loaded .hero__cta,
  .loaded .hero__social,
  .loaded .hero__visual {
    opacity: 1;
  }
`;
document.head.appendChild(style);
