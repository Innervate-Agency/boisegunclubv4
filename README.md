# Boise Gun Club Website

## Font Requirements

The site uses the following premium fonts through Adobe Fonts (Typekit):

- "refrigerator-deluxe" for headings and titles
- "museo-sans" for body text and UI elements

The Adobe Fonts integration has been set up in `src/app/layout.tsx` using the direct CSS link method:
```html
<link rel="stylesheet" href="https://use.typekit.net/gly5pnr.css">
```

### Font Usage

For consistency, use these utility classes across components:

```jsx
// For headings and titles
<h1 className="font-heading">Heading Text</h1>

// For body text
<p className="font-body">Body content</p>
```

Or reference the fonts directly in Tailwind classes:

```jsx
<h1 className="font-['refrigerator-deluxe']">Heading Text</h1>
<p className="font-['museo-sans']">Body content</p>
```

"DM Sans" is included as a fallback if Adobe Fonts fails to load.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
