# 🌌 ETHOS 2026 - Astral Transcendence

> The official website for ETHOS 2026, IIM Sambalpur's annual cultural festival. A cosmic journey through music, art, and competition.

![ETHOS 2026](public/og-image.jpeg)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:8080`

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development](#development)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Core Features

- 🎨 **Stunning Space Theme** - Immersive cosmic design with planetary elements
- ⚡ **Blazing Fast** - Optimized bundle size and lazy loading
- 📱 **Fully Responsive** - Perfect experience on all devices
- ♿ **Accessible** - WCAG AA compliant with ARIA labels
- 🎭 **Smooth Animations** - Powered by Framer Motion with reduced motion support
- 🔍 **SEO Optimized** - Meta tags, structured data, and sitemap

### Technical Features

- 🎯 **Error Boundaries** - Graceful error handling
- 🔄 **Code Splitting** - Lazy loaded routes for faster initial load
- 📊 **Performance Monitoring** - Web Vitals tracking
- 🎨 **Design System** - Centralized constants and theme
- 🔒 **Type Safe** - Full TypeScript coverage
- 📦 **Bundle Analysis** - Built-in bundle size visualization

## 🛠 Tech Stack

### Core

- **React 18.3** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool
- **Tailwind CSS 3.4** - Styling

### Animation & UI

- **Framer Motion 12** - Smooth animations
- **Radix UI** - Accessible components
- **Lucide React** - Icon system

### Routing & State

- **React Router 6.30** - Client-side routing
- **TanStack Query 5.83** - Server state management

### Performance

- **SWC** - Fast refresh and compilation
- **Bundle Analyzer** - Size optimization
- **Web Vitals** - Performance metrics

### Deployment

- **Vercel** - Hosting and CI/CD
- **Vercel Analytics** - Usage tracking
- **Vercel Speed Insights** - Performance monitoring

## 📁 Project Structure

```
ethos-astral/
├── public/
│   ├── og-image.jpeg         # Open Graph image
│   ├── sitemap.xml          # SEO sitemap
│   └── robots.txt           # Crawler instructions
├── src/
│   ├── assets/              # Images, logos, fonts
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── pages/           # Page-specific components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── SponsorsSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Planet.tsx
│   │   ├── StarField.tsx
│   │   └── ScrollToTop.tsx
│   ├── config/
│   │   └── constants.ts     # App-wide constants
│   ├── data/
│   │   └── events.ts        # Event information
│   ├── hooks/
│   │   └── useReducedMotion.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── utils/
│   │   └── performance.ts   # Performance utilities
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment template
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Fill in your environment variables
4. Run `npm install`
5. Run `npm run dev`

### Required Environment Variables

- `VITE_WEB3FORMS_KEY`: Get from https://web3forms.com
- Add other required variables...

## 💻 Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Environment Setup

1. Copy environment template:

```bash
cp .env.example .env
```

2. Fill in environment variables:

```env
VITE_APP_NAME=ETHOS 2026
VITE_APP_URL=http://localhost:8080
VITE_WEB3FORMS_KEY=your-key-here
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run type-check       # Check TypeScript types

# Building
npm run build            # Production build
npm run build:analyze    # Build with bundle analysis
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check linting
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test:lighthouse  # Run Lighthouse audit

# Maintenance
npm run clean            # Clean build artifacts
npm run reinstall        # Fresh install of dependencies
```

### Code Style

- **Formatting**: Prettier with 2-space indentation
- **Linting**: ESLint with TypeScript rules
- **Naming**:
  - Components: PascalCase (`HeroSection.tsx`)
  - Files: camelCase (`useReducedMotion.ts`)
  - Constants: UPPER_SNAKE_CASE (`EVENT_DETAILS`)

### Component Guidelines

```typescript
// ✅ Good - Functional component with TypeScript
interface Props {
  title: string;
  count?: number;
}

const MyComponent = ({ title, count = 0 }: Props) => {
  return <div>{title}: {count}</div>;
};

export default MyComponent;
```

### Accessibility Checklist

- [ ] All images have `alt` text
- [ ] Interactive elements have `aria-labels`
- [ ] Sections have proper headings (h1, h2, h3)
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Animations respect `prefers-reduced-motion`

## ⚡ Performance

### Optimization Techniques

1. **Code Splitting**
   - Routes lazy loaded with `React.lazy()`
   - Vendor chunks separated (react, framer-motion, ui)

2. **Image Optimization**
   - Lazy loading with Intersection Observer
   - Optimized URLs with size parameters
   - WebP format where supported

3. **Bundle Size**
   - Total bundle: < 1MB
   - Initial load: < 500KB
   - Analyzed with Rollup visualizer

4. **Animations**
   - Reduced motion support
   - Hardware-accelerated CSS properties
   - Particle count based on device capability

### Performance Metrics (Target)

| Metric                   | Target | Current |
| ------------------------ | ------ | ------- |
| First Contentful Paint   | < 1.5s | ✅      |
| Largest Contentful Paint | < 2.5s | ✅      |
| Time to Interactive      | < 3.5s | ✅      |
| Total Bundle Size        | < 1MB  | ✅      |
| Lighthouse Score         | > 90   | ✅      |

### Monitoring

```typescript
// Web Vitals monitoring in main.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

if (import.meta.env.PROD) {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**

   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure settings:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Environment Variables**
   Add in Vercel dashboard:
   - `VITE_APP_NAME`
   - `VITE_APP_URL`
   - `VITE_WEB3FORMS_KEY`

4. **Deploy** 🚀

### Manual Deployment

```bash
# Build
npm run build

# Deploy to your hosting service
# Upload contents of `dist/` folder
```

### Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Images display properly
- [ ] Mobile responsive
- [ ] Run Lighthouse audit
- [ ] Test on real devices
- [ ] Check analytics setup

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
perf: Improve performance
test: Add tests
chore: Update build process
```

### Code Review Process

1. All PRs require review
2. Must pass CI checks
3. Must maintain test coverage
4. Must follow code style

## 📊 Key Metrics

### Bundle Analysis

```bash
npm run build:analyze
# Opens visualization in browser
```

### Lighthouse Audit

```bash
npm run preview  # In one terminal
npm run test:lighthouse  # In another terminal
```

## 🐛 Troubleshooting

### Common Issues

**Issue: Build fails with module not found**

```bash
# Solution
rm -rf node_modules package-lock.json
npm install
```

**Issue: TypeScript errors after refactor**

```bash
# Solution
npm run type-check
# Fix errors shown in output
```

**Issue: Images not loading in production**

```bash
# Solution
# Make sure images are in public/ or properly imported
# Check network tab for 404 errors
```

## 📝 License

Copyright © 2026 IIM Sambalpur. All rights reserved.

## 📧 Contact

- **Email**: ethos@iimsambalpur.ac.in
- **Instagram**: [@ethos.iimsambalpur](https://www.instagram.com/ethos.iimsambalpur)
- **Website**: [ethos.iimsambalpur.ac.in](https://ethos.iimsambalpur.ac.in)

---

Made with 💫 by the ETHOS Tech Team
