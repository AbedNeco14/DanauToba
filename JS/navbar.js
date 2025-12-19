document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
  
  try {
    const links = nav.querySelectorAll('a');
    const path = window.location.pathname || '';
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (path.endsWith(href) || (href === 'index.html' && (path === '/' || path.endsWith('/index.html')))) {
        a.classList.add('active');
      }
    });
  } catch (e) {}
});

