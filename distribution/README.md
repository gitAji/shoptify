# Distribution package (for selling Reloop Resale on themes.aone.no)

Source files for packaging Reloop Resale as a self-sold digital product on
**themes.aone.no** (author: **aone**) — not part of the Shopify theme
itself, and not uploaded to a Shopify store.

- `documentation.html` — buyer-facing setup/customization guide (also see [`../docs/USER-GUIDE.md`](../docs/USER-GUIDE.md), which is bundled alongside it in the package).
- `LICENSE.md` — draft license/EULA terms. **Have a lawyer review before publishing.**
- `listing-copy.md` — marketing copy (title, description, tags, suggested pricing) to paste into your product listing.
- `screenshots/` — desktop + mobile screenshots of the theme (home, collection, product), rendered from `static-preview/`.

## Building the buyer-ready zip

The final zip a buyer downloads bundles the installable theme (files at
its own zip root, ready for Shopify's "Upload zip file") alongside this
documentation as a sibling folder:

```
Reloop Resale package.zip
├── START HERE.md
├── Theme Files/
│   └── reloop-resale-theme.zip   ← upload this exact file to Shopify
└── Documentation/
    ├── documentation.html
    ├── LICENSE.md
    ├── listing-copy.md
    ├── USER-GUIDE.md
    └── screenshots/
```

To rebuild it after making theme changes:

```bash
STAGE=$(mktemp -d)
mkdir -p "$STAGE/pkg/Theme Files" "$STAGE/pkg/Documentation/screenshots"

# Installable theme zip (files at root)
mkdir "$STAGE/theme-root"
cp -r layout sections snippets templates assets config locales README.md "$STAGE/theme-root/"
(cd "$STAGE/theme-root" && zip -r -X -q "$STAGE/pkg/Theme Files/reloop-resale-theme.zip" .)

# Documentation
cp distribution/documentation.html distribution/LICENSE.md distribution/listing-copy.md docs/USER-GUIDE.md "$STAGE/pkg/Documentation/"
cp distribution/screenshots/*.png "$STAGE/pkg/Documentation/screenshots/"
printf '# Reloop Resale — Package Contents\n\n1. Theme Files/reloop-resale-theme.zip — upload in Shopify Admin (Online Store → Themes → Add theme → Upload zip file).\n2. Documentation/documentation.html — open in a browser.\n' > "$STAGE/pkg/START HERE.md"

(cd "$STAGE/pkg" && zip -r -X -q reloop-resale-package.zip .)
mv "$STAGE/pkg/reloop-resale-package.zip" .
```

Verify the inner theme zip installs cleanly before shipping a new build:

```bash
unzip -q "Theme Files/reloop-resale-theme.zip" -d /tmp/verify && (cd /tmp/verify && npx -y @shopify/cli theme check)
```

## What's NOT done for you

- Publishing the actual product listing on themes.aone.no.
- Legal review of `LICENSE.md`.
- Setting a final price (see `listing-copy.md` for a suggested range).
