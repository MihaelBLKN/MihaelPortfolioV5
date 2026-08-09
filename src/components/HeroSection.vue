<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { PhArrowDown, PhDownloadSimple, PhX } from "@phosphor-icons/vue";
import { heroIntro, profile } from "../data/content";
import { useI18n } from "../i18n";
import HeroCanvas from "./three/HeroCanvas.vue";

const { content, locale } = useI18n();

const heroRef = ref<HTMLElement | null>(null);
const glowRef = ref<HTMLElement | null>(null);
const glowRightRef = ref<HTMLElement | null>(null);
const showCanvas = ref(false);
const showResume = ref(false);

function openResume() {
  showResume.value = true;
}

function closeResume() {
  showResume.value = false;
}

function handleResumeKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") closeResume();
}

let ctx: gsap.Context | undefined;
let quickX: ((value: number) => void) | undefined;
let quickY: ((value: number) => void) | undefined;
let desktopQuery: MediaQueryList | undefined;

function handleDesktopQueryChange(e: MediaQueryListEvent) {
  showCanvas.value = e.matches;
}

function handlePointerMove(e: PointerEvent) {
  if (!heroRef.value) return;
  const rect = heroRef.value.getBoundingClientRect();
  const relX = (e.clientX - rect.left) / rect.width - 0.5;
  const relY = (e.clientY - rect.top) / rect.height - 0.5;
  quickX?.(relX * 50);
  quickY?.(relY * 40);
}

