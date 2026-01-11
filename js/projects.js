<script>
function filterProjects(level) {
  const projects = document.querySelectorAll(".project-item");
  const buttons = document.querySelectorAll(".filter-buttons button");

  // button active state
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  projects.forEach(project => {
    if (level === "all" || project.dataset.level === level) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}
</script>
