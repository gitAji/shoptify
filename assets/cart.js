/* Reloop Resale theme — cart drawer & cart page interactions */
(function () {
  'use strict';

  var debounceTimers = {};

  function updateCartCount(itemCount) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = itemCount;
      el.hidden = itemCount === 0;
    });
  }

  function replaceSection(sectionsHtml, key, selector) {
    if (!sectionsHtml || !sectionsHtml[key]) return;
    var target = document.querySelector(selector);
    if (!target) return;
    var temp = document.createElement('div');
    temp.innerHTML = sectionsHtml[key];
    var replacement = temp.querySelector(selector);
    if (replacement) target.replaceWith(replacement);
  }

  function changeLine(line, quantity) {
    var onCartPage = !!document.querySelector('[data-cart-page-section]');
    var sectionIds = onCartPage ? 'cart-drawer,cart-items' : 'cart-drawer';

    var body = new URLSearchParams();
    body.append('line', line);
    body.append('quantity', quantity);
    body.append('sections', sectionIds);

    return fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: body.toString()
    })
      .then(function (response) { return response.json(); })
      .then(function (cart) {
        updateCartCount(cart.item_count);
        replaceSection(cart.sections, 'cart-drawer', '#cart-drawer');
        if (onCartPage) replaceSection(cart.sections, 'cart-items', '[data-cart-page-section]');
        return cart;
      });
  }

  function updateNote(note) {
    return fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: new URLSearchParams({ note: note }).toString()
    });
  }

  document.addEventListener('click', function (event) {
    var remove = event.target.closest('[data-cart-remove]');
    var increase = event.target.closest('[data-cart-quantity-increase]');
    var decrease = event.target.closest('[data-cart-quantity-decrease]');
    if (!remove && !increase && !decrease) return;

    var trigger = remove || increase || decrease;
    var line = trigger.getAttribute('data-line');
    if (!line) return;

    if (remove) {
      changeLine(line, 0);
      return;
    }

    var lineEl = trigger.closest('[data-cart-line]');
    var input = lineEl ? lineEl.querySelector('[data-cart-quantity-input]') : null;
    if (!input) return;
    var value = parseInt(input.value, 10) || 0;
    value = increase ? value + 1 : Math.max(0, value - 1);
    input.value = value;
    changeLine(line, value);
  });

  document.addEventListener('change', function (event) {
    var input = event.target.closest('[data-cart-quantity-input]');
    if (input) {
      var line = input.getAttribute('data-line');
      var value = Math.max(0, parseInt(input.value, 10) || 0);
      changeLine(line, value);
      return;
    }

    var note = event.target.closest('[data-cart-note]');
    if (note) {
      clearTimeout(debounceTimers.note);
      debounceTimers.note = setTimeout(function () {
        updateNote(note.value);
      }, 400);
    }
  });
})();
