/* ============ TRANSITION PAGES ============ */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

/* ============ SCRUB RAIL ============ */
const scrubHead = document.getElementById('scrubHead');
function updateScrub() {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
  scrubHead.style.width = (pct * 100) + '%';
}
document.addEventListener('scroll', updateScrub, { passive: true });
updateScrub();

/* ============ NAV ============ */
const nav = document.getElementById('mainNav');
const hero = document.getElementById('top');
function updateNav() {
  if (hero) nav.classList.toggle('visible', hero.getBoundingClientRect().bottom <= 0);
}
document.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ============ LIGHTBOX ============ */
const lightbox = document.getElementById('lightbox');
const lightboxIframe = document.getElementById('lightboxIframe');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox) {
  document.querySelectorAll('.proj[data-type="video"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      lightboxIframe.src = el.dataset.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxIframe.src = '';
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}