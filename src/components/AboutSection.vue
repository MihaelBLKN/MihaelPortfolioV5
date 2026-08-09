<script setup lang="ts">
import { profile } from "../data/content";
import { useI18n } from "../i18n";

const { content } = useI18n();
</script>

<template>
  <section id="about" class="py-24 md:py-32">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div v-reveal class="lg:col-span-5">
        <div class="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-line">
          <img
            src="https://picsum.photos/seed/mihael-plesko-portrait/800/1000"
            alt="Portrait of Mihael Pleško"
            class="h-full w-full object-cover grayscale"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </div>
      </div>

      <div v-reveal="100" class="lg:col-span-7">
        <h2 class="font-display text-3xl font-semibold leading-tight text-bone md:text-4xl">
          {{ content.about.heading }}
        </h2>
        <p class="mt-6 max-w-[62ch] text-base leading-relaxed text-bone-dim">
          {{ content.about.summary }} {{ content.about.paragraph1 }}
        </p>
        <p class="mt-4 max-w-[62ch] text-base leading-relaxed text-bone-dim">
          {{ content.about.paragraph2 }}
        </p>

        <dl class="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <dt class="text-xs text-muted">{{ content.about.basedInLabel }}</dt>
            <dd class="mt-1 font-mono text-sm text-bone">{{ profile.location }}</dd>
          </div>
          <div>
            <dt class="text-xs text-muted">{{ content.about.experienceLabel }}</dt>
            <dd class="mt-1 font-mono text-sm text-bone">{{ content.about.experienceValue }}</dd>
          </div>
          <div>
            <dt class="text-xs text-muted">{{ content.about.focusLabel }}</dt>
            <dd class="mt-1 font-mono text-sm text-bone">{{ content.about.focusValue }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
