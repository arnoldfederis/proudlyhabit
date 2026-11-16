import { APP_STORE_URL } from "@/lib/seo";
import { env } from "@/env";

/**
 * Share cards from the app link to /s?h=…&v=…&m=…&c=…&s=…&n=…
 * Everything is optional and validated: the page never trusts the URL.
 */
export type ShareMilestone = {
  habit: string;
  value: number;
  /** "d" day streak, "w" weeks on target, "t" total days done. */
  metric: "d" | "w" | "t";
  color: string;
  style: "soft" | "glow" | "night";
  name?: string;
};

type Params = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function clean(text: string | undefined, max: number): string | undefined {
  const trimmed = text?.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

export function parseMilestone(params: Params): ShareMilestone {
  const value = Number.parseInt(first(params.v) ?? "", 10);
  const metric = first(params.m);
  const color = first(params.c);
  const style = first(params.s);
  return {
    habit: clean(first(params.h), 40) ?? "Small wins",
    value: Number.isFinite(value) ? Math.min(Math.max(value, 0), 99_999) : 0,
    metric: metric === "w" || metric === "t" ? metric : "d",
    color: color && /^[0-9a-fA-F]{6}$/.test(color) ? `#${color}` : "#A78BFA",
    style: style === "glow" || style === "night" ? style : "soft",
    name: clean(first(params.n), 30),
  };
}

export function unitLine(m: ShareMilestone): string {
  if (m.metric === "t") return m.value === 1 ? "day done" : "days done";
  if (m.metric === "w")
    return m.value === 1 ? "week on target" : "weeks on target";
  return "day streak";
}

/** "112 days done of Journal" style headline for titles and alt text. */
export function headline(m: ShareMilestone): string {
  return `${m.value} ${unitLine(m)}: ${m.habit}`;
}

export function query(params: Params): string {
  const search = new URLSearchParams();
  for (const key of ["h", "v", "m", "c", "s", "n"]) {
    const value = first(params[key]);
    if (value) search.set(key, value);
  }
  return search.toString();
}

/**
 * App Store link with a campaign tag, so App Store Connect › App Analytics
 * can show downloads from share cards. Campaign links need the provider
 * token (App Store Connect › App Analytics › Campaigns › Generate link);
 * set APP_STORE_PROVIDER_TOKEN to enable attribution. Without it this is the
 * plain App Store link.
 */
export function appStoreCampaignURL(campaign: string): string {
  const token = env.APP_STORE_PROVIDER_TOKEN;
  if (!token) return APP_STORE_URL;
  const params = new URLSearchParams({ pt: token, ct: campaign, mt: "8" });
  return `https://apps.apple.com/app/apple-store/id6782197891?${params}`;
}
