/*function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "/components/header.html");
  loadComponent("footer", "/components/footer.html");
});
*/
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/header.html")
    .then(r => r.text())
    .then(html => document.getElementById("site-header").innerHTML = html);

  fetch("/components/footer.html")
    .then(r => r.text())
    .then(html => document.getElementById("site-footer").innerHTML = html);
});
