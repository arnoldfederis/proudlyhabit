import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://proudlyhabit.com";

export const SITE_NAME = "Proudly";
export const APP_NAME = "Proudly: Habit Tracker";
export const TAGLINE = "A gentle habit tracker for small wins.";
export const EMOTIONAL_HOOK = "Do one thing today that makes you proud.";
export const SITE_DESCRIPTION =
  "Proudly is a gentle habit tracker for small wins. Track daily habits, celebrate progress, and build routines without pressure.";

// TODO: Replace support email if the final address changes.
export const SUPPORT_EMAIL = "support@proudlyhabit.com";

// TODO: Replace with final App Store URL before launch.
export const APP_STORE_URL = "https://apps.apple.com/app/id6782197891";

export const KEYWORDS = [
  "habit tracker app",
  "gentle habit tracker",
  "iPhone habit tracker",
  "daily habit tracker",
  "habit tracker for small wins",
  "simple habit tracker",
  "streak tracker",
  "daily reminders habit app",
  "habit tracker without pressure",
  "habit tracker with reminders",
  "habit tracker for iOS",
  "Proudly habit tracker",
  "build better habits",
  "track daily habits",
  "small wins app",
  "habit progress tracker",
  "personal habit tracker",
  "habit reminder app",
  "daily routine tracker",
  "goal tracker app",
  "self improvement app",
  "productivity app without pressure",
  "streaks without guilt",
  "mindful habit tracker",
];

export const SITE_PATHS = ["/", "/privacy", "/terms", "/contact"] as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is Proudly?",
    answer:
      "Proudly is a gentle habit tracker for small wins. It helps you track daily habits, build streaks, set reminders, and celebrate progress without pressure.",
  },
  {
    question: "Is Proudly free?",
    answer:
      "Yes. Proudly is free for up to 3 habits, including schedules, rest days, reminders, the Focus Timer with its Live Activity, the habit grid, the Today widget, and an automatic backup of your habits to your iCloud.",
  },
  {
    question: "What does Proudly Plus include?",
    answer:
      "Unlimited habits, Home and Lock Screen habit widgets, advanced progress insights (momentum, best days, consistency, and a 6-month heatmap), monthly history, iCloud sync, custom themes, and Proud Moments, a calendar of every win. New subscribers can try Plus free for 7 days.",
  },
  {
    question: "Does Proudly use guilt or streak pressure?",
    answer:
      "No. Proudly is designed to feel gentle, encouraging, and supportive. Rest days, flexible schedules, and weekly goals mean a day off doesn't have to cost you your streak.",
  },
  {
    question: "What is a rest day?",
    answer:
      "A rest day lets you take a day off from a habit without losing your streak. Your streak pauses instead of breaking, and picks up again when you next check in. Forgot to mark one? The next day you can turn yesterday into a rest day, once a week per habit. Rescued days are marked in your history so your streak stays honest.",
  },
  {
    question: "Can I choose which days a habit runs?",
    answer:
      "Yes. A habit can run every day, on certain days like Monday, Wednesday and Friday, or toward a weekly goal like 3 times a week. Days a habit isn't scheduled never break your streak, and on a weekly goal the days you skip don't count as misses.",
  },
  {
    question: "Does the Focus Timer show on the Lock Screen?",
    answer:
      "Yes. When you start a Focus Timer, it appears as a Live Activity on your Lock Screen and in the Dynamic Island on iPhones that have one. You can pause or end it there, and check in when it's done. It's free for everyone.",
  },
  {
    question: "Can I track habits multiple times per day?",
    answer:
      "Yes. Proudly supports habits that can be completed more than once per day, such as drinking water four times a day.",
  },
  {
    question: "Does Proudly have widgets?",
    answer:
      "Yes. The free Today widget shows today's habits and lets you check them off with one tap. Proudly Plus adds single-habit widgets for the Home Screen and Lock Screen.",
  },
  {
    question: "Does Proudly support reminders?",
    answer:
      "Yes. Proudly sends local reminders only on the days a habit runs, and you can check in or take a rest day right from the notification. Need a quiet week? Mute a habit's reminders in Profile › Reminders and turn them back on later with the same times.",
  },
  {
    question: "Does Proudly have iCloud sync?",
    answer:
      "Two things, both in your private iCloud. Everyone signed in to iCloud gets an automatic backup of their habits, so they come back after reinstalling or on a new iPhone. Proudly Plus adds live iCloud sync, which keeps habits in step across your Apple devices as you use them. Proudly keeps working on the device when iCloud is unavailable.",
  },
  {
    question: "I reinstalled Proudly. Can I get my habits back?",
    answer:
      "Yes, if you're signed in to the same iCloud account. Proudly backs up your habits, streaks and history to your private iCloud automatically, on the free plan too. After reinstalling or on a new iPhone, tap \"I've used Proudly before\" on the welcome screen and they come back right away, so there's no setup to redo. Your name and profile photo come back too. Prefer a clean slate? Choose Start fresh and Proudly deletes the old backup after asking you to confirm.",
  },
  {
    question: "Will I lose my habits if I cancel Proudly Plus?",
    answer:
      "No. Your habits and history are kept. You choose up to 3 habits to keep using for free, and the rest are paused, not deleted, until you subscribe again. Paused habits don't send reminders.",
  },
  {
    question: "How do I cancel Proudly Plus?",
    answer:
      "Proudly Plus subscriptions are managed by Apple. Open iPhone Settings, tap your Apple Account, then Subscriptions, then Proudly, then cancel.",
  },
  {
    question: "Does Proudly sell my data?",
    answer: "No. Proudly does not sell personal data.",
  },
  {
    question: "Is Proudly medical advice?",
    answer:
      "No. Proudly is for personal habit tracking and motivation only. It is not medical, mental health, fitness, or professional advice.",
  },
  {
    question: "How do I contact Proudly support?",
    answer: `You can contact Proudly support by emailing ${SUPPORT_EMAIL}.`,
  },
] as const;

/** Shown in the FAQ section on the home page and in its FAQPage JSON-LD,
 * so the visible answers and the structured data always match. */
export const HOME_FAQ_ITEMS = FAQ_ITEMS.slice(1, 14);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  canonical,
  openGraphTitle,
  openGraphDescription,
  twitterDescription,
}: {
  title: string;
  description: string;
  canonical: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterDescription?: string;
}): Metadata {
  return {
    title,
    description,
    keywords: KEYWORDS,
    alternates: {
      canonical,
    },
    openGraph: {
      title: openGraphTitle ?? title,
      description: openGraphDescription ?? description,
      url: canonical,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Proudly: Habit Tracker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle ?? title,
      description: twitterDescription ?? openGraphDescription ?? description,
      images: ["/twitter-image"],
    },
  };
}

export function createFaqPageJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
