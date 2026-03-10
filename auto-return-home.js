(() => {
  // Adjust this value (milliseconds) to change inactivity timeout.
  const INACTIVITY_RETURN_HOME_MS = 30000;
  const HOME_PATH = "index.html";
  let inactivityTimerId = null;

  const resetInactivityTimer = () => {
    if (inactivityTimerId !== null) {
      window.clearTimeout(inactivityTimerId);
    }

    inactivityTimerId = window.setTimeout(() => {
      window.location.href = HOME_PATH;
    }, INACTIVITY_RETURN_HOME_MS);
  };

  window.addEventListener("click", resetInactivityTimer, { passive: true });
  window.addEventListener("touchstart", resetInactivityTimer, { passive: true });
  resetInactivityTimer();
})();
