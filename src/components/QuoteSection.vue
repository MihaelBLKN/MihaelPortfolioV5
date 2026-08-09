<script setup lang="ts">
import { useI18n } from "../i18n";

const { content } = useI18n();
</script>

<template>
  <section class="border-y border-line py-24 md:py-32">
    <div class="mx-auto max-w-3xl px-6 text-center">
      <p class="font-display text-2xl font-medium leading-snug text-bone md:text-3xl">
        &ldquo;{{ content.quote.quote }}&rdquo;
      </p>
      <p class="mt-6 text-sm text-bone-dim">
        <span class="font-medium text-bone">{{ content.quote.author }}</span> - {{ content.quote.role }}
      </p>
    </div>
  </section>
</template>
