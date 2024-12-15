<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { translateUtils } from '../translate';

interface Props {
  name: string;
  title: string;
  description: string;
  profileImage: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'T0m4s1n',
  title: 'Ingeniero de Software Full Stack',
  description: 'Creando experiencias digitales únicas con pasión por el diseño y la innovación.',
  profileImage: new URL('../assets/t0m4s1n.png', import.meta.url).href 
});

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const scrollToWork = () => {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};
</script>
<template>
    <section class="hero-container" aria-label="Portfolio Introduction">
      <div class="floating-shapes">
        <div v-for="n in 5" :key="n" class="shape" :class="`shape-${n}`"></div>
      </div>
  
      <div class="content-wrapper">
        <div class="text-content" :class="{ 'text-visible': isVisible }">
          <h1 class="greeting">
            <span class="greeting-text" data-translate="greeting">
              {{ translateUtils.translate('greeting') }}
            </span>
            <span class="name">{{ props.name }}</span>
          </h1>
          <p class="title" data-translate="role">{{ translateUtils.translate('role') }}</p>
          <p class="description" data-translate="hero-description">
            {{ translateUtils.translate('hero-description') }}
          </p>
          
          <div class="cta-container">
            <button 
              class="primary-btn" 
              @click="scrollToWork"
              data-translate="view-projects"
            >
              {{ translateUtils.translate('view-projects') }}
              <svg class="arrow-icon" viewBox="0 0 24 24" width="18" height="18">
                <path d="M13 7l5 5-5 5M6 7l5 5-5 5"></path>
              </svg>
            </button>
            
            <button 
              class="secondary-btn" 
              @click="scrollToContact"
              data-translate="contact"
            >
              {{ translateUtils.translate('contact-me') }}
            </button>
          </div>
        </div>
  
        <div class="image-container" :class="{ 'image-visible': isVisible }">
          <div class="image-wrapper">
            <img 
              :src="props.profileImage" 
              :alt="translateUtils.translate('profile-image-alt')" 
              class="profile-image"
            >
            <div class="image-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  </template>
<style scoped>
.hero-container {
  min-height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
  padding: 2rem;
  background-color: var(--bg-primary);
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: var(--accent-color);
  opacity: 0.1;
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-delay: -2s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  left: 80%;
  animation-delay: -5s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  top: 40%;
  left: 50%;
  animation-delay: -8s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  top: 80%;
  left: 30%;
  animation-delay: -12s;
}

.shape-5 {
  width: 60px;
  height: 60px;
  top: 10%;
  left: 70%;
  animation-delay: -15s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(100px, 100px) rotate(180deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 1;
}

.text-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.text-content.text-visible {
  opacity: 1;
  transform: translateY(0);
}

.greeting {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.greeting-text {
  display: block;
  font-weight: 400;
  color: var(--text-secondary);
}

.name {
  display: block;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color), var(--bg-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title {
  font-size: clamp(1.25rem, 3vw, 2rem);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 500px;
}

.cta-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-btn, .secondary-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Plus Jakarta Sans", sans-serif;
}

.primary-btn {
  background: var(--accent-color);
  color: white;
  border: none;
}

.secondary-btn {
  background: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
}

.primary-btn:hover, .secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(186, 130, 144, 0.2);
}

.arrow-icon {
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: transform 0.2s ease;
}

.primary-btn:hover .arrow-icon {
  transform: translateX(4px);
}

.image-container {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.image-container.image-visible {
  opacity: 1;
  transform: translateX(0);
}

.image-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  overflow: hidden;
  background: linear-gradient(135deg, var(--accent-color), var(--bg-secondary));
}

.profile-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-wrapper:hover .profile-image {
  transform: scale(1.05);
}

.image-decoration {
  position: absolute;
  inset: -2px;
  border: 2px solid var(--accent-color);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  opacity: 0.5;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 968px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .text-content {
    order: 2;
  }

  .description {
    margin: 0 auto 2rem;
  }

  .cta-container {
    justify-content: center;
  }

  .image-container {
    order: 1;
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 1rem;
  }

  .cta-container {
    flex-direction: column;
  }

  .primary-btn, .secondary-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>