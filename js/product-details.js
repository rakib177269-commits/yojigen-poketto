// =====================================================
// PRODUCT DETAILS PAGE
// Reads the product id from the URL (e.g. product-details.html?id=3)
// and builds the whole page from js/data.js
// =====================================================

const detailParams = new URLSearchParams(window.location.search);
const product = getProductById(detailParams.get("id"));

const pdLayout = document.getElementById("pd-layout");
const breadcrumb = document.getElementById("breadcrumb");
const relatedSection = document.getElementById("related-section");

if (!product) {
  // No matching product found — show a friendly "not found" message
  pdLayout.innerHTML = `
    <div class="pd-not-found">
      <span class="empty-icon">🕳️</span>
      <h2>We couldn't find that charm</h2>
      <p>It might have been removed, or the link is incorrect.</p>
      <a href="products.html" class="btn btn-primary">Back to Shop</a>
    </div>
  `;
} else {
  document.title = `${product.name} | Yojigen Poketto`;

  breadcrumb.innerHTML = `
    <a href="index.html">Home</a> <span>/</span>
    <a href="products.html">Shop</a> <span>/</span>
    <span class="breadcrumb-current">${product.name}</span>
  `;

  pdLayout.innerHTML = `
    <div class="pd-image">
      <img src="${product.image.replace("500x500", "700x700")}" alt="${product.name}">
      ${!product.inStock ? '<span class="product-stock-badge pd-stock-badge">Out of Stock</span>' : ""}
    </div>

    <div class="pd-info">
      <span class="product-tag pd-tag">${capitalize(product.category)}</span>
      <h1>${product.name}</h1>
      <p class="pd-price">৳${product.price}</p>
      <p class="pd-description">${product.description}</p>

      <p class="pd-availability ${product.inStock ? "in-stock" : "out-of-stock"}">
        ${product.inStock ? "✔ In Stock — ready to ship" : "✖ Currently Out of Stock"}
      </p>

      ${product.inStock ? `
        <div class="qty-selector">
          <button id="qty-minus" aria-label="Decrease quantity" type="button">−</button>
          <input type="number" id="qty-input" value="1" min="1" max="10">
          <button id="qty-plus" aria-label="Increase quantity" type="button">+</button>
        </div>
        <button class="btn btn-primary pd-add-btn" id="pd-add-to-cart">Add to Cart — ৳${product.price}</button>
      ` : `
        <button class="btn btn-primary pd-add-btn" disabled>Sold Out</button>
      `}

      <ul class="pd-trust">
        <li>🚚 Cash on Delivery available</li>
        <li>↩️ Easy exchange within 3 days</li>
      </ul>
    </div>
  `;

  // ---------- Quantity selector ----------
  const qtyInput = document.getElementById("qty-input");

  document.getElementById("qty-minus")?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });

  document.getElementById("qty-plus")?.addEventListener("click", () => {
    qtyInput.value = Math.min(10, Number(qtyInput.value) + 1);
  });

  document.getElementById("pd-add-to-cart")?.addEventListener("click", () => {
    const quantity = Math.max(1, Number(qtyInput.value) || 1);
    addToCart(product, quantity);
    showToast(`${product.name} added to cart! 🎉`);
  });

  // ---------- Related products ----------
  const related = getRelatedProducts(product);
  if (related.length > 0) {
    relatedSection.innerHTML = `
      <div class="section-heading">
        <p class="eyebrow">✦ You Might Also Like</p>
        <h2>More From ${capitalize(product.category)}</h2>
      </div>
      <div class="product-grid">
        ${related.map(renderProductCard).join("")}
      </div>
    `;
  }
}
