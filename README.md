# Reloop Resale — a Shopify Online Store 2.0 theme for reselling

A from-scratch Shopify theme built for stores that **resell** goods — thrifted,
pre-loved, refurbished, surplus, or trade-in inventory — rather than sell new
stock from a single brand. It's built on the standard Online Store 2.0
architecture (JSON templates + Liquid sections/snippets), so every section is
merchant-customizable in the theme editor without touching code.

## Why a resale-specific theme?

Generic themes assume every item is new, infinite stock, and one price.
Resale inventory usually isn't:

- Items are often **one-of-a-kind** — once a variant sells, it's really gone.
- Buyers want to know **condition** (New, Like New, Good, Fair) up front.
- Trust matters more than usual — shoppers want to know items are
  **authenticated/inspected**, not just "as pictured."
- Pricing is naturally comparative — "$45, was $120 retail" — so **savings
  messaging** is a first-class UI element, not an afterthought.
- Many resale businesses also **buy from customers** ("sell with us" /
  trade-in), which is a conversion path a normal retail theme has no UI for.

This theme builds all of that in as native, toggleable features rather than
things you'd bolt on with a dozen apps.

## Resale-specific features

- **Condition badges** — reads a `condition:<value>` product tag or a
  `custom.condition` metafield and renders a colored badge (New, Like New,
  Good, Fair) on product cards, the product page, and cart line items.
  Colors are theme-editor configurable.
- **Authenticity guarantee badge** — a configurable trust badge shown on
  every product page, plus an "Authenticity guarantee" accordion tab.
- **One-of-a-kind notice** — when a single-variant product sells out, the
  product page shows "One-of-a-kind piece — once it's gone, it's gone."
  instead of a generic "sold out."
- **Retail vs. resale pricing** — price snippet automatically shows the
  struck-through compare-at price (labeled "Retail price" by default) plus
  a "Save X%" badge whenever `compare_at_price` is set — on cards, the
  product page, and via live variant switching.
- **"Sell with us" section** — a homepage section (and site-wide link
  setting) that points to your trade-in / consignment intake flow.
- **"How it works" section** — a 4-step explainer for your buy-back /
  resale pipeline (submit → ship → we authenticate & list → get paid).
- **Trust badges row** and **testimonials** — reusable social-proof blocks
  tuned for resale messaging (authenticated, easy returns, circular
  fashion / sustainability).
- **Brand marquee** — a scrolling strip of the brands you resell, useful
  when you carry many labels instead of one.
- **Cart reassurance note** — a configurable rich-text note in the cart
  reminding shoppers that resale stock is limited/one-off.

None of this is hard-coded — every piece of copy, every badge label/color,
and every section's presence is a theme setting or block, editable from
**Online Store → Themes → Customize**.

## Structure

```
layout/theme.liquid          Base HTML shell: head, header/footer, cart & search drawers, scripts
config/settings_schema.json  Theme editor settings (colors, type, resale settings, cart, social)
config/settings_data.json    Default values for those settings
locales/en.default.json      UI strings
sections/                    Reusable, theme-editor-configurable page sections
snippets/                    Small reusable Liquid partials (product-card, price, condition-badge, icon, ...)
templates/                   JSON templates wiring sections into pages (index, product, collection, cart, ...)
assets/                      base.css (all styles) + theme.js / product-form.js / cart.js (no build step, no framework)
```

Key sections:

