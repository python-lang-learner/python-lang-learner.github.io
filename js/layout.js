document.addEventListener("DOMContentLoaded", () => {

  // HEADER
  fetch("/components/header.html")
    .then(res => {
      if (!res.ok) throw new Error("Header not found");
      return res.text();
    })
    .then(data => {
      document.getElementById("site-header").innerHTML = data;

      // Mobile menu logic (AFTER header loads)
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
    .catch(err => console.error(err));


  // FOOTER
  fetch("/components/footer.html")
    .then(res => {
      if (!res.ok) throw new Error("Footer not found");
      return res.text();
    })
    .then(data => {
      document.getElementById("site-footer").innerHTML = data;
    })
    .catch(err => console.error(err));

});
