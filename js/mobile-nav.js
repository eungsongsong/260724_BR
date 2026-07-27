document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburgerBtn");
  const drawer = document.getElementById("mainNav");
  const overlay = document.getElementById("drawerOverlay");
  if (!hamburger || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("is-drawer-open");
    overlay.classList.add("is-visible");
    hamburger.classList.add("is-active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-drawer-open");
    overlay.classList.remove("is-visible");
    hamburger.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };

  hamburger.addEventListener("click", () => {
    drawer.classList.contains("is-drawer-open") ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Real navigation links inside the drawer (top-level or in a dropdown)
  // should close it behind them.
  drawer.querySelectorAll(".nav-item > a, .nav-dropdown a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
});