| Section | Purpose |
|---|---|
| `header.liquid` | Announcement bar, logo, nav, search/account/cart icons, mobile menu drawer |
| `footer.liquid` | About blurb, menu/text/newsletter blocks, social links, trust line |
| `cart-drawer.liquid` | Slide-out cart, AJAX add/update/remove via the Section Rendering API |
| `hero-banner.liquid` | Homepage hero with dual CTAs |
| `trust-badges.liquid` | Configurable icon+text trust badges (blocks) |
| `featured-collection.liquid` | Product grid pulled from any collection |
| `how-it-works.liquid` | Step-by-step resale/trade-in explainer (blocks) |
| `brand-marquee.liquid` | Scrolling brand strip (blocks) |
| `sell-with-us.liquid` | Trade-in / consignment CTA banner |
| `testimonials.liquid` | Star-rated quote cards (blocks) |
| `newsletter.liquid` | Email capture (uses Shopify's native customer form) |
| `main-product.liquid` | Gallery, variant picker, condition/authenticity badges, price, accordion |
| `main-collection.liquid` | Storefront filtering (`collection.filters`), sorting, pagination |
| `main-cart.liquid` | Full cart page (used when the "Cart type" setting is "Page") |

## Setting product condition

The `condition-badge` snippet looks for, in order:

1. A metafield `custom.condition` (single line text) on the product.
2. A product tag formatted `condition:<value>`, e.g. `condition:like-new`.

Recognized values map to badge colors/labels: `new` / `deadstock` → **New**,
`like-new` → **Like New**, `good` → **Good**, `fair` → **Fair**. Anything
else is shown as-is with the "Good" color. Toggle badges off entirely under
**Theme settings → Resale settings**.

## Cart

Two cart types are supported via **Theme settings → Cart → Cart type**:

- **Drawer** (default) — a slide-out cart updated via `fetch` + Shopify's
  Section Rendering API (`?sections=cart-drawer`), no full page reloads.
- **Page** — classic `/cart` page, also AJAX-updated in place.

Add-to-cart, quantity change, and line-item removal all use Shopify's
`/cart/add.js`, `/cart/change.js`, and `/cart.js` endpoints — no cart app
required.

## Static design preview (`static-preview/`)

This repository's real deliverable — `layout/`, `sections/`, `snippets/`,
`templates/`, `config/`, `locales/` — is **Shopify theme source code**. It's
Liquid + JSON that only renders inside Shopify's own infrastructure (the
Storefront/Admin APIs, cart, checkout, product data). It **cannot** be
deployed to a static host like Netlify, Vercel, or GitHub Pages — there's no
Liquid engine or backend there to run it, so a static host just serves the
raw `.liquid`/`.json` files as text with no working homepage.

For a look-and-feel preview that *can* run on a static host, `static-preview/`
is a small, separate, self-contained mockup (plain HTML/CSS/JS, no build
step) that reuses the theme's actual visual design — same stylesheet, same
component structure — with sample product data and a `localStorage`-backed
cart so it's click-through-able. `netlify.toml` points this repo's connected
Netlify site at that folder. **It is a design preview only**: there's no real
inventory, checkout, or backend behind it (an on-page banner says so). To see
the actual working theme, follow "Getting started" below against a real
Shopify store.

## Getting started

1. Install the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli).
2. From the repo root: `shopify theme dev --store your-store.myshopify.com`
   to preview locally, or `shopify theme push` to upload it as a new theme
   on your store.
3. In the theme editor, set your logo, colors, and fonts under **Theme
   settings**, then fill in **Resale settings** (authenticity badge text,
   sell-with-us link, condition badge toggle) to match your business.
4. Build your navigation menus (`main-menu`, `footer`) in **Online Store →
   Navigation** — the header/footer sections read them automatically.
5. Tag or add the `custom.condition` metafield to your products so
   condition badges populate.

## Known limitations / next steps

- No blog/article templates yet (`templates/blog.json`, `templates/article.json`).
- Customer account pages (login, register, order history) intentionally fall
  back to Shopify's default account UI — add `templates/customers/*.json`
  if you want them reskinned to match this theme.
- Filtering (`main-collection.liquid`) submits as a standard form (full page
  reload); it works with any storefront filter you configure in Shopify
  Search & Discovery, but isn't AJAX-driven.
- No automated screenshot/visual tests — validate changes with
  `shopify theme check` and `shopify theme dev`.
