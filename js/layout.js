document.addEventListener("DOMContentLoaded", async () => {

  async function load(selector, file) {
    const el = document.querySelector(selector);
    if (!el) return;

    const res = await fetch(file);
    if (!res.ok) {
      console.error("Failed to load:", file);
      return;
    }
    el.innerHTML = await res.text();
  }

  await load("#site-header", "includes/header.html");
  await load("#site-footer", "includes/footer.html");

  // Mobile menu (after header loads)
  const toggle = document.getElementById("menuToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");

  if (toggle && drawer && overlay) {
    toggle.onclick = () => {
      drawer.classList.toggle("open");
      overlay.classList.toggle("show");
    };

    overlay.onclick = () => {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
    };
  }
});
