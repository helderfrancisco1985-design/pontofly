import { cookies } from "next/headers";
import type { Locale } from "./translations";

const VALID: Locale[] = ["pt", "en", "es", "fr"];

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const val = store.get("locale")?.value;
  return VALID.includes(val as Locale) ? (val as Locale) : "pt";
}
