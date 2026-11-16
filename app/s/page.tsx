import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/seo";
import {
  appStoreCampaignURL,
  headline,
  parseMilestone,
  query,
  unitLine,
} from "@/lib/share";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Landing page for a shared Proudly milestone (/s?h=…&v=…). Its job:
 * unfurl nicely on social media (Open Graph image per milestone) and send
 * people to the App Store. Not indexed: thousands of near-identical
 * personal pages would dilute the site in search; the canonical points to
 * the home page instead.
 */
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const m = parseMilestone(params);
  const title = m.name
    ? `${m.name}: ${m.value} ${unitLine(m)} of ${m.habit}`
    : `${m.value} ${unitLine(m)} of ${m.habit}`;
  const description =
    "Small wins add up. Track gentle habits with Proudly, free on the App Store.";
  const image = `/s/og?${query(params)}`;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: headline(m) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    // Safari on iPhone shows its App Store banner above the page.
    other: { "apple-itunes-app": "app-id=6782197891" },
  };
}

export default async function SharedMilestone({ searchParams }: Props) {
  const m = parseMilestone(await searchParams);
  const appStore = appStoreCampaignURL("share-link");
  const dark = m.style !== "soft";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-[linear-gradient(135deg,#f4efff_0%,#fdeef5_45%,#eef6ff_100%)] px-6 py-16 dark:bg-[linear-gradient(135deg,#1a1730_0%,#2b2145_100%)]">
      <article
        aria-label={headline(m)}
        className={`relative w-full max-w-sm overflow-hidden rounded-[2rem] p-8 shadow-[0_30px_80px_-30px_rgba(124,92,240,0.45)] ${
          m.style === "glow"
            ? "bg-[linear-gradient(135deg,#7C5CF0,#DE5CA6)] text-white"
            : m.style === "night"
              ? "bg-[linear-gradient(180deg,#1A1730,#2B2145)] text-white"
              : "bg-white/80 text-[#241C2F] backdrop-blur"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className="size-3.5 rounded-full"
            style={{ background: m.style === "glow" ? "#fff" : m.color }}
          />
          <h1 className="font-bold text-xl">{m.habit}</h1>
        </div>
        {m.name ? (
          <p className={dark ? "mt-1 text-white/75" : "mt-1 text-[#6F6478]"}>
            {m.name}&apos;s small wins
          </p>
        ) : null}
        <p className="mt-8 font-extrabold text-8xl leading-none tracking-tight">
          {m.value}
        </p>
        <p className="mt-2 font-bold text-2xl">{unitLine(m)}</p>
      </article>

      <section className="flex max-w-sm flex-col items-center gap-5 text-center">
        <Image
          alt=""
          className="rounded-2xl shadow-lg"
          height={72}
          src="/proudly-icon-512x512.png"
          width={72}
        />
        <div>
          <h2 className="font-bold text-2xl tracking-tight">
            Small wins add up.
          </h2>
          <p className="mt-2 text-muted-foreground">
            {APP_NAME} is a gentle habit tracker: streaks without guilt, rest
            days, widgets and reminders. Free for up to 3 habits.
          </p>
        </div>
        <a
          aria-label="Download Proudly on the App Store"
          className="inline-block rounded-[0.875rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          href={appStore}
        >
          <Image
            alt="Download on the App Store"
            className="h-12 w-auto dark:hidden"
            height={40}
            priority
            src="/store-badges/white.svg"
            width={120}
          />
          <Image
            alt="Download on the App Store"
            className="hidden h-12 w-auto dark:block"
            height={40}
            priority
            src="/store-badges/black.svg"
            width={120}
          />
        </a>
        <Link
          className="text-muted-foreground text-sm underline-offset-4 hover:underline"
          href="/"
        >
          Learn more about Proudly
        </Link>
      </section>
    </main>
  );
}
