/**
 * Keeps people from using proudlyhabit.com/s to show offensive text or
 * links under the Proudly name (anyone can type a /s?h=… URL by hand).
 * Shared habit names and display names that fail fall back to defaults.
 *
 * Deliberately small and word-based: whole words are compared after undoing
 * common letter swaps, so ordinary habits ("Class notes", "Scunthorpe run",
 * "Assess budget") aren't caught. Extend BLOCKED_WORDS as needed.
 */

const BLOCKED_WORDS = new Set([
  // Profanity
  "fuck", "fucking", "fucker", "motherfucker", "shit", "shitty", "bullshit",
  "bitch", "bastard", "asshole", "dick", "dickhead", "cock", "cunt", "pussy",
  "twat", "wanker", "prick", "slut", "whore", "porn", "porno", "nude",
  "nudes", "sex", "sexy", "xxx", "onlyfans", "rape", "rapist",
  // Slurs
  "nigger", "nigga", "faggot", "fag", "retard", "retarded", "tranny",
  "spic", "chink", "kike", "wetback", "gook", "dyke",
  // Hate and violence
  "nazi", "hitler", "heil", "kkk", "isis", "terrorist", "genocide",
  "suicide", "kys",
  // Scams
  "crypto", "bitcoin", "airdrop", "giveaway", "casino", "betting", "viagra",
]);

/** Phrases checked with spaces removed ("kill yourself", "heil hitler"). */
const BLOCKED_PHRASES = ["killyourself", "killurself", "whitepower", "siegheil"];

const LEET: Record<string, string> = {
  "0": "o", "1": "i", "!": "i", "3": "e", "4": "a", "@": "a", "5": "s",
  $: "s", "7": "t", "8": "b", "9": "g",
};

/** Links, domains, emails, @handles and long digit runs (phone numbers). */
const LINK_PATTERN =
  /(https?:|www\.|\.[a-z]{2,}(\/|\b)|@\w|\d[\d\s().-]{6,}\d)/i;

function normalize(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[01!3@457$89]/g, (c) => LEET[c] ?? c);
}

/** True if `text` is fine to show on a public Proudly page. */
export function isAllowedShareText(text: string): boolean {
  if (LINK_PATTERN.test(text)) return false;
  const normalized = normalize(text);
  // Whole words, ignoring punctuation; also catch doubled letters ("fuuuck").
  const words = normalized.split(/[^a-z]+/).filter(Boolean);
  for (const word of words) {
    if (BLOCKED_WORDS.has(word) || BLOCKED_WORDS.has(word.replace(/(.)\1+/g, "$1"))) {
      return false;
    }
  }
  // Spaced-out or joined phrases ("f u c k", "killyourself").
  const squashed = normalized.replace(/[^a-z]/g, "");
  if (BLOCKED_PHRASES.some((phrase) => squashed.includes(phrase))) return false;
  // Letters split up by spaces or dots ("f u c k", "F.U.C.K").
  if (words.length > 1 && words.every((w) => w.length === 1)) {
    if (BLOCKED_WORDS.has(squashed)) return false;
  }
  return true;
}
