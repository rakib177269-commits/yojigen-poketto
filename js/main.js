// =====================================================
// MAIN.JS — shared behavior loaded on every page
// (mobile nav toggle, toast popup, product card rendering,
//  featured products on Home, and Add to Cart clicks anywhere)
// =====================================================

// ---------- Mobile navigation toggle ----------
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ---------- Toast ("Added to cart" popup) ----------
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

// ---------- Helpers ----------
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Builds the HTML for one product card. Used on the Home page (featured),
// the Shop page (full grid), and the "You might also like" section.
function renderProductCard(product) {
  const outOfStock = !product.inStock;
  return `
    <article class="product-card">
      <a href="product-details.html?id=${product.id}" class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-tag">${capitalize(product.category)}</span>
        ${outOfStock ? '<span class="product-stock-badge">Out of Stock</span>' : ""}
      </a>
      <div class="product-info">
        <h3 class="product-name"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-bottom">
          <span class="product-price">৳${product.price}</span>
          <button class="btn-add" data-id="${product.id}" ${outOfStock ? "disabled" : ""}>
            ${outOfStock ? "Sold Out" : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  `;
}

// ---------- Render Featured Products on the Home page ----------
const featuredGrid = document.getElementById("featured-grid");
if (featuredGrid) {
  const featured = PRODUCTS.filter((product) => product.featured);
  featuredGrid.innerHTML = featured.map(renderProductCard).join("");
}

// ---------- Handle "+ Add" clicks anywhere on the page ----------
// Using event delegation (listening on `document`) means this works for
// buttons that exist right away AND buttons rendered later by JS
// (like the shop grid), without needing to re-attach listeners.
document.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-add");
  if (!button || button.disabled) return;

  const product = getProductById(button.dataset.id);
  if (!product) return;

  addToCart(product, 1);
  showToast(`${product.name} added to cart! 🎉`);
});
