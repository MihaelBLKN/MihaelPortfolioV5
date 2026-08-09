import { computed, ref, watch } from "vue";
import { translations, type Locale } from "./translations";

export type { Locale } from "./translations";

const SUPPORTED_LOCALES: Locale[] = ["en", "hr"];
const STORAGE_KEY = "portfolio-lang";
const DEFAULT_LOCALE: Locale = "en";

function isLocale(value: string | null): value is Locale {
  return !!value && SUPPORTED_LOCALES.includes(value as Locale);
}

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLocale(fromUrl)) return fromUrl;

  const fromStorage = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(fromStorage)) return fromStorage;

  return DEFAULT_LOCALE;
}

function syncUrl(next: Locale) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (next === DEFAULT_LOCALE) {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", next);
  }
  window.history.replaceState(window.history.state, "", url);
}

const locale = ref<Locale>(detectInitialLocale());

watch(
  locale,
  (next) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, next);
    syncUrl(next);
    document.documentElement.lang = next === "hr" ? "hr" : "en";
    const content = translations[next];
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta.description);
  },
  { immediate: true },
);

function setLocale(next: Locale) {
  if (!SUPPORTED_LOCALES.includes(next)) return;
  locale.value = next;
}

const content = computed(() => translations[locale.value]);

export function useI18n() {
  return { locale, setLocale, content, locales: SUPPORTED_LOCALES };
}
