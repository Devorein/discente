# `@discente/client`

## Setup

1. Make sure the backend server is running
2. Change `NEXT_PUBLIC_SERVER_URL` inside `.env.local` to the server url
3. Run `npm run dev` to start the next.js development server (by default it runs at `http://localhost:3000`)

## Stack

1. `React`: UI Library
2. `Next.js`: React Framework for SSR and SSG
3. `Typescript`: Type safety for JS
4. `@mui/material`: React components for mui design system
5. `yup`: Schema validation library
6. `prismjs`: Syntax highlighting
7. `formik`: React Form library
8. `react-query`: React library for api fetching and caching
9. `Storybook`: Isolated component builder
10. `react-testing-library`: Library for testing react components
11. `axios`: HTTP Client for making api requests

## Folder organization

- `.storybook`: Storybook related configurations
- `api`: Hooks for mutations and queries (data fetching + cache updating)
- `components`:
  - `pages`: Components used for a single page
  - `common`: Components shared across multiple places
- `hooks`: Generic hooks + hooks used in multiple places (api related are stored inside `api` folder)
- `pages`: Next.js pages
- `public`: Publicly available assets
- `stories`:
  - `components`: Stories for components stored inside `components` (both common and shared)
  - `pages`: Stories for next.js page components (inside `pages` folder)
- `styles`: Global `css`/`scss` styles (Only to be imported inside `_app.tsx`)
- `tests`
  - `components`: Unit and integration tests for components inside `component` folder
  - `utils`: Unit tests for modules inside `utils` folder
- `utils`: Commonly used utility modules

## Environment Variables

- `NEXT_PUBLIC_SERVER_URL`: Url pointing to where the backend is hosted (Used by axios to make api requests)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google oauth client id
