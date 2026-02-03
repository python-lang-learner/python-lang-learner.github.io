document.addEventListener("DOMContentLoaded", () => {

  async function loadComponent(id, file, callback) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`${file} not found`);
      el.innerHTML = await res.text();
      if (callback) callback();
    } catch (err) {
      console.error("Failed to load:", file, err);
    }
  }

  /* LOAD HEADER & FOOTER (ABSOLUTE PATHS) */
  loadComponent("site-header", "/components/header.html", initMobileMenu);
  loadComponent("site-footer", "/components/footer.html");

});

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  if (!menuToggle || !mobileDrawer || !drawerOverlay) return;

  function openDrawer() {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", openDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);

  mobileDrawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}
