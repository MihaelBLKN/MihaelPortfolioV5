<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/content";
import { useI18n } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const { content } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const activePanel = ref(0);

let mm: ReturnType<typeof gsap.matchMedia> | undefined;

onMounted(() => {
  if (!sectionRef.value || !trackRef.value) return;

  mm = gsap.matchMedia();
  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    const track = trackRef.value!;
    const panelCount = track.children.length;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1,
        end: () => "+=" + (track.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          activePanel.value = Math.min(panelCount - 1, Math.round(self.progress * (panelCount - 1)));
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });
});

onUnmounted(() => {
  mm?.kill();
});
</script>

<template>
  <section id="about" ref="sectionRef" class="relative overflow-hidden bg-ink">
    <div ref="trackRef" class="flex flex-col md:h-screen md:w-[300vw] md:flex-row md:will-change-transform">
      <article
        class="flex min-h-screen w-full shrink-0 flex-col justify-center px-6 py-24 md:h-screen md:w-screen md:px-16 md:py-0 lg:px-28"
      >
        <span class="font-mono text-xs uppercase tracking-[0.35em] text-muted">01 — <span class="text-amber">About</span></span>
        <h2 class="mt-8 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-bone sm:text-5xl md:text-6xl lg:text-7xl">
          {{ content.about.heading }}
        </h2>
        <p class="mt-10 max-w-2xl text-lg leading-relaxed text-bone-dim md:text-xl">
          {{ content.about.summary }}
        </p>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-bone-dim/90 md:text-lg">
          {{ content.about.paragraph1 }} {{ content.about.paragraph2 }}
        </p>
      </article>

      <article
        class="flex min-h-screen w-full shrink-0 flex-col justify-center px-6 py-24 md:h-screen md:w-screen md:px-16 md:py-0 lg:px-28"
      >
        <span class="font-mono text-xs uppercase tracking-[0.35em] text-muted">02 — <span class="text-amber">Details</span></span>
        <dl class="mt-10 divide-y divide-line border-t border-line">
          <div class="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between">
            <dt class="font-mono text-sm uppercase tracking-[0.2em] text-muted">{{ content.about.basedInLabel }}</dt>
            <dd class="font-display text-4xl font-semibold text-bone md:text-6xl">{{ profile.location }}</dd>
          </div>
          <div class="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between">
            <dt class="font-mono text-sm uppercase tracking-[0.2em] text-muted">{{ content.about.experienceLabel }}</dt>
            <dd class="font-display text-4xl font-semibold text-bone md:text-6xl">{{ content.about.experienceValue }}</dd>
          </div>
          <div class="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between">
            <dt class="font-mono text-sm uppercase tracking-[0.2em] text-muted">{{ content.about.focusLabel }}</dt>
            <dd class="font-display text-4xl font-semibold text-bone md:text-6xl">{{ content.about.focusValue }}</dd>
          </div>
        </dl>
      </article>

      <article
        class="flex min-h-screen w-full shrink-0 flex-col justify-center px-6 py-24 md:h-screen md:w-screen md:px-16 md:py-0 lg:px-28"
      >
        <span class="font-mono text-xs uppercase tracking-[0.35em] text-muted"
          >03 — <span class="text-amber">{{ content.education.heading }}</span></span
        >
        <div class="mt-10 space-y-10 border-t border-line pt-10">
          <div
            v-for="item in content.education.items"
            :key="item.degree"
            class="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8"
          >
            <div>
              <h3 class="font-display text-2xl font-semibold text-bone md:text-4xl">{{ item.degree }}</h3>
              <p class="mt-1 text-sm text-amber md:text-base">{{ item.institution }}</p>
              <p class="mt-3 max-w-xl text-sm leading-relaxed text-bone-dim md:text-base">{{ item.description }}</p>
            </div>
            <span class="shrink-0 font-mono text-xs text-muted md:text-sm">{{ item.period }}</span>
          </div>
        </div>
      </article>
    </div>

    <div class="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 gap-2 md:flex">
      <span
        v-for="i in 3"
        :key="i"
        class="h-1.5 w-6 rounded-full transition-colors duration-300"
        :class="activePanel === i - 1 ? 'bg-amber' : 'bg-line'"
      />
    </div>
  </section>
</template>
