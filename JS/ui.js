document.addEventListener('DOMContentLoaded', () => {
  // Efek muncul pas di-scroll
  try {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});

    // Observe elements explicitly flagged with .reveal plus common card/section elements
    const selectors = ['.reveal', '.section-title', '.activity-card', '.package-card', '.destination-card', '.event-card', '.hero-green-text', '.hero-text'];
    const nodeList = document.querySelectorAll(selectors.join(','));
    nodeList.forEach(el => observer.observe(el));
  } catch (e) {
    // IntersectionObserver not supported: reveal immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal-visible'));
  }
});

