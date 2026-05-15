// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav-active');
    }
  });
});

// ===== SKILL BAR ANIMATION =====
const bars = document.querySelectorAll('.bar');

function animateBars(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 200);
      observer.unobserve(bar);
    }
  });
}

const barObserver = new IntersectionObserver(animateBars, {
  threshold: 0.4
});

bars.forEach(bar => barObserver.observe(bar));

// ===== SCROLL FADE-IN ANIMATION =====
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .about-container, .contact-container, .stat');

fadeElements.forEach(el => {
  el.classList.add('fade-in');
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== SEND MESSAGE BUTTON =====
const sendBtn = document.querySelector('.send-btn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.querySelector('.contact-input[type="text"]') ||
                 document.querySelector('.contact-input:first-of-type');
    const email = document.querySelector('.contact-input[type="email"]');
    const message = document.querySelector('.contact-textarea');

    if (name && email && message) {
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Mohon lengkapi semua field!');
        return;
      }
    }

    sendBtn.textContent = 'Terkirim! ✓';
    sendBtn.style.background = '#4caf50';
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.textContent = 'Send Messages';
      sendBtn.style.background = '';
      sendBtn.disabled = false;
      document.querySelectorAll('.contact-input').forEach(i => i.value = '');
    }, 3000);
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PROJECT CARD HOVER RIPPLE =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });
});

// ===== TYPING EFFECT ON HERO NAME =====
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const text = heroName.textContent;
  heroName.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    heroName.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typeInterval);
  }, 80);
}