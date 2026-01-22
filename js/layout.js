document.addEventListener("DOMContentLoaded", () => {
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

  // Close drawer when link clicked
  mobileDrawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
});
