<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useLoop } from "@tresjs/core";
import { Vector3 } from "three";
import type { Group, Mesh, PointLight } from "three";

const groupRef = ref<Group | null>(null);
const wireRef = ref<Mesh | null>(null);
const pulseLightRef = ref<PointLight | null>(null);

const cameraPosition = new Vector3(3.4, 0.3, 6.8);
const cameraLookAt = new Vector3(3.1, 0, 0);
const keyLightPosition = new Vector3(-5, 5.5, 3.5);
const rimLightPosition = new Vector3(4.5, 1.2, -4.5);
const pulseLightPosition = new Vector3(3.2, -0.2, 1.4);
const groupPosition = new Vector3(3.1, 0, 0);
const wireScale = new Vector3(1.1, 1.1, 1.1);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
const DAMPING = 0.06;

function handlePointerMove(event: PointerEvent) {
  targetX = (event.clientX / window.innerWidth) * 2 - 1;
  targetY = (event.clientY / window.innerHeight) * 2 - 1;
}

if (!reduceMotion) {
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
}

onUnmounted(() => {
  window.removeEventListener("pointermove", handlePointerMove);
});

const { onBeforeRender, start, stop } = useLoop();

let observer: IntersectionObserver | undefined;

function handleVisibilityChange() {
  if (document.hidden) stop();
  else start();
}

onMounted(() => {
  const heroEl = document.getElementById("top");
  if (heroEl) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    observer.observe(heroEl);
  }
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  observer?.disconnect();
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeRender(({ elapsed }) => {
  currentX += (targetX - currentX) * DAMPING;
  currentY += (targetY - currentY) * DAMPING;

  const idleSpin = reduceMotion ? 0 : elapsed * 0.05;

  if (groupRef.value) {
    groupRef.value.rotation.y = idleSpin + currentX * 0.35;
    groupRef.value.rotation.x = currentY * 0.22;
  }

  if (wireRef.value && !reduceMotion) {
    wireRef.value.rotation.y = -elapsed * 0.09;
    wireRef.value.rotation.x = elapsed * 0.04;
  }

  if (pulseLightRef.value && !reduceMotion) {
    pulseLightRef.value.intensity = 1.7 + Math.sin(elapsed * 1.4) * 0.9;
  }
});
</script>

<template>
  <TresPerspectiveCamera :position="cameraPosition" :look-at="cameraLookAt" :fov="42" />

  <TresFog attach="fog" color="#0b0b0d" :near="6" :far="14" />

  <TresAmbientLight :intensity="0.14" color="#8ec5f5" />

  <TresDirectionalLight :position="keyLightPosition" :intensity="1" color="#fff2df" />

  <TresDirectionalLight :position="rimLightPosition" :intensity="2.6" color="#70b8ff" />

  <TresPointLight
    ref="pulseLightRef"
    :position="pulseLightPosition"
    :intensity="1.7"
    color="#99ccff"
    :distance="9"
    :decay="2"
  />

  <TresGroup ref="groupRef" :position="groupPosition">
    <TresMesh>
      <TresIcosahedronGeometry :args="[1.4, 1]" />
      <TresMeshPhysicalMaterial
        color="#dce8f5"
        :roughness="0.3"
        :metalness="0.08"
        :transmission="0.55"
        :thickness="1.4"
        :ior="1.4"
        :clearcoat="1"
        :clearcoat-roughness="0.12"
        attenuation-color="#70b8ff"
        :attenuation-distance="1.4"
      />
    </TresMesh>

    <TresMesh ref="wireRef" :scale="wireScale">
      <TresIcosahedronGeometry :args="[1.4, 1]" />
      <TresMeshBasicMaterial color="#99ccff" :wireframe="true" :transparent="true" :opacity="0.3" />
    </TresMesh>
  </TresGroup>
</template>
