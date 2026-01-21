<script setup>
import { ref, reactive, computed } from 'vue'

// Form data
const form = reactive({
  email: '',
  password: '',
  remember: false
})

// State
const showPassword = ref(false)
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Errors
const errors = reactive({
  email: '',
  password: ''
})

// Computed
const isFormValid = computed(() => {
  return form.email && form.password && !errors.email && !errors.password
})

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'البريد الإلكتروني مطلوب'
    return false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح'
    return false
  }
  errors.email = ''
  return true
}

const validatePassword = () => {
  if (!form.password) {
    errors.password = 'كلمة المرور مطلوبة'
    return false
  } else if (form.password.length < 6) {
    errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    return false
  }
  errors.password = ''
  return true
}

const clearError = (field) => {
  errors[field] = ''
  errorMessage.value = ''
}

const handleLogin = async () => {
  // Clear previous messages
  successMessage.value = ''
  errorMessage.value = ''

  // Validate all fields
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    return
  }

  // Start loading
  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate successful login
    console.log('Login data:', {
      email: form.email,
      password: form.password,
      remember: form.remember
    })

    successMessage.value = 'تم تسجيل الدخول بنجاح! جاري التحويل...'

    // Redirect after success
    setTimeout(() => {
      window.location.href = '../index.html'
    }, 1500)

  } catch (error) {
    errorMessage.value = 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.'
  } finally {
    isLoading.value = false
  }
}

const handleSocialLogin = async (provider) => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Simulate social login
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log(`Logging in with ${provider}`)
    successMessage.value = `جاري تسجيل الدخول عبر ${provider}...`

  } catch (error) {
    errorMessage.value = `حدث خطأ أثناء تسجيل الدخول عبر ${provider}`
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = () => {
  if (form.email) {
    alert(`سيتم إرسال رابط إعادة تعيين كلمة المرور إلى: ${form.email}`)
  } else {
    alert('يرجى إدخال بريدك الإلكتروني أولاً')
  }
}
</script>

<template>
  <div class="login-form-container">
    <!-- Header -->
    <div class="login-form-header">
      <div class="mobile-logo">
        <span class="logo-icon"><i class="fas fa-shopping-bag"></i></span>
      </div>
      <h2>تسجيل الدخول</h2>
      <p>أدخل بياناتك للوصول إلى حسابك</p>
    </div>

    <!-- Success Message -->
    <Transition name="fade">
      <div v-if="successMessage" class="alert alert-success">
        <i class="fas fa-check-circle"></i>
        <span>{{ successMessage }}</span>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition name="fade">
      <div v-if="errorMessage" class="alert alert-error">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ errorMessage }}</span>
      </div>
    </Transition>

    <!-- Form -->
    <form class="login-form" @submit.prevent="handleLogin">
      <!-- Email -->
      <div class="form-group">
        <label for="email">البريد الإلكتروني</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.email }">
          <i class="fas fa-envelope input-icon"></i>
          <input
            type="email"
            id="email"
            v-model="form.email"
            @blur="validateEmail"
            @input="clearError('email')"
            placeholder="example@email.com"
            :disabled="isLoading"
            autocomplete="email"
          />
        </div>
        <Transition name="slide">
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </Transition>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">كلمة المرور</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.password }">
          <i class="fas fa-lock input-icon"></i>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="form.password"
            @blur="validatePassword"
            @input="clearError('password')"
            placeholder="••••••••"
            :disabled="isLoading"
            autocomplete="current-password"
          />
          <button
            type="button"
            class="toggle-password"
            @click="togglePassword"
            aria-label="إظهار كلمة المرور"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <Transition name="slide">
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </Transition>
      </div>

      <!-- Options -->
      <div class="form-options">
        <label class="remember-me">
          <input type="checkbox" v-model="form.remember" />
          <span class="checkmark"></span>
          <span>تذكرني</span>
        </label>
        <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">
          نسيت كلمة المرور؟
        </a>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn btn-primary btn-block btn-lg login-btn"
        :disabled="isLoading"
      >
        <i :class="isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'"></i>
        {{ isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}
      </button>

      <!-- Divider -->
      <div class="divider">
        <span>أو</span>
      </div>

      <!-- Social Login -->
      <div class="social-login">
        <button
          type="button"
          class="social-btn google-btn"
          @click="handleSocialLogin('Google')"
          :disabled="isLoading"
        >
          <i class="fab fa-google"></i>
          <span>Google</span>
        </button>
        <button
          type="button"
          class="social-btn facebook-btn"
          @click="handleSocialLogin('Facebook')"
          :disabled="isLoading"
        >
          <i class="fab fa-facebook-f"></i>
          <span>Facebook</span>
        </button>
      </div>
    </form>

    <!-- Footer -->
    <div class="login-footer">
      <p>ليس لديك حساب؟ <a href="#">إنشاء حساب جديد</a></p>
    </div>

    <!-- Back to Home -->
    <div class="back-to-home">
      <a href="../index.html">
        <i class="fas fa-arrow-right"></i>
        العودة للصفحة الرئيسية
      </a>
    </div>
  </div>
</template>

<style scoped>
.login-form-container {
  width: 100%;
  max-width: 420px;
}

.login-form-header {
  text-align: center;
  margin-bottom: 40px;
}

.mobile-logo {
  display: none;
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: var(--gradient-main);
  border-radius: var(--radius-md);
  align-items: center;
  justify-content: center;
}

.mobile-logo .logo-icon {
  color: white;
  font-size: 1.5rem;
}

.login-form-header h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 10px;
  font-family: var(--font-heading);
}

