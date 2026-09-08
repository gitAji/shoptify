/* Reloop Resale — static preview interactions
   Sample data + a small client-side cart (localStorage) so the mockup is
   click-through-able without any backend. Not representative of the real
   theme's Ajax cart (which talks to Shopify's /cart/*.js endpoints) —
   see assets/cart.js and assets/product-form.js in the theme itself. */
(function () {
  'use strict';

  /* ---------- Placeholder "photography" icons ---------- */
  var ICONS = {
    jacket: '<path d="M8 2 4 5v4l2-1v12h12V8l2 1V5l-4-3-4 2-4-2z"/><line x1="12" y1="4" x2="12" y2="10"/>',
    pants: '<path d="M6 2h12l1 8-3 1-1 11H11l-1-9-1 9H5l-1-11-3-1z"/>',
    shoe: '<path d="M3 18v-4c0-1 .5-2 1.5-2.3L11 9l3-3 3 2-2 2 4 2c1.2.5 2 1.6 2 3v2z"/><line x1="3" y1="18" x2="21" y2="18"/>',
    bag: '<path d="M6 8h12l1 13H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    dress: '<path d="M9 2h6l1 5-2 1 3 13H7l3-13-2-1z"/>',
    shirt: '<path d="m8 3 4 2 4-2 4 4-3 3v10H7V10L4 7z"/>',
    hanger: '<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7l7.94 5.3a2 2 0 0 1 .89 1.98L21 17H3l.17-2.72a2 2 0 0 1 .89-1.98L12 7V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2Z"/>',
    headphones: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><rect x="3" y="14" width="4" height="6" rx="1.5"/>',
    jar: '<path d="M8 2h8l1 3H7l1-3z"/><path d="M6.5 5h11L19 20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L6.5 5z"/><line x1="6" y1="11" x2="18" y2="11"/>',
    frame: '<rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5-4 4-3-3-6 6"/>',
    lamp: '<path d="M9 2h6l3 8H6l3-8z"/><line x1="12" y1="10" x2="12" y2="17"/><path d="M9 22h6"/><path d="M10 17h4l1.5 5h-7L10 17z"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M20 19H6.5a2.5 2.5 0 0 0 0 5H20"/>'
  };

  function iconSvg(name, size) {
    size = size || 32;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.hanger) + '</svg>';
  }

  function placeholder(icon, phClass, size) {
    return '<div class="placeholder-img-wrap ' + phClass + '" style="width:100%;height:100%;"><div class="placeholder-img">' + iconSvg(icon, size) + '</div></div>';
  }
  window.ReloopPlaceholder = placeholder;

  /* ---------- Sample product catalog ----------
     Categories follow Shopify's own top-level store categories (per its
     Standard Product Taxonomy and the niches Shopify itself calls out as
     most popular: Apparel & Accessories, Electronics, Food/Beverages,
     Arts & Entertainment, plus a catch-all) rather than clothing-only
     subcategories, so the catalog demonstrates a general marketplace. */
  var PRODUCTS = [
    { id: 'p1', title: "Patagonia Better Sweater Fleece", vendor: 'Patagonia', category: 'Fashion & Apparel', condition: 'like-new', price: 58, compareAt: 139, icon: 'jacket', ph: 'ph-1', featured: true },
    { id: 'p2', title: "Levi's 501 Original Straight Jeans", vendor: "Levi's", category: 'Fashion & Apparel', condition: 'good', price: 34, compareAt: 98, icon: 'pants', ph: 'ph-4' },
    { id: 'p3', title: 'Nike Air Max 90 Sneakers', vendor: 'Nike', category: 'Fashion & Apparel', condition: 'like-new', price: 62, compareAt: 130, icon: 'shoe', ph: 'ph-3', featured: true },
    { id: 'p4', title: 'Coach Leather Crossbody Bag', vendor: 'Coach', category: 'Fashion & Apparel', condition: 'good', price: 89, compareAt: 295, icon: 'bag', ph: 'ph-6' },
    { id: 'p5', title: 'The North Face Nuptse Puffer', vendor: 'The North Face', category: 'Fashion & Apparel', condition: 'fair', price: 72, compareAt: 220, icon: 'jacket', ph: 'ph-1', featured: true },
    { id: 'p6', title: 'Carhartt Workwear Chore Coat', vendor: 'Carhartt', category: 'Fashion & Apparel', condition: 'good', price: 54, compareAt: 150, icon: 'jacket', ph: 'ph-2' },
    { id: 'p7', title: 'Vintage Wrangler Denim Jacket', vendor: 'Wrangler', category: 'Fashion & Apparel', condition: 'fair', price: 40, compareAt: 95, icon: 'jacket', ph: 'ph-4', soldOut: true, oneOfOne: true },
    { id: 'p8', title: 'Reformation Floral Midi Dress', vendor: 'Reformation', category: 'Fashion & Apparel', condition: 'new', price: 48, compareAt: 128, icon: 'dress', ph: 'ph-5', featured: true },
    { id: 'p9', title: "Dr. Martens 1460 Boots", vendor: 'Dr. Martens', category: 'Fashion & Apparel', condition: 'good', price: 58, compareAt: 170, icon: 'shoe', ph: 'ph-3' },
    { id: 'p10', title: 'Burberry Wool Scarf', vendor: 'Burberry', category: 'Fashion & Apparel', condition: 'like-new', price: 65, compareAt: 220, icon: 'shirt', ph: 'ph-6' },
    { id: 'p11', title: 'Patagonia Down Vest', vendor: 'Patagonia', category: 'Fashion & Apparel', condition: 'new', price: 61, compareAt: 149, icon: 'jacket', ph: 'ph-1' },
    { id: 'p12', title: 'Madewell High-Rise Jeans', vendor: 'Madewell', category: 'Fashion & Apparel', condition: 'like-new', price: 32, compareAt: 88, icon: 'pants', ph: 'ph-4' },

    { id: 'p13', title: 'AirPods Pro (2nd Gen) — Refurbished', vendor: 'Apple', category: 'Electronics & Phone Accessories', condition: 'like-new', price: 89, compareAt: 249, icon: 'headphones', ph: 'ph-3', featured: true },
    { id: 'p14', title: 'iPhone 13 Silicone Case — Open Box', vendor: 'Apple', category: 'Electronics & Phone Accessories', condition: 'new', price: 15, compareAt: 49, icon: 'headphones', ph: 'ph-6' },
    { id: 'p15', title: 'Sony WH-1000XM4 Headphones', vendor: 'Sony', category: 'Electronics & Phone Accessories', condition: 'good', price: 118, compareAt: 350, icon: 'headphones', ph: 'ph-3' },

    { id: 'p16', title: 'Overstock Specialty Olive Oil Gift Set', vendor: 'Local Pantry Co.', category: 'Grocery & Food', condition: 'new', price: 18, compareAt: 45, icon: 'jar', ph: 'ph-5' },
    { id: 'p17', title: 'Surplus Artisan Coffee Beans (Bulk Bag)', vendor: 'Roast Collective', category: 'Grocery & Food', condition: 'new', price: 12, compareAt: 28, icon: 'jar', ph: 'ph-4', featured: true },

    { id: 'p18', title: 'Vintage Botanical Print, Framed', vendor: 'Estate Find', category: 'Art & Prints', condition: 'good', price: 22, compareAt: 60, icon: 'frame', ph: 'ph-2', featured: true },
    { id: 'p19', title: 'Signed Concert Poster — 1998 Tour', vendor: 'Estate Find', category: 'Art & Prints', condition: 'fair', price: 35, compareAt: 90, icon: 'frame', ph: 'ph-1', soldOut: true, oneOfOne: true },

    { id: 'p20', title: 'Ceramic Table Lamp', vendor: 'Home Studio', category: 'Others', condition: 'like-new', price: 28, compareAt: 75, icon: 'lamp', ph: 'ph-5', featured: true },
    { id: 'p21', title: 'Hardcover Novel Set (3 books)', vendor: 'Reader’s Corner', category: 'Others', condition: 'good', price: 14, compareAt: 40, icon: 'book', ph: 'ph-6' }
  ];
  window.ReloopProducts = PRODUCTS;

  var CONDITION_LABEL = { new: 'New', 'like-new': 'Like New', good: 'Good', fair: 'Fair' };

  function money(amount) {
    return '$' + amount.toFixed(2).replace(/\.00$/, '');
  }

  function productCardHTML(p) {
    var savings = p.compareAt ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100) : 0;
    return (
      '<div class="product-grid__item">' +
        '<div class="product-card">' +
          '<a href="product.html?id=' + p.id + '" class="product-card__media-link">' +
            '<div class="product-card__media">' +
              placeholder(p.icon, p.ph) +
              '<div class="product-card__badges">' +
                '<span class="badge badge--condition" style="--badge-color: var(--color-condition-' + p.condition + ')">' + CONDITION_LABEL[p.condition] + '</span>' +
                (savings > 0 ? '<span class="badge badge--savings">-' + savings + '%</span>' : '') +
              '</div>' +
              (p.soldOut ? '<span class="badge badge--sold-out">Sold out</span>' : '') +
            '</div>' +
          '</a>' +
          '<div class="product-card__info">' +
            '<p class="product-card__vendor">' + p.vendor + '</p>' +
            '<h3 class="product-card__title"><a href="product.html?id=' + p.id + '">' + p.title + '</a></h3>' +
            '<div class="price' + (p.compareAt ? ' price--on-sale' : '') + '">' +
              (p.compareAt ? '<span class="price__compare"><s>' + money(p.compareAt) + '</s></span>' : '') +
              '<span class="price__current">' + money(p.price) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }
  window.ReloopProductCard = productCardHTML;

  function renderGrid(containerId, products) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = products.map(productCardHTML).join('');
  }
  window.ReloopRenderGrid = renderGrid;

  /* ---------- Cart (localStorage-backed, demo only) ---------- */
  var CART_KEY = 'reloop_preview_cart';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
  }

  function addToCart(item) {
    var cart = getCart();
    var existing = cart.find(function (line) { return line.id === item.id && line.variant === item.variant; });
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      cart.push({ id: item.id, title: item.title, vendor: item.vendor, variant: item.variant || null, price: item.price, icon: item.icon, ph: item.ph, condition: item.condition, qty: item.qty || 1 });
    }
    saveCart(cart);
    renderCart();
    openDrawer(document.getElementById('cart-drawer'));
  }
  window.ReloopAddToCart = addToCart;

  function changeQty(index, delta) {
    var cart = getCart();
    if (!cart[index]) return;
    cart[index].qty = Math.max(0, cart[index].qty + delta);
    if (cart[index].qty === 0) cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function removeLine(index) {
    var cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function renderCart() {
    var cart = getCart();
    var countEls = document.querySelectorAll('[data-cart-count]');
    var itemCount = cart.reduce(function (sum, l) { return sum + l.qty; }, 0);
    countEls.forEach(function (el) {
      el.textContent = itemCount;
      el.hidden = itemCount === 0;
    });

    var body = document.getElementById('cart-drawer-body');
    var footer = document.getElementById('cart-drawer-footer');
    if (!body) return;

    if (cart.length === 0) {
      body.innerHTML = '<div class="cart-drawer__empty"><p>Your bag is empty</p><a href="collection.html" class="button button--primary" data-cart-drawer-close>Keep browsing</a></div>';
      if (footer) footer.hidden = true;
      return;
    }

    if (footer) footer.hidden = false;
    var subtotal = 0;
    body.innerHTML = '<ul class="cart-drawer__items">' + cart.map(function (line, index) {
      subtotal += line.price * line.qty;
      return (
        '<li class="cart-line">' +
          '<div class="cart-line__image-link" style="width:76px;">' + placeholder(line.icon, line.ph, 24) + '</div>' +
          '<div class="cart-line__details">' +
            '<p class="cart-line__vendor">' + line.vendor + '</p>' +
            '<span class="cart-line__title">' + line.title + '</span>' +
            (line.variant ? '<p class="cart-line__variant">' + line.variant + '</p>' : '') +
            (line.condition ? '<span class="badge badge--condition" style="--badge-color: var(--color-condition-' + line.condition + ')">' + CONDITION_LABEL[line.condition] + '</span>' : '') +
            '<div class="cart-line__price-row">' +
              '<div class="quantity">' +
                '<button type="button" class="quantity__button" data-cart-qty-decrease="' + index + '" aria-label="Decrease quantity">−</button>' +
                '<input type="number" class="quantity__input" value="' + line.qty + '" min="0" data-cart-qty-input="' + index + '" readonly>' +
                '<button type="button" class="quantity__button" data-cart-qty-increase="' + index + '" aria-label="Increase quantity">+</button>' +
              '</div>' +
              '<span class="cart-line__final-price">' + money(line.price * line.qty) + '</span>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="cart-line__remove icon-button" data-cart-remove="' + index + '" aria-label="Remove">✕</button>' +
        '</li>'
      );
    }).join('') + '</ul>';

    document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.hidden = itemCount === 0; });
    var subtotalEl = document.getElementById('cart-drawer-subtotal');
    if (subtotalEl) subtotalEl.textContent = money(subtotal);

    body.querySelectorAll('[data-cart-qty-increase]').forEach(function (btn) {
      btn.addEventListener('click', function () { changeQty(parseInt(btn.dataset.cartQtyIncrease, 10), 1); });
    });
    body.querySelectorAll('[data-cart-qty-decrease]').forEach(function (btn) {
      btn.addEventListener('click', function () { changeQty(parseInt(btn.dataset.cartQtyDecrease, 10), -1); });
    });
    body.querySelectorAll('[data-cart-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () { removeLine(parseInt(btn.dataset.cartRemove, 10)); });
    });
  }

  /* ---------- Drawers ---------- */
  function openDrawer(el) {
    if (!el) return;
    el.setAttribute('data-open', '');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(el) {
    if (!el) return;
    el.removeAttribute('data-open');
    document.body.style.overflow = '';
  }
  function closeAllDrawers() {
    document.querySelectorAll('.menu-drawer, .search-drawer, .cart-drawer').forEach(closeDrawer);
  }

  document.addEventListener('click', function (event) {
    var toggleMenu = event.target.closest('[data-menu-drawer-toggle]');
    var closeMenu = event.target.closest('[data-menu-drawer-close]');
    var toggleSearch = event.target.closest('[data-search-drawer-toggle]');
    var closeSearch = event.target.closest('[data-search-drawer-close]');
    var toggleCart = event.target.closest('[data-cart-drawer-toggle]');
    var closeCart = event.target.closest('[data-cart-drawer-close]');

    if (toggleMenu) { closeAllDrawers(); openDrawer(document.getElementById('menu-drawer')); }
    else if (closeMenu) closeDrawer(document.getElementById('menu-drawer'));
    else if (toggleSearch) { event.preventDefault(); closeAllDrawers(); openDrawer(document.getElementById('search-drawer')); }
    else if (closeSearch) closeDrawer(document.getElementById('search-drawer'));
    else if (toggleCart) { event.preventDefault(); closeAllDrawers(); openDrawer(document.getElementById('cart-drawer')); }
    else if (closeCart) closeDrawer(document.getElementById('cart-drawer'));
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAllDrawers();
  });

  document.addEventListener('submit', function (event) {
    if (event.target.matches('[data-demo-form]')) {
      event.preventDefault();
      var success = event.target.querySelector('.form-success');
      if (success) success.hidden = false;
      event.target.reset();
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    renderCart();

    var newArrivals = PRODUCTS.filter(function (p) { return p.featured; });
    renderGrid('new-arrivals-grid', newArrivals);
    renderGrid('collection-grid', PRODUCTS);
  });
})();
