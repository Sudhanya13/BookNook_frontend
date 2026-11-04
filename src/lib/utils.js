export { cn } from "cn";

/** First letters of each word — used for avatar fallbacks. */
export function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
