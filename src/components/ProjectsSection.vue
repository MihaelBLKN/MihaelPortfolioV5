<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhEye, PhX } from "@phosphor-icons/vue";
import { projectImages } from "../data/content";
import { useI18n } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const { content } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const glowsRef = ref<HTMLElement | null>(null);
const ticksRef = ref<HTMLElement | null>(null);
const framesFarRef = ref<HTMLElement | null>(null);
const framesNearRef = ref<HTMLElement | null>(null);

let bgCtx: gsap.Context | undefined;

onMounted(() => {
  if (!sectionRef.value) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  bgCtx = gsap.context(() => {
    const layers: [HTMLElement | null, number][] = [
      [glowsRef.value, -5],
      [ticksRef.value, -14],
      [framesFarRef.value, -24],
      [framesNearRef.value, -38],
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

    gsap.to(framesNearRef.value, {
      rotate: 6,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  bgCtx?.revert();
});

const previewSrc = ref<string | null>(null);
const previewAlt = ref("");

function openPreview(src: string, alt: string) {
  previewSrc.value = src;
  previewAlt.value = alt;
}

function closePreview() {
  previewSrc.value = null;
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") closePreview();
}

window.addEventListener("keydown", handleKeydown);
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

function pad(n: number) {
  return String(n).padStart(2, "0");
}
</script>

<template>
  <section id="work" ref="sectionRef" class="relative overflow-hidden py-24 md:py-32">
    <div
      class="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style="
        mask-image: linear-gradient(to bottom, transparent 0, black 160px, black calc(100% - 140px), transparent 100%);
        -webkit-mask-image: linear-gradient(
          to bottom,
          transparent 0,
          black 160px,
          black calc(100% - 140px),
          transparent 100%
        );
      "
    >
      <div ref="glowsRef" class="absolute inset-0 will-change-transform">
        <div
          class="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-surface-3/70 blur-[100px] md:h-[520px] md:w-[520px]"
        />
        <div
          class="absolute -right-40 top-0 h-[320px] w-[320px] rounded-full bg-amber/[0.06] blur-[110px] md:h-[420px] md:w-[420px]"
        />
      </div>

      <div ref="ticksRef" class="absolute -inset-y-24 inset-x-0 opacity-60 will-change-transform">
        <span
          v-for="(pos, i) in [
            ['9%', '10%'], ['27%', '32%'], ['52%', '8%'], ['71%', '46%'],
            ['88%', '20%'], ['14%', '64%'], ['38%', '82%'], ['64%', '70%'],
            ['83%', '86%'], ['6%', '90%'],
          ]"
          :key="i"
          class="absolute h-2.5 w-2.5 border-t border-l border-bone-dim/25"
          :style="{ left: pos[0], top: pos[1] }"
        />
      </div>

      <div ref="framesFarRef" class="absolute inset-0 will-change-transform">
        <div class="absolute left-[8%] top-[18%] h-16 w-12 rotate-[-8deg] rounded-sm border border-line/70 md:h-20 md:w-16" />
        <div class="absolute right-[12%] top-[62%] h-14 w-14 rotate-[10deg] rounded-sm border border-line/60 md:h-20 md:w-20" />
        <div class="absolute left-[46%] top-[85%] h-10 w-16 rotate-[4deg] rounded-sm border border-line/50 md:h-12 md:w-24" />
      </div>

      <div ref="framesNearRef" class="absolute inset-0 will-change-transform">
        <div class="absolute right-[22%] top-[8%] h-10 w-10 rotate-[-14deg] rounded-sm border border-amber/20 md:h-14 md:w-14" />
        <div class="absolute left-[18%] top-[48%] h-8 w-12 rotate-[9deg] rounded-sm border border-amber/15 md:h-10 md:w-16" />
        <div class="absolute left-[70%] top-[36%] h-6 w-6 rotate-[20deg] rounded-sm border border-bone-dim/20" />
      </div>
    </div>

    <div class="relative z-10 mx-auto max-w-7xl px-6">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.22em] text-muted">
            {{ pad(content.projects.items.length) }} {{ content.projects.countSuffix }}
          </p>
          <h2 class="mt-3 max-w-[22ch] font-display text-3xl font-semibold leading-tight text-bone md:text-4xl">
            {{ content.projects.heading }}
          </h2>
        </div>
        <p class="max-w-[38ch] text-sm leading-relaxed text-bone-dim">
          {{ content.projects.description }}
        </p>
      </div>

      <div class="mt-16 border-b border-line">
        <article
          v-for="(project, i) in content.projects.items"
          :key="project.name"
          v-reveal="i * 100"
          class="group relative border-t border-line py-12 md:py-16"
        >
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="flex items-center justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-start lg:justify-between">
              <span
                class="font-mono text-xs tabular-nums text-muted transition-colors duration-300 group-hover:text-amber"
              >
                {{ pad(i + 1) }}
              </span>

              <ul class="hidden font-mono text-[11px] uppercase tracking-wider text-muted lg:block lg:space-y-2">
                <li v-for="t in project.tech.split(', ')" :key="t">{{ t }}</li>
              </ul>

              <button
                type="button"
                class="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-bone-dim transition-colors hover:text-bone lg:mt-auto lg:flex lg:pt-6"
                @click="openPreview(projectImages[i], project.name)"
              >
                {{ content.projects.viewImage }}
                <span
                  class="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-bone-dim"
                >
                  <PhEye :size="12" weight="bold" />
                </span>
              </button>
            </div>

            <div class="relative lg:col-span-9">
              <span
                class="pointer-events-none absolute -top-6 right-0 hidden select-none font-serif-display text-[7rem] leading-none text-line/60 lg:block lg:text-[9rem]"
                aria-hidden="true"
              >
                {{ pad(i + 1) }}
              </span>

              <h3 class="relative font-serif-display text-3xl leading-[1.05] text-bone md:text-5xl">
                {{ project.name }}
              </h3>

              <p class="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted lg:hidden">
                {{ project.tech }}
              </p>

              <div class="relative mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-muted">{{ content.projects.problemLabel }}</h4>
                  <p class="mt-3 max-w-[42ch] text-sm leading-relaxed text-bone-dim">{{ project.problem }}</p>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-muted">{{ content.projects.architectureLabel }}</h4>
                  <p class="mt-3 max-w-[42ch] text-sm leading-relaxed text-bone-dim">{{ project.architecture }}</p>
                </div>
              </div>

              <div class="relative mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
                <div v-for="stat in project.stats" :key="stat.label">
                  <div class="font-display text-3xl font-semibold text-amber md:text-4xl">{{ stat.value }}</div>
                  <div class="mt-1 text-xs uppercase tracking-wider text-muted">{{ stat.label }}</div>
                </div>
              </div>

              <button
                type="button"
                class="relative mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-bone-dim transition-colors lg:hidden hover:text-bone"
                @click="openPreview(projectImages[i], project.name)"
              >
                {{ content.projects.viewImage }}
                <PhEye :size="12" weight="bold" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="previewSrc"
          class="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
          @click="closePreview"
        >
          <button
            type="button"
            class="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
            @click="closePreview"
          >
            <PhX :size="16" weight="bold" />
          </button>
          <img
            :src="previewSrc ?? undefined"
            :alt="previewAlt"
            class="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
