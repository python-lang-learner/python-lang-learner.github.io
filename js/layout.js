document.addEventListener("DOMContentLoaded", () => {

  // Detect base path (works on GitHub Pages)
  const basePath = location.pathname.includes("/topics/") ||
                   location.pathname.includes("/projects/")
                   ? "../"
                   : "";

  // LOAD HEADER
  fetch(basePath + "components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("site-header").innerHTML = html;

      // Mobile menu AFTER header loads
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
    })
    .catch(err => console.error("Header load failed", err));

  // LOAD FOOTER
  fetch(basePath + "components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("site-footer").innerHTML = html;
    })
    .catch(err => console.error("Footer load failed", err));

});
