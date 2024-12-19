<script setup lang="ts">
import HeroComponent from '../components/HeroComponent.vue';
import PagesComponent from '@/components/PagesComponent.vue';
import AboutComponent from '@/components/AboutComponent.vue';
import ContactComponent from '@/components/ContactComponent.vue';
import profileImage from '../assets/t0m4s1n.png';
</script>

<template>
  <div>
    <section id="hero">
      <HeroComponent
        name="T0m4s1n"
        title="Portfolio"
        description="Welcome to my portfolio. I am a full-stack developer with a passion for creating beautiful and functional websites."
        :profileImage="profileImage"
      />
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
