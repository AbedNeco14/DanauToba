document.addEventListener('DOMContentLoaded', function() {
  var scrollTopBtn = document.querySelector('a[title="Kembali ke atas"]');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

