// =====================================================
// CART UTILITIES
// Shared cart logic used across EVERY page. The cart is stored in the
// browser's localStorage as a JSON string, so it survives refreshes —
// but it only exists on this browser/device, since we have no backend yet.
//
// This file must be loaded on every page, BEFORE main.js and any
// page-specific script (products.js, cart.js, etc).
// =====================================================

const CART_KEY = "yojigen_cart";

// Read the cart array out of localStorage (or return an empty array)
function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save the cart array back into localStorage, then refresh the header badge
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Add a product to the cart. If it's already in there, increase its quantity.
function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

function updateQuantity(id, quantity) {
  const cart = getCart();
  const item = cart.find((item) => item.id === id);
  if (!item) return;

  if (quantity < 1) {
    removeFromCart(id);
    return;
  }

  item.quantity = quantity;
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
}

// Update the little number badge next to the cart icon in the header
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = getCartCount();
}

// Run once immediately when this file loads, on every page
updateCartBadge();
