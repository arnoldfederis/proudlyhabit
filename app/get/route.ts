import { type NextRequest, NextResponse } from "next/server";
import { appStoreCampaignURL } from "@/lib/share";

/**
 * proudlyhabit.com/get: a short, stable link to the App Store (used by the
 * QR code on share cards). `ref` becomes the App Store campaign name.
 */
export function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref") ?? "get";
  const campaign = /^[a-z0-9-]{1,24}$/.test(ref) ? `share-${ref}` : "share";
  return NextResponse.redirect(appStoreCampaignURL(campaign), 302);
}
