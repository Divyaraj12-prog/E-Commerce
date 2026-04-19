# Ecommerce Demo

This is a React + Vite ecommerce demo that runs fully in the browser using localStorage.

## Run locally

1. Start the frontend:

```bash
cd Frontend
npm install
npm run dev
```

## Notes

- App data (users, products, cart) is stored in browser localStorage.
- This project is demo-only and does not include secure server-side auth.

## Deploy checklist

1. Build command: `npm run build`
2. Output directory: `dist`
3. SPA rewrites:
	- Netlify: `public/_redirects` is already added.
	- Vercel: `vercel.json` is already added.
