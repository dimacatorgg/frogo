<script setup>
import {ref} from "vue"
import { defineEmits,defineProps } from "vue";
const emits = defineEmits(["sigin"])
const props = defineProps({
  cookie:Boolean
})

</script>
<template>
  <header class="navbar-wrapper">
    <div class="navbar-container">
      <!-- Logo -->
      <a href="#" class="brand-logo">
        <div class="logo-icon-box">
          <span class="frog-emoji">🐸</span>
        </div>
        <span class="brand-name">Frog<span class="highlight">GO</span></span>
      </a>

      <!-- Navigation Links -->
      <nav class="nav-links">
        <a href="#hero" class="nav-link active">Home</a>
        <a href="#map-section" class="nav-link">Presence Map</a>
       
        <a href="#stats-section" class="nav-link">Metrics</a>
        <a class="nav-link" style="cursor: pointer;" @click="emits('sigin')" v-if="props.cookie">Sign in</a>
      </nav>

      <!-- Right Action & Status -->
      <div class="nav-actions">
        <div class="status-pill">
          <span class="pulse-dot"></span>
          <span class="status-text">Satellite Map Sync</span>
        </div>
        <a href="#map-section" class="nav-cta-btn">
          Explore Map
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1.25rem 2rem;
  background: linear-gradient(180deg, rgba(10, 14, 23, 0.9) 0%, rgba(10, 14, 23, 0) 100%);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
}

.logo-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}

.frog-emoji {
  font-size: 1.4rem;
}

.brand-name {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.brand-name .highlight {
  color: var(--emerald-accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover, .nav-link.active {
  color: #ffffff;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  font-size: 0.8rem;
  color: #d1d5db;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  background-color: var(--emerald-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--emerald-accent);
}

.nav-cta-btn {
  padding: 0.55rem 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-cta-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 820px) {
  .nav-links, .status-pill {
    display: none;
  }
}
</style>
