<script setup>
import { ref, reactive } from 'vue'
import ImageSide from '../components/ImageSide.vue'
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <div class="login-container">
    <!-- Left Side - Image -->
    <ImageSide />

    <!-- Right Side - Form -->
    <div class="login-form-side">
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
}

.login-form-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: var(--bg-white);
}

@media (max-width: 1024px) {
  .login-form-side {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-form-side {
    min-height: 100vh;
    padding: 30px 20px;
  }
}
</style>
