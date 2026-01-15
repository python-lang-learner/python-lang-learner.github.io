document.addEventListener("DOMContentLoaded", () => {

  // Load Header
  fetch("/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("site-header").innerHTML = data;
    })
    .catch(err => console.error("Header load error:", err));

  // Load Footer
  fetch("/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("site-footer").innerHTML = data;
    })
    .catch(err => console.error("Footer load error:", err));

});
