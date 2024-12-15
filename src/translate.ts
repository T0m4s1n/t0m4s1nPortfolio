// src/utils/translate.ts
import { ref, watch } from 'vue';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Header
    portfolio: 'Portfolio',
    home: 'Home',
    projects: 'Projects',
    about: 'About me',
    contact: 'Contact',
    
    // Projects Section
    'my-projects': 'My Projects',
    'explore-portfolio': 'Explore my portfolio',
    'projects-description': 'Here you will find a selection of my most outstanding projects. Each one represents a unique challenge that I have approached with passion and dedication.',
    'fullstack-projects': 'Complete full-stack projects',
    'technical-solutions': 'Innovative technical solutions',
    'clean-code': 'Clean and maintainable code',
    'user-experience': 'Focus on user experience',
    'projects-count': 'Projects',
    'technologies-count': 'Technologies',
    'see-project': 'View Project',
    'view-code': 'Code',
    'loading-site': 'Loading live site...',
    'view-live': 'View Live Site',
    'view-preview': 'View Preview',

    // Project Details
    'project-description': 'Platform for business logistics and inventory with artificial intelligence for its management.',
    
    // General UI
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
    'switch-lang': 'Switch to Spanish',
    'dark-mode': 'Dark Mode',
    'light-mode': 'Light Mode',

    greeting: "Hi, I'm",
    role: "Full Stack Developer",
    'hero-description': "Creating unique digital experiences with a passion for design and innovation.",
    'view-projects': "View Projects",
    'contact-me': "Contact Me",
    'profile-image-alt': "Profile picture",
    'default-role': "Full Stack Developer",
    'default-description': "Creating unique digital experiences with a passion for design and innovation.",
  },
  es: {
    // Header
    portfolio: 'Portafolio',
    home: 'Inicio',
    projects: 'Proyectos',
    about: 'Sobre mí',
    contact: 'Contacto',
    
    // Projects Section
    'my-projects': 'Mis Proyectos',
    'explore-portfolio': 'Explora mi portafolio de trabajo',
    'projects-description': 'Aquí encontrarás una selección de mis proyectos más destacados. Cada uno representa un desafío único que he abordado con pasión y dedicación.',
    'fullstack-projects': 'Proyectos completos full-stack',
    'technical-solutions': 'Soluciones técnicas innovadoras',
    'clean-code': 'Código limpio y mantenible',
    'user-experience': 'Enfoque en la experiencia del usuario',
    'projects-count': 'Proyectos',
    'technologies-count': 'Tecnologías',
    'see-project': 'Ver Proyecto',
    'view-code': 'Código',
    'loading-site': 'Cargando sitio en vivo...',
    'view-live': 'Ver Sitio en Vivo',
    'view-preview': 'Ver Preview',

    // Project Details
    'project-description': 'Plataforma de logística para inventario de empresas con inteligencia artificial para la gestión de la misma.',
    
    // General UI
    loading: 'Cargando',
    error: 'Error',
    success: 'Éxito',
    'switch-lang': 'Cambiar a Inglés',
    'dark-mode': 'Modo Oscuro',
    'light-mode': 'Modo Claro',

    greeting: "Hola, soy",
    role: "Desarrollador Full Stack",
    'hero-description': "Creando experiencias digitales únicas con pasión por el diseño y la innovación.",
    'view-projects': "Ver Proyectos",
    'contact-me': "Contactar",
    'profile-image-alt': "Foto de perfil",
    'default-role': "Desarrollador Full Stack",
    'default-description': "Creando experiencias digitales únicas con pasión por el diseño y la innovación.",
  }
};

// Sistema de eventos para notificar cambios de idioma
type LanguageChangeCallback = (newLang: string) => void;
const languageChangeCallbacks: LanguageChangeCallback[] = [];

const currentLanguage = ref(localStorage.getItem('language') || 'es');

// Observer para el cambio de idioma
watch(currentLanguage, (newLang) => {
  languageChangeCallbacks.forEach(callback => callback(newLang));
});

export const translateUtils = {
  translate(key: string): string {
    return translations[currentLanguage.value][key] || key;
  },

  getCurrentLanguage(): string {
    return currentLanguage.value;
  },

  toggleLanguage(): void {
    currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es';
    localStorage.setItem('language', currentLanguage.value);
    document.documentElement.lang = currentLanguage.value;
    this.updatePageTranslations();
  },

  onLanguageChange(callback: LanguageChangeCallback): void {
    languageChangeCallbacks.push(callback);
  },

  removeLanguageChangeListener(callback: LanguageChangeCallback): void {
    const index = languageChangeCallbacks.indexOf(callback);
    if (index > -1) {
      languageChangeCallbacks.splice(index, 1);
    }
  },

  initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('language');
    if (!savedLanguage) {
      const browserLanguage = navigator.language.split('-')[0];
      currentLanguage.value = browserLanguage === 'es' ? 'es' : 'en';
      localStorage.setItem('language', currentLanguage.value);
    }
    document.documentElement.lang = currentLanguage.value;
    this.updatePageTranslations();
  },

  // Función para actualizar traducciones en la página
  updatePageTranslations(): void {
    // Añadir clase para animación de salida
    document.body.classList.add('lang-change-leave');
    
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key) {
          // Añadir clase para animación de entrada
          element.classList.add('lang-change-enter');
          
          const translation = this.translate(key);
          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            element.placeholder = translation;
          } else {
            element.textContent = translation;
          }
          
          // Eliminar clase después de la animación
          requestAnimationFrame(() => {
            element.classList.remove('lang-change-enter');
            element.classList.add('lang-change-enter-active');
            
            setTimeout(() => {
              element.classList.remove('lang-change-enter-active');
            }, 300);
          });
        }
      });
      
      // Actualizar atributos title y aria-label con animación
      const elementsWithTitles = document.querySelectorAll('[data-translate-title]');
      elementsWithTitles.forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (key) {
          element.classList.add('lang-change-enter');
          element.setAttribute('title', this.translate(key));
          
          requestAnimationFrame(() => {
            element.classList.remove('lang-change-enter');
            element.classList.add('lang-change-enter-active');
            
            setTimeout(() => {
              element.classList.remove('lang-change-enter-active');
            }, 300);
          });
        }
      });
  
      // Remover clase de animación de salida
      document.body.classList.remove('lang-change-leave');
      document.body.classList.add('lang-change-leave-active');
      
      setTimeout(() => {
        document.body.classList.remove('lang-change-leave-active');
      }, 300);
    }, 0);
  }
};

// Plugin de Vue para facilitar el uso en templates
export const i18nPlugin = {
  install(app: any) {
    app.config.globalProperties.$t = (key: string) => translateUtils.translate(key);
    app.provide('i18n', translateUtils);
  }
};