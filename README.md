# SeyiAk | Frontend Engineer Portfolio

A futuristic, highly interactive, and premium frontend engineer portfolio designed to showcase projects with a focus on immersive user experiences. The application features a "Liquid Glass" theme, utilizing advanced glassmorphism, WebGL backgrounds, and heavily optimized CSS/JavaScript animations.

## 🚀 Live Demo
*(Add your live deployment link here once hosted, e.g., on Vercel)*

## 🛠 Tech Stack & Architecture

This project is built with modern, industry-standard tools to ensure high performance, accessibility, and breathtaking aesthetics.

### Core Architecture
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for robust type-safety and developer experience.

### Styling & Design System
- **CSS Framework:** [Tailwind CSS 4](https://tailwindcss.com/) for utility-first, rapid UI styling.
- **Theme:** Custom Liquid Glass design system featuring multi-layered backdrop filters, subtle gradients, and dark mode aesthetics.
- **Icons:** [Lucide React](https://lucide.dev/)

### Animations & WebGL
- **DOM Animations:** [Framer Motion](https://www.framer.com/motion/) for declarative layout transitions, scroll-driven reveals, and interactive micro-animations.
- **Complex Sequencing:** [GSAP (GreenSock)](https://gsap.com/) for advanced orchestration.
- **3D / WebGL:** [OGL](https://github.com/oframe/ogl) for the lightweight, highly-optimized interactive raymarching shader background (`Prism.tsx`).

## ⚡ Performance Optimizations
This portfolio was rigorously audited and optimized to ensure 60fps scrolling and minimal battery/GPU usage:
- **Offscreen WebGL Suspension:** The OGL shader completely pauses computation when scrolled out of view.
- **Scroll-Driven Layouts:** Heavy DOM queries (`getBoundingClientRect`) are restricted to passive scroll listeners governed by `requestAnimationFrame` guards, completely eliminating layout thrashing when idle.
- **Compositor-Only Marquees:** Infinite scroll areas are powered entirely by CSS `@keyframes` and `transform` rather than main-thread JS.
- **Strict Layer Management:** `will-change` properties are actively managed to prevent excessive VRAM layer promotion.

## 💻 Running Locally

1. Clone the repository:
```bash
git clone https://github.com/SeyiAk/Portfolio-SeyiAk.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License
This project is for personal portfolio use. Copyright © 2026 SeyiAk.
