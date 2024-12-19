<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { themeUtils } from '../themeUtils';
import { translateUtils } from '../translate';
import {
  Moon,
  Sun,
  Code,
  Home,
  User,
  Briefcase,
  Mail,
  Languages
} from 'lucide-vue-next';

const windowWidth = ref(window.innerWidth);
const lastScrollPosition = ref(0);
const isHeaderVisible = ref(true);
const headerHeight = ref(0);
const isMenuOpen = ref(false);
const isDarkMode = ref(true);
const currentLang = ref(translateUtils.getCurrentLanguage());

const isResponsiveMode = computed(() => windowWidth.value <= 768);

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = headerHeight.value || 0;
    const targetPosition = section.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  closeMenu();
};

const updateActiveLink = () => {
  const sections = ['hero', 'projects', 'about', 'contact'];
  const currentPosition = window.scrollY + headerHeight.value + 100;

  const activeSection = sections.find(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      return currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight;
    }
    return false;
  });

  if (activeSection) {
    const links = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  if (!isResponsiveMode.value) {
    isMenuOpen.value = false;
    document.body.style.overflow = '';
  }
};

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition < headerHeight.value) {
    isHeaderVisible.value = true;
    lastScrollPosition.value = currentScrollPosition;
    return;
  }

  isHeaderVisible.value = currentScrollPosition < lastScrollPosition.value || currentScrollPosition < headerHeight.value;
  lastScrollPosition.value = currentScrollPosition;

  updateActiveLink();
};

const debounce = (fn: (...args: unknown[]) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const debouncedUpdateWindowWidth = debounce(updateWindowWidth);
const debouncedHandleScroll = debounce(handleScroll, 10);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  themeUtils.toggleTheme();
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

const toggleLanguage = () => {
  translateUtils.toggleLanguage();
  currentLang.value = translateUtils.getCurrentLanguage();
};

const toggleMenu = () => {
  if (!isResponsiveMode.value) return;

  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const initializeApp = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
    themeUtils[isDarkMode.value ? 'enableDarkMode' : 'enableLightMode']();
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  updateWindowWidth();
};

onMounted(() => {
  initializeApp();
  translateUtils.initializeLanguage();
  window.addEventListener('resize', debouncedUpdateWindowWidth);
  window.addEventListener('scroll', debouncedHandleScroll);
  window.addEventListener('scroll', updateActiveLink);

  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDarkMode.value = e.matches;
    }
  });

  const headerElement = document.querySelector('.header');
  if (headerElement) {
    headerHeight.value = headerElement.getBoundingClientRect().height;
    document.body.style.paddingTop = `${headerHeight.value}px`;
  }

  // Ejecutar una vez al inicio para establecer el enlace activo inicial
  updateActiveLink();

  translateUtils.onLanguageChange((newLang: string) => {
    currentLang.value = newLang;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', debouncedUpdateWindowWidth);
  window.removeEventListener('scroll', debouncedHandleScroll);
  window.removeEventListener('scroll', updateActiveLink);
  document.body.style.paddingTop = '';
});
</script>
<template>
  <header class="header" :class="{
    'dark-mode': isDarkMode,
    'header-hidden': !isHeaderVisible,
    'header-visible': isHeaderVisible
  }">
    <div class="logo">
      <Code :size="32" />
      <span class="logo-text" data-translate="portfolio">T0m4s1n</span>
    </div>

    <nav v-if="!isResponsiveMode" class="desktop-nav">
      <a href="#hero" @click.prevent="scrollToSection('hero')">
        <Home :size="20" />
        <span>{{ translateUtils.translate('home') }}</span>
      </a>

      <a href="#projects" @click.prevent="scrollToSection('projects')">
        <Briefcase :size="20" />
        <span>{{ translateUtils.translate('projects') }}</span>
      </a>

      <a href="#about" @click.prevent="scrollToSection('about')">
        <User :size="20" />
        <span>{{ translateUtils.translate('about') }}</span>
      </a>

      <a href="#contact" @click.prevent="scrollToSection('contact')">
        <Mail :size="20" />
        <span>{{ translateUtils.translate('contact') }}</span>
      </a>
    </nav>

    <div class="header-right">
      <button
        class="lang-toggle-btn"
        @click="toggleLanguage"
        :aria-label="translateUtils.translate('switch-lang')"
        :title="translateUtils.translate('switch-lang')"
      >
        <Languages :size="20" />
        <span class="lang-indicator">{{ currentLang.toUpperCase() }}</span>
      </button>

      <button
        class="theme-toggle-btn"
        @click="toggleTheme"
        :aria-label="isDarkMode ? translateUtils.translate('light-mode') : translateUtils.translate('dark-mode')"
      >
        <Transition mode="out-in">
          <Moon v-if="isDarkMode" :size="20" key="moon" class="theme-icon moon"/>
          <Sun v-else :size="20" key="sun" class="theme-icon sun"/>
        </Transition>
      </button>

      <button
        v-if="isResponsiveMode"
        class="hamburger"
        :class="{ 'is-active': isMenuOpen }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div
      v-if="isResponsiveMode"
      class="mobile-menu"
      :class="{ 'is-active': isMenuOpen }"
    >
      <nav class="mobile-nav">
        <a href="#hero" @click.prevent="scrollToSection('hero'); closeMenu()">
          <Home :size="24" />
          <span>{{ translateUtils.translate('home') }}</span>
        </a>

        <a href="#projects" @click.prevent="scrollToSection('projects'); closeMenu()">
          <Briefcase :size="24" />
          <span>{{ translateUtils.translate('projects') }}</span>
        </a>

        <a href="#about" @click.prevent="scrollToSection('about'); closeMenu()">
          <User :size="24" />
          <span>{{ translateUtils.translate('about') }}</span>
        </a>

        <a href="#contact" @click.prevent="scrollToSection('contact'); closeMenu()">
          <Mail :size="24" />
          <span>{{ translateUtils.translate('contact') }}</span>
        </a>
      </nav>
    </div>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: var(--bg-secondary);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  will-change: transform;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.header-hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.header-visible {
  transform: translateY(0);
  opacity: 1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  transition: transform 0.3s ease;
  z-index: 1001;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-weight: 600;
  font-size: 1.25rem;
  background: linear-gradient(135deg, #fff, var(--bg-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.desktop-nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  position: relative;
}

.desktop-nav a:hover {
  color: #fff;
  background: color-mix(in srgb, var(--accent-color) 10%, transparent);
}

.lang-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  color: #fff;
}

