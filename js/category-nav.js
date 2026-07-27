document.addEventListener("DOMContentLoaded", () => {
  // Single source of truth for the category menu — rendered into
  // #categoryNav on both the list page (index.html) and the detail page
  // (monthly.html), so neither page hardcodes its own copy of this list.
  const CATEGORIES = [
    { key: "monthly", label: "이달의 맛", href: "monthly.html" },
    { key: "icecream", label: "아이스크림", href: "index.html#icecream" },
    { key: "prepack", label: "프리팩", href: "index.html#prepack" },
    { key: "cake", label: "아이스크림케이크", href: "index.html#cake" },
    { key: "dessert", label: "디저트", href: "index.html#dessert" },
    { key: "drink", label: "음료", href: "index.html#drink" },
    { key: "coffee", label: "커피", href: "index.html#coffee" },
  ];

  const mount = document.getElementById("categoryNav");
  if (!mount) return;

  const categoryTitle = document.querySelector(".category-title");
  // Only index.html has a product grid/title to filter in place — every
  // other page (the detail page included) just links back to it.
  const isListPage = !!categoryTitle;

  const list = document.createElement("ul");
  CATEGORIES.forEach(({ key, label, href }) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    link.dataset.key = key;
    li.appendChild(link);
    list.appendChild(li);
  });
  mount.appendChild(list);

  const links = Array.from(list.querySelectorAll("a"));
  const setActive = (key) => {
    links.forEach((link) => link.parentElement.classList.toggle("active", link.dataset.key === key));
  };

  // The detail page only ever shows the "이달의 맛" item, so it's always
  // active there. On the list page, honor a #key left by navigating in
  // from elsewhere; otherwise default to "이달의 맛" (matching the product
  // grid's own default).
  const hashKey = window.location.hash.slice(1);
  const initialKey = isListPage && CATEGORIES.some((c) => c.key === hashKey) ? hashKey : "monthly";
  setActive(initialKey);
  if (isListPage && initialKey !== "monthly") {
    categoryTitle.textContent = CATEGORIES.find((c) => c.key === initialKey).label;
  }

  if (!isListPage) return; // elsewhere, every link is a real navigation

  links.forEach((link) => {
    if (link.dataset.key === "monthly") return; // real navigation to monthly.html
    link.addEventListener("click", (e) => {
      e.preventDefault();
      setActive(link.dataset.key);
      categoryTitle.textContent = link.textContent;
      history.replaceState(null, "", `#${link.dataset.key}`);
    });
  });
});
