document.addEventListener('DOMContentLoaded', function () {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzznavkl';

  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;

    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  function setInlineAlert(form, message, type) {
    try {
      const alert = form.querySelector('.contact-alert');
      if (!alert) return;
      alert.classList.remove('success', 'error');
      alert.classList.add(type === 'success' ? 'success' : 'error');
      alert.innerHTML = message;
      alert.style.display = 'block';
      // pesan sukses hilang otomatis, tapi error tetap muncul sampai user action
      if (type === 'success') {
        setTimeout(() => { alert.style.display = 'none'; }, 6000);
      }
    } catch (e) { /* abaikan */ }
  }

  const forms = Array.from(document.querySelectorAll('.contact-form')) || [];

  const params = new URLSearchParams(window.location.search);
  const topic = params.get('topic');
  const qKeperluan = params.get('keperluan');

  forms.forEach((form) => {
    const isModal = !!form.closest('.contact-modal');
    if (topic && !isModal) {
      const pesanEl = form.querySelector('[name="pesan"]');
      const keperluanEl = form.querySelector('[name="keperluan"]');
      if (keperluanEl) {
        if (qKeperluan && Array.from(keperluanEl.options).some((o) => o.value === qKeperluan)) {
          keperluanEl.value = qKeperluan;
          keperluanEl.parentElement.classList.add('focused');
        } else {
          keperluanEl.value = 'wisata';
          keperluanEl.parentElement.classList.add('focused');
        }
      }
      if (pesanEl) {
        pesanEl.value = `Halo, saya ingin informasi lebih lengkap tentang: ${topic}\n\nMohon bantuannya.`;
        pesanEl.parentElement.classList.add('focused');
        // tambahin catatan prefill kecil
        const note = document.createElement('div');
        note.className = 'prefill-note';
        note.style.margin = '6px 0 12px';
        note.style.fontSize = '0.95rem';
        note.style.color = '#083344';
        note.style.background = 'rgba(255,255,255,0.82)';
        note.style.padding = '8px 12px';
        note.style.borderRadius = '8px';
        note.innerText = `Form telah terisi otomatis dengan topik: ${topic}`;
        const h2 = form.querySelector('h2');
        if (h2 && !h2.nextElementSibling?.classList?.contains('prefill-note')) h2.insertAdjacentElement('afterend', note);

        setTimeout(() => {
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
          pesanEl.focus();
        }, 250);
      }
    }

    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      input.addEventListener('focus', () => input.parentElement?.classList?.add('focused'));
      input.addEventListener('blur', () => {
        if (!input.value) input.parentElement?.classList?.remove('focused');
      });
      if (input.value) input.parentElement?.classList?.add('focused');
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // cek validasi form
      let isValid = true;
      const errors = [];

      const fName = form.querySelector('[name="nama"]');
      const fEmail = form.querySelector('[name="email"]');
      const fTel = form.querySelector('[name="telp"]');
      const fKeperluan = form.querySelector('[name="keperluan"]');
      const fPesan = form.querySelector('[name="pesan"]');

      if (!fName || !fName.value.trim() || fName.value.trim().length < 3) {
        isValid = false;
        errors.push('Nama harus diisi (min 3 karakter)');
        fName?.classList.add('error');
      } else fName.classList.remove('error');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!fEmail || !fEmail.value.trim() || !emailRegex.test(fEmail.value)) {
        isValid = false;
        errors.push('Masukkan alamat email yang valid');
        fEmail?.classList.add('error');
      } else fEmail.classList.remove('error');

      const phoneRegex = /^[0-9]{8,15}$/;
      if (!fTel || !fTel.value.trim() || !phoneRegex.test(fTel.value)) {
        isValid = false;
        errors.push('Masukkan nomor telepon yang valid (8-15 digit)');
        fTel?.classList.add('error');
      } else fTel.classList.remove('error');

      if (!fKeperluan || !fKeperluan.value) {
        isValid = false;
        errors.push('Silakan pilih keperluan');
        fKeperluan?.classList.add('error');
      } else fKeperluan.classList.remove('error');

      if (!fPesan || !fPesan.value.trim() || fPesan.value.trim().length < 10) {
        isValid = false;
        errors.push('Pesan minimal 10 karakter');
        fPesan?.classList.add('error');
      } else fPesan.classList.remove('error');

      const fConsent = form.querySelector('[name="consent"]');
      if (fConsent && !fConsent.checked) {
        isValid = false;
        errors.push('Mohon setujui untuk dihubungi dengan mencentang kotak persetujuan.');
      }

      if (!isValid) {
        const msg = errors.join('<br>');
        showNotification(msg, 'error');
        setInlineAlert(form, msg, 'error');
        return;
      }

      const endpoint = form.dataset.endpoint || (FORMSPREE_ENDPOINT && !FORMSPREE_ENDPOINT.includes('{YOUR_FORM_ID}') ? FORMSPREE_ENDPOINT : null);

      async function onSuccess() {
        const successMsg = 'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.';
        showNotification(successMsg, 'success');
        setInlineAlert(form, successMsg, 'success');
        try { form.dispatchEvent(new CustomEvent('contact:sent', { bubbles: true })); } catch (e) { /* abaikan */ }
        form.reset();
      }

      const submitBtn = form.querySelector('button[type="submit"], .submit-btn');
      if (submitBtn) submitBtn.disabled = true;
      const originalBtnText = submitBtn ? submitBtn.textContent : null;

      if (endpoint) {
        try {
          const fd = new FormData(form);
          // Cek honeypot: kalau field tersembunyi ada isi, anggap spam dan pura-pura sukses
          if (fd.get('_gotcha')) {
            await onSuccess();
            if (submitBtn) { submitBtn.disabled = false; if (originalBtnText) submitBtn.textContent = originalBtnText; }
            return;
          }
          const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
          if (res.ok) {
            await onSuccess();
            if (submitBtn) { submitBtn.disabled = false; if (originalBtnText) submitBtn.textContent = originalBtnText; }
          } else {
            let errText = 'Terjadi kesalahan saat mengirim. Silakan coba lagi.';
            try { const data = await res.json(); if (data && data.error) errText = data.error; } catch (err) {}
            showNotification(errText, 'error');
            setInlineAlert(form, errText, 'error');
            if (submitBtn) { submitBtn.disabled = false; if (originalBtnText) submitBtn.textContent = originalBtnText; }
          }
        } catch (err) {
          const netMsg = 'Terjadi kesalahan jaringan. Periksa koneksi Anda.';
          showNotification(netMsg, 'error');
          setInlineAlert(form, netMsg + ' (' + (err && err.message ? err.message : 'network error') + ')', 'error');
          if (submitBtn) { submitBtn.disabled = false; if (originalBtnText) submitBtn.textContent = originalBtnText; }
        }
      } else {
        // enggak ada endpoint  anggap sukses lokal (nanti bisa diatur FORMSPREE_ENDPOINT atau tambah data-endpoint di form)
        await onSuccess();
        if (submitBtn) { submitBtn.disabled = false; if (originalBtnText) submitBtn.textContent = originalBtnText; }
      }
    });
  });

  // tambahin style notifikasi
  const style = document.createElement('style');
  style.textContent = `
    .notification { position: fixed; top: 20px; right: 20px; padding: 15px 25px; border-radius: 8px; color: white; font-weight: 500; z-index: 10000; animation: slideIn 0.3s ease; }
    .notification.success { background-color: #4CAF50; }
    .notification.error { background-color: #f44336; }
    .notification.fade-out { animation: fadeOut 0.3s ease forwards; }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fadeOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    .error { border-color: #f44336 !important; }
  `;
  document.head.appendChild(style);

});

