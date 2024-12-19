<script setup lang="ts">
import HeroComponent from '../components/HeroComponent.vue';
import PagesComponent from '@/components/PagesComponent.vue';
import AboutComponent from '@/components/AboutComponent.vue';
import ContactComponent from '@/components/ContactComponent.vue';
</script>

<template>
  <div>
    <section id="hero">
      <HeroComponent />
    </section>

    <section id="projects">
      <PagesComponent />
    </section>

    <section id="about">
      <AboutComponent />
    </section>

    <section id="contact">
      <ContactComponent />
    </section>
  </div>
</template>
