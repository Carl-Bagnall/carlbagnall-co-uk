/* ── Shared behaviour for all case-study pages ─────────────── */

// Custom cursor — mirrors the home page
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// Scroll-triggered fade-in for article body, figures, CTAs and prev/next
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.case-article > p, .case-article > h2, .case-article > h3, .case-figure, .case-cta-row, .case-nav-row a, .coming-soon'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Auto-update copyright year so the footer never goes stale
document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ── Image lightbox ──────────────────────────────────────────
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Image viewer');
lightbox.innerHTML =
  '<button class="lightbox-close" aria-label="Close image viewer">Close ×</button>' +
  '<img alt="" />';
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('img');
const lbClose = lightbox.querySelector('.lightbox-close');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (cursor) cursor.classList.remove('hover');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 300);
}

document.querySelectorAll('.case-figure img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
  if (cursor) {
    img.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    img.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  }
});

lbClose.addEventListener('click', closeLightbox);
if (cursor) {
  lbClose.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  lbClose.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
}
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});
