/* ============ SLIDER CONTINU CROSSFADE (partagé) ============ */
(function () {
  const imgs = document.querySelectorAll('.img-slider-track img');
  const segs = document.querySelectorAll('.img-slider-seg');
  const bar = document.getElementById('imgSliderBar');
  const handle = document.getElementById('imgSliderHandle');
  if (!imgs.length || !bar || !handle) return;

  let dragging = false;
  let currentPct = 0;

  function applyPct(pct) {
    currentPct = Math.min(Math.max(pct, 0), 1);
    const total = imgs.length - 1;
    const pos = currentPct * total;
    const i = Math.floor(pos);
    const frac = pos - i;

    imgs.forEach(img => {
      img.style.opacity = 0;
      img.style.zIndex = 1;
    });

    imgs[i].style.opacity = 1;
    imgs[i].style.zIndex = 2;

    if (i < total) {
      imgs[i + 1].style.zIndex = 3;
      imgs[i + 1].style.opacity = frac;
    }

    handle.style.left = (currentPct * 100) + '%';
    const activeIdx = Math.round(currentPct * total);
    segs.forEach((s, idx) => s.classList.toggle('active', idx === activeIdx));
  }

  function dragTo(x) {
    const rect = bar.getBoundingClientRect();
    applyPct((x - rect.left) / rect.width);
  }

  handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
  window.addEventListener('mousemove', e => { if (dragging) dragTo(e.clientX); });
  window.addEventListener('mouseup', () => dragging = false);
  handle.addEventListener('touchstart', () => dragging = true, { passive: true });
  window.addEventListener('touchmove', e => { if (dragging) dragTo(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend', () => dragging = false);

  segs.forEach((seg, idx) => {
    seg.addEventListener('click', () => applyPct(idx / (imgs.length - 1)));
  });

  applyPct(0);
})();
