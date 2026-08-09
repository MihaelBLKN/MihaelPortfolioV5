<script setup lang="ts">
import { useI18n, type Locale } from "../i18n";

const { locale, setLocale, content } = useI18n();

const options: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hr", label: "HR" },
];

function select(code: Locale) {
  if (code !== locale.value) setLocale(code);
}
</script>

<template>
  <div
    role="radiogroup"
    :aria-label="content.language.label"
    class="relative flex h-14 items-center gap-0.5 rounded-full border border-bone/10 bg-surface-2/70 p-1.5 shadow-[inset_0_1px_0_rgba(244,242,238,0.08),0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
  >
    <span
      class="pointer-events-none absolute inset-y-1.5 w-[calc(50%-0.3rem)] rounded-full bg-amber transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="locale === 'hr' ? 'translate-x-[calc(100%+0.15rem)]' : 'translate-x-0'"
      aria-hidden="true"
    />

    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      role="radio"
      :aria-checked="locale === option.code"
      :aria-label="`${content.language.switchTo}: ${option.label}`"
      class="relative z-10 flex h-full w-11 items-center justify-center rounded-full font-mono text-xs font-medium tracking-wide transition-colors duration-300"
      :class="locale === option.code ? 'text-ink' : 'text-bone-dim hover:text-bone'"
      @click="select(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
