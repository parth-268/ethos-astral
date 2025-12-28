// src/data/events.ts - FIXED VERSION with proper image imports
import { LucideIcon } from "lucide-react";
import { Mic2, Palette, Gamepad2, Award, Music, Camera } from "lucide-react";

import culturalBg from "@/assets/cultural_bg.jpg";

export interface EventCard {
  icon: LucideIcon;
  title: string;
  description: string;
  id: string;
}

export interface EventDetails {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  location: string;
  prize: string;
  registerLink: string;
  rules: string[];
}

// Events for the main events section
export const EVENTS: readonly EventCard[] = [
  {
    icon: Mic2,
    title: "Pro Nites",
    description: "Star-studded performances by renowned artists and bands",
    id: "pro-nites",
  },
  {
    icon: Palette,
    title: "Cultural",
    description: "Dance, drama, and artistic showcases celebrating creativity",
    id: "cultural",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "E-sports tournaments and gaming competitions",
    id: "gaming",
  },
  {
    icon: Award,
    title: "Competitions",
    description: "Debates, quizzes, and intellectual battles",
    id: "competitions",
  },
  {
    icon: Music,
    title: "Battle of Bands",
    description: "Showcase your musical talent on the biggest stage",
    id: "battle-of-bands",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capture moments and compete for the best shot",
    id: "photography",
  },
] as const;

// Detailed event information for individual event pages
export const EVENT_DATABASE: Record<string, EventDetails> = {
  "pro-nites": {
    title: "PRO NITES",
    subtitle: "The Galaxy's Loudest Symphony",
    description:
      "Experience the pinnacle of musical transcendence. Top-tier artists from across the cosmos descend upon IIM Sambalpur for a night of rhythm, beats, and stellar performances.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    date: "24 Jan 2026",
    location: "Main Ground, IIM Sambalpur",
    prize: "N/A",
    registerLink: "", // Empty means no registration button
    rules: [
      "Entry allowed only with valid ID cards.",
      "Gates close at 8:00 PM strictly.",
      "No outside food or beverages permitted.",
    ],
  },
  cultural: {
    title: "CULTURAL SHOWCASE",
    subtitle: "Artistry Across Dimensions",
    description:
      "A celebration of diverse traditions and futuristic art forms. From classical dance to avant-garde drama, witness the cultural heartbeat of the universe.",
    image: culturalBg,
    date: "22-23 Jan 2026",
    location: "Auditorium",
    prize: "₹ 50,000",
    registerLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_CULTURAL_FORM/viewform",
    rules: [
      "Performance time limit: 10 minutes.",
      "Props must be arranged by the participants.",
      "Theme adherence is mandatory.",
    ],
  },
  gaming: {
    title: "GAMING ARENA",
    subtitle: "Digital Warfare",
    description:
      "Compete in the most intense e-sports tournaments. From strategy games to first-person shooters, prove your dominance in the digital realm.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    date: "22-24 Jan 2026",
    location: "Gaming Zone, Computer Lab",
    prize: "₹ 75,000",
    registerLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_GAMING_FORM/viewform",
    rules: [
      "Teams must register 48 hours before the event.",
      "All participants must bring their own peripherals.",
      "No external software or modifications allowed.",
    ],
  },
  competitions: {
    title: "INTELLECTUAL ARENA",
    subtitle: "Battle of Minds",
    description:
      "Engage in debates, quizzes, and case competitions that will test your intellect and problem-solving abilities. The brightest minds compete here.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    date: "22-24 Jan 2026",
    location: "Various Venues",
    prize: "₹ 100,000",
    registerLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_COMP_FORM/viewform",
    rules: [
      "Individual and team events available.",
      "Specific rules vary by competition type.",
      "Registration deadlines strictly enforced.",
    ],
  },
  "battle-of-bands": {
    title: "BATTLE OF BANDS",
    subtitle: "Sonic Warfare",
    description:
      "Unleash your musical prowess. Bands from across the nation compete for glory and the ultimate title. Bring your instruments, bring your passion.",
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2070&auto=format&fit=crop",
    date: "23 Jan 2026",
    location: "Main Stage",
    prize: "₹ 60,000",
    registerLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_BOB_FORM/viewform",
    rules: [
      "Maximum 6 members per band.",
      "Performance time: 15-20 minutes.",
      "All equipment must be specified during registration.",
    ],
  },
  photography: {
    title: "LENS & VISION",
    subtitle: "Capturing the Cosmos",
    description:
      "Showcase your photography skills through various themes and challenges. From portraits to landscapes, freeze moments that tell stories.",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2070&auto=format&fit=crop",
    date: "22-24 Jan 2026",
    location: "Online & On-Campus",
    prize: "₹ 30,000",
    registerLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_PHOTO_FORM/viewform",
    rules: [
      "Original photographs only.",
      "Minimal post-processing allowed.",
      "Multiple categories available.",
    ],
  },
};

// Default/fallback event for unknown IDs
export const DEFAULT_EVENT: EventDetails = {
  title: "CLASSIFIED MISSION",
  subtitle: "Data Unavailable",
  description:
    "The details of this mission are currently encrypted. Check back later, explorer.",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  date: "TBA",
  location: "Unknown Sector",
  prize: "Unknown",
  registerLink: "#",
  rules: ["Await further instructions."],
};
