<script setup lang="ts">
import { PhArrowUpRight } from "@phosphor-icons/vue";
import { useI18n } from "../i18n";

const { content } = useI18n();

function pad(n: number) {
  return String(n).padStart(2, "0");
}
</script>

<template>
  <section id="work" class="py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-6">
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

              <a
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-bone-dim transition-colors hover:text-bone lg:mt-auto lg:flex lg:pt-6"
              >
                {{ project.isDemo ? content.projects.viewDemo : content.projects.viewProduct }}
                <span
                  class="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-bone-dim"
                >
                  <PhArrowUpRight :size="12" weight="bold" />
                </span>
              </a>
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

              <a
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-bone-dim transition-colors lg:hidden hover:text-bone"
              >
                {{ project.isDemo ? content.projects.viewDemo : content.projects.viewProduct }}
                <PhArrowUpRight :size="12" weight="bold" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
