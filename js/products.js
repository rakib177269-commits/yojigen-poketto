// =====================================================
// SHOP PAGE — search + category filtering
// =====================================================

const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-chip");
const productGrid = document.getElementById("product-grid");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");

// Pre-select a category if the URL looks like products.html?category=anime
// (this is how the Home page category cards and footer links work)
const urlParams = new URLSearchParams(window.location.search);
let activeCategory = urlParams.get("category") || "all";

function renderShop() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filtered.map(renderProductCard).join("");
  resultsCount.textContent = `${filtered.length} charm${filtered.length !== 1 ? "s" : ""} found`;

  emptyState.style.display = filtered.length === 0 ? "block" : "none";
  productGrid.style.display = filtered.length === 0 ? "none" : "grid";

  // Keep the filter chips visually in sync with the active category
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === activeCategory);
  });
}

searchInput.addEventListener("input", renderShop);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;
    renderShop();
  });
});

document.getElementById("clear-filters").addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "all";
  renderShop();
});

renderShop();