onMounted(() => {
  if (!heroRef.value) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  desktopQuery = window.matchMedia("(min-width: 768px)");
  showCanvas.value = desktopQuery.matches;
  desktopQuery.addEventListener("change", handleDesktopQueryChange);
  window.addEventListener("keydown", handleResumeKeydown);

  ctx = gsap.context(() => {
    if (reduceMotion) {
      gsap.set([".hero-word-inner", ".hero-fade", ".hero-fade-text"], { opacity: 1, y: 0, yPercent: 0 });
      gsap.set(".hero-name", { opacity: 1, filter: "blur(0px)" });
      gsap.set([glowRef.value, glowRightRef.value], { opacity: 1 });
      return;
    }

    if (glowRef.value) {
      quickX = gsap.quickTo(glowRef.value, "x", { duration: 1.1, ease: "power3.out" });
      quickY = gsap.quickTo(glowRef.value, "y", { duration: 1.1, ease: "power3.out" });
      gsap.to(glowRef.value, {
        x: "+=50",
        y: "+=30",
        duration: 16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      heroRef.value?.addEventListener("pointermove", handlePointerMove);
    }

    if (glowRightRef.value) {
      gsap.to(glowRightRef.value, {
        x: "-=40",
        y: "+=50",
        scale: 1.08,
        duration: 20,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(glowRef.value, { opacity: 0 }, { opacity: 1, duration: 2.2, ease: "power1.out" }, 0)
      .fromTo(glowRightRef.value, { opacity: 0 }, { opacity: 1, duration: 2.6, ease: "power1.out" }, 0.15)
      .fromTo(
        ".hero-meta",
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
        0.2,
      )
      .fromTo(
        ".hero-name",
        { opacity: 0, filter: "blur(18px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power2.out" },
        0.5,
      )
      .fromTo(
        ".hero-word-inner",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.4, stagger: 0.15, ease: "power4.out" },
        0.55,
      )
      .fromTo(
        ".hero-fade-text",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        0.85,
      )
      .fromTo(".hero-fade", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.16 }, "-=0.65");
  }, heroRef.value);
});

onUnmounted(() => {
  heroRef.value?.removeEventListener("pointermove", handlePointerMove);
  desktopQuery?.removeEventListener("change", handleDesktopQueryChange);
  window.removeEventListener("keydown", handleResumeKeydown);
  ctx?.revert();
});
</script>

<template>
  <section
    id="top"
    ref="heroRef"
    class="relative isolate flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-ink"
  >
    <div class="pointer-events-none absolute inset-0 z-0">
      <div
        ref="glowRef"
        class="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/10 opacity-0 blur-[140px] will-change-transform"
        aria-hidden="true"
      />
      <div
        ref="glowRightRef"
        class="absolute left-[68%] top-1/2 hidden h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/15 opacity-0 blur-[160px] will-change-transform md:block"
        aria-hidden="true"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.65)_100%)]"
        aria-hidden="true"
      />
      <div class="hero-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" aria-hidden="true" />
    </div>

    <HeroCanvas v-if="showCanvas" class="z-[1]" />

    <div
      class="relative z-10 mx-auto flex w-full max-w-[1600px] px-6 pt-24 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:px-12 md:pt-28"
    >
      <span class="hero-meta opacity-0">{{ heroIntro.coordinates }}</span>
    </div>

    <div class="relative z-10 flex flex-1 items-center py-4">
      <div class="mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <div class="max-w-[92vw] md:pl-[6vw]">
          <h1 class="hero-name font-serif-display leading-[0.86] text-bone opacity-0">
            <span class="block overflow-hidden text-[16vw] md:text-[11vw] lg:text-[9rem]">
              <span class="hero-word-inner inline-block will-change-transform">Mihael</span>
            </span>
            <span class="block overflow-hidden text-[16vw] md:text-[11vw] lg:text-[9rem]">
              <span class="hero-word-inner inline-block will-change-transform">Pleško</span>
            </span>
          </h1>

          <p class="hero-fade-text mt-8 max-w-xl font-mono text-xs uppercase tracking-[0.22em] text-muted opacity-0 md:text-sm">
            {{ content.hero.roles.join(" · ") }}
          </p>

          <p class="hero-fade-text mt-6 max-w-md text-base leading-relaxed text-bone-dim opacity-0 md:text-lg">
            {{ content.hero.statement }}
          </p>

          <div class="hero-fade mt-9 flex flex-wrap items-center gap-4 opacity-0">
            <a
              href="#contact"
              class="inline-flex items-center rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform hover:bg-amber-dim active:scale-[0.97]"
            >
              {{ content.hero.contact }}
            </a>
            <button
              type="button"
              class="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-bone transition-colors hover:border-bone-dim active:scale-[0.97]"
              @click="openResume"
            >
              {{ content.hero.viewResume }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14"
    >
      <div class="hero-fade flex items-center gap-2.5 font-mono text-xs text-muted opacity-0">
        <span class="relative flex h-1.5 w-1.5 shrink-0">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
          <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
        </span>
        {{ content.hero.basedIn }} {{ content.hero.country }} · {{ content.hero.availability }}
      </div>

      <a
        href="#work"
        class="hero-fade group inline-flex w-fit items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-bone-dim opacity-0 transition-colors hover:text-bone"
      >
        {{ content.hero.exploreWork }}
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all group-hover:translate-y-0.5 group-hover:border-bone-dim"
        >
          <PhArrowDown :size="14" />
        </span>
      </a>
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
          v-if="showResume"
          class="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm md:p-10"
          @click="closeResume"
        >
          <div
            class="relative flex h-full max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-2xl"
            @click.stop
          >
            <div class="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <span class="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {{ profile.name }} — {{ content.hero.viewResume }}
              </span>
              <div class="flex items-center gap-2">
                <a
                  :href="profile.resumeUrl[locale]"
                  download
                  class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
                >
                  <PhDownloadSimple :size="14" weight="bold" />
                  {{ content.hero.downloadResume }}
                </a>
                <button
                  type="button"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
                  @click="closeResume"
                >
                  <PhX :size="16" weight="bold" />
                </button>
              </div>
            </div>
            <iframe
              :src="profile.resumeUrl[locale]"
              :title="`${profile.name} resume`"
              class="h-full w-full flex-1 bg-bone"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
