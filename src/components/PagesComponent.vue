<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { translateUtils } from '../translate';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  translations?: {
    description: {
      en: string;
      es: string;
    };
  };
}
interface Feature {
  id: string;
  icon: string;
  translations: {
    es: string;
    en: string;
  };
}

const features = ref<Feature[]>([
  {
    id: 'full-stack',
    icon: '✨',
    translations: {
      es: 'Proyectos completos full-stack con arquitecturas modernas',
      en: 'Complete full-stack projects with modern architectures'
    }
  },
  {
    id: 'tech-solutions',
    icon: '🛠️',
    translations: {
      es: 'Soluciones técnicas innovadoras y escalables',
      en: 'Innovative and scalable technical solutions'
    }
  },
  {
    id: 'clean-code',
    icon: '💻',
    translations: {
      es: 'Código limpio y mantenible con buenas prácticas',
      en: 'Clean and maintainable code with best practices'
    }
  },
  {
    id: 'user-exp',
    icon: '🎯',
    translations: {
      es: 'Enfoque en la experiencia del usuario y el diseño',
      en: 'Focus on user experience and design'
    }
  }
]);

const getLocalizedFeature = (feature: Feature) => {
  const currentLang = translateUtils.getCurrentLanguage() as 'en' | 'es';
  return feature.translations[currentLang];
};

const projects = ref<Project[]>([
  {
    id: 1,
    title: "LogiNar",
    description: "Plataforma de logística para inventario de empresas con inteligencia artificial para la gestion de la misma.",
    translations: {
      description: {
        es: "Plataforma de logística para inventario de empresas con inteligencia artificial para la gestion de la misma. Realizada para competencia de Hackhaton ParqueSoft Pasto",
        en: "Logistics platform for business inventory with artificial intelligence for its management. Made for Hackhaton ParqueSoft Pasto competition"
      }
    },
    image: new URL('../assets/loginar.png', import.meta.url).href,
    url: "loginar.vercel.app",
    liveUrl: "https://loginar.vercel.app",
    githubUrl: "https://github.com/T0m4s1n/loginar",
    technologies: ["Vue.js", "Typescript"]
  },
  {
    id: 2,
    title: "Encrypter",
    description: "Aplicación web para encriptar y desencriptar mensajes con algoritmos de cifrado.",
    translations: {
      description: {
        es: "Aplicación web para encriptar y desencriptar mensajes con algoritmos de cifrado.",
        en: "Web application for encrypting and decrypting messages using encryption algorithms."
      }
    },
    image: new URL("../assets/encrypt.png", import.meta.url).href,
    url: "encrypter-t0m4s1n.vercel.app",
    liveUrl: "https://encrypter-t0m4s1n.vercel.app",
    githubUrl: "https://github.com/T0m4s1n/Encrypter",
    technologies: ["Vue.js", "Typescript"]
  },
  {
    id: 4,
    title: "Seminario",
    description: "Plataforma para el primer seminario nacional de la Universidad Cooperativa de Colombia.",
    translations: {
      description: {
        es: "Plataforma para el primer seminario nacional de la Universidad Cooperativa de Colombia.",
        en: "Platform for the first national seminar of the Universidad Cooperativa de Colombia."
      }
    },
    image: new URL("../assets/seminario.png", import.meta.url).href,
    url: "seminario-ucc.vercel.app",
    liveUrl: "https://orange-ground-0068e7f1e.5.azurestaticapps.net/home",
    githubUrl: "https://github.com/riverz1357/seminario-ing-software",
    technologies: ["React", "CSS", "Javascript","Azure"]
  }
]);

const currentIndex = ref(0);
const isVisible = ref(false);
const isLoading = ref(true);
const showPreview = ref(true);
const iframeLoaded = ref(false);

const currentProject = computed(() => projects.value[currentIndex.value]);

const getLocalizedDescription = (project: Project) => {
  const currentLang = translateUtils.getCurrentLanguage() as 'en' | 'es';
  return project.translations?.description[currentLang] || project.description;
};

const togglePreview = () => {
  showPreview.value = !showPreview.value;
  if (!showPreview.value) {
    iframeLoaded.value = false;
  }
};

const nextProject = () => {
  if (currentIndex.value < projects.value.length - 1) {
    currentIndex.value++;
    showPreview.value = true;
    iframeLoaded.value = false;
  }
};

