// ============= DESIGN SYSTEM =============
export const DESIGN_SYSTEM = {
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  borderRadius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    full: "9999px",
  },

  animations: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.5,
      slowest: 0.8,
    },
    easing: {
      easeOut: [0.4, 0, 0.2, 1] as const,
      easeInOut: [0.4, 0, 0.6, 1] as const,
      spring: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  },

  planetSizes: {
    xs: "w-32 h-32",
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-80 h-80",
    xl: "w-96 h-96",
  },
} as const;

// ============= PERFORMANCE =============
export const PERFORMANCE = {
  // Particle counts for floating dust effects in sections
  particleCounts: {
    mobile: 6,
    tablet: 10,
    desktop: 15,
  },
  // Note: StarField calculates its own count based on screen area
  imageQuality: {
    thumbnail: 400,
    medium: 800,
    large: 1200,
  },
} as const;

// ============= BREAKPOINTS =============
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ============= EVENT DETAILS =============
export const EVENT_DETAILS = {
  name: "ETHOS 2026",
  tagline: "Astral Transcendence",
  dates: {
    start: "2026-01-22",
    end: "2026-01-24",
    display: "22 - 24 January 2026",
  },
  location: {
    name: "IIM Sambalpur",
    full: "IIM Sambalpur Campus, Basantpur, Odisha 768025",
  },
  contact: {
    email: "ethos@iimsambalpur.ac.in",
    phone: "+91 77386 62192",
  },
  social: {
    instagram: "https://www.instagram.com/ethos.iimsambalpur",
    twitter: "https://twitter.com/ethos_iims",
    linkedin:
      "https://www.linkedin.com/in/ethos-the-annual-fest-of-iim-sambalpur-8546a626a/",
    youtube: "https://www.youtube.com/@iimsambalpurannualfest/",
  },
} as const;

// ============= NAVIGATION =============
export const NAV_LINKS = [
  { name: "About", href: "/#about", id: "about" },
  { name: "Schedule", href: "/#schedule", id: "schedule" },
  { name: "Events", href: "/#events", id: "events" },
  { name: "Sponsors", href: "/#sponsors", id: "sponsors" },
  { name: "Gallery", href: "/#gallery", id: "gallery" },
] as const;

// ============= STATISTICS =============
export const STATS = [
  { icon: "Users", value: "3000+", label: "Explorers", href: null },
  { icon: "Trophy", value: "50+", label: "Missions", href: "#events" },
  { icon: "Calendar", value: "3", label: "Days", href: null },
  { icon: "Sparkles", value: "10+", label: "Galaxies", href: null },
] as const;

// ============= WEB3FORMS CONFIG =============
export const WEB3FORMS_ACCESS_KEY = "468e4a91-7f38-4390-bb1b-c0010fe07652";

// ============= GALLERY ARCHIVES =============
export const GALLERY_ARCHIVES = [
  {
    year: "2025",
    title: "The Cosmic Echo",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    color: "from-purple-500",
  },
  {
    year: "2024",
    title: "Stellar Origins",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    color: "from-blue-500",
  },
  {
    year: "2023",
    title: "First Light",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    color: "from-emerald-500",
  },
] as const;

// ============= SPONSORS =============
export const SPONSORS = [
  { name: "State Bank of India", tier: "Title Sponsor" },
  { name: "NTPC", tier: "Powered By" },
  { name: "Tata Steel", tier: "Associate Sponsor" },
  { name: "Reliance Industries", tier: "Associate Sponsor" },
  { name: "Odisha Tourism", tier: "Official Partner" },
  { name: "Red Bull", tier: "Energy Partner" },
] as const;

// === SPONSOR DATA ===
export const CHIEF_SPONSOR = {
  name: "CBI",
  logo: "/sponsors/cbi_logo1.png",
  tier: "Chief Sponsor",
  description: "Central Bank of India",
} as const;

export const PARTNERS = [
  {
    name: "MCL",
    logo: "/sponsors/mcl_logo.png",
    tier: "Co-Sponsor",
  },
  {
    name: "SBI",
    logo: "/sponsors/sbi_logo.png",
    tier: "Banking Partner",
  },
  {
    name: "Shyam Metalics",
    logo: "/sponsors/shyam_logo.jpeg",
    tier: "Associate Sponsor",
  },
] as const;

export const OTHER_SPONSORS = [
  { name: "Hero", type: "Official Automobile Sponsor" },
  { name: "Mia by Tanishq", type: "Official Jewellery Partner" },
  { name: "SAFEXPRESS", type: "Official Logistics Partner" },
  { name: "Times of India", type: "Official Print Partner" },
  { name: "Urban Housy", type: "Official Infrastructure Partner" },
  { name: "Pizza Hut", type: "Fest Flavour Partner" },
  { name: "Tattva Wellness", type: "Official Wellness Partner" },
  { name: "Sach Kahoon", type: "Media Partner" },
  { name: "Clay Kitchen", type: "Official Restaurant Partner" },
  { name: "KFC", type: "Restaurant Partner" },
  { name: "Silver Moon", type: "Hospitality Partner" },
  { name: "Regenta", type: "Hospitality Partner" },
  { name: "Nayab Tours and Travels", type: "Official Travel Partner" },
  { name: "Sakshi Handloom", type: "Handloom Partner" },
  { name: "Belgian Waffle", type: "Waffle Partner" },
  { name: "Giani", type: "Official Ice-Cream Partner" },
  { name: "God’s Own Kitchen", type: "Food Partner" },
  { name: "Chai Break", type: "Cafe Partner" },
  { name: "Anand Hyper Mart", type: "Retail Partner" },
] as const;

export const OTHER_SPONSORS_ToBeAdded = [
  { name: "Hero", type: "Official Automobile Partner" },
  { name: "Mia by Tanishq", type: "Jewellery Partner" },
  { name: "Clay Kitchen", type: "Food Sponsor" },
  { name: "Safexpress", type: "Official Logistics Partner" },
  { name: "God's Own Kitchen", type: "Food Sponsor" },
  { name: "Urban Housy", type: "Infrastructure Partner" },
  { name: "Giani's Ice Cream", type: "Food Sponsor" },
  { name: "Sach Kahoon", type: "Media Partner" },
  { name: "Belgian Waffles", type: "Food Sponsor" },
  { name: "Tattva Wellness", type: "Wellness Partner" },
  { name: "KFC", type: "Food Sponsor" },
  { name: "Sakshi Handloom", type: "Handloom Partner" },
  { name: "Pizza Hut", type: "Food Sponsor" },
  { name: "Chai Break", type: "Food Sponsor" },
] as const;

// ============= ACCESSIBILITY =============
export const A11Y = {
  ariaLabels: {
    navigation: "Main navigation",
    mobileMenu: "Mobile menu",
    socialLinks: "Social media links",
    backToTop: "Back to top",
    closeModal: "Close modal",
  },
  skipToContent: "Skip to main content",
} as const;
