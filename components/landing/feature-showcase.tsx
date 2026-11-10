import { FadeIn } from "@/components/common/motion";
import { PhoneMockup } from "@/components/common/phone-mockup";
import { ProgressiveImage } from "@/components/common/progressive-image";
import { deviceBlurDataURL } from "@/lib/image-placeholders";

const SHOWCASES = [
  {
    id: "habit",
    eyebrow: "Your history",
    headline: "See every small win at a glance.",
    body: "Each habit gets its own calendar grid, so your progress builds into a picture you can be proud of. Current streak, best streak, and every check-in, all in one calm view.",
    src: "/assets/device-2.png",
    alt: "Proudly Habits tab showing a calendar grid of check-ins for each habit",
  },
  {
    id: "flexible",
    eyebrow: "Flexible schedules",
    headline: "Build habits your way.",
    body: "Run a habit every day, on certain days like Mon, Wed and Fri, or set a weekly goal like 3× a week. Track it once a day or a few times, from reading a few pages to drinking more water.",
    src: "/assets/device-3.png",
    alt: "Proudly habit editor showing schedule options with Monday, Wednesday and Friday selected",
  },
  {
    id: "rest-days",
    eyebrow: "Rest days",
    headline: "Take a break without losing your streak.",
    body: "Mark a rest day and your streak pauses instead of breaking. Days a habit isn't scheduled never count against you either, because rest is part of progress.",
    src: "/assets/device-18.png",
    alt: "Proudly habit page on a rest day showing the streak paused",
  },
  {
    id: "widgets",
    eyebrow: "Widgets",
    headline: "Check in right from your Home Screen.",
    body: "Tap a habit in the Today widget to mark it done without opening the app. With Proudly Plus, add single-habit widgets to your Home Screen and Lock Screen.",
    src: "/assets/device-16.png",
    alt: "iPhone Home Screen with Proudly's Today widget and single-habit widget",
  },
  {
    id: "kind",
    eyebrow: "Kind reminders",
    headline: "Gentle reminders for your routine.",
    body: "Set soft local reminders that help you check in at the right time, only on the days a habit runs, without pressure, noise, or guilt.",
    src: "/assets/device-4.png",
    alt: "Proudly reminder settings screen for gentle habit reminders",
  },
  {
    id: "plus",
    eyebrow: "Proudly Plus",
    headline: "More room for your small wins.",
    body: "Unlock unlimited habits, Home and Lock Screen habit widgets, iCloud sync across your Apple devices, monthly history, custom themes, Proud Moments, and deeper insights: momentum trends, weekday patterns, a 30-day consistency score, and a 6-month heatmap.",
    src: "/assets/device-5.png",
    alt: "Proudly Plus screen showing premium habit tracking features",
  },
].map((s, index) => ({
  ...s,
  // Alternate the phone side and section background down the page.
  phoneFirst: index % 2 === 1,
  muted: index % 2 === 1,
}));

export function FeatureShowcase() {
  return (
    <>
      {SHOWCASES.map((s) => (
        <section
          className={`py-24 ${s.muted ? "border-y bg-muted/40" : ""}`}
          id={s.id}
          key={s.id}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div
              className={`flex flex-col items-center gap-16 md:gap-20 ${
                s.phoneFirst ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Text */}
              <FadeIn className="flex-1">
                <p className="mb-3 font-medium text-primary text-sm uppercase tracking-widest">
                  <span className="bg-linear-to-r from-[#8B7CF6] via-[#C7B8FF] to-[#F0A6CA] bg-clip-text text-transparent dark:from-[#D9D0FF] dark:via-[#C7B8FF] dark:to-[#FFB6DC]">
                    {s.eyebrow}
                  </span>
                </p>
                <h2 className="font-bold text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                  {s.headline}
                </h2>
                <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </FadeIn>

              {/* Phone */}
              <div className="flex flex-1 justify-center">
                <div className="relative">
                  <div className="pointer-events-none absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                  <PhoneMockup className="relative">
                    <ProgressiveImage
                      alt={s.alt}
                      blurDataURL={deviceBlurDataURL}
                      className="h-auto w-65 sm:w-75"
                      height={2796}
                      placeholder="blur"
                      quality={85}
                      sizes="(max-width: 640px) 260px, 300px"
                      src={s.src}
                      width={1419}
                    />
                  </PhoneMockup>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
