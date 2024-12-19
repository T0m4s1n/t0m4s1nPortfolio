<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  Code,
  Briefcase,
  GraduationCap,
  Heart,
  Rocket
} from 'lucide-vue-next';
import { translateUtils } from '../translate';

interface ContentItem {
  title: string;
  items: string[];
  color: string;
}

interface Section {
  icon: typeof Code;
  title: string;
  content: ContentItem[];
}

const activeSection = ref('skills');
const isVisible = ref(false);
const name = ref("T0m4s1n");

const sections = computed<Record<string, Section>>(() => ({
  skills: {
    icon: Code,
    title: translateUtils.translate('about.tabs.skills'),
    content: [
      {
        title: translateUtils.translate('about.skills.frontend.title'),
        items: [
          'Vue.js 3',
          'React',
          'TypeScript',
          'Tailwind CSS'
        ],
        color: 'gradient-blue'
      },
      {
        title: translateUtils.translate('about.skills.backend.title'),
        items: [
          'Node.js',
          'Python',
          'PostgreSQL',
          'Redis'
        ],
        color: 'gradient-green'
      }
    ]
  },
  experience: {
    icon: Briefcase,
    title: translateUtils.translate('about.tabs.experience'),
    content: [
      {
        title: translateUtils.translate('about.experience.senior.title'),
        items: [
          translateUtils.translate('about.experience.senior.position'),
          translateUtils.translate('about.experience.senior.date'),
          translateUtils.translate('about.experience.senior.role')
        ],
        color: 'gradient-purple'
      },
      {
        title: translateUtils.translate('about.experience.software.title'),
        items: [
          translateUtils.translate('about.experience.software.position'),
          translateUtils.translate('about.experience.software.date'),
          translateUtils.translate('about.experience.software.role')
        ],
        color: 'gradient-pink'
      }
    ]
  },
  education: {
    icon: GraduationCap,
    title: translateUtils.translate('about.tabs.education'),
    content: [
      {
        title: translateUtils.translate('about.education.master.title'),
        items: [
          translateUtils.translate('about.education.master.degree'),
          translateUtils.translate('about.education.master.school'),
          translateUtils.translate('about.education.master.year')
        ],
        color: 'gradient-orange'
      },
      {
        title: translateUtils.translate('about.education.bachelor.title'),
        items: [
          translateUtils.translate('about.education.bachelor.degree'),
          translateUtils.translate('about.education.bachelor.school'),
          translateUtils.translate('about.education.bachelor.year')
        ],
        color: 'gradient-red'
      }
    ]
  },
  interests: {
    icon: Heart,
    title: translateUtils.translate('about.tabs.interests'),
    content: [
      {
        title: translateUtils.translate('about.interests.technical.title'),
        items: [
          'AI/ML',
          'Blockchain',
          'IoT',
          'Cloud Computing'
        ],
        color: 'gradient-indigo'
      },
      {
        title: translateUtils.translate('about.interests.personal.title'),
        items: [
          translateUtils.translate('about.interests.personal.item1'),
          translateUtils.translate('about.interests.personal.item2'),
          translateUtils.translate('about.interests.personal.item3'),
          translateUtils.translate('about.interests.personal.item4')
        ],
        color: 'gradient-violet'
      }
    ]
  },
  goals: {
    icon: Rocket,
    title: translateUtils.translate('about.tabs.goals'),
    content: [
      {
        title: translateUtils.translate('about.goals.professional.title'),
        items: [
          translateUtils.translate('about.goals.professional.item1'),
          translateUtils.translate('about.goals.professional.item2'),
          translateUtils.translate('about.goals.professional.item3')
        ],
        color: 'gradient-cyan'
      },
      {
        title: translateUtils.translate('about.goals.personal.title'),
        items: [
          translateUtils.translate('about.goals.personal.item1'),
          translateUtils.translate('about.goals.personal.item2'),
          translateUtils.translate('about.goals.personal.item3')
        ],
        color: 'gradient-teal'
      }
    ]
  }
}));

const currentContent = computed(() => {
  return sections.value[activeSection.value].content;
});

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);

  translateUtils.onLanguageChange(() => {
    // Forzar la actualización del contenido
    activeSection.value = activeSection.value;
  });
});
</script>

