/* ============ HERO VIDEO (anti-download) ============ */
(function () {
  const v = document.getElementById('heroVideo');
  if (!v) return;
  fetch('assets/hero.mp4')
    .then(r => r.blob())
    .then(blob => {
      v.src = URL.createObjectURL(blob);
    });
})();

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

/* ============ LIGHTBOX IMAGE ============ */
const imgLightbox = document.createElement('div');
imgLightbox.className = 'img-lightbox';
imgLightbox.innerHTML = '<button class="img-lightbox-close">✕</button><img src="" alt="">';
document.body.appendChild(imgLightbox);

const imgLightboxImg = imgLightbox.querySelector('img');
let currentGroup = [];
let currentImgIndex = -1;

function openImgLightbox(group, index) {
  currentGroup = group;
  currentImgIndex = index;
  imgLightboxImg.src = group[index].src;
  imgLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeImgLightbox() {
  imgLightbox.classList.remove('active');
  imgLightboxImg.src = '';
  document.body.style.overflow = '';
  currentGroup = [];
  currentImgIndex = -1;
}

function showImg(index) {
  if (currentGroup.length === 0) return;
  if (index < 0) index = currentGroup.length - 1;
  if (index >= currentGroup.length) index = 0;
  currentImgIndex = index;
  imgLightboxImg.src = currentGroup[index].src;
}

// Groupe galerie
const galleryImgs = Array.from(document.querySelectorAll('.proj-gallery img'));
galleryImgs.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openImgLightbox(galleryImgs, index));
});

// Groupes sliders (chaque slider est indépendant)
document.querySelectorAll('.img-slider-track').forEach(track => {
  const sliderImgs = Array.from(track.querySelectorAll('img'));
  sliderImgs.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openImgLightbox(sliderImgs, index));
  });
});

imgLightbox.querySelector('.img-lightbox-close').addEventListener('click', closeImgLightbox);
imgLightbox.addEventListener('click', e => { if (e.target === imgLightbox) closeImgLightbox(); });

document.addEventListener('keydown', e => {
  if (!imgLightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeImgLightbox();
  if (e.key === 'ArrowRight') showImg(currentImgIndex + 1);
  if (e.key === 'ArrowLeft') showImg(currentImgIndex - 1);
});

/* ============ REVEAL AU SCROLL ============ */
const revealEls = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px' });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});