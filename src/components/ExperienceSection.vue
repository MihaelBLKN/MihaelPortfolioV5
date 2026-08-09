<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const { content } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const cornersRef = ref<HTMLElement | null>(null);
const linesRef = ref<HTMLElement | null>(null);
const starsFarRef = ref<HTMLElement | null>(null);
const starsNearRef = ref<HTMLElement | null>(null);
const accentStarsRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | undefined;

onMounted(() => {
  if (!sectionRef.value) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  ctx = gsap.context(() => {
    const layers: [HTMLElement | null, number][] = [
      [linesRef.value, -4],
      [cornersRef.value, -9],
      [starsFarRef.value, -16],
      [starsNearRef.value, -28],
      [accentStarsRef.value, -42],
    ];

    for (const [el, yPercent] of layers) {
      if (!el) continue;
      gsap.to(el, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="experience" ref="sectionRef" class="relative overflow-hidden bg-ink py-24 md:py-32">
    <div
      class="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style="
        mask-image: linear-gradient(to bottom, transparent 0, black 180px, black calc(100% - 160px), transparent 100%);
        -webkit-mask-image: linear-gradient(
          to bottom,
          transparent 0,
          black 180px,
          black calc(100% - 160px),
          transparent 100%
        );
      "
    >
      <div
        ref="linesRef"
        class="absolute -inset-y-24 inset-x-0 will-change-transform"
        style="
          background-image: repeating-linear-gradient(
            112deg,
            transparent 0px,
            transparent 78px,
            rgba(244, 242, 238, 0.035) 79px,
            transparent 81px
          );
        "
      />

      <div ref="cornersRef" class="absolute inset-0 will-change-transform">
        <div
          class="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-surface-3/70 blur-[90px] md:h-[520px] md:w-[520px]"
        />
        <div
          class="absolute -bottom-48 -right-32 h-[380px] w-[380px] rounded-full bg-surface-3/60 blur-[90px] md:h-[480px] md:w-[480px]"
        />
      </div>

      <div
        ref="starsFarRef"
        class="absolute -inset-y-24 inset-x-0 opacity-70 will-change-transform"
        style="
          background-image: radial-gradient(1px 1px at 8% 12%, rgba(244, 242, 238, 0.5), transparent),
            radial-gradient(1px 1px at 22% 38%, rgba(244, 242, 238, 0.35), transparent),
            radial-gradient(1px 1px at 41% 6%, rgba(244, 242, 238, 0.45), transparent),
            radial-gradient(1px 1px at 63% 24%, rgba(244, 242, 238, 0.3), transparent),
            radial-gradient(1px 1px at 78% 52%, rgba(244, 242, 238, 0.4), transparent),
            radial-gradient(1px 1px at 91% 15%, rgba(244, 242, 238, 0.3), transparent),
            radial-gradient(1px 1px at 15% 68%, rgba(244, 242, 238, 0.35), transparent),
            radial-gradient(1px 1px at 34% 84%, rgba(244, 242, 238, 0.3), transparent),
            radial-gradient(1px 1px at 57% 74%, rgba(244, 242, 238, 0.4), transparent),
            radial-gradient(1px 1px at 85% 88%, rgba(244, 242, 238, 0.3), transparent),
            radial-gradient(1px 1px at 5% 92%, rgba(244, 242, 238, 0.3), transparent),
            radial-gradient(1px 1px at 96% 65%, rgba(244, 242, 238, 0.35), transparent);
          background-size: 100% 100%;
        "
      />

      <div
        ref="starsNearRef"
        class="absolute -inset-y-24 inset-x-0 will-change-transform"
        style="
          background-image: radial-gradient(1.4px 1.4px at 12% 22%, rgba(244, 242, 238, 0.7), transparent),
            radial-gradient(1.6px 1.6px at 30% 55%, rgba(244, 242, 238, 0.6), transparent),
            radial-gradient(1.2px 1.2px at 50% 15%, rgba(244, 242, 238, 0.55), transparent),
            radial-gradient(1.6px 1.6px at 70% 40%, rgba(244, 242, 238, 0.65), transparent),
            radial-gradient(1.3px 1.3px at 88% 70%, rgba(244, 242, 238, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 20% 82%, rgba(244, 242, 238, 0.55), transparent),
            radial-gradient(1.3px 1.3px at 60% 90%, rgba(244, 242, 238, 0.5), transparent);
          background-size: 100% 100%;
        "
      />

      <div ref="accentStarsRef" class="absolute inset-0 will-change-transform">
        <span class="absolute left-[19%] top-[14%] h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_12px_3px_rgba(142,197,245,0.65)]" />
        <span class="absolute right-[13%] top-[54%] h-1 w-1 rounded-full bg-amber shadow-[0_0_10px_2px_rgba(142,197,245,0.6)]" />
        <span class="absolute left-[46%] top-[78%] h-1 w-1 rounded-full bg-amber/80 shadow-[0_0_8px_2px_rgba(142,197,245,0.5)]" />
      </div>
    </div>

    <div class="relative z-10 mx-auto max-w-5xl px-6">
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
