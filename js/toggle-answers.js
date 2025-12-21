document.addEventListener("DOMContentLoaded", () => {
  const detailsBlocks = document.querySelectorAll("details");

  // Only add button if there are details sections on the page
  if (detailsBlocks.length === 0) return;

  // Create button
  const btn = document.createElement("button");
  btn.id = "toggle-answers";
  btn.className = "toggle-btn";
  btn.textContent = "Show All Answers";

  // Insert button at the top of main container
  const main = document.querySelector("main");
  if (main) main.prepend(btn);

  let openAll = false;

  btn.addEventListener("click", () => {
    openAll = !openAll;
    detailsBlocks.forEach(d => d.open = openAll);
    btn.textContent = openAll ? "Hide All Answers" : "Show All Answers";
  });
});