const previousProject = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    showPreview.value = true;
    iframeLoaded.value = false;
  }
};

const goToProject = (index: number) => {
  currentIndex.value = index;
  showPreview.value = true;
  iframeLoaded.value = false;
};

const reloadProject = () => {
  isLoading.value = true;
  iframeLoaded.value = false;
  showPreview.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
};

const handleIframeLoad = () => {
  iframeLoaded.value = true;
};

const imageLoaded = () => {
  isLoading.value = false;
};

const getTotalTechnologies = () => {
  const techSet = new Set<string>();
  projects.value.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return techSet.size;
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);

  translateUtils.onLanguageChange(() => {
  });
});
</script>

<template>
  <section class="projects-section" aria-label="Portfolio Projects">
    <div class="content-wrapper">
      <div class="projects-info" :class="{ 'info-visible': isVisible }">
        <h2 class="section-title" data-translate="my-projects">
          {{ translateUtils.translate('my-projects') }}
        </h2>
        <p class="section-subtitle" data-translate="explore-portfolio">
          {{ translateUtils.translate('explore-portfolio') }}
        </p>
        <div class="description-block">
          <p class="description" data-translate="projects-description">
            {{ translateUtils.translate('projects-description') }}
          </p>
          <ul class="feature-list">
                <li
                    v-for="feature in features"
                    :key="feature.id"
                    class="feature-item"
                >
                    <span class="feature-icon">{{ feature.icon }}</span>
                    <span class="feature-text">{{ getLocalizedFeature(feature) }}</span>
                </li>
            </ul>
        </div>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">{{ projects.length }}</span>
            <span class="stat-label" data-translate="projects-count">
              {{ translateUtils.translate('projects-count') }}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ getTotalTechnologies() }}</span>
            <span class="stat-label" data-translate="technologies-count">
              {{ translateUtils.translate('technologies-count') }}
            </span>
          </div>
        </div>
      </div>

      <div class="browser-container">
        <div class="browser-window" :class="{ 'window-visible': isVisible }">
          <div class="browser-header">
            <div class="window-controls">
              <span class="control close"></span>
              <span class="control minimize"></span>
              <span class="control maximize"></span>
            </div>
            <div class="browser-tabs">
              <button
                v-for="(project, index) in projects"
                :key="project.id"
                class="browser-tab"
                :class="{ 'active': index === currentIndex }"
                @click="goToProject(index)"
              >
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="tab-favicon"
                />
                {{ project.title }}
                <span class="tab-close">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </span>
              </button>
              <div class="tab-new">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
            </div>

            <div class="address-bar">
              <div class="nav-buttons">
                <button @click="previousProject" :disabled="currentIndex === 0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button @click="nextProject" :disabled="currentIndex === projects.length - 1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
                <button @click="reloadProject">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
              </div>
              <div class="url-bar">
                <span class="protocol">https://</span>
                <span class="domain">{{ currentProject.url }}</span>
              </div>
            </div>
          </div>

          <div class="browser-content">
            <Transition name="fade" mode="out-in">
              <div :key="currentProject.id" class="project-content">
                <div
                  v-if="showPreview"
                  class="project-image-container"
                >
                  <img
                    :src="currentProject.image"
                    :alt="currentProject.title"
                    class="project-image"
                    @load="imageLoaded"
                  >
                  <div class="project-overlay">
                    <div class="project-info">
                      <h3>{{ currentProject.title }}</h3>
                      <p>{{ getLocalizedDescription(currentProject) }}</p>
                      <div class="tech-stack">
                        <span
                          v-for="tech in currentProject.technologies"
                          :key="tech"
                          class="tech-badge"
                        >
                          {{ tech }}
                        </span>
                      </div>
                      <div class="project-links">
                        <a
                          :href="currentProject.liveUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="project-link live"
                        >
                          {{ translateUtils.translate('view-project') }}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                          </svg>
                        </a>
                        <a
                          v-if="currentProject.githubUrl"
                          :href="currentProject.githubUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="project-link github"
                        >
                          {{ translateUtils.translate('view-code') }}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                          </svg>
                        </a>
                        <a
                          @click="togglePreview"
                          class="project-link live"
                        >
                          {{ translateUtils.translate('view-live-site') }}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="iframe-container"
                >
                  <div v-if="!iframeLoaded" class="iframe-loader">
                    <div class="loader-spinner"></div>
                    <p data-translate="loading-site">
                      {{ translateUtils.translate('loading-site') }}
                    </p>
                  </div>
                    <iframe
                    :src="currentProject.liveUrl"
                    :title="currentProject.title"
                    @load="handleIframeLoad"
                    :class="{ 'iframe-loaded': iframeLoaded }"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  ></iframe>
                </div>
              </div>
            </Transition>

            <div class="project-dots">
              <button
                v-for="(project, index) in projects"
                :key="project.id"
                class="dot"
                :class="{ active: index === currentIndex }"
                @click="goToProject(index)"
                :aria-label="translateUtils.translate('select-project') + ' ' + project.title"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>

