document.addEventListener("DOMContentLoaded", () => {
  loadLayout();
});

function loadLayout() {
  /* ---------- LOAD HEADER ---------- */
  fetch("../components/header.html")
    .then(res => {
      if (!res.ok) throw new Error("Header not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("site-header").innerHTML = html;
      initMobileMenu(); // 🔥 important
    })
    .catch(err => console.error(err));

  /* ---------- LOAD FOOTER ---------- */
  fetch("../components/footer.html")
    .then(res => {
      if (!res.ok) throw new Error("Footer not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("site-footer").innerHTML = html;
    })
    .catch(err => console.error(err));
}

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
