<script setup lang="ts">
import { useI18n } from "../i18n";

const { content } = useI18n();
</script>

<template>
  <section id="experience" class="py-24 md:py-32">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="font-display text-3xl font-semibold leading-tight text-bone md:text-4xl">{{ content.experience.heading }}</h2>

      <div class="relative mt-14 pl-8">
        <div class="absolute left-[5px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />

        <div
          v-for="(item, i) in content.experience.items"
          :key="item.company"
          v-reveal="i * 90"
          class="relative pb-14 last:pb-0"
        >
          <span class="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-ink bg-amber" />

          <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 class="font-display text-xl font-medium text-bone">{{ item.role }}</h3>
            <span class="font-mono text-xs text-muted">{{ item.period }}</span>
          </div>
          <p class="mt-1 text-sm font-medium text-amber">{{ item.company }}</p>
          <ul class="mt-3 max-w-[62ch] space-y-2 text-sm leading-relaxed text-bone-dim list-disc list-inside marker:text-muted">
            <li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
