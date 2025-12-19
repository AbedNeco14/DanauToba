// Dark Mode Toggle Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('[darkmode] DOMContentLoaded triggered');
  
  var btn = document.getElementById('darkModeToggle');
  console.log('[darkmode] button element:', btn);
  
  if (!btn) {
    console.log('[darkmode] button not found, creating new one');
    btn = document.createElement('button');
    btn.id = 'darkModeToggle';
    btn.title = 'Dark Mode';
    btn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(btn);
  }
  
  function toggleDarkMode() {
    var isDark = document.body.classList.contains('dark-mode');
    var isWisataPage = window.location.pathname.includes('Wisata.html');
    console.log('[darkmode] toggle clicked, current dark state:', isDark);
    
    if (isDark) {
      // Turn OFF dark mode
      document.body.classList.remove('dark-mode');
      if (!isWisataPage) {
        document.body.style.backgroundImage = "url('IMG/Lake Toba, Indonesia (1).jpg')";
      }
      btn.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('darkMode', '0');
      console.log('[darkmode] switched to LIGHT mode');
      
      // Remove dark mode filter from images
      document.querySelectorAll('img, picture img').forEach(function(img) {
        img.style.opacity = '1';
        img.style.filter = 'none';
      });
    } else {
      // Turn ON dark mode
      document.body.classList.add('dark-mode');
      if (!isWisataPage) {
        document.body.style.backgroundImage = "url('IMG/pretty.jpg')";
      }
      btn.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('darkMode', '1');
      console.log('[darkmode] switched to DARK mode');
      
      // Apply dark mode filter to images
      document.querySelectorAll('img:not(.brand-logo), picture img:not(.brand-logo)').forEach(function(img) {
        img.style.opacity = '0.85';
        img.style.filter = 'brightness(0.9) contrast(1.1) saturate(0.95)';
      });
    }
    
    // Apply background styling
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }
  
  // Set up click handler
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('[darkmode] click event fired');
    toggleDarkMode();
  });
  
  // Also add double-click handler just in case
  btn.addEventListener('dblclick', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
  
  // Load saved state from localStorage
  var isDarkModeEnabled = localStorage.getItem('darkMode') === '1';
  var isWisataPage = window.location.pathname.includes('Wisata.html');
  console.log('[darkmode] loading saved state:', isDarkModeEnabled);
  
  if (isDarkModeEnabled) {
    document.body.classList.add('dark-mode');
    if (!isWisataPage) {
      document.body.style.backgroundImage = "url('IMG/pretty.jpg')";
    }
    btn.innerHTML = '<i class="fas fa-sun"></i>';
    console.log('[darkmode] loaded with dark mode ON');
    
    // Apply dark mode filter to images on load
    document.querySelectorAll('img:not(.brand-logo), picture img:not(.brand-logo)').forEach(function(img) {
      img.style.opacity = '0.85';
      img.style.filter = 'brightness(0.9) contrast(1.1) saturate(0.95)';
    });
  } else {
    document.body.classList.remove('dark-mode');
    document.body.style.backgroundImage = "url('IMG/Lake Toba, Indonesia (1).jpg')";
    btn.innerHTML = '<i class="fas fa-moon"></i>';
    console.log('[darkmode] loaded with dark mode OFF');
  }
  
  // Apply background styling
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
});

// Inject dark mode styles
if (!document.getElementById('darkmode-style')) {
  const style = document.createElement('style');
  style.id = 'darkmode-style';
  style.innerHTML = `
  body.dark-mode {
    color: #f1f1f1 !important;
  }
  body.dark-mode .glass, body.dark-mode .footer-full {
    background: rgba(30,30,30,0.85) !important;
    color: #f1f1f1 !important;
    border-color: #444 !important;
    box-shadow: 0 2px 16px rgba(0,0,0,0.4);
  }
  body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
    color: #ffd700 !important;
    text-shadow: 0 2px 8px #222;
  }
  body.dark-mode a {
    color: #ffd700 !important;
    text-decoration: underline;
  }
  body.dark-mode .btn-primary, body.dark-mode .btn-secondary, body.dark-mode .submit-btn {
    background: #ffd700 !important;
    color: #222 !important;
    border: none;
    box-shadow: 0 2px 8px #222;
  }
  body.dark-mode .navbar .logo span {
    color: #ffd700 !important;
  }
  body.dark-mode input, body.dark-mode textarea, body.dark-mode select {
    background: #222 !important;
    color: #ffd700 !important;
    border: 1px solid #ffd700 !important;
  }
  body.dark-mode .feature-card, body.dark-mode .fact-card, body.dark-mode .galeri-item, body.dark-mode .modal-content, body.dark-mode .contact-form, body.dark-mode .info-card, body.dark-mode .destination-card, body.dark-mode .activity-card, body.dark-mode .tip-card {
    background: rgba(50,50,50,0.9) !important;
    color: #ffd700 !important;
    border: 1px solid #ffd700 !important;
  }
  body.dark-mode .section-title, body.dark-mode .highlight, body.dark-mode .galeri-title, body.dark-mode .galeri-caption, body.dark-mode .contact-title {
    color: #ffd700 !important;
  }
  body.dark-mode .faq-question {
    background: #222 !important;
    color: #ffd700 !important;
    border: 1px solid #ffd700 !important;
  }
  body.dark-mode .faq-answer {
    background: #333 !important;
    color: #ffd700 !important;
    border: 1px solid #ffd700 !important;
  }
  #darkModeToggle {
    background: #ffd700 !important;
    color: #222 !important;
    border: none !important;
    box-shadow: 0 2px 12px #222 !important;
    transition: background 0.2s;
  }
  #darkModeToggle:hover {
    background: #ffe066 !important;
  }
  `;
  document.head.appendChild(style);
}
