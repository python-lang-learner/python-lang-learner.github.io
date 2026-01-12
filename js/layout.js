document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    const res = await fetch("/includes/header.html");
    header.innerHTML = await res.text();
  }

  if (footer) {
    const res = await fetch("/includes/footer.html");
    footer.innerHTML = await res.text();
  }

  // Mobile menu
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
