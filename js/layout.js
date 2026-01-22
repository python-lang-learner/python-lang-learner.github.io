document.addEventListener("DOMContentLoaded", () => {
  loadLayout();
});

function loadLayout() {
  const basePath = window.location.hostname.includes("github.io")
    ? "/n-lang-learner"
    : "";

  /* ---------- LOAD HEADER ---------- */
  fetch(`${basePath}/header.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("site-header").innerHTML = html;
      initMobileMenu(); // 🔥 IMPORTANT
    })
    .catch(err => console.error("Header load failed:", err));

  /* ---------- LOAD FOOTER ---------- */
  fetch(`${basePath}/footer.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("site-footer").innerHTML = html;
    })
    .catch(err => console.error("Footer load failed:", err));
}

/* ---------- MOBILE MENU LOGIC ---------- */
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
