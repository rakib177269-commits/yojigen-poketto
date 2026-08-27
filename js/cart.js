// =====================================================
// CART PAGE
// Reads/writes the cart via the shared functions in cart-utils.js
// =====================================================

const cartContent = document.getElementById("cart-content");

function renderCartPage() {
  const cart = getCart();

  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🛍️</span>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't pulled anything out of the pocket yet.</p>
        <a href="products.html" class="btn btn-primary">Shop Now</a>
      </div>
    `;
    return;
  }

  const subtotal = getCartSubtotal();

  const itemsHtml = cart.map((item) => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">

      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="cart-item-price">৳${item.price}</p>
      </div>

      <div class="qty-selector cart-qty">
        <button class="cart-qty-minus" type="button" aria-label="Decrease quantity">−</button>
        <input type="number" class="cart-qty-input" value="${item.quantity}" min="1" max="10">
        <button class="cart-qty-plus" type="button" aria-label="Increase quantity">+</button>
      </div>

      <p class="cart-item-total">৳${item.price * item.quantity}</p>

      <button class="cart-remove" type="button" aria-label="Remove item">🗑️</button>
    </div>
  `).join("");

  cartContent.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${itemsHtml}</div>

      <aside class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>৳${subtotal}</span></div>
        <div class="summary-row"><span>Delivery</span><span>Calculated at checkout</span></div>
        <div class="summary-row summary-total"><span>Total</span><span>৳${subtotal}</span></div>
        <a href="checkout.html" class="btn btn-primary cart-checkout-btn">Proceed to Checkout →</a>
        <a href="products.html" class="continue-shopping">← Continue Shopping</a>
      </aside>
    </div>
  `;

  wireCartEvents();
}

function wireCartEvents() {
  document.querySelectorAll(".cart-item").forEach((row) => {
    const id = Number(row.dataset.id);
    const input = row.querySelector(".cart-qty-input");

    row.querySelector(".cart-qty-minus").addEventListener("click", () => {
      updateQuantity(id, Number(input.value) - 1);
      renderCartPage();
    });

    row.querySelector(".cart-qty-plus").addEventListener("click", () => {
      updateQuantity(id, Number(input.value) + 1);
      renderCartPage();
    });

    input.addEventListener("change", () => {
      updateQuantity(id, Number(input.value) || 1);
      renderCartPage();
    });

    row.querySelector(".cart-remove").addEventListener("click", () => {
      removeFromCart(id);
      renderCartPage();
    });
  });
}

renderCartPage();
