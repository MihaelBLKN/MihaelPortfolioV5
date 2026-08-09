<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import HeroScene from "./HeroScene.vue";
</script>

<template>
  <div
    class="hero-canvas-mask pointer-events-none absolute inset-y-0 right-0 w-[70%] lg:w-[56%]"
    aria-hidden="true"
  >
    <TresCanvas
      :dpr="[1, 1.75]"
      :alpha="true"
      clear-color="#0b0b0d"
      :clear-alpha="0"
      render-mode="always"
      :shadows="false"
    >
      <HeroScene />
    </TresCanvas>
  </div>
</template>

<style scoped>
/* Radial dissolve so the mesh reads as part of the ambient background glow
   rather than a hard-edged sprite, and never looks clipped by the viewport edge. */
.hero-canvas-mask {
  mask-image: radial-gradient(ellipse 65% 70% at 55% 48%, black 40%, transparent 90%);
  -webkit-mask-image: radial-gradient(ellipse 65% 70% at 55% 48%, black 40%, transparent 90%);
}
</style>
