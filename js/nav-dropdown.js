document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".main-nav .nav-item");

  navItems.forEach((item) => {
    const link = item.querySelector(":scope > a");

    const open = () => {
      item.classList.add("is-open");
      if (link) link.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      item.classList.remove("is-open");
      if (link) link.setAttribute("aria-expanded", "false");
    };

    // mouseenter/mouseleave don't bubble, so this fires once when the
    // pointer crosses into/out of the whole nav-item (link + dropdown),
    // keeping the menu open while moving between them.
    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", close);
    item.addEventListener("focusin", open);
    item.addEventListener("focusout", close);
  });
});
