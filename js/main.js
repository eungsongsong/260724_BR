document.addEventListener("DOMContentLoaded", () => {
  // Category menu clicks/active-state are handled by js/category-nav.js,
  // which also renders this page's #categoryNav content.
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");
  const modalFruit = document.getElementById("modalFruit");
  const modalName = document.getElementById("modalName");
  const modalDesc = document.getElementById("modalDesc");

  const openModal = (card) => {
    const img = card.querySelector(".product-image img");
    const fruit = card.querySelector(".fruit-tag");
    const name = card.querySelector(".product-name");

    modalImage.src = img.src;
    modalImage.alt = name.textContent;
    modalFruit.textContent = fruit.textContent;
    modalName.textContent = name.textContent;
    modalDesc.textContent = `${name.textContent}의 상세 설명이 들어갈 자리입니다.`;

    modal.classList.add("open");
  };

  const closeModal = () => {
    modal.classList.remove("open");
  };

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