<template>
  <div class="about-container">
    <div class="animated-background">
      <div v-for="n in 50" :key="n" class="particle"></div>
      <div class="gradient-overlay"></div>
    </div>

    <header class="header">
      <h1 class="title">
        <div class="name-container">
          {{ name }}
        </div>
      </h1>
      <div class="subtitle-wrapper">
        <span class="typewriter">
          {{ translateUtils.translate('about.role') }}
        </span>
      </div>
    </header>

    <nav class="navigation">
      <button v-for="(section, key) in sections"
              :key="key"
              @click="activeSection = key"
              :class="['nav-button', { active: activeSection === key }]">
        <component :is="section.icon" class="nav-icon" />
        <span>{{ section.title }}</span>
      </button>
    </nav>

    <div class="content-wrapper">
      <TransitionGroup
        name="fade-vertical"
        tag="div"
        class="content-grid"
        mode="out-in"
      >
        <div v-for="(item, idx) in currentContent"
             :key="`${activeSection}-${idx}`"
             class="content-card"
             :class="item.color"
             :style="{ transitionDelay: `${idx * 0.1}s` }">
          <h3 class="card-title">{{ item.title }}</h3>
          <ul class="item-list">
            <li v-for="(subItem, subIdx) in item.items"
                :key="`${item.title}-${subIdx}`"
                class="item-entry">
              <span class="bullet"></span>
              <span class="item-text">{{ subItem }}</span>
            </li>
          </ul>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
<style scoped>
.about-container {
  min-height: 20vh;
  background-color: transparent;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 50%;
  animation: float 20s infinite linear;
}

.particle:nth-child(3n) {
  width: 8px;
  height: 8px;
  animation-duration: 25s;
}

.particle:nth-child(3n + 1) {
  width: 10px;
  height: 10px;
  animation-duration: 30s;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: transparent;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.animate-letter {
  display: inline-block;
  opacity: 0;
  animation: fadeInLetter 0.5s forwards;
  transform: translateY(20px);
}

.subtitle-wrapper {
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.typewriter {
  color: var(--text-secondary);
  font-size: 1.5rem;
  border-right: 2px solid;
  animation: typing 3.5s steps(20, end), blink-caret 0.75s step-end infinite;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
  margin: 0 auto;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--bg-secondary);
  color: #fff;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-family: "Poppins", sans-serif;
}

.nav-button:hover {
  transform: translateY(-2px);
  background-color: #3d2a2f;
  border-color: #fff;
}

.nav-button.active {
  background-color: #3d2a2f;
  color: white;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.content-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  flex-grow: 1;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Fijamos a 2 columnas */
  gap: 2rem;
  position: relative;
  width: 100%;
}

.content-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  opacity: 1;
  transform: translateY(0);
  will-change: transform, opacity;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.item-list {
  list-style: none;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.item-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.bullet {
  width: 6px;
  height: 6px;
  background-color: currentColor;
  border-radius: 50%;
}

/* Gradient Classes */
.gradient-blue { background: linear-gradient(135deg, #3d2a2f, #9f5f72); }
.gradient-green { background: linear-gradient(135deg, #9f5f72, #3d2a2f); }
.gradient-purple { background: linear-gradient(135deg, #3d2a2f, #9f5f72); }
.gradient-pink { background: linear-gradient(135deg, #9f5f72, #3d2a2f); }
.gradient-orange { background: linear-gradient(135deg, #3d2a2f, #9f5f72); }
.gradient-red { background: linear-gradient(135deg, #9f5f72, #3d2a2f); }
.gradient-indigo { background: linear-gradient(135deg, #9f5f72, #3d2a2f); }
.gradient-violet { background: linear-gradient(135deg, #3d2a2f, #9f5f72); }
.gradient-cyan { background: linear-gradient(135deg, #9f5f72, #3d2a2f); }
.gradient-teal { background: linear-gradient(135deg, #3d2a2f, #9f5f72); }

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(100px, 100px);
  }
  50% {
    transform: translate(200px, 0);
  }
  75% {
    transform: translate(100px, -100px);
  }
}

@keyframes fadeInLetter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #38bdf8 }
}
.fade-vertical-enter-active,
.fade-vertical-leave-active {
  transition: all 0.4s ease-in-out;
  position: relative;
}

.fade-vertical-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-vertical-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-vertical-move {
  transition: transform 0.4s ease-in-out;
}

/* Responsive Design */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .nav-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .typewriter {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .navigation {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-button {
    justify-content: center;
  }
}
</style>s
