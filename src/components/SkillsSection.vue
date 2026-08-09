<script setup lang="ts">
import { PhCode, PhStack, PhDatabase, PhCloudArrowUp } from "@phosphor-icons/vue";
import { skillGroupItems } from "../data/content";
import { useI18n } from "../i18n";

const icons = [PhCode, PhStack, PhDatabase, PhCloudArrowUp];
const { content } = useI18n();
</script>

<template>
  <section id="skills" class="py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <h2 v-reveal class="font-display text-3xl font-semibold leading-tight text-bone md:text-4xl">
              {{ content.skills.headingPrefix }} <span class="text-amber">{{ content.skills.headingHighlight }}</span>
            </h2>
            <div v-reveal="80" class="mt-6 h-px w-12 bg-amber" aria-hidden="true" />
            <p v-reveal="120" class="mt-6 max-w-sm text-sm leading-relaxed text-bone-dim">
              {{ content.skills.description }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-8">
          <div
            v-for="(group, i) in content.skills.groups"
            :key="group.title"
            v-reveal="i * 100"
            class="grid grid-cols-[2.5rem_1fr] gap-6"
          >
            <div class="relative flex justify-center">
              <span
                v-if="i > 0"
                class="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-line"
                style="height: calc(50% - 1.25rem)"
                aria-hidden="true"
              />
              <span
                class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-line bg-surface text-amber"
              >
                <component :is="icons[i]" :size="18" weight="regular" />
              </span>
              <span
                v-if="i < content.skills.groups.length - 1"
                class="absolute left-1/2 bottom-0 w-px -translate-x-1/2 bg-line"
                style="height: calc(50% - 1.25rem)"
                aria-hidden="true"
              />
            </div>

            <div
              class="py-8"
              :class="[i === 0 ? 'pt-0' : '', i === content.skills.groups.length - 1 ? 'pb-0' : '']"
            >
              <div class="md:grid md:grid-cols-12 md:items-center md:gap-6">
                <div class="md:col-span-4">
                  <h3 class="font-display text-lg font-medium text-bone">{{ group.title }}</h3>
                  <p class="mt-2 text-sm leading-relaxed text-bone-dim">{{ group.description }}</p>
                </div>

                <ul class="mt-6 flex flex-wrap gap-x-7 gap-y-5 md:col-span-8 md:mt-0 md:border-l md:border-line md:pl-6">
                  <li v-for="tech in skillGroupItems[i]" :key="tech.name" class="flex w-14 flex-col items-center gap-2 text-center">
                    <img
                      :src="`https://cdn.simpleicons.org/${tech.slug}/7a7a80`"
                      :alt="tech.name"
                      loading="lazy"
                      class="h-4 w-4 opacity-70 grayscale transition-opacity hover:opacity-100"
                    />
                    <span class="text-xs text-bone-dim">{{ tech.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
