## Project Structure

```
.
├── .nuxt/                 # Auto-generated Nuxt build directory (do not edit)
├── assets/                # Uncompiled assets (CSS, images, fonts)
├── components/            # Vue components (.vue files)
│   ├── AppHeader.vue      # Reusable Header components
│   └── Breadcrumbs.vue    # Reusable Breadcrumbs components
├── data/                  # Json data
├── layouts/               # Layouts for pages, such as default.vue
├── pages/                 # Auto-routed Vue pages
│   ├── shipment/          # Shipment page
│   │    ├── detail.vue    # Detail page
│   │    └── index.vue     # Index page for shipment
│   ├── index.vue          # First loaded page
│   └── shipment.vue       # Static route
├── public/                # Static assets
├── stores/                # Pinia stores
├── app.config.ts          # App configuration file
├── nuxt.config.ts         # Nuxt configuration file
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
