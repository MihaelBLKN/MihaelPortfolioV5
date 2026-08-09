<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import TechMarquee from "./components/TechMarquee.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import QuoteSection from "./components/QuoteSection.vue";
import ContactSection from "./components/ContactSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <TechMarquee />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ExperienceSection />
    <QuoteSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
