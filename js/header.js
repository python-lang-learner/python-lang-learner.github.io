// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});
// DARK MODE
const toggle = document.getElementById("themeToggle");

if (localStorage.theme === "dark") {
  document.body.classList.add("dark");
}

toggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark")
    ? "dark"
    : "light";
});

/**************************************************************** */
/**************************************************************** */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    drawer.classList.add("open");
    overlay.classList.add("show");
  });

  overlay.addEventListener("click", () => {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
  });
});