.feature-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.feature-icon {
  font-size: 1.25rem;
  min-width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-text {
  line-height: 1.5;
  transition: transform 0.3s ease;
}

.feature-item:hover .feature-text {
  transform: translateX(5px);
  color: var(--accent-color);
}

@media (max-width: 768px) {
  .feature-list {
    gap: 0.75rem;
  }

  .feature-item {
    font-size: 0.95rem;
  }
}
.projects-section {
  padding: 6rem 2rem;
  min-height: 120vh;
  display: flex;
  align-items: center;
  background-color: var(--bg-primary);
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(500px, 2fr);
  gap: 4rem;
  align-items: center;
}

.projects-info {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.info-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-color), var(--bg-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.description-block {
  margin-bottom: 2rem;
}

.description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Browser Window Styles */
.browser-container {
  width: 900px;
  height: 100%;
}

.browser-window {
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  height: 80vh;
}

.window-visible {
  opacity: 1;
  transform: translateY(0);
}

.browser-header {
  padding: 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  border-radius: 12px 12px 0 0;
}

/* Window Controls */
.window-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.close { background: #ff5f57; }
.minimize { background: #ffbd2e; }
.maximize { background: #28c940; }

/* Browser Tabs */
.browser-tabs {
  display: flex;
  gap: 2px;
  padding: 0 8px;
  margin-bottom: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.browser-tabs::-webkit-scrollbar {
  display: none;
}

.browser-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--bg-primary);
  border: none;
  border-radius: 8px 8px 0 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  max-width: 200px;
  position: relative;
}

.browser-tab:hover {
  background: color-mix(in srgb, var(--accent-color) 10%, var(--bg-primary));
}

.browser-tab.active {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding-bottom: 10px;
  margin-bottom: -2px;
}

.tab-favicon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  object-fit: cover;
}

.tab-close {
  margin-left: auto;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.browser-tab:hover .tab-close {
  opacity: 1;
}

.tab-new {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: 4px;
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-new:hover {
  background: var(--bg-secondary);
  color: var(--accent-color);
}

/* Address Bar */
.address-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-primary);
  padding: 0.5rem;
  border-radius: 6px;
}

.nav-buttons {
  display: flex;
  gap: 0.5rem;
}

.nav-buttons button {
  background: none;
  border: none;
  padding: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-buttons button:hover {
  background: var(--bg-secondary);
}

.nav-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.url-bar {
  flex: 1;
  padding: 0.25rem 0.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
}

.protocol {
  color: var(--text-secondary);
}

.domain {
  color: var(--accent-color);
}

/* Browser Content */
.browser-content {
  position: relative;
  height: calc(100% - 120px); /* Adjusted for tabs */
  background: var(--bg-primary);
  overflow: hidden;
  border-radius: 0 0 12px 12px;
}

.project-content {
  height: 100%;
}

.project-image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Overlay and Info */
.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2rem;
}

.project-info {
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.1s;
  color: white;
  text-align: center;
  max-width: 600px;
}

.project-image-container:hover .project-overlay {
  opacity: 1;
}

.project-image-container:hover .project-info {
  transform: translateY(0);
  opacity: 1;
}

.project-image-container:hover .project-image {
  transform: scale(1.05);
}

.project-info h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.project-info p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Live Preview Button */
.live-preview-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 20;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.live-preview-btn svg {
  transition: transform 0.2s ease;
}

.project-image-container:hover .live-preview-btn {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.live-preview-btn:hover {
  background: color-mix(in srgb, var(--accent-color) 90%, white);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
}

.live-preview-btn:hover svg {
  transform: translateX(3px);
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tech-badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.tech-badge:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Project Links */
.project-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.project-link.live {
  background: var(--accent-color);
  color: white;
}

.project-link.github {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.project-link:hover {
  transform: translateY(-2px);
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: white;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) transparent;
}

iframe-scroll-container::-webkit-scrollbar {
  width: 8px;
}

.iframe-scroll-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.iframe-scroll-container::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.iframe-scroll-container:hover::-webkit-scrollbar-thumb {
  animation: scrollGlow 2s ease-in-out infinite;
}


.iframe-loader {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  z-index: 5;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--accent-color);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.iframe-loaded {
  opacity: 1;
}

/* Navigation Dots */
.project-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  opacity: 0.5;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot.active {
  opacity: 1;
  background: var(--accent-color);
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes scrollGlow {
  0% { background: var(--accent-color); }
  50% { background: color-mix(in srgb, var(--accent-color) 85%, white); }
  100% { background: var(--accent-color); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Design (continued) */
@media (max-width: 968px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .projects-info {
    position: relative;
    top: 0;
  }

  .feature-list li {
    justify-content: center;
  }

  .browser-window {
    margin: 0 auto;
    height: 600px;
    max-width: 90%;
  }

  .project-overlay{
    padding: 2rem 1rem;
    font-size: 0.8rem;
  }

  .project-links {
    flex-direction: column;
    gap: 0.75rem;
    width: 85%;
  }

  .browser-tab {
    min-width: 120px;
  }

  .project-info h3 {
    font-size: 1.75rem;
  }

  .project-info p {
    font-size: 0.95rem;
  }

  .live-preview-btn {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
    .content-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
    width: 80%;
  }
  .projects-section {
    padding: 4rem 1.5rem;
  }

  .browser-container {
    width: 92%;
    height: 100%;
  }

  .browser-tabs {
    gap: 1px;
    padding: 0 4px;
  }

  .project-overlay{
    padding: 2rem 1rem;
    font-size: 0.8rem;
  }

  .browser-tab {
    min-width: 100px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .projects-info {
    text-align: center;
    position: relative;
    top: 0;
    width: 80%;
  }

  .tab-favicon {
    width: 14px;
    height: 14px;
  }

  .tab-close {
    display: none;
  }

  .project-links {
    flex-direction: column;
    gap: 0.75rem;
  }

  .project-link {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 3rem 1rem;
  }

  .project-overlay{
    padding: 2rem 1rem;
    font-size: 0.8rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .browser-window {
    height: 480px;
    max-width: 95%;
  }

  .browser-header {
    padding: 0.75rem;
  }

  .window-controls {
    margin-bottom: 6px;
  }

  .control {
    width: 10px;
    height: 10px;
  }

  .nav-buttons button {
    padding: 3px;
  }

  .nav-buttons svg {
    width: 14px;
    height: 14px;
  }

  .browser-tabs {
    margin-bottom: 6px;
  }

  .browser-tab {
    min-width: 90px;
    padding: 4px 8px;
  }

  .url-bar {
    display: none;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tech-badge {
    padding: 0.3rem 0.75rem;
    font-size: 0.75rem;
  }

  .project-info h3 {
    font-size: 1.5rem;
  }

  .project-info p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .live-preview-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .project-dots {
    bottom: 0.75rem;
  }

  .dot {
    width: 6px;
    height: 6px;
  }

  .stats {
    flex-wrap: wrap;
    justify-content: center;
  }

  .stat-item {
    width: 50%;
    margin-bottom: 1rem;
  }

  .stat-number {
    font-size: 1.75rem;
  }

  .iframe-container::-webkit-scrollbar {
    width: 6px;
  }

  .loader-spinner {
    width: 32px;
    height: 32px;
    border-width: 2px;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .browser-tab {
    background: color-mix(in srgb, var(--bg-primary) 95%, white);
  }

  .browser-tab.active {
    background: var(--bg-primary);
  }

  .tech-badge {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .project-link.github {
    border-color: rgba(255, 255, 255, 0.8);
  }

  .iframe-container {
    background: var(--bg-primary);
  }
}

@media print {
  .projects-section {
    padding: 0;
    min-height: auto;
  }

  .browser-window {
    box-shadow: none;
    border: 1px solid var(--border-color);
  }

  .project-overlay {
    position: relative;
    opacity: 1;
    background: none;
    color: black;
  }

  .live-preview-btn,
  .project-dots,
  .browser-tabs {
    display: none;
  }
}
</style>
