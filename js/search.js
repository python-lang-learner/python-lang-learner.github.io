/*
// /scripts/search.js
(() => {
  const input = document.getElementById('site-search-input');
  const btn = document.getElementById('site-search-btn');
  const resultsEl = document.getElementById('site-search-results');

  if (!input || !resultsEl) return;

  let index = []; // array of {title, url, type, excerpt}
  let lastQuery = '';

  // fetch index once
  async function loadIndex() {
    try {
      const res = await fetch('/search_index.json', {cache: "no-store"});
      if (!res.ok) throw new Error('index not found');
      index = await res.json();
    } catch (err) {
      console.warn('Search index load error:', err);
      index = [];
    }
  }
  loadIndex();

  function highlight(text, query) {
    if (!query) return text;
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(q, 'ig'), (m) => `<mark style="background: #fff7cc; padding:0 2px;border-radius:2px;color:inherit">${m}</mark>`);
  }

  function showResults(list) {
    resultsEl.innerHTML = '';
    if (!list.length) {
      resultsEl.style.display = 'none';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<div class="title">${highlight(item.title, lastQuery)}</div>
                      <div class="muted">${highlight(item.type || '', lastQuery)} — ${highlight(item.excerpt || '', lastQuery)}</div>`;
      li.addEventListener('click', () => {
        window.location.href = item.url;
      });
      frag.appendChild(li);
    });
    resultsEl.appendChild(frag);
    resultsEl.style.display = 'block';
  }

  function doSearch(q) {
    lastQuery = q.trim();
    if (!lastQuery) {
      resultsEl.style.display = 'none';
      return;
    }
    const terms = lastQuery.toLowerCase().split(/\s+/).filter(Boolean);
    // score: title matches higher, url/type next, excerpt lower
    const scored = index.map(it => {
      const title = (it.title||'').toLowerCase();
      const excerpt = (it.excerpt||'').toLowerCase();
      const type = (it.type||'').toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 10;
        if (type.includes(t)) score += 4;
        if (excerpt.includes(t)) score += 2;
        if ((it.url||'').toLowerCase().includes(t)) score += 3;
      }
      return {it, score};
    }).filter(s => s.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 10)
      .map(s => s.it);
    showResults(scored);
  }

  let debounce;
  input.addEventListener('input', (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => doSearch(e.target.value), 150);
  });

  // Enter: go to first result
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const first = resultsEl.querySelector('li');
      if (first) first.click();
      else if (input.value.trim()) {
        // fallback: navigate to search page with query param
        window.location.href = `/search.html?q=${encodeURIComponent(input.value.trim())}`;
      }
    } else if (e.key === 'Escape') {
      resultsEl.style.display = 'none';
    }
  });

  // click search button: go to search page with query
  btn.addEventListener('click', () => {
    const q = input.value.trim();
    if (!q) return input.focus();
    window.location.href = `/search.html?q=${encodeURIComponent(q)}`;
  });

  // click outside - hide results
  document.addEventListener('click', (e) => {
    if (!resultsEl.contains(e.target) && e.target !== input && e.target !== btn) {
      resultsEl.style.display = 'none';
    }
  });
})();
*/
/*document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchBox");
  const cards = document.querySelectorAll(".ex-card");
  const count = document.getElementById("resultCount");

  function run() {
    const q = input.value.toLowerCase();
    let n = 0;
    cards.forEach(c => {
      const show = c.textContent.toLowerCase().includes(q);
      c.style.display = show ? "" : "none";
      if (show) n++;
    });
    count.textContent = n + " results";
  }

  input.addEventListener("input", run);
  run();
});*/
function highlight(text, query) {
  const r = new RegExp(`(${query})`, "gi");
  return text.replace(r, "<mark>$1</mark>");
}

// When rendering results
result.innerHTML = `
  <strong>${highlight(item.title, q)}</strong>
  <div>${highlight(item.description || "", q)}</div>
`;
