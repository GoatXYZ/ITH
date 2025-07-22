# Knowledge Base Application

This is a Next.js-based knowledge base application running in hybrid mode.

## Features

- Documentation pages with MDX support
- Contact form with server-side processing
- Responsive design with Tailwind CSS
- Full hybrid deployment capability

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application uses Next.js in hybrid mode, which means:

- Static pages (like documentation) are pre-rendered at build time
- Dynamic features (like the contact form) use server components and API routes

### Building for Production

```bash
yarn build
```

### Starting Production Server

```bash
yarn start
```

### Testing Hybrid Deployment

To test the hybrid deployment setup with Caddy:

```bash
./test-hybrid.sh
```

## Documentation

- Documentation pages are stored as MDX files in `docs/content/`
- UI components are in the `components/` directory
- Utility functions are in the `lib/` directory

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)