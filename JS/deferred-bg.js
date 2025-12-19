window.addEventListener('load', function() {
  // Choose IMG base path depending on page location (root or HTML folder)
  var base = window.location.pathname.indexOf('/HTML/') !== -1 ? '../IMG/' : 'IMG/';
  var darkImg = base + 'pretty.jpg';
  var lightImg = base + 'Lake Toba, Indonesia (1).jpg';
  var chosen = document.body.classList.contains('dark-mode') ? darkImg : lightImg;
  // Debug
  try { console.log('[deferred-bg] chosen background:', chosen, 'dark-mode=', document.body.classList.contains('dark-mode')); } catch(e){}
  document.body.style.backgroundImage = "url('" + chosen + "')";
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
});


