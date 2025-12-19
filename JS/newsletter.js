document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const feedback = form.querySelector('.newsletter-feedback');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect form data and send to the form's `action` URL.
    const formData = new FormData(form);
    // Honeypot check: if hidden field is filled, treat as spam and stop silently
    if (formData.get('_gotcha')) {
      feedback.style.color = '#16a34a';
      feedback.innerText = 'Terima kasih — email Anda telah terdaftar!';
      form.reset();
      return;
    }

    // If the action is still the placeholder, inform the admin instead of posting
    if (!form.action || form.action.includes('{YOUR_FORM_ID}')) {
      feedback.style.color = '#dc2626';
      feedback.innerText = 'Form belum dikonfigurasi. Ganti atribut "action" pada form dengan endpoint Formspree atau provider Anda.';
      return;
    }
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        feedback.style.color = '#16a34a'; // green
        feedback.innerText = 'Terima kasih — email Anda telah terdaftar!';
      } else {
        // Try to read JSON error message
        let errorText = 'Terjadi kesalahan saat mengirim. Silakan coba lagi.';
        try {
          const data = await res.json();
          if (data && data.error) errorText = data.error;
        } catch (err) {
          // ignore
        }
        feedback.style.color = '#dc2626';
        feedback.innerText = errorText;
      }
    } catch (err) {
      feedback.style.color = '#dc2626';
      feedback.innerText = 'Terjadi kesalahan jaringan. Periksa koneksi Anda.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});

