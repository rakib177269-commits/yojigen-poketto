// =====================================================
// PRODUCT DATA
// This array is our temporary "database". Later, when a real backend
// exists, this file gets replaced by API calls — but every other file
// (main.js, products.js, product-details.js) will keep working the
// same way, because they all just call getProductById() / PRODUCTS.
// =====================================================

const PRODUCTS = [
  { id: 1,  name: "Naruto Keyring",        category: "anime",   price: 200, image: "https://placehold.co/500x500/FF6FA0/ffffff?text=Naruto",     description: "A pocket-sized chibi Naruto charm with a sturdy metal ring — clips onto keys, bags, or your phone strap.", inStock: true,  featured: true  },
  { id: 2,  name: "Pika Pika Pikachu",          category: "gaming",  price: 200, image: "https://placehold.co/500x500/FFC857/211B3D?text=Pikachu",     description: "A retro pixel-art Pikachu charm for gamers who grew up mashing buttons. Durable acrylic with a glossy finish.", inStock: true,  featured: true  },
  { id: 3,  name: "Totoro Soft Charm",            category: "cute",    price: 200, image: "https://placehold.co/500x500/6FE0C0/211B3D?text=Totoro",      description: "A soft, huggable mini Totoro charm — the comfort character for your keys.", inStock: true,  featured: true  },
  { id: 4,  name: "Stitch Mini Keyring",          category: "cartoon", price: 200, image: "https://placehold.co/500x500/2A2360/ffffff?text=Stitch",      description: "Mischievous Stitch in mini form, ready to hang off your backpack or bag.", inStock: true,  featured: true  },
  { id: 5,  name: "Luffy Straw Hat Charm",        category: "anime",   price: 200, image: "https://placehold.co/500x500/FF6FA0/ffffff?text=Luffy",       description: "Set sail with this Straw Hat charm featuring Luffy's iconic hat detail.", inStock: true,  featured: false },
  { id: 6,  name: "Among Us Crewmate",            category: "gaming",  price: 200, image: "https://placehold.co/500x500/FFC857/211B3D?text=Crewmate",    description: "The classic crewmate silhouette in charm form — sus but adorable.", inStock: true,  featured: false },
  { id: 7,  name: "Kuromi Bow Charm",             category: "cute",    price: 200, image: "https://placehold.co/500x500/6FE0C0/211B3D?text=Kuromi",      description: "Punk-cute Kuromi with her signature skull bow. A fan favorite.", inStock: true, featured: false },
  { id: 8,  name: "Mickey Classic Charm",         category: "cartoon", price: 200, image: "https://placehold.co/500x500/2A2360/ffffff?text=Mickey",      description: "The original mouse, reimagined as a minimalist keyring charm.", inStock: true,  featured: false },
  { id: 9,  name: "Demon Slayer Blade Charm",     category: "anime",   price: 200, image: "https://placehold.co/500x500/FF6FA0/ffffff?text=Tanjiro",     description: "A charm inspired by the iconic checkered haori pattern.", inStock: true,  featured: false },
  { id: 10, name: "Mario Mushroom Charm",         category: "gaming",  price: 210, image: "https://placehold.co/500x500/FFC857/211B3D?text=Mario",       description: "1-Up! A glossy mushroom charm for retro gaming fans.", inStock: true,  featured: false },
  { id: 11, name: "Cinnamoroll Charm",            category: "cute",    price: 260, image: "https://placehold.co/500x500/6FE0C0/211B3D?text=Cinnamoroll", description: "Fluffy, floppy-eared Cinnamoroll in soft pastel colors.", inStock: true,  featured: false },
  { id: 12, name: "SpongeBob Pineapple Charm",    category: "cartoon", price: 200, image: "https://placehold.co/500x500/2A2360/ffffff?text=SpongeBob",   description: "Who lives in a pineapple on your keychain? This guy.", inStock: true,  featured: false },
];

// Find a single product by its id (used on the Product Details page)
function getProductById(id) {
  return PRODUCTS.find((product) => product.id === Number(id));
}

// Find a few products from the same category (used for "You might also like")
function getRelatedProducts(product, count = 4) {
  return PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}
