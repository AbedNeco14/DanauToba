document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.open-contact').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const topic = btn.dataset.topic || '';
      const keperluan = btn.dataset.keperluan || 'wisata';

      const modal = document.querySelector('.contact-modal');
      if (!modal) {
        const url = `contact.html?topic=${encodeURIComponent(topic)}&keperluan=${encodeURIComponent(keperluan)}`;
        window.location.href = url;
        return;
      }

      const form = modal.querySelector('.contact-form');
      if (form) {
        const select = form.querySelector('select[name="keperluan"]');
        const pesan = form.querySelector('textarea[name="pesan"]');
        if (select) select.value = keperluan;
        if (pesan) pesan.value = `Halo, saya ingin informasi lebih lengkap tentang: ${topic}\n\nMohon bantuannya.`;
      }

      const note = form && form.querySelector('.prefill-note');
      if (!note && form && topic) {
        const n = document.createElement('div');
        n.className = 'prefill-note';
        n.style.margin = '6px 0 12px';
        n.style.fontSize = '0.95rem';
        n.style.color = '#083344';
        n.style.background = 'rgba(255,255,255,0.82)';
        n.style.padding = '8px 12px';
        n.style.borderRadius = '8px';
        n.innerText = `Form telah terisi otomatis dengan topik: ${topic}`;
        const h2 = form.querySelector('h2');
        if (h2) h2.insertAdjacentElement('afterend', n);
      }

      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      setTimeout(function () {
        const focusEl = form && (form.querySelector('textarea[name="pesan"]') || form.querySelector('input[name="nama"]'));
        if (focusEl) focusEl.focus();
      }, 200);

      form && form.addEventListener('contact:sent', function () {
        closeModal(modal);
      }, { once: true });
    });
  });

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.contact-modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.classList.contains('contact-modal-backdrop') || e.target.classList.contains('contact-modal-close')) {
        closeModal(modal);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal(modal);
      }
    });
  });
});
