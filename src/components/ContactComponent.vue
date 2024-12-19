<script setup lang="ts">
import { ref } from 'vue';
import { translateUtils } from '../translate';
import { Mail, Github, Linkedin, Send, Loader } from 'lucide-vue-next';
import emailjs from '@emailjs/browser';

// Configura tus credenciales de EmailJS
const EMAILJS_SERVICE_ID = 'service_0titipg';
const EMAILJS_TEMPLATE_ID = 'template_q8pv1q8';
const EMAILJS_PUBLIC_KEY = 'OpT2025ZcoaXxTtlr';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const formData = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref<Partial<FormData>>({});
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  if (!formData.value.name.trim()) {
    errors.value.name = translateUtils.translate('contact.required');
    isValid = false;
  }

  if (!formData.value.email.trim()) {
    errors.value.email = translateUtils.translate('contact.required');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = translateUtils.translate('contact.invalid-email');
    isValid = false;
  }

  if (!formData.value.message.trim()) {
    errors.value.message = translateUtils.translate('contact.required');
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  showSuccess.value = false;
  showError.value = false;

  try {
    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message,
      reply_to: formData.value.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      showSuccess.value = true;
      formData.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } else {
      showError.value = true;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    showError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact" class="contact-section">
    <!-- Background Animation -->
    <div class="animated-background">
      <div class="bg-blob bg-blob-1"></div>
      <div class="bg-blob bg-blob-2"></div>
    </div>

    <div class="content-container">
      <!-- Header -->
      <div class="section-header">
        <h2 class="section-title">
          {{ translateUtils.translate('contact.title') }}
        </h2>
        <p class="section-subtitle">
          {{ translateUtils.translate('contact.subtitle') }}
        </p>
        <p class="section-description">
          {{ translateUtils.translate('contact.description') }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-grid">
          <!-- Name Input -->
          <div class="form-group">
            <label>
              {{ translateUtils.translate('contact.name') }}
            </label>
            <input
              v-model="formData.name"
              type="text"
              :placeholder="translateUtils.translate('contact.name')"
              :class="{ 'has-error': errors.name }"
            />
            <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
          </div>

          <!-- Email Input -->
          <div class="form-group">
            <label>
              {{ translateUtils.translate('contact.email') }}
            </label>
            <input
              v-model="formData.email"
              type="email"
              :placeholder="translateUtils.translate('contact.email')"
              :class="{ 'has-error': errors.email }"
            />
            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Subject Input -->
        <div class="form-group">
          <label>
            {{ translateUtils.translate('contact.subject') }}
          </label>
          <input
            v-model="formData.subject"
            type="text"
            :placeholder="translateUtils.translate('contact.subject')"
          />
        </div>

        <!-- Message Input -->
        <div class="form-group">
          <label>
            {{ translateUtils.translate('contact.message') }}
          </label>
          <textarea
            v-model="formData.message"
            :placeholder="translateUtils.translate('contact.message')"
            rows="6"
            :class="{ 'has-error': errors.message }"
          ></textarea>
          <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="submit-button"
        >
          <Loader v-if="isSubmitting" class="animate-spin" :size="20" />
          <Send v-else :size="20" />
          {{ isSubmitting
            ? translateUtils.translate('contact.sending')
            : translateUtils.translate('contact.send')
          }}
        </button>

        <!-- Success/Error Messages -->
        <Transition name="fade">
          <p v-if="showSuccess" key="success" class="success-message">
            {{ translateUtils.translate('contact.success') }}
          </p>
          <p v-else-if="showError" key="error" class="error-message">
            {{ translateUtils.translate('contact.error') }}
          </p>
        </Transition>
      </form>

      <!-- Social Links -->
      <div class="social-section">
        <p class="connect-text">
          {{ translateUtils.translate('contact.or') }}
        </p>
        <div class="social-links">
          <a href="mailto:pandelpipas@gmail.com" class="social-link">
            <Mail :size="24" />
          </a>
          <a href="https://github.com/T0m4s1n" target="_blank" rel="noopener noreferrer" class="social-link">
            <Github :size="24" />
          </a>
          <a href="https://www.linkedin.com/in/tomas-benavides-calderon-81936632b/" target="_blank" rel="noopener noreferrer" class="social-link">
            <Linkedin :size="24" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem;
}

.animated-background {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  pointer-events: none;
}

.bg-blob {
  position: absolute;
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  filter: blur(5rem);
  animation: float 20s infinite linear;
}

.bg-blob-1 {
  top: -15rem;
  left: -15rem;
  animation-delay: -10s;
}

.bg-blob-2 {
  background: var(--bg-secondary);
  bottom: -15rem;
  right: -15rem;
}

.content-container {
  max-width: 64rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-color), var(--bg-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-form {
  background: var(--bg-secondary);
  backdrop-filter: blur(1rem);
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid color-mix(in srgb, var(--accent-color) 10%, transparent);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

label {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.95rem;
}

input, textarea {
  background: color-mix(in srgb, var(--bg-primary) 70%, transparent);
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.has-error {
  border-color: #ef4444;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  background: var(--accent-color);
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color) 40%, transparent);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
}

.success-message {
  color: #10b981;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
}

.social-section {
  text-align: center;
  margin-top: 4rem;
}

.connect-text {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-link {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-secondary) 10%, transparent);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  border: 1px solid color-mix(in srgb, var(--accent-color) 10%, transparent);
}

.social-link:hover {
  transform: translateY(-4px);
  color: var(--accent-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-color);
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(5%, 5%) rotate(90deg);
  }
  50% {
    transform: translate(10%, 0%) rotate(180deg);
  }
  75% {
    transform: translate(5%, -5%) rotate(270deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .social-link {
    width: 3rem;
    height: 3rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.25rem;
  }

  .contact-form {
    padding: 1rem;
  }

  .social-link {
    width: 2.75rem;
    height: 2.75rem;
  }
}
</style>
