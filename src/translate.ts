import { ref, watch } from 'vue';
import type { App } from 'vue';

interface Translations {
  [key: string]: {
    [key: string]: string | string[];
  };
}

const translations: Translations = {
  en: {
    portfolio: 'T0m4s1n',
    home: 'Home',
    projects: 'Projects',
    about: 'About me',
    contact: 'Contact',
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

    'about.role': 'Full Stack Developer',

    'about.tabs.skills': 'Skills & Technologies',
    'about.tabs.experience': 'Professional Experience',
    'about.tabs.education': 'Education',
    'about.tabs.interests': 'Interests & Hobbies',
    'about.tabs.goals': 'Goals & Aspirations',
    'about.skills.frontend.title': 'Frontend Development',
    'about.skills.backend.title': 'Backend Development',
    'about.experience.senior.title': 'Junior Developer',
    'about.experience.software.title': 'Software Engineer',
    'about.education.master.title': 'Knowledge',
    'about.education.bachelor.title': 'Studies',
    'about.interests.technical.title': 'Technical Interests',
    'about.interests.technical.items': ['IA', 'Cloud', 'Blockchain', 'Application Development'],
    'about.interests.personal.title': 'Personal Interests',
    'about.interests.personal.items': ['Photography', 'Travel', 'Music', 'Gaming'],

    // Goals Section
    'about.goals.professional.title': 'Professional Goals',
    'about.goals.professional.items': ['Lead Innovation', 'Mentor Others', 'Build Great Products'],
    'about.goals.personal.title': 'Personal Goals',
    'about.goals.personal.items': ['Continuous Learning', 'Work-Life Balance', 'Global Impact'],

    // Experience Section
    'about.experience.senior.position': 'Junior',
    'about.experience.senior.date': '2020 - Present',
    'about.experience.senior.role': 'Frontend and Backend Development',
    'about.experience.software.position': 'Frontend Developer making websites',
    'about.experience.software.date': '2021 - Present',
    'about.experience.software.role': 'Frontend Development',

    'about.education.master.degree': 'Studied in MasterMind',
    'about.education.master.school': 'Practice in LeetCode',
    'about.education.master.year': 'Winner of the 2024 ParqueSoft Hackathon',

    'about.education.bachelor.degree': 'Software Engineering',
    'about.education.bachelor.school': 'University Cooperativa de Colombia',
    'about.education.bachelor.year': 'Started in 2023 and still in progress',

    // Interests Section
    'about.interests.personal.item1': 'Programming',
    'about.interests.personal.item2': 'Listen to Music',
    'about.interests.personal.item3': 'Read Sci-fi Books',
    'about.interests.personal.item4': 'Play Video Games',


    'about.goals.professional.item1': 'Lead Innovation Projects',
    'about.goals.professional.item2': 'Work with Development Teams',
    'about.goals.professional.item3': 'Build Impactful Solutions',

    'about.goals.personal.item1': 'Continuous Learning',
    'about.goals.personal.item2': 'Work-Life Balance',
    'about.goals.personal.item3': 'Global Impact Through Technology',
    'contact.title': 'Get in Touch',
    'contact.subtitle': "Let's work together on your next project",
    'contact.description': "I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you'd like to collaborate or just want to say hi!",
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully! I will get back to you as soon as possible.',
    'contact.error': 'Error sending message. Please try again.',
    'contact.required': 'This field is required',
    'contact.invalid-email': 'Please enter a valid email',
    'contact.or': 'Or connect with me on',
    'contact.sending': 'Sending...',
    'footer.description': 'This page is created by me, T0m4s1n, to showcase my software development skills and my journey in the world of software engineering.',
    'footer.sections': 'Sections',
    'footer.home': 'Home',
    'footer.about': 'About me',
    'footer.contact': 'Contact',
    'footer.location': 'Pasto, Nariño',
    'footer.rights': 'All rights reserved.',

  },
  es: {
    // Header
    portfolio: 'T0m4s1n',
    home: 'Inicio',
    projects: 'Proyectos',
    about: 'Sobre mí',
    contact: 'Contacto',

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
    'project-description': 'Plataforma de logística para inventario de empresas con inteligencia artificial para la gestión de la misma.',

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

    'about.role': 'Desarrollador Full Stack',

    // Skills Section
    'about.skills.backend.title': 'Desarrollo Backend',

    // Experience Section
    'about.experience.senior.title': 'Desarrollador Junior',
    'about.experience.senior.position': 'Programador Junior',
    'about.experience.senior.date': '2020 - Presente',
    'about.experience.senior.role': 'Desarrollo Frontend' ,
    'about.experience.software.title': 'Ingeniero de Software',
    'about.experience.software.position': 'Ingenerio de Software desarrollando sitios web',
    'about.experience.software.date': '2021 - Presente',
    'about.experience.software.role': 'Especialista en Arquitectura Frontend',

    // Education Section
    'about.education.master.title': 'Conocimientos',
    'about.education.master.degree': 'Estudio en MasterMind',
    'about.education.master.school': 'Práctica en LeetCode',
    'about.education.master.year': 'Ganador del Hackathon ParqueSoft 2024',

    'about.education.bachelor.title': 'Estudios',
    'about.education.bachelor.degree': 'Ingeniería de Software',
    'about.education.bachelor.school': 'Universidad Cooperativa de Colombia',
    'about.education.bachelor.year': 'Iniciado en 2023 y aún en progreso',

    // Interests Section
    'about.interests.technical.title': 'Intereses Técnicos',
    'about.interests.personal.title': 'Intereses Personales',
    'about.interests.personal.item1': 'Programar',
    'about.interests.personal.item2': 'Escuchar Música',
    'about.interests.personal.item3': 'Leer Libros de Ciencia Ficción',
    'about.interests.personal.item4': 'Jugar Videojuegos',

    // Goals Section
    'about.goals.professional.title': 'Metas Profesionales',
    'about.goals.professional.item1': 'Liderar Proyectos de Innovación',
    'about.goals.professional.item2': 'Participar en equipos de desarrollo',
    'about.goals.professional.item3': 'Construir Soluciones de Impacto',

    'about.goals.personal.title': 'Metas Personales',
    'about.goals.personal.item1': 'Aprendizaje Continuo',
    'about.goals.personal.item2': 'Balance Vida-Trabajo',
    'about.goals.personal.item3': 'Impacto Global a Través de la Tecnología',

    'about.tabs.skills': 'Habilidades y Tecnologías',
    'about.tabs.experience': 'Experiencia Profesional',
    'about.tabs.education': 'Educación',
    'about.tabs.interests': 'Intereses y Hobbies',
    'about.tabs.goals': 'Metas y Aspiraciones',

    // Skills Section
    'about.skills.frontend.title': 'Desarrollo Frontend',


    // Interests Section
    'about.interests.technical.items': ['IA', 'Blockchain', 'Ciberseguridad', 'Computación en la Nube'],

    // Goals Section
    'about.goals.professional.items': ['Liderar Innovación', 'Mentoría', 'Construir Grandes Productos'],
    'about.goals.personal.items': ['Aprendizaje Continuo', 'Balance Vida-Trabajo', 'Impacto Global'],
    'contact.title': 'Contacto',
    'contact.subtitle': 'Trabajemos juntos en tu próximo proyecto',
    'contact.description': 'Siempre estoy interesado en escuchar sobre nuevos proyectos y oportunidades. No dudes en contactarme si deseas colaborar o simplemente saludar.',
    'contact.name': 'Tu Nombre',
    'contact.email': 'Tu Correo',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.success': '¡Mensaje enviado exitosamente! Me pondré en contacto contigo lo antes posible.',
    'contact.error': 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
    'contact.required': 'Este campo es requerido',
    'contact.invalid-email': 'Por favor ingresa un correo válido',
    'contact.or': 'O conéctate conmigo en',
    'contact.sending': 'Enviando...',
    'footer.description': 'Esta página está realizada por mi persona T0m4s1n, con el fin de mostrar mis habilidades en el desarrollo de software y mi trayecto en el mundo de la ingeniería de software.',
    'footer.sections': 'Secciones',
    'footer.home': 'Inicio',
    'footer.about': 'Sobre mí',
    'footer.contact': 'Contacto',
    'footer.location': 'Pasto, Nariño',
    'footer.rights': 'Todos los derechos reservados.',
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
    const translation = translations[currentLanguage.value][key];
    return Array.isArray(translation) ? translation.join(', ') : translation || key;
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
  install(app: App) {
    app.config.globalProperties.$t = (key: string) => translateUtils.translate(key);
    app.provide('i18n', translateUtils);
  }
};
