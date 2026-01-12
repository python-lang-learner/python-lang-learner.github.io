document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");

  if (!toggle || !drawer || !overlay) return;

  toggle.addEventListener("click", () => {
    drawer.classList.toggle("open");
    overlay.classList.toggle("show");
  });

  overlay.addEventListener("click", () => {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
  });
});
