<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroIntro, profile } from "../data/content";
import { useI18n } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const { content } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const bgFarRef = ref<HTMLElement | null>(null);
const bgMidRef = ref<HTMLElement | null>(null);
const bgNearRef = ref<HTMLElement | null>(null);
const bgDriftRef = ref<HTMLElement | null>(null);

const activePanel = ref(0);
const progress = ref(0);

const panelLabels = computed(() => ["About", "Details", content.value.education.heading]);

let mm: ReturnType<typeof gsap.matchMedia> | undefined;

onMounted(() => {
  if (!sectionRef.value || !trackRef.value) return;

  mm = gsap.matchMedia();

  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    const section = sectionRef.value!;
    const track = trackRef.value!;
    const panels = Array.from(track.querySelectorAll<HTMLElement>("article"));
    const inners = panels
      .map((p) => p.querySelector<HTMLElement>("[data-panel-inner]"))
      .filter((el): el is HTMLElement => !!el);

    const distance = () => track.scrollWidth - window.innerWidth;

    // Per-panel setters: content drifts, scales and dims by its distance from
    // the viewport centre, so every transition reads as depth instead of a slide.
    const setters = inners.map((el) => ({
      x: gsap.quickSetter(el, "xPercent"),
      scale: gsap.quickSetter(el, "scale"),
      opacity: gsap.quickSetter(el, "opacity"),
    }));

    function paintPanels(p: number) {
      const last = setters.length - 1;
      if (last < 0) return;
      for (let i = 0; i <= last; i++) {
        const offset = i - p * last;
        const away = Math.min(Math.abs(offset), 1);
        setters[i].x(gsap.utils.clamp(-1, 1, offset) * 12);
        setters[i].scale(1 - 0.1 * away);
        setters[i].opacity(1 - 0.78 * away);
      }
    }

    // Velocity-driven smear + background lag: the transition itself keeps moving
    // instead of snapping between two static frames.
    const skewTo = gsap.quickTo(track, "skewX", { duration: 0.6, ease: "power3" });
    const driftTo = bgDriftRef.value
      ? gsap.quickTo(bgDriftRef.value, "x", { duration: 0.9, ease: "power3" })
      : () => {};

    function settle() {
      skewTo(0);
      driftTo(0);
    }

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => paintPanels(self.progress),
        onUpdate: (self) => {
          progress.value = self.progress;
          activePanel.value = Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)));
          paintPanels(self.progress);

          const v = gsap.utils.clamp(-3.5, 3.5, self.getVelocity() / -340);
          skewTo(v);
          driftTo(v * 30);
        },
        onLeave: settle,
        onLeaveBack: settle,
      },
    });

    tl.to(track, { x: () => -distance() }, 0)
      .to(bgFarRef.value, { x: () => -distance() * 0.12 }, 0)
      .to(bgMidRef.value, { x: () => -distance() * 0.32 }, 0)
      .to(bgNearRef.value, { x: () => -distance() * 0.6 }, 0);

    paintPanels(0);

    return () => {
      gsap.set(inners, { clearProps: "transform,opacity" });
      gsap.set(track, { clearProps: "skewX" });
      if (bgDriftRef.value) gsap.set(bgDriftRef.value, { clearProps: "transform" });
      progress.value = 0;
      activePanel.value = 0;
    };
  });
});

onUnmounted(() => {
  mm?.kill();
});
</script>

