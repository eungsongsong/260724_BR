document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".promo-track");
  if (!track) return;

  const INTERVAL_MS = 3000;
  const UNIQUE_COUNT = 7; // real cards; the trailing clones only exist to loop seamlessly

  const dots = Array.from(document.querySelectorAll(".promo-dot"));

  let position = 0;

  const cardStep = () => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return track.children[0].getBoundingClientRect().width + gap;
  };

  const setPosition = (pos, animate) => {
    track.style.transition = animate ? `transform ${INTERVAL_MS}ms ease` : "none";
    track.style.transform = `translateX(-${cardStep() * pos}px)`;
  };

  const setActiveDot = (pos) => {
    if (!dots.length) return;
    const active = pos % dots.length;
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
  };

  const tick = () => {
    position += 1;
    setPosition(position, true);
    setActiveDot(position);

    window.setTimeout(() => {
      if (position === UNIQUE_COUNT) {
        // the clones make this frame look identical to the start, so the
        // jump back is invisible — then resume sliding from there
        position = 0;
        setPosition(position, false);
        void track.offsetWidth; // flush the instant reset before re-animating
      }
      tick();
    }, INTERVAL_MS);
  };

  setActiveDot(position);
  window.setTimeout(tick, INTERVAL_MS);
});
