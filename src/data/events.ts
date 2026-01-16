import { HandMetal, LucideIcon, Trophy, Award } from "lucide-react";
import culturalBg from "@/assets/cultural_bg.jpg";
import { ReactNode } from "react";
import proNiteBannner from "@/assets/pro_nite1.png";

export interface EventCard {
  icon: LucideIcon;
  title: string;
  description: string;
  id: string;
}

export interface EventDetails {
  title: string;
  subtitle: string;
  description: ReactNode;
  image: string;
  bannerImage?: string;
  date: string;
  location: string;
  prize: string;
  registerLink: string;
  rules: string[];
  lineup?: Array<{
    missionTitle: string;
    artistRole: string;
    artistName: string;
    date: string;
    time: string;
    venue: string;
  }>;
}

// Events for the main events section
export const EVENTS: readonly EventCard[] = [
  {
    icon: HandMetal,
    title: "Pro Nites",
    description: "Star-studded performances by renowned artists and bands",
    id: "pro-nites",
  },
  {
    icon: Award,
    title: "The Unstop-pables",
    description:
      "Cases, dance, drama, and artistic showcases celebrating creativity and resilience",
    id: "competitions",
  },
  {
    icon: Trophy,
    title: "Sports & Gaming",
    description: "Sports tournaments and gaming competitions",
    id: "gaming",
  },
] as const;

// Detailed event information for individual event pages
export const EVENT_DATABASE: Record<string, EventDetails> = {
  "pro-nites": {
    title: "PRO NITES",
    subtitle: "The Galaxy's Loudest Symphony",
    description:
      "Prepare for liftoff as we initiate the primary sequence of Ethos 2026. This isn't just a concert; it's a sonic journey through three distinct phases. From soul-stirring melodies to earth-shattering laughter and high-energy beats, witness the convergence of stars on the main deck.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    bannerImage: proNiteBannner,
    date: "24 Jan 2026",
    location: "Main Ground",
    prize: "N/A",
    registerLink: "",
    rules: [
      "Entry allowed only with valid ID cards.",
      "Gates close at 7:30 PM strictly.",
      "No outside food or beverages permitted.",
    ],
    lineup: [
      {
        missionTitle: "Mission #1",
        artistRole: "The Melody Voyager",
        artistName: "JAVED ALI",
        date: "24 Jan",
        time: "6:00 PM",
        venue: "Main Stage",
      },
      {
        missionTitle: "Mission #2",
        artistRole: "The Cosmic Jester",
        artistName: "KUMAR VARUN",
        date: "24 Jan",
        time: "7:30 PM",
        venue: "Main Stage",
      },
      {
        missionTitle: "Mission #3",
        artistRole: "The Sonic Pilot",
        artistName: "SWATTREX",
        date: "24 Jan",
        time: "9:00 PM",
        venue: "Main Stage",
      },
    ],
  },
  gaming: {
    title: "GAMING ARENA",
    subtitle: "The Ultimate Battleground",
    description: `Enter the ultimate arena where physical prowess meets digital dominance. This mission spans across three dimensions:

      1. Digital Warfare (Esports): Compete in high-octane tournaments from FPS to strategy.
      2. Field Operations (Outdoor): Test your endurance and agility in adrenaline-pumping physical challenges.
      3. Tactical HQ (Indoor): Engage in strategic tabletop and indoor competitive games.

      Prove your mastery across every realm of play.`,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    date: "22-24 Jan 2026",
    location: "The Sports Arena & Computer Labs",
    prize: "₹ 95,000",
    registerLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_GAMING_FORM/viewform",
    rules: [
      "Teams must register 48 hours before the event.",
      "Participants must carry valid ID for equipment issuance.",
      "Sports attire is mandatory for outdoor segments.",
      "No external software allowed for esports events.",
    ],
  },
  competitions: {
    title: "INTELLECTUAL ARENA",
    subtitle: "Battle of Minds",
    description: `Ethos’26 unfolds from January 22–24, 2026, embracing the celestial theme Astral Transcendence—an invitation to rise beyond the ordinary and explore limitless cosmic possibility. Inspired by the stars that guide and connect us, this edition celebrates imagination, innovation, and collective brilliance.

Visionary leaders, creators, cultural enthusiasts, and athletes converge in an experience where ideas spark, connections align, and boundaries dissolve. Every interaction becomes a constellation, shaping a universe of collaboration and expression.

More than a fest, Ethos’26 is a call to awaken higher purpose. Together, we transcend limits, align with the infinite, and illuminate the future—one radiant star at a time.`,
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    date: "22-24 Jan 2026",
    location: "Various Venues",
    prize: "₹ 325,000",
    registerLink:
      "https://unstop.com/college-fests/ethos-2026-indian-institute-of-management-iim-sambalpur-426865",
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
