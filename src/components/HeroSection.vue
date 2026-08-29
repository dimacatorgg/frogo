<template>
  <section id="hero" class="hero-wrapper">
    <!-- World Map Darkened Background Layers -->
    <div class="hero-map-bg"></div>
    <div class="hero-map-overlay"></div>

    <!-- Main Central Hero Content -->
    <div class="hero-content">
      <!-- Badge -->
      <div class="hero-badge">
        <span class="hero-badge-pulse"></span>
        <span>Real-Time Amphibian Ecosystem Tracking</span>
      </div>

      <!-- Main Title (FrogGO) -->
      <h1 class="hero-title">
        Frog<span>GO</span>
      </h1>

      <!-- Short Description -->
      <p class="hero-subtitle">
        Click on the map and check is there frogs.
      </p>

      <!-- Interactive Quick Search Bar -->


      <!-- Two Main Buttons -->
      <div class="hero-buttons">
        <!-- Button 1: My location (Blue styling) -->
        <button 
          @click="$emit('trigger-my-location')" 
          class="btn-my-location"
          :class="{ 'loading': isLocating }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{{ isLocating ? 'Locating...' : 'My location' }}</span>
        </button>

        <!-- Button 2: Custom location (Contrast amber/gold styling) -->
        <button 
          @click="$emit('open-custom-location')" 
          class="btn-custom-location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          <span>Custom location</span>
        </button>

      </div>
 
      <!-- Quick Hotspot Chips -->
      <div class="hotspots-quick">
        <span class="hotspot-label">Popular Hotspots:</span>
        <button 
          v-for="spot in quickSpots" 
          :key="spot.id"
          @click="$emit('select-hotspot', spot)"
          class="chip-btn"
        >
          📍 {{ spot.name }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isLocating: Boolean,
  quickSpots: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['trigger-my-location', 'open-custom-location', 'select-hotspot', 'search-location'])

const searchQuery = ref('')

const handleSearchSubmit = () => {
  if (searchQuery.value.trim()) {
    emit('search-location', searchQuery.value.trim())
  }
}
</script>

<style scoped>
.search-submit-btn {
  background: var(--emerald-accent);
  color: #042f1a;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-submit-btn:hover {
  background: #34d399;
  box-shadow: 0 0 15px rgba(52, 211, 153, 0.4);
}

.hotspots-quick {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.hotspot-label {
  font-size: 0.85rem;
  color: #9ca3af;
  font-weight: 500;
}

.chip-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e5e7eb;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip-btn:hover {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
  color: var(--emerald-accent);
}

.loading {
  opacity: 0.8;
  cursor: wait;
}
</style>
