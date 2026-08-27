// =====================================================
// CHECKOUT PAGE
// Renders the order form + summary, validates on submit,
// then simulates placing an order (no backend yet).
// =====================================================

const checkoutContent = document.getElementById("checkout-content");

const DELIVERY_FEES = {
  inside: 70,
  outside: 130,
};

function renderCheckout() {
  const cart = getCart();

  if (cart.length === 0) {
    checkoutContent.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🧾</span>
        <h3>Your cart is empty</h3>
        <p>Add some charms before checking out.</p>
        <a href="products.html" class="btn btn-primary">Shop Now</a>
      </div>
    `;
    return;
  }

  const subtotal = getCartSubtotal();

  checkoutContent.innerHTML = `
    <form class="checkout-layout" id="checkout-form" novalidate>

      <div class="checkout-form-fields">
        <h3>Delivery Details</h3>

        <label class="form-field">
          <span>Full Name *</span>
          <input type="text" name="name" required placeholder="e.g. Farhan Ahmed">
        </label>

        <label class="form-field">
          <span>Phone Number *</span>
          <input type="tel" name="phone" required placeholder="e.g. 01XXXXXXXXX" pattern="[0-9+ ]{10,15}">
        </label>

        <label class="form-field">
          <span>Full Address *</span>
          <textarea name="address" required placeholder="House, road, area, city"></textarea>
        </label>

        <label class="form-field">
          <span>Delivery Area *</span>
          <select name="deliveryArea" required>
            <option value="">Select area</option>
            <option value="inside">Inside Dhaka (৳70)</option>
            <option value="outside">Outside Dhaka (৳130)</option>
          </select>
        </label>

        <div class="form-field">
          <span>Payment Method</span>
          <div class="payment-options">
            <label class="payment-option selected">
              <input type="radio" name="payment" value="cod" checked>
              💵 Cash on Delivery
            </label>
            <label class="payment-option disabled">
              <input type="radio" name="payment" value="bkash" disabled>
              📱 bKash <span>Coming soon</span>
            </label>
            <label class="payment-option disabled">
              <input type="radio" name="payment" value="nagad" disabled>
              📱 Nagad <span>Coming soon</span>
            </label>
          </div>
        </div>
      </div>

      <aside class="checkout-summary">
        <h3>Order Summary</h3>

        <div class="checkout-items">
          ${cart.map((item) => `
            <div class="checkout-item">
              <img src="${item.image}" alt="${item.name}">
              <div>
                <p class="checkout-item-name">${item.name}</p>
                <p class="checkout-item-qty">Qty: ${item.quantity}</p>
              </div>
              <span>৳${item.price * item.quantity}</span>
            </div>
          `).join("")}
        </div>

        <div class="summary-row"><span>Subtotal</span><span>৳${subtotal}</span></div>
        <div class="summary-row"><span>Delivery Fee</span><span id="delivery-fee-display">—</span></div>
        <div class="summary-row summary-total"><span>Total</span><span id="total-display">৳${subtotal}</span></div>

        <button type="submit" class="btn btn-primary checkout-submit-btn">Place Order</button>
      </aside>

    </form>
  `;

  const form = document.getElementById("checkout-form");
  const areaSelect = form.deliveryArea;
  const deliveryFeeDisplay = document.getElementById("delivery-fee-display");
  const totalDisplay = document.getElementById("total-display");

  areaSelect.addEventListener("change", () => {
    const fee = DELIVERY_FEES[areaSelect.value] || 0;
    deliveryFeeDisplay.textContent = areaSelect.value ? `৳${fee}` : "—";
    totalDisplay.textContent = `৳${subtotal + fee}`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const orderId = "YP" + Math.floor(100000 + Math.random() * 900000);
    const customerName = form.name.value;

    checkoutContent.innerHTML = `
      <div class="order-confirmation">
        <span class="empty-icon">✅</span>
        <h2>Thank you, ${customerName}!</h2>
        <p>Your order <strong>#${orderId}</strong> has been placed.</p>
        <p class="confirmation-note">We'll call you shortly to confirm delivery. Pay by Cash on Delivery when your parcel arrives.</p>
        <a href="index.html" class="btn btn-primary">Back to Home</a>
      </div>
    `;

    clearCart();
  });
}

renderCheckout();
