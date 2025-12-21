// scripts/answers.js
// Global toggle: Show / Hide all <details> on the page.
// Also wire up "S" keyboard shortcut and update button label/aria-pressed.

(function () {
  const toggleBtn = document.getElementById('toggle-all');
  function setAll(show) {
    document.querySelectorAll('details').forEach(d => {
      if (show) {
        d.open = true;
      } else {
        d.open = false;
      }
    });
    if (toggleBtn) {
      toggleBtn.textContent = show ? 'Hide All Answers' : 'Show All Answers';
      toggleBtn.setAttribute('aria-pressed', String(show));
    }
  }

  // initial state: collapsed
  let allOpen = false;

  // button click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      allOpen = !allOpen;
      setAll(allOpen);
    });
  }

  // keyboard shortcut: S (toggles), use only if focus isn't in an input
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() === 's' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      allOpen = !allOpen;
      setAll(allOpen);
    }
  });

  // optional: smooth open/close (progressive enhancement)
  document.querySelectorAll('details').forEach(d => {
    // accessible animation: nothing fancy; leaving default behavior
    d.addEventListener('toggle', () => {
      // could add analytics or micro-interactions here
    });
  });
})();
