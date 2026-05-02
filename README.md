# Edoardo Genovese — Portfolio

> Frontend Engineer · React · TypeScript · Next.js

Personal portfolio with 3D particle effects, full-page scroll animations and bilingual support (IT/EN).

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer)

---

## Features

- **3D Particle Field** — Interactive Three.js scene with 3000 particles and wireframe geometries that react to mouse movement
- **Full Page Scroll** — Desktop-only smooth section transitions with 3D perspective animations via Framer Motion
- **Custom Cursor** — Dot + ring cursor with spring physics and mix-blend-difference effect
- **Bilingual** — Italian/English toggle with a 3D rotating globe, auto-detects browser language
- **Mobile version** — Completely separate layout with scroll-triggered animations via useInView
- **CV Download** — Dialog to choose between Italian and English PDF
- **Contact Form** — Functional form powered by Resend
- **Scroll-aware hover** — Project cards detect cursor position on section enter

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| 3D | Three.js + React Three Fiber |
| Animations | Framer Motion |
| Icons | Lucide React |
| Email | Resend |
| Styling | Tailwind CSS v4 |
| Deploy | Vercel |

---

## Project Structure

```
portfolio/
├── app/
│   ├── api/contact/         # Resend email route
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Desktop navbar with language globe
│   │   └── PageWrapper.tsx  # Desktop/mobile switch
│   ├── mobile/
│   │   └── MobileLayout.tsx # Full mobile version
│   ├── sections/
│   │   ├── Hero.tsx         # Three.js hero with letter animation
│   │   ├── About.tsx        # Stats, skills, CV download
│   │   ├── Projects.tsx     # Project cards with hover effects
│   │   └── Contact.tsx      # Contact form + social links
│   ├── three/
│   │   └── ParticleField.tsx # Three.js particle scene
│   └── ui/
│       ├── CustomCursor.tsx  # Custom cursor with global mouse pos
│       ├── FullPageScroll.tsx
│       └── LanguageGlobe.tsx # 3D rotating language toggle
├── lib/
│   ├── FullPageContext.tsx   # Full page scroll state
│   ├── hooks/
│   │   └── useIsMobile.ts
│   └── i18n/
│       ├── LanguageContext.tsx
│       └── translations.ts
└── public/
    ├── cv-edoardo-genovese-it.pdf
    └── cv-edoardo-genovese-en.pdf
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Resend](https://resend.com) account for the contact form

### Installation

1. Clone the repository

```bash
git clone https://github.com/edoardogenovese/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables — create a `.env.local` file:

```bash
RESEND_API_KEY=re_...
```

4. Add your CV files to `public/`:

```
public/cv-edoardo-genovese-it.pdf
public/cv-edoardo-genovese-en.pdf
```

5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
npm run format   # Prettier format
```

---

## Architecture Notes

**Desktop vs Mobile** — `useIsMobile` detects viewport width and renders either the full-page scroll experience or the mobile long-page layout. The split is clean — no shared state between the two.

**Global mouse position** — The custom cursor exports `globalMousePos`, a module-level object updated on every `mousemove`. Project cards read this on `useInView` trigger to detect if the cursor is already hovering when the section appears.

**Language system** — Built with a custom React Context instead of next-intl to avoid full-page reloads on language switch. The 3D globe animates for 600ms before the locale state updates, making the transition feel native.

**3D scene** — React Three Fiber renders 3000 particles with vertex colors (white, blue, purple) and three wireframe geometries (torus, icosahedron, octahedron) that orbit independently. Mouse position is read via a `useRef` to avoid re-renders.

---

## License

MIT