.login-form-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

/* Alerts */
.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  margin-bottom: 25px;
  font-size: 0.95rem;
}

.alert-success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-green);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 16px;
  color: var(--text-muted);
  font-size: 1rem;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 50px;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-primary);
  background: var(--bg-white);
  transition: var(--transition-normal);
}

.input-wrapper input::placeholder {
  color: var(--text-muted);
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1);
}

.input-wrapper.has-error input {
  border-color: var(--accent-red);
}

.input-wrapper.has-error input:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.toggle-password {
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 5px;
  transition: var(--transition-normal);
}

.toggle-password:hover {
  color: var(--accent-primary);
}

.error-text {
  color: var(--accent-red);
  font-size: 0.85rem;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.remember-me input {
  display: none;
}

.remember-me .checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-medium);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-normal);
}

.remember-me input:checked + .checkmark {
  background: var(--gradient-main);
  border-color: transparent;
}

.remember-me input:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.forgot-password {
  color: var(--accent-primary);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all var(--transition-normal);
}

.btn-primary {
  background: var(--gradient-main);
  color: white;
  box-shadow: 0 10px 40px rgba(20, 184, 166, 0.25);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 20px 50px rgba(20, 184, 166, 0.35);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
}

.btn-lg {
  padding: 18px 36px;
  font-size: 1.1rem;
}

.login-btn {
  margin-top: 10px;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-light);
}

/* Social Login */
.social-login {
  display: flex;
  gap: 15px;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  background: var(--bg-white);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition-normal);
}

.social-btn:hover:not(:disabled) {
  border-color: var(--border-medium);
  background: var(--bg-light);
}

.social-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-btn i {
  color: #ea4335;
}

.facebook-btn i {
  color: #1877f2;
}

/* Footer */
.login-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid var(--border-light);
}

.login-footer p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.login-footer a {
  color: var(--accent-primary);
  font-weight: 600;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* Back to Home */
.back-to-home {
  text-align: center;
  margin-top: 25px;
}

.back-to-home a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.9rem;
  text-decoration: none;
  transition: var(--transition-normal);
}

.back-to-home a:hover {
  color: var(--accent-primary);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .login-form-container {
    max-width: 100%;
  }

  .mobile-logo {
    display: flex;
  }

  .login-form-header {
    margin-bottom: 30px;
  }

  .social-login {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .login-form-header h2 {
    font-size: 1.6rem;
  }

  .input-wrapper input {
    padding: 14px 45px;
    font-size: 0.95rem;
  }

  .form-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .login-btn {
    padding: 16px;
  }
}
</style>
