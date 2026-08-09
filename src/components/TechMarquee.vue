<script setup lang="ts">
import { techStack } from "../data/content";

const looped = [...techStack, ...techStack];
</script>

<template>
  <section class="border-y border-line bg-surface/40 py-8">
    <div class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent"
        aria-hidden="true"
      />
      <div class="marquee-track flex w-max items-center gap-14">
        <img
          v-for="(slug, i) in looped"
          :key="slug + i"
          :src="`https://cdn.simpleicons.org/${slug}/7a7a80`"
          :alt="slug"
          class="h-6 w-auto shrink-0 opacity-70 grayscale transition-opacity hover:opacity-100"
        />
      </div>
    </div>
  </section>
</template>
