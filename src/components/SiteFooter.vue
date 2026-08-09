<script setup lang="ts">
import { PhEnvelopeSimple, PhLinkedinLogo } from "@phosphor-icons/vue";
import { profile } from "../data/content";
import { useI18n } from "../i18n";

const year = new Date().getFullYear();
const { content } = useI18n();
</script>

<template>
  <footer class="border-t border-line py-12">
    <div class="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <a href="#top" class="font-display text-sm font-medium text-bone">{{ profile.name }}</a>
        <p class="mt-1 text-xs text-muted">&copy; {{ year }}. {{ content.footer.builtWith }}</p>
      </div>

      <div class="flex flex-wrap gap-6">
        <a
          v-for="link in content.nav.links"
          :key="link.href"
          :href="link.href"
          class="text-xs text-bone-dim transition-colors hover:text-bone"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-4">
        <a
          :href="`mailto:${profile.email}`"
          aria-label="Email"
          class="text-bone-dim transition-colors hover:text-bone"
        >
          <PhEnvelopeSimple :size="18" />
        </a>
        <a
          :href="profile.social.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="text-bone-dim transition-colors hover:text-bone"
        >
          <PhLinkedinLogo :size="18" />
        </a>
      </div>
    </div>
  </footer>
</template>
