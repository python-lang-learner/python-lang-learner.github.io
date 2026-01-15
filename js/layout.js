document.addEventListener("DOMContentLoaded", async () => {
  async function load(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file);
    el.innerHTML = await res.text();
  }

  await load("site-header", "/components/header.html");
  await load("site-footer", "/components/footer.html");
});
