/* Reloop Resale theme — product variant selection & add-to-cart */
(function () {
  'use strict';

  function initProductForm(section) {
    var jsonEl = section.querySelector('[data-product-json]');
    if (!jsonEl) return;

    var product;
    try {
      product = JSON.parse(jsonEl.textContent);
    } catch (e) {
      return;
    }

    var form = section.querySelector('[data-product-form]');
    var variantIdInput = section.querySelector('[data-variant-id]');
    var priceWrapper = section.querySelector('[data-product-price]');
    var addButton = section.querySelector('[data-add-to-cart]');
    var addButtonText = section.querySelector('[data-add-to-cart-text]');
    var oneOfOneNotice = section.querySelector('[data-one-of-one]');
    var skuEl = section.querySelector('[data-product-sku]');
    var optionInputs = Array.prototype.slice.call(section.querySelectorAll('[data-option-selector]'));

    function getSelectedOptions() {
      var fieldsets = section.querySelectorAll('.product-form__option');
      var options = [];
      fieldsets.forEach(function (fieldset) {
        var checked = fieldset.querySelector('input:checked');
        options.push(checked ? checked.value : null);
      });
      return options;
    }

    function findVariant(options) {
      if (!options.length) return product.variants[0];
      return product.variants.find(function (variant) {
        return [variant.option1, variant.option2, variant.option3]
          .slice(0, options.length)
          .every(function (value, index) { return value === options[index]; });
      });
    }

    function renderPrice(variant) {
      if (!priceWrapper) return;
      var onSale = variant.compare_at_price && variant.compare_at_price > variant.price;
      var html = '<div class="price' + (onSale ? ' price--on-sale' : '') + '">';
      if (onSale) {
        html += '<span class="price__compare"><s>' + window.Theme.formatMoney(variant.compare_at_price) + '</s></span>';
      }
      html += '<span class="price__current">' + window.Theme.formatMoney(variant.price) + '</span>';
      if (onSale) {
        var pct = Math.round(((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100);
        html += '<span class="badge badge--savings">Save ' + pct + '%</span>';
      }
      html += '</div>';
      priceWrapper.innerHTML = html;
    }

    function updateGallery(variant) {
      if (!variant.featured_media) return;
      var mediaId = String(variant.featured_media.id);
      var thumb = section.querySelector('[data-thumb-for="' + mediaId + '"]');
      if (thumb) thumb.click();
    }

    function onVariantChange() {
      var options = getSelectedOptions();
      var variant = findVariant(options);
      if (!variant) return;

      if (variantIdInput) variantIdInput.value = variant.id;
      renderPrice(variant);
      updateGallery(variant);
      if (skuEl) skuEl.textContent = variant.sku || '';

      if (addButton) {
        addButton.disabled = !variant.available;
      }
      if (addButtonText) {
        addButtonText.textContent = variant.available ? addButtonText.dataset.addLabel || addButtonText.textContent : 'Sold out';
      }
      if (oneOfOneNotice) {
        oneOfOneNotice.hidden = variant.available;
      }
    }

    optionInputs.forEach(function (input) {
      input.addEventListener('change', onVariantChange);
    });

    if (addButtonText && !addButtonText.dataset.addLabel) {
      addButtonText.dataset.addLabel = addButtonText.textContent;
    }

    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (addButton.disabled) return;

      var formData = new FormData(form);
      formData.append('sections', 'cart-drawer');

      addButton.disabled = true;
      var originalText = addButtonText ? addButtonText.textContent : '';
      if (addButtonText) addButtonText.textContent = 'Adding…';

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })
        .then(function (response) { return response.json().then(function (data) { return { ok: response.ok, data: data }; }); })
        .then(function (result) {
          if (!result.ok) {
            throw new Error(result.data && result.data.description ? result.data.description : 'Unable to add item to cart');
          }
          if (result.data.sections && result.data.sections['cart-drawer']) {
            var cartDrawer = document.getElementById('cart-drawer');
            if (cartDrawer) {
              var temp = document.createElement('div');
              temp.innerHTML = result.data.sections['cart-drawer'];
              var newDrawer = temp.querySelector('#cart-drawer');
              if (newDrawer) cartDrawer.replaceWith(newDrawer);
            }
          }
          return fetch('/cart.js', { headers: { Accept: 'application/json' } });
        })
        .then(function (response) { return response && response.json(); })
        .then(function (cart) {
          if (!cart) return;
          document.querySelectorAll('[data-cart-count]').forEach(function (el) {
            el.textContent = cart.item_count;
            el.hidden = cart.item_count === 0;
          });
          if (window.themeCartType !== 'page') {
            window.Theme.openDrawer(document.getElementById('cart-drawer'));
          } else {
            window.location.href = '/cart';
          }
        })
        .catch(function (error) {
          window.alert(error.message || 'Something went wrong adding this item to your cart.');
        })
        .finally(function () {
          addButton.disabled = false;
          if (addButtonText) addButtonText.textContent = originalText;
        });
    });
  }

  document.querySelectorAll('[data-product-section]').forEach(initProductForm);
})();
