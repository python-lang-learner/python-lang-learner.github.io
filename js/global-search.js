document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("globalSearchInput");
  if (!input) return; // ← IMPORTANT

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    if (!q) return;

    window.location.href = `/search.html?q=${encodeURIComponent(q)}`;
  });
});
