# Portfolio — macOS-style Interactive Portfolio

This repository contains a personal, macOS-inspired portfolio web app built with React and Vite. The UI mimics a desktop environment with floating windows, a dock, window controls, and small single-purpose apps (Finder, Photos, Terminal, Resume viewer, Contact form, etc.). It demonstrates interactive UI patterns, animations, and lightweight state management.

## Table of Contents

- Project Overview
- Features
- Tech Stack
- Quick Start
- Development
- Project Structure (detailed)
- Styling & Animations
- State Management
- Assets
- Deployment
- Troubleshooting
- Contributing
- License & Contact

## Project Overview

The app is a portfolio presented as a mini desktop. Each app-window is a focused example (e.g., `Photos` shows an image gallery, `Finder` lists files, `Terminal` shows a mock terminal). The goal is to present work and media in a playful, interactive way while demonstrating React patterns and animations.

## Features

- Desktop-like UI with draggable, resizable, and focusable windows.
- Dock and app launcher for opening/closing windows.
- Multiple windowed apps: `Finder`, `Photos`, `Resume`, `Contact`, `Terminal`, `TextFile`, `ImageFile`, `Search`, `Trash`, etc.
- Responsive and mobile-adapted layout with `MobileShell` and `MobileNavBar` components.
- Built-in music player and static file hosting via `public/`.
- Smooth animations using GSAP and Tailwind CSS utilities.

## Tech Stack

- React 19
- Vite (dev server & build)
- Tailwind CSS for styling
- Zustand for state management
- GSAP for animations
- ESLint for linting

## Quick Start

Prerequisites: Node.js 18+ recommended.

Install dependencies:

```bash
npm install
```

Start the development server (HMR enabled):

```bash
npm run dev
```

Open the URL shown by Vite (commonly `http://localhost:5173`). To build a production bundle:

```bash
npm run build
npm run preview
```

## Development

- Lint the codebase:

```bash
npm run lint
```

- The app entry is `src/main.jsx` which mounts `App.jsx`.
- Global styles are in `src/index.css` (Tailwind directives are applied here).

Notes about common dev issues:
- If the dev server fails to start, check that no other process is using the port (usually 5173) or set a custom port with `vite --port <port>`.

## Project Structure (detailed)

- `index.html` — Vite HTML entry.
- `src/main.jsx` — React entry; mounts the app.
- `src/App.jsx` — Top-level application shell.
- `src/index.css` — Tailwind + base styles.
- `src/components/` — Reusable UI components:
	- `Navbar.jsx` — top navigation
	- `Dock.jsx` — app dock
	- `ControlCenter.jsx`, `WindowControls.jsx` — window chrome
	- `MobileShell.jsx`, `MobileNavBar.jsx` — mobile adaptations
- `src/windows/` — App windows (each acts like a mini app):
	- `Finder.jsx`, `Photos.jsx`, `Terminal.jsx`, `Resume.jsx`, `Contact.jsx`, `Trash.jsx`, `TextFile.jsx`, `ImageFile.jsx`, `Search.jsx`
- `src/store/` — Zustand stores that manage global state
	- `window.js` — window z-index, positions, open/close
	- `control.js`, `location.js`, `trash.js` — app-specific stores
- `src/hooks/` — custom hooks like `useIsMobile.js`.
- `src/hoc/WindowWrapper.jsx` — wrapper that provides drag/resize and focus handling.
- `public/` — static assets (icons, images, music, files). Place additional media here.

## Styling & Animations

- Tailwind CSS powers most of the styling; configuration is at the project root (check `tailwind.config.js` if present).
- Animations use GSAP for fluid entrance/exit and window motion. See components for examples where `gsap` or `@gsap/react` is used.

## State Management

- Global UI state is kept with `zustand` stores under `src/store/`.
- Each store is focused (single responsibility) — e.g., `window.js` manages window stacking, active window, and positions.

## Assets

- Put images, icons, and audio in `public/images`, `public/icons`, and `public/music`.
- The `public/files` folder is used by the `Finder` and other demo apps for example file data.

## Deployment

This is a static SPA. Build and deploy the `dist/` folder.

Common hosts:
- Vercel: Connect the repo and set the build command to `npm run build` and the output directory to `dist`.
- Netlify: Use `npm run build` as the build command and `dist` as the publish directory.
- GitHub Pages: Build and push `dist` to the `gh-pages` branch (or use an action to deploy).

## Troubleshooting

- Vite HMR not updating: ensure `node_modules` is installed and there are no conflicting versions of React.
- Styling missing: confirm `index.css` imports Tailwind base, components, and utilities and that Tailwind is configured in `postcss` if applicable.

## Contributing

If you'd like to improve the project:

1. Fork the repo
2. Create a feature branch
3. Open a PR with a clear description

Guidelines:
- Keep changes small and focused.
- Run `npm run lint` before submitting.

## Screenshots & Media

Place screenshots inside `public/images/screenshots/` and reference them in this README or the `public/` demo pages. Example Markdown:

```markdown
![Desktop view](public/images/screenshots/desktop.png)
```

## License & Contact

Add a license file if you want to open-source this project (e.g., `MIT`). For contact, update the `Contact` window content in `src/windows/Contact.jsx` or mention your email in this README.

---

If you'd like, I can:

- add example screenshots to `public/images/screenshots/` and update this README with embedded images;
- create a small `DEPLOY.md` with step-by-step deploy instructions for Vercel/Netlify/GitHub Pages;
- commit the README and open a PR.


>>>>>>> bc06e15 (Updated portfolio)
