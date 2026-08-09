<script setup lang="ts">
import { ref } from "vue";
import { profile } from "../data/content";
import { useI18n } from "../i18n";
import LanguageSwitch from "./LanguageSwitch.vue";

const open = ref(false);
const { content } = useI18n();
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-4">
    <div class="relative flex items-center gap-2">
      <div class="relative">
        <nav
          class="pointer-events-auto relative flex h-14 items-center gap-1 rounded-full border border-bone/10 bg-surface-2/70 px-2 shadow-[inset_0_1px_0_rgba(244,242,238,0.08),0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <a href="#top" class="rounded-full px-4 py-2 text-sm text-bone-dim transition-colors hover:text-bone shrink-0">
            {{ profile.name }}
          </a>

          <div class="hidden md:flex items-center gap-6 border-l border-bone/10 pl-6 pr-3">
            <a
              v-for="link in content.nav.links"
              :key="link.href"
              :href="link.href"
              class="text-sm text-bone-dim transition-colors hover:text-bone"
            >
              {{ link.label }}
            </a>
          </div>

          <a
            href="#contact"
            class="hidden sm:inline-flex items-center rounded-full bg-amber px-4 py-2 text-sm font-medium text-ink transition-transform active:scale-[0.97] hover:bg-amber-dim"
          >
            {{ content.nav.contact }}
          </a>
          <button
            class="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone"
            aria-label="Toggle menu"
            @click="open = !open"
          >
            <svg v-if="!open" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 4h14M1 8h14M1 12h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </button>
        </nav>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 -translate-y-2"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="open"
            class="pointer-events-auto absolute inset-x-2 top-[calc(100%+0.5rem)] rounded-2xl border border-bone/10 bg-surface-2/90 px-6 py-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl md:hidden"
          >
            <div class="flex flex-col gap-4">
              <a
                v-for="link in content.nav.links"
                :key="link.href"
                :href="link.href"
                class="text-sm text-bone-dim hover:text-bone"
                @click="open = false"
              >
                {{ link.label }}
              </a>
              <a
                href="#contact"
                class="inline-flex w-fit items-center rounded-full bg-amber px-4 py-2 text-sm font-medium text-ink"
                @click="open = false"
              >
                {{ content.nav.contact }}
              </a>
              <div class="border-t border-bone/10 pt-4">
                <LanguageSwitch />
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <LanguageSwitch class="pointer-events-auto hidden md:flex" />
    </div>
  </header>
</template>
