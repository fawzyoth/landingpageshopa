<script setup>
import LoginView from './views/LoginView.vue'
</script>

<template>
  <div class="login-page">
    <LoginView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-white: #ffffff;
  --bg-light: #f8fafc;
  --bg-section: #f1f5f9;
  --accent-primary: #14b8a6;
  --accent-primary-dark: #0d9488;
  --accent-primary-light: #2dd4bf;
  --accent-cyan: #06b6d4;
  --accent-green: #10b981;
  --accent-red: #ef4444;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --border-light: #e2e8f0;
  --border-medium: #cbd5e1;
  --gradient-main: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-dark));
  --gradient-secondary: linear-gradient(135deg, var(--accent-cyan), var(--accent-primary));
  --font-heading: 'Cairo', sans-serif;
  --font-body: 'Tajawal', sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  --transition-normal: 0.3s ease;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background: var(--bg-light);
  color: var(--text-primary);
  line-height: 1.7;
  direction: rtl;
}

#app {
  width: 100%;
  min-height: 100vh;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.login-page {
  width: 100%;
  min-height: 100vh;
  max-width: 100%;
  margin: 0;
  padding: 0;
}
</style>