<template>
  <section id="about" ref="sectionRef" class="relative overflow-hidden bg-ink">
    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div
        ref="bgFarRef"
        class="absolute inset-y-0 left-0 w-full will-change-transform motion-safe:md:-left-[20vw] motion-safe:md:w-[340vw]"
      >
        <div
          class="absolute inset-0"
          style="
            background-image: repeating-linear-gradient(
              104deg,
              transparent 0px,
              transparent 96px,
              rgba(244, 242, 238, 0.03) 97px,
              transparent 99px
            );
          "
        />
        <div
          class="absolute inset-0 opacity-70"
          style="
            background-image: radial-gradient(1px 1px at 4% 16%, rgba(244, 242, 238, 0.45), transparent),
              radial-gradient(1px 1px at 11% 62%, rgba(244, 242, 238, 0.3), transparent),
              radial-gradient(1px 1px at 19% 31%, rgba(244, 242, 238, 0.4), transparent),
              radial-gradient(1px 1px at 27% 78%, rgba(244, 242, 238, 0.3), transparent),
              radial-gradient(1px 1px at 36% 12%, rgba(244, 242, 238, 0.42), transparent),
              radial-gradient(1px 1px at 44% 55%, rgba(244, 242, 238, 0.3), transparent),
              radial-gradient(1px 1px at 53% 84%, rgba(244, 242, 238, 0.35), transparent),
              radial-gradient(1px 1px at 61% 25%, rgba(244, 242, 238, 0.4), transparent),
              radial-gradient(1px 1px at 69% 68%, rgba(244, 242, 238, 0.3), transparent),
              radial-gradient(1px 1px at 78% 38%, rgba(244, 242, 238, 0.42), transparent),
              radial-gradient(1px 1px at 86% 8%, rgba(244, 242, 238, 0.3), transparent),
              radial-gradient(1px 1px at 94% 72%, rgba(244, 242, 238, 0.38), transparent);
            background-size: 100% 100%;
          "
        />
      </div>

      <div
        ref="bgMidRef"
        class="absolute inset-y-0 left-0 w-full will-change-transform motion-safe:md:-left-[20vw] motion-safe:md:w-[340vw]"
      >
        <div
          class="drift absolute left-[10%] top-[4%] h-[380px] w-[380px] rounded-full bg-amber/[0.07] blur-[110px] md:h-[540px] md:w-[540px]"
        />
        <div
          class="drift-slow absolute bottom-[-8%] left-[19%] h-[420px] w-[420px] rounded-full bg-surface-3/80 blur-[110px] md:h-[620px] md:w-[620px]"
        />
        <div
          class="drift-slow absolute left-[26%] top-[16%] h-[360px] w-[360px] rounded-full bg-surface-3/70 blur-[100px] md:h-[520px] md:w-[520px]"
        />
        <div
          class="drift absolute left-[33%] top-[44%] h-[340px] w-[340px] rounded-full bg-amber/[0.06] blur-[120px] md:h-[500px] md:w-[500px]"
        />
        <div
          class="drift-slow absolute left-[40%] top-[2%] h-[400px] w-[400px] rounded-full bg-surface-3/70 blur-[110px] md:h-[560px] md:w-[560px]"
        />
        <div
          class="drift absolute bottom-[-4%] left-[47%] h-[360px] w-[360px] rounded-full bg-amber/[0.05] blur-[120px] md:h-[520px] md:w-[520px]"
        />
      </div>

      <div
        ref="bgNearRef"
        class="absolute inset-y-0 left-0 w-full will-change-transform motion-safe:md:-left-[20vw] motion-safe:md:w-[340vw]"
      >
        <div ref="bgDriftRef" class="absolute inset-0 will-change-transform">
          <div class="drift absolute left-[7%] top-[22%] h-14 w-14 rotate-[-12deg] rounded-sm border border-line md:h-20 md:w-20" />
          <div class="drift-slow absolute left-[14%] top-[70%] h-10 w-16 rotate-[8deg] rounded-sm border border-amber/20" />
          <span class="absolute left-[21%] top-[18%] h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_14px_3px_rgba(142,197,245,0.55)]" />
          <div class="drift absolute left-[27%] top-[58%] h-12 w-12 rotate-[18deg] rounded-full border border-line" />
          <div class="drift-slow absolute left-[33%] top-[28%] h-16 w-10 rotate-[-6deg] rounded-sm border border-line/80 md:h-24 md:w-14" />
          <span class="absolute left-[39%] top-[76%] h-1 w-1 rounded-full bg-amber/80 shadow-[0_0_10px_2px_rgba(142,197,245,0.5)]" />
          <div class="drift absolute left-[45%] top-[14%] h-10 w-10 rotate-[24deg] rounded-sm border border-amber/15" />
          <div class="drift-slow absolute left-[52%] top-[62%] h-14 w-14 rotate-[-10deg] rounded-full border border-line" />
          <span class="absolute left-[59%] top-[34%] h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_12px_3px_rgba(142,197,245,0.5)]" />
          <div class="drift absolute left-[66%] top-[74%] h-12 w-16 rotate-[6deg] rounded-sm border border-line/70" />
        </div>
      </div>

      <div
        class="absolute inset-0"
        style="background: radial-gradient(ellipse at center, transparent 30%, rgba(11, 11, 13, 0.72) 100%)"
      />
    </div>

    <div
      ref="trackRef"
      class="relative z-10 flex flex-col motion-safe:md:h-screen motion-safe:md:w-[300vw] motion-safe:md:flex-row motion-safe:md:will-change-transform"
    >
      <article
        class="relative flex min-h-[85vh] w-full shrink-0 items-center py-24 motion-safe:md:h-screen motion-safe:md:min-h-0 motion-safe:md:w-screen motion-safe:md:py-0"
      >
        <div data-panel-inner class="mx-auto w-full max-w-6xl px-6 md:px-16 lg:px-20">
          <span class="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            01 — <span class="text-amber">About</span>
          </span>

          <div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div class="lg:col-span-7">
              <h2 class="font-display text-3xl font-semibold leading-[1.1] text-bone sm:text-4xl lg:text-5xl">
                {{ content.about.heading }}
              </h2>
              <p class="mt-8 max-w-[46ch] text-base leading-relaxed text-bone-dim md:text-lg">
                {{ content.about.summary }}
              </p>
            </div>

            <div class="space-y-6 border-line lg:col-span-5 lg:border-l lg:pl-10">
              <p class="max-w-[52ch] text-sm leading-relaxed text-bone-dim/90 md:text-[15px]">
                {{ content.about.paragraph1 }}
              </p>
              <p class="max-w-[52ch] text-sm leading-relaxed text-bone-dim/90 md:text-[15px]">
                {{ content.about.paragraph2 }}
              </p>
            </div>
          </div>
        </div>

      </article>

      <article
        class="relative flex min-h-[85vh] w-full shrink-0 items-center py-24 motion-safe:md:h-screen motion-safe:md:min-h-0 motion-safe:md:w-screen motion-safe:md:py-0"
      >
        <div data-panel-inner class="mx-auto w-full max-w-6xl px-6 md:px-16 lg:px-20">
          <span class="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            02 — <span class="text-amber">Details</span>
          </span>

          <dl class="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            <div class="bg-ink/70 p-6 backdrop-blur-sm md:p-8">
              <span class="font-mono text-[11px] tabular-nums text-muted">01</span>
              <dt class="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {{ content.about.basedInLabel }}
              </dt>
              <dd class="mt-2 font-display text-2xl font-semibold leading-tight text-bone md:text-[1.75rem]">
                {{ profile.location }}
              </dd>
            </div>
            <div class="bg-ink/70 p-6 backdrop-blur-sm md:p-8">
              <span class="font-mono text-[11px] tabular-nums text-muted">02</span>
              <dt class="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {{ content.about.experienceLabel }}
              </dt>
              <dd class="mt-2 font-display text-2xl font-semibold leading-tight text-bone md:text-[1.75rem]">
                {{ content.about.experienceValue }}
              </dd>
            </div>
            <div class="bg-ink/70 p-6 backdrop-blur-sm md:p-8">
              <span class="font-mono text-[11px] tabular-nums text-muted">03</span>
              <dt class="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {{ content.about.focusLabel }}
              </dt>
              <dd class="mt-2 font-display text-2xl font-semibold leading-tight text-bone md:text-[1.75rem]">
                {{ content.about.focusValue }}
              </dd>
            </div>
          </dl>

          <div class="mt-8 flex items-center gap-5">
            <span class="font-mono text-[11px] tracking-[0.15em] text-muted">{{ heroIntro.coordinates }}</span>
            <span class="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
        </div>

      </article>

      <article
        class="relative flex min-h-[85vh] w-full shrink-0 items-center py-24 motion-safe:md:h-screen motion-safe:md:min-h-0 motion-safe:md:w-screen motion-safe:md:py-0"
      >
        <div data-panel-inner class="mx-auto w-full max-w-5xl px-6 md:px-16 lg:px-20">
          <span class="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            03 — <span class="text-amber">{{ content.education.heading }}</span>
          </span>

          <div class="mt-10 border-t border-line">
            <div
              v-for="(item, i) in content.education.items"
              :key="item.degree"
              class="relative grid grid-cols-1 gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-12"
            >
              <span
                class="pointer-events-none absolute -top-2 right-0 hidden select-none font-serif-display text-[6rem] leading-none text-line/50 lg:block"
                aria-hidden="true"
              >
                {{ String(i + 1).padStart(2, "0") }}
              </span>

              <div class="lg:col-span-3">
                <span class="font-mono text-xs tabular-nums text-muted">{{ item.period }}</span>
              </div>

              <div class="relative lg:col-span-9">
                <h3 class="font-display text-xl font-semibold leading-snug text-bone md:text-2xl">
                  {{ item.degree }}
                </h3>
                <p class="mt-2 text-sm text-amber">{{ item.institution }}</p>
                <p class="mt-4 max-w-[56ch] text-sm leading-relaxed text-bone-dim">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div
        v-for="seam in 2"
        :key="seam"
        class="pointer-events-none absolute top-1/2 hidden h-[150vh] w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.05] blur-[120px] motion-safe:md:block"
        :style="{ left: seam * 100 + 'vw' }"
        aria-hidden="true"
      />
    </div>

    <div class="pointer-events-none absolute inset-x-0 bottom-8 z-20 hidden motion-safe:md:block">
      <div class="mx-auto flex w-56 flex-col items-center gap-3">
        <div class="flex w-full items-center justify-between">
          <span
            v-for="(label, i) in panelLabels"
            :key="label"
            class="font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-500"
            :class="activePanel === i ? 'text-bone' : 'text-muted/50'"
          >
            {{ label }}
          </span>
        </div>
        <div class="relative h-px w-full bg-line">
          <div class="absolute inset-y-0 left-0 bg-amber" :style="{ width: progress * 100 + '%' }" />
        </div>
      </div>
    </div>
  </section>
</template>
