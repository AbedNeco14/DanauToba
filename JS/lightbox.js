document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Tutup">&times;</button>
      <button class="lightbox-prev" aria-label="Sebelumnya">&#10094;</button>
      <button class="lightbox-next" aria-label="Berikutnya">&#10095;</button>
      <img src="" alt="" class="lightbox-img" tabindex="0">
      <div class="lightbox-caption" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-img');
  const capEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || '';
    capEl.innerText = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // focus management
    setTimeout(()=> closeBtn.focus(),50);
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    imgEl.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  // navigation controls
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') return closeLightbox();
    if (e.key === 'ArrowLeft') return showPrev();
    if (e.key === 'ArrowRight') return showNext();
  });

  // focus trap (simple)
  overlay.addEventListener('keydown', function(e){
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length-1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Attach to any image inside .detail-gallery
  // Collect gallery images across gallery selectors
  const selectors = ['.detail-gallery img', '.galeri-img', '.galeri-item img'];
  const thumbs = Array.from(document.querySelectorAll(selectors.join(',')));
  // Prepare an ordered list for navigation
  const gallery = thumbs.map(t => ({src: t.dataset.large || t.src, alt: t.alt || ''}));

  let currentIndex = -1;

  function showAt(index){
    if (index < 0 || index >= gallery.length) return;
    currentIndex = index;
    const item = gallery[index];
    openLightbox(item.src, item.alt);
  }

  function showPrev(){
    if (currentIndex <= 0) showAt(gallery.length - 1);
    else showAt(currentIndex - 1);
  }

  function showNext(){
    if (currentIndex >= gallery.length - 1) showAt(0);
    else showAt(currentIndex + 1);
  }

  thumbs.forEach((thumb, idx) => {
    thumb.style.cursor = 'zoom-in';
    thumb.setAttribute('tabindex','0');
    thumb.addEventListener('click', function () { showAt(idx); });
    thumb.addEventListener('keydown', function(e){ if (e.key === 'Enter') showAt(idx); });
  });
});

