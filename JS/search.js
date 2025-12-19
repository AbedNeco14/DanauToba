document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('destinationSearch');
  if (!input) return;

  const cards = Array.from(document.querySelectorAll('.destination-card'));

  // Build an index for simple fuzzy matching (lowercased joined text)
  const index = cards.map(card => {
    const title = (card.querySelector('h3')?.innerText || '').trim();
    const text = (card.innerText || '').replace(/\s+/g,' ').trim();
    return { card, titleLower: title.toLowerCase(), textLower: text.toLowerCase() };
  });

  function scoreItem(q, item){
    if (!q) return 1; // show all
    q = q.toLowerCase();
    // exact title match -> highest
    if (item.titleLower.includes(q)) return 3;
    // word boundaries in text
    if (item.textLower.includes(' ' + q + ' ') || item.textLower.startsWith(q + ' ') || item.textLower.endsWith(' ' + q)) return 2;
    // partial match
    if (item.textLower.includes(q)) return 1;
    return 0;
  }

  function applyFilter(){
    const q = input.value.trim().toLowerCase();
    // compute scores
    index.forEach(it => {
      const s = scoreItem(q, it);
      if (s > 0) {
        it.card.style.display = '';
        // subtle highlight for matched terms
        it.card.classList.toggle('search-match', !!q && (it.titleLower.includes(q) || it.textLower.includes(q)) );
      } else {
        it.card.style.display = 'none';
        it.card.classList.remove('search-match');
      }
    });

    // show no-results message
    let no = document.getElementById('noResultsMessage');
    if (!no) {
      no = document.createElement('div');
      no.id = 'noResultsMessage';
      no.style.textAlign = 'center';
      no.style.padding = '18px';
      no.style.color = '#003366';
      no.style.display = 'none';
      const container = document.querySelector('.section-container');
      if (container) container.appendChild(no);
    }
    const anyVisible = index.some(i => i.card.style.display !== 'none');
    no.innerText = anyVisible ? '' : 'Tidak ditemukan destinasi yang cocok.';
    no.style.display = anyVisible ? 'none' : 'block';
  }

  input.addEventListener('input', applyFilter);
  input.addEventListener('search', applyFilter);

  // keyboard: pressing Escape clears input
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { input.value=''; applyFilter(); input.blur(); } });
});

