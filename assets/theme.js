/* Reloop Resale theme — global interactions: drawers, gallery, sort */
(function () {
  'use strict';

  function openDrawer(el) {
    if (!el) return;
    el.setAttribute('data-open', '');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var focusable = el.querySelector('input, button, [href]');
    if (focusable) focusable.focus({ preventScroll: true });
  }

  function closeDrawer(el) {
    if (!el) return;
    el.removeAttribute('data-open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllDrawers() {
    document.querySelectorAll('.menu-drawer, .search-drawer, .cart-drawer').forEach(closeDrawer);
  }

  /* Minimal Shopify-compatible money formatter (supports {{amount}} / {{amount_no_decimals}}) */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') cents = cents.replace('.', '');
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || (window.Shopify && window.Shopify.money_format) || '${{amount}}';

    function defaultTo(value, defaultValue) {
      return value == null || value !== value ? defaultValue : value;
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultTo(precision, 2);
      thousands = defaultTo(thousands, ',');
      decimal = defaultTo(decimal, '.');
      if (isNaN(number) || number == null) return '0';
      number = (number / 100.0).toFixed(precision);
      var parts = number.split('.');
      var dollars = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousands);
      var cents = parts[1] ? decimal + parts[1] : '';
      return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      default:
        value = formatWithDelimiters(cents, 2);
    }

    return formatString.replace(placeholderRegex, value);
  }

  window.Theme = window.Theme || {};
  window.Theme.openDrawer = openDrawer;
  window.Theme.closeDrawer = closeDrawer;
  window.Theme.formatMoney = formatMoney;

  document.addEventListener('click', function (event) {
    var toggleMenu = event.target.closest('[data-menu-drawer-toggle]');
    var closeMenu = event.target.closest('[data-menu-drawer-close]');
    var toggleSearch = event.target.closest('[data-search-drawer-toggle]');
    var closeSearch = event.target.closest('[data-search-drawer-close]');
    var toggleCart = event.target.closest('[data-cart-drawer-toggle]');
    var closeCart = event.target.closest('[data-cart-drawer-close]');

    if (toggleMenu) {
      closeAllDrawers();
      openDrawer(document.getElementById('menu-drawer'));
    } else if (closeMenu) {
      closeDrawer(document.getElementById('menu-drawer'));
    } else if (toggleSearch) {
      closeAllDrawers();
      openDrawer(document.getElementById('search-drawer'));
    } else if (closeSearch) {
      closeDrawer(document.getElementById('search-drawer'));
    } else if (toggleCart) {
      if (window.themeCartType === 'page') {
        window.location.href = toggleCart.getAttribute('href') || '/cart';
        return;
      }
      event.preventDefault();
      closeAllDrawers();
      openDrawer(document.getElementById('cart-drawer'));
    } else if (closeCart) {
      closeDrawer(document.getElementById('cart-drawer'));
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAllDrawers();
  });

  /* Product gallery thumbnail switching */
  document.addEventListener('click', function (event) {
    var thumb = event.target.closest('[data-thumb-for]');
    if (!thumb) return;
    var section = thumb.closest('[data-product-section]');
    if (!section) return;
    var mediaId = thumb.getAttribute('data-thumb-for');

    section.querySelectorAll('[data-thumb-for]').forEach(function (el) {
      el.classList.toggle('is-active', el === thumb);
    });
    section.querySelectorAll('.product__gallery-image').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-media-id') === mediaId);
    });
  });

  /* Collection sort auto-submit */
  document.addEventListener('change', function (event) {
    if (event.target.matches('[data-sort-select]')) {
      event.target.closest('form').submit();
    }
  });

  /* Generic quantity steppers (product form, cart page fallback) */
  document.addEventListener('click', function (event) {
    var decrease = event.target.closest('[data-quantity-decrease]');
    var increase = event.target.closest('[data-quantity-increase]');
    if (!decrease && !increase) return;
    var wrapper = (decrease || increase).closest('.quantity');
    if (!wrapper) return;
    var input = wrapper.querySelector('.quantity__input');
    if (!input) return;
    var min = parseInt(input.min, 10) || 0;
    var value = parseInt(input.value, 10) || 0;
    if (increase) value += 1;
    if (decrease) value = Math.max(min, value - 1);
    input.value = value;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
})();
