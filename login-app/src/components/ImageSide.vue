<script setup>
const features = [
  { text: 'التقاط 100% من الأرقام', icon: 'fa-check-circle' },
  { text: 'بدون تكرار', icon: 'fa-check-circle' },
  { text: 'تصدير فوري إلى Excel', icon: 'fa-check-circle' }
]

const stats = [
  { value: '+500', label: 'بائع نشط' },
  { value: '2.5M+', label: 'رقم تم التقاطه' }
]
</script>

<template>
  <div class="login-image-side">
    <div class="login-image-content">
      <!-- Logo -->
      <a href="../index.html" class="login-logo">
        <span class="logo-icon">
          <i class="fas fa-shopping-bag"></i>
        </span>
        <span class="logo-text">SHOPA</span>
      </a>

      <!-- Welcome Text -->
      <div class="login-image-text">
        <h1>مرحباً بعودتك!</h1>
        <p>سجل دخولك وابدأ بالتقاط أرقام عملائك تلقائياً</p>
      </div>

      <!-- Features -->
      <div class="login-features">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="login-feature"
        >
          <i :class="['fas', feature.icon]"></i>
          <span>{{ feature.text }}</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="login-stats">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="login-stat"
        >
          <span class="stat-number">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
    <div class="login-image-overlay"></div>
  </div>
</template>

<style scoped>
.login-image-side {
  flex: 1;
  background: linear-gradient(135deg, #134e4a 0%, #0d9488 50%, #14b8a6 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  overflow: hidden;
}

.login-image-side::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.login-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 70%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 50%);
  pointer-events: none;
}

.login-image-content {
  position: relative;
  z-index: 1;
  max-width: 480px;
  text-align: center;
}

.login-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 50px;
  color: white;
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
}

.login-logo .logo-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  font-size: 1.3rem;
}

.login-image-text {
  margin-bottom: 50px;
}

.login-image-text h1 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 15px;
  font-weight: 800;
  font-family: var(--font-heading);
}

.login-image-text p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
}

.login-features {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 50px;
}

.login-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-feature i {
  color: var(--accent-cyan);
  font-size: 1.1rem;
}

.login-stats {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.login-stat {
  text-align: center;
}

.login-stat .stat-number {
  display: block;
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 5px;
}

.login-stat .stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .login-image-side {
    padding: 40px;
  }

  .login-image-text h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .login-image-side {
    display: none;
  }
}
</style>
