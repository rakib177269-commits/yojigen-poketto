# Yojigen Poketto — Website (Version 1, Frontend Only)

A mobile-first e-commerce website for Yojigen Poketto, built with plain HTML, CSS and JavaScript (no frameworks, no backend yet).

## How to run it

1. Open this folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. In the file Explorer (not a tab), right-click `index.html` → **Open with Live Server**.
4. The site opens in your browser and auto-refreshes whenever you save a file.

## Folder structure

```
yojigen-poketto/
├── index.html              Home page
├── products.html           Shop page (search + category filter)
├── product-details.html    Single product page (reads ?id=)
├── cart.html                Cart page
├── checkout.html            Checkout page
├── about.html                About Us
├── contact.html              Contact page
├── css/
│   └── style.css            One shared stylesheet for the whole site
└── js/
    ├── data.js               Product data ("fake database") + helper functions
    ├── cart-utils.js          Cart logic, saved to localStorage — loaded on every page
    ├── main.js                Shared behavior: mobile nav, toast, product cards, add-to-cart
    ├── products.js            Shop page: search + filtering
    ├── product-details.js     Product page: quantity selector, related products
    ├── cart.js                 Cart page: quantity controls, remove, totals
    └── checkout.js             Checkout page: form validation, order confirmation
```

## How the cart works right now

There's no backend yet, so the cart lives in your browser's `localStorage` under the key `yojigen_cart`. It survives page refreshes, but it's local to your browser/device — placing a "real" order on `checkout.html` just clears it and shows a confirmation message. When a backend gets added later, only `cart-utils.js` and `checkout.js` will need to change — everything else stays the same.

## 🔧 Placeholders to replace with your real info

Search each HTML file for `🔧` comments. You'll find these in `index.html`, `products.html`, `product-details.html`, `cart.html`, `checkout.html`, `about.html`, and `contact.html` (footer + relevant sections):

- Instagram URL: `https://instagram.com/yojigenpoketto`
- Facebook URL: `https://facebook.com/yojigenpoketto`
- WhatsApp number: `https://wa.me/8801XXXXXXXXX` (your number, no `+` or spaces)
- Phone: `+880 1XXX-XXXXXX`
- Email: `hello@yojigenpoketto.com`

## Product images

Currently using [placehold.co](https://placehold.co) placeholder images (colored squares with text) defined in `js/data.js`. To use real photos: put image files in an `images/products/` folder, then update each product's `image` field in `js/data.js` to point to that path (e.g. `images/products/naruto.jpg`).

## What's next (not built yet, on purpose)

Database, admin panel, real product/stock management, online payment (bKash/Nagad/SSLCommerz), and order tracking — these all require a backend, which is the next phase after this frontend is finalized.
