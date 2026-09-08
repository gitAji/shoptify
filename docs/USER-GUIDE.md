# Reloop Resale — Store Owner's Guide

This guide is for the person running the store, not developers. If you want
the technical/code-level overview instead, see the main [README](../README.md).

## Contents

1. [What you got](#1-what-you-got)
2. [Go live checklist](#2-go-live-checklist)
3. [Choosing a color style](#3-choosing-a-color-style)
4. [Setting up your categories](#4-setting-up-your-categories)
5. [Marking item condition](#5-marking-item-condition)
6. [Homepage sections, explained](#6-homepage-sections-explained)
7. [Cart settings](#7-cart-settings)
8. ["Sell with us" / trade-in setup](#8-sell-with-us--trade-in-setup)
9. [Logo, fonts, and branding](#9-logo-fonts-and-branding)
10. [Navigation menus](#10-navigation-menus)
11. [Mobile preview](#11-mobile-preview)
12. [FAQ](#12-faq)
13. [Getting help](#13-getting-help)

---

## 1. What you got

**Reloop Resale** is a theme built specifically for stores that sell
secondhand, refurbished, surplus, or trade-in items — not brand-new stock.
Compared to a generic Shopify theme, it comes with:

- **Condition badges** (New / Like New / Good / Fair) shown automatically on
  product cards and product pages.
- An **authenticity guarantee** badge and info tab on every product.
- **"One of a kind"** messaging for items that won't be restocked once sold.
- Automatic **"Save X%"** badges whenever you set a compare-at (retail)
  price.
- A **"Sell with us"** page and homepage banner for customers who want to
  trade in or consign items to you.
- Four ready-made **color styles** you can switch between with one click —
  no designer needed.

Everything below is done from **Shopify Admin → Online Store → Themes**,
no code required.

## 2. Go live checklist

Your theme has been installed on your store as an **unpublished, draft
theme** named "Reloop Resale." It will not affect your live storefront
until you publish it. Recommended order of operations:

1. **Preview it** — Admin → Online Store → Themes → find "Reloop Resale" →
   **Preview**.
2. **Customize it** — same card → **Customize** opens the theme editor.
   Walk through sections 3–10 of this guide.
3. **Add your products and collections** if you haven't already
   (Admin → Products / Collections).
4. **Set up navigation** (see [§10](#10-navigation-menus)) so your menu
   links to the right collections.
5. **Preview on mobile** — the theme editor has a mobile/desktop toggle at
   the top; check your homepage and a product page in both.
6. When you're happy, click **Publish** on the theme card to make it your
   live storefront theme. Your previous theme is kept in your theme
   library, unpublished, so you can always roll back.

> **Note on your plan:** your store is currently on a **trial plan** — you'll
> need to upgrade before you can start selling and unlock full features.
> You can browse, customize, and preview everything below on the trial; an
> upgrade is only required before you take real orders.

## 3. Choosing a color style

The theme editor (**Customize** → **Theme settings** → **Colors**, top of
the settings panel) ships with four presets you can pick from a dropdown —
each changes the palette, headline font, and how rounded buttons/cards look,
all at once:

| Preset | Feel | Headline font |
|---|---|---|
| **Blush Bloom** (default) | Warm, soft peach/blush | Work Sans |
| **Forest Canopy** | Earthy green, natural | Playfair Display |
| **Slate Market** | Cool blue-grey, modern/sharp corners | Montserrat |
| **Terracotta Bazaar** | Warm clay/olive, artisan, soft corners | Poppins |

Pick one from the **Presets** dropdown at the top of the theme editor's
left panel, or use it as a starting point and adjust individual colors
below it — every color (buttons, backgrounds, text, all four condition
badge colors, header, footer) is its own color picker, so you can build a
fully custom palette instead if you prefer. All four presets, and any
custom combination that keeps text on top of its matching background, meet
accessibility contrast standards so text stays readable for all shoppers.

## 4. Setting up your categories

This theme doesn't hardcode any product categories — you build them the
same way you would on any Shopify store, using **Collections**:

1. Admin → **Products → Collections → Create collection**.
2. Give it a name (e.g. "Fashion & Apparel," "Electronics," "Home &
   Grocery," "Art & Prints") and choose which products belong in it
   (manually, or automatically by tag/type/vendor).
3. Repeat for each category you sell in.
4. Add each collection to your navigation menu (see [§10](#10-navigation-menus))
   so shoppers can browse by category — or add a "Shop by category" section
   to your homepage listing several collections at once.

Popular resale categories worth considering, based on what does well on
Shopify generally: **Fashion & Apparel**, **Electronics & Phone
Accessories**, **Home & Grocery/surplus goods**, **Art & Prints/collectibles**,
and a catch-all **Others/Everything Else**. You're not limited to these —
create whatever categories match your actual inventory.

## 5. Marking item condition

For each product, tell the theme its condition one of two ways:

- **Easiest — a product tag.** On the product's edit page, add a tag in the
  format `condition:like-new` (also supports `condition:new`,
  `condition:good`, `condition:fair`, `condition:deadstock`).
- **More structured — a metafield.** If you manage many products, set up a
  `custom.condition` text metafield (Admin → Settings → Custom data →
  Products) and fill it in per product; this also makes condition
  filterable/searchable.

The matching colored badge then appears automatically on that product's
card, product page, and in the cart. You can turn condition badges off
entirely, or change their colors/labels, under **Theme settings → Resale
settings** and **Theme settings → Colors**.

## 6. Homepage sections, explained

Open **Customize** and you'll see a stack of sections down the left side.
Click any section to edit its text/images, click **Add section** to add
more, drag to reorder, or click the eye icon to hide one you don't want.
Sections that ship with the homepage by default:

| Section | What it's for |
|---|---|
| Hero banner | Big top image/text with two buttons (e.g. "Shop now" / "Sell your items") |
| Trust badges | Row of 4 short trust points (authenticated, shipping, returns, sustainability) |
| Featured collection | A grid of products from one collection you pick |
| How it works | 4-step explainer of your buy-back/resale process |
| Brand marquee | Scrolling strip of brand names you resell |
| Sell with us | Banner promoting your trade-in/consignment intake |
| Testimonials | Star-rated customer quotes |
| Newsletter | Email signup form |

Every block of text, every button label and link, and every icon is
editable — none of it is hardcoded.

## 7. Cart settings

Under **Theme settings → Cart**, choose:

- **Cart type: Drawer** (default) — clicking "Add to cart" slides out a
  cart panel without leaving the page.
- **Cart type: Page** — clicking "Add to cart" takes shoppers to a
  dedicated `/cart` page.

You can also set a **cart note** — a short reminder shown in the cart
(e.g. "Resale items are one-of-a-kind — we can't guarantee restock").

## 8. "Sell with us" / trade-in setup

If you buy inventory from customers, set this up so the "Sell with us"
button on your homepage/header actually goes somewhere useful:

1. Create a page for your intake process: Admin → **Online Store → Pages →
   Add page**. Explain what you accept, how payout works, and add a
   contact form or link to your intake tool.
2. In **Theme settings → Resale settings**, set the "Sell with us" link to
   point at that page.
3. Edit the homepage "Sell with us" section and "How it works" section
   text so the steps match your real process.

## 9. Logo, fonts, and branding

- **Logo**: Theme settings → Logo — upload an image; set its width for
  desktop and mobile separately.
- **Fonts**: each color preset (§3) comes with a matching heading font
  already picked; the body font stays consistent across presets for
  readability. You can override either under Theme settings → Typography
  if you want a fully custom combination.
- **Favicon**: Theme settings → Favicon.

## 10. Navigation menus

The header and footer both read real Shopify navigation menus — build them
under **Admin → Online Store → Navigation**:

- **Main menu** — powers the header nav and mobile menu drawer.
- **Footer menu** — powers one of the footer's link columns.

Add, remove, rename, or reorder links there any time; the theme picks up
changes automatically, no theme-editor changes needed.

## 11. Mobile preview

Every section in this theme is built to be fully responsive. Use the
desktop/mobile toggle at the top of the theme editor to check your
homepage, a product page, and your cart on a small screen before
publishing — pay special attention to your hero banner text length and any
long product titles.

## 12. FAQ

**Q: I published the theme and my blog/customer account pages look
unstyled.**
A: This theme currently ships homepage, collection, product, cart, page,
and search templates. Blog, article, and customer-account pages aren't
themed yet and will fall back to a generic look until custom templates are
added — see the README's "Known limitations" section. If you don't run a
blog and use Shopify's standard checkout/account flow, this won't affect
most shoppers.

**Q: Can I change condition badge colors/labels?**
A: Yes — Theme settings → Colors for the four badge colors, and Theme
settings → Resale settings for whether badges show at all.

**Q: How do I go back to my old theme?**
A: Admin → Online Store → Themes — your previous theme stays in your theme
library unpublished after you switch; click **Publish** on it to switch back.

**Q: Do I need any apps for the cart or trust badges to work?**
A: No — cart, condition badges, and trust badges are all built into the
theme itself.

**Q: Will this theme work well on phones?**
A: Yes — it was built mobile-first and tested at common phone/tablet/
desktop widths; every section reflows without horizontal scrolling.

## 13. Getting help

- Theme structure and developer-facing details: see the [README](../README.md).
- Shopify's own help center: [help.shopify.com](https://help.shopify.com).
- For code-level changes (new sections, template edits), you'll need a
  developer familiar with Shopify Liquid themes — see the README's
  "Getting started" section for the Shopify CLI workflow.