.lang-toggle-btn:hover {
  background: color-mix(in srgb, var(--accent-color) 10%, transparent);
  transform: translateY(-2px);
}

.lang-indicator {
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  font-family: "Space Mono", monospace;
}

.desktop-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.desktop-nav a:hover::after {
  width: 80%;
}

/* Theme Toggle Button */
.theme-toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.theme-toggle-btn:hover {
  background: color-mix(in srgb, var(--accent-color) 10%, transparent);
  transform: rotate(15deg);
}

.theme-icon {
  transition: all 0.3s ease;
}

.theme-icon.sun {
  color: #FFB200;
}

.theme-icon.moon {
  color: #A597EE;
}

/* Mobile Menu Button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all 0.3s ease;
  border-radius: 1px;
}

.hamburger.is-active span:first-child {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:last-child {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-primary);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.mobile-menu.is-active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.mobile-nav {
  margin-top: 80px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-nav a {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background: color-mix(in srgb, var(--accent-color) 5%, transparent);
}

.mobile-nav a:hover {
  background: color-mix(in srgb, var(--accent-color) 15%, transparent);
  transform: translateX(5px);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .desktop-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .logo svg {
    width: 28px;
    height: 28px;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .lang-indicator {
    display: none;
  }

  .lang-toggle-btn {
    padding: 0.4rem;
  }

  .mobile-menu {
    display: flex;
  }
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none;
  }

  .hamburger {
    display: none;
  }

  .desktop-nav {
    display: flex;
  }
}

/* iOS Safari Fix */
@supports (-webkit-touch-callout: none) {
  .mobile-menu {
    height: -webkit-fill-available;
  }
}

/* Hover Effects Enhancement */
@media (hover: hover) {
  .desktop-nav a:hover {
    transform: translateY(-2px);
  }

  .theme-toggle-btn:hover {
    transform: rotate(15deg) scale(1.1);
  }

  .logo:hover {
    transform: scale(1.05) translateY(-2px);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
