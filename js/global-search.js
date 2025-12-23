document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("globalSearchBox");
  if (!input) return; // page doesn't have global search

  input.addEventListener("input", () => {
    // example redirect-based global search
    const q = input.value.trim();
    if (q.length > 2) {
      window.location.href = `/search.html?q=${encodeURIComponent(q)}`;
    }
  });
});
