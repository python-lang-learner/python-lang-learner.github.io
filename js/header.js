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
