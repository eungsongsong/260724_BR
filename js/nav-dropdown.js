document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".main-nav .nav-item");

  items.forEach((item) => {
    const open = () => item.classList.add("is-open");
    const close = () => item.classList.remove("is-open");

    // mouseenter/mouseleave don't bubble, so this fires once when the
    // pointer crosses into/out of the whole nav-item (link + its own
    // dropdown, which is a descendant), keeping it open while moving
    // between them.
    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", close);
    item.addEventListener("focusin", open);
    item.addEventListener("focusout", close);
  });
});
