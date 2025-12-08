// scripts/search.js
(async function () {
  // helper: get query param
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
  }

  // fetch index
  let index = [];
  try {
    const r = await fetch("/search_index.json");
    if (!r.ok) throw new Error("Index not found");
    index = await r.json();
  } catch (err) {
    document.getElementById("results").innerHTML = "<p style='color:#c00;'>Search index not found. Run generator or create <code>/search_index.json</code>.</p>";
    console.error(err);
    return;
  }

  const input = document.getElementById("q");
  const btn = document.getElementById("btnSearch");
  const resRoot = document.getElementById("results");
  const countEl = document.getElementById("count");
  const fTopics = document.getElementById("filter-topics");
  const fExercises = document.getElementById("filter-exercises");
  const fProjects = document.getElementById("filter-projects");

  // initialize with q param
  const initialQ = getQueryParam("q");
  input.value = initialQ;

  function normalize(s) { return (s || "").toString().toLowerCase(); }
  function highlight(text, q) {
    if (!q) return text;
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(esc, "ig"), match => `<mark>${match}</mark>`);
  }

  function matchesItem(item, q) {
    q = q.trim().toLowerCase();
    if (!q) return true;
    const hay = (item.title + " " + item.excerpt + " " + (item.tags||[]).join(" ")).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function scoreItem(item, q) {
    q = q.trim().toLowerCase();
    if (!q) return 0;
    let score = 0;
    const title = item.title.toLowerCase();
    if (title.includes(q)) score += 5;
    const excerpt = (item.excerpt||"").toLowerCase();
    if (excerpt.includes(q)) score += 2;
    if ((item.tags||[]).join(" ").toLowerCase().includes(q)) score += 1;
    return score;
  }

  function filterAndRender() {
    const q = input.value.trim();
    // filter types
    const types = [];
    if (fTopics.checked) types.push("topic");
    if (fExercises.checked) types.push("exercise");
    if (fProjects.checked) types.push("project");

    let results = index
      .filter(i => types.includes(i.type))
      .filter(i => matchesItem(i, q))
      .map(i => ({item:i, score: scoreItem(i,q)}))
      .sort((a,b) => b.score - a.score);

    // show count
    countEl.textContent = results.length + " results";

    if (results.length === 0) {
      resRoot.innerHTML = `<p class="muted">No results — try different keywords.</p>`;
      return;
    }

    // render
    resRoot.innerHTML = results.map(r => {
      const it = r.item;
      const t = highlight(it.title, q);
      const ex = highlight(it.excerpt || "", q);
      const badge = `<span class="badge">${it.type}</span>`;
      return `<article class="result">
        <h3><a href="${it.url}">${t}</a> ${badge}</h3>
        <p class="muted">${ex}</p>
        <p><a href="${it.url}">Open</a></p>
      </article>`;
    }).join("\n");
  }

  // wire events
  btn.addEventListener("click", () => {
    // update URL param without reload
    const q = input.value.trim();
    const url = new URL(window.location);
    url.searchParams.set("q", q);
    history.replaceState({}, "", url);
    filterAndRender();
  });

  // filter on Enter key
  input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); btn.click(); } });

  // filters
  [fTopics, fExercises, fProjects].forEach(cb => cb.addEventListener("change", filterAndRender));

  // initial render
  filterAndRender();
})();
