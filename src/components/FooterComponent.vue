<script setup lang="ts">
import {
  CodeIcon,
  Github,
  Linkedin,
  Instagram,
  Home,
  User,
  Mail,
  MapPin,
  Phone,
  Link as CustomLink
} from 'lucide-vue-next';
import { translateUtils } from '../translate';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer-container">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-section">
          <h3 class="footer-title">
            <CodeIcon class="footer-icon" :size="24"/>
            <span>T0m4s1n</span>
          </h3>
          <p class="footer-text">
            {{ translateUtils.translate('footer.description') }}
          </p>
          <div class="social-links">
            <a href="https://github.com/T0m4s1n" target="_blank" rel="noopener noreferrer"
               class="social-icon" aria-label="Github">
              <Github :size="24"/>
            </a>
            <a href="https://www.linkedin.com/in/tomas-benavides-calderon-81936632b/" target="_blank" rel="noopener noreferrer"
               class="social-icon" aria-label="LinkedIn">
              <Linkedin :size="24"/>
            </a>
            <a href="https://www.instagram.com/rompecolumnas/profilecard/?igsh=Mjhsbnc5cWRiaGI0" target="_blank" rel="noopener noreferrer"
               class="social-icon" aria-label="Instagram">
              <Instagram :size="24"/>
            </a>
          </div>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">
            <CustomLink class="footer-icon" :size="24"/>
            <span>{{ translateUtils.translate('footer.sections') }}</span>
          </h3>
          <ul class="footer-list">
            <li class="footer-item">
              <Home :size="20"/>
              <a href="#hero">{{ translateUtils.translate('footer.home') }}</a>
            </li>
            <li class="footer-item">
              <User :size="20"/>
              <a href="#about">{{ translateUtils.translate('footer.about') }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">
            <Mail class="footer-icon" :size="24"/>
            <span>{{ translateUtils.translate('footer.contact') }}</span>
          </h3>
          <ul class="footer-list">
            <li class="footer-item">
              <MapPin :size="20"/>
              <span>{{ translateUtils.translate('footer.location') }}</span>
            </li>
            <li class="footer-item">
              <Phone :size="20"/>
              <span>+57 (310)640-6198</span>
            </li>
            <li class="footer-item">
              <Mail :size="20"/>
              <span>pandelpipas@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} T0m4s1n {{ translateUtils.translate('footer.rights') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  font-family: "Plus Jakarta Sans", sans-serif;
  background: var(--bg-secondary);
  color: #fff;
  padding: 6rem 0 2rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--border-color);
}

.footer-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent,
    var(--accent-color),
    transparent
  );
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-section {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
  letter-spacing: 0.5px;
}

.footer-text {
  color: #fff;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: color-mix(in srgb, var(--accent-color) 10%, transparent);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-primary);
  border: 1px solid transparent;
}

.social-icon:hover {
  background: color-mix(in srgb, var(--accent-color) 20%, transparent);
  transform: translateY(-4px);
  color: #fff;
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.footer-list {
  list-style: none;
  padding: 0;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color:#fff;
  transition: all 0.3s ease;
}

.footer-item a {
  color: inherit;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.footer-item:hover {
  color:#fff;
  transform: translateX(4px);
}

.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
  text-align: center;
}

.copyright {
  color: #fff;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 4rem 0 2rem;
  }

  .footer-grid {
    gap: 3rem;
  }

  .footer-section {
    text-align: center;
  }

  .footer-title {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-item {
    justify-content: center;
  }
}
</style>
