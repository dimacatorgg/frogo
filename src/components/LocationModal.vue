<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="modal-icon">📍</div>
          <div>
            <h3 class="modal-title">Select Custom Location</h3>
            <p class="modal-subtitle">Choose a global frog sanctuary hotspot or enter coordinates</p>
          </div>
        </div>
        <button @click="$emit('close')" class="close-btn">&times;</button>
      </div>

      <!-- Custom Input Form -->
      <div class="custom-coord-box">
        <label class="input-label">Custom Location Search or Coordinates</label>
        <div class="input-row">
          <input 
            v-model="customInput" 
            type="text" 
            class="modal-input" 
            placeholder="e.g. Paris, Tokyo, or 10.315, -84.796"
          />
          <button @click="applyCustom" class="apply-btn">
            Apply Location
          </button>
        </div>
      </div>

      <div class="divider">
        <span>or choose a top frog biodiversity hotspot</span>
      </div>

      <!-- Hotspots Grid -->
      <div class="hotspots-grid">
        <div 
          v-for="spot in hotspots" 
          :key="spot.id"
          @click="selectSpot(spot)"
          class="hotspot-card"
        >
          <div class="hotspot-card-header">
            <span class="hotspot-name">{{ spot.name }}</span>
            <span class="density-badge">{{ spot.densityIndex }}% Density</span>
          </div>
          <p class="hotspot-country">🌍 {{ spot.country }}</p>
          <p class="hotspot-desc">{{ spot.description }}</p>
          <div class="hotspot-card-footer">
            <span class="species-tag">Dominant: {{ spot.dominantSpecies }}</span>
            <span class="select-text">Select &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  hotspots: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'select-location'])

const customInput = ref('')

const applyCustom = () => {
  if (customInput.value.trim()) {
    emit('select-location', {
      name: customInput.value.trim(),
      lat: customInput.value.split(",")[0], // fallback if query text
      lng: customInput.value.split(",")[1],
      zoom: 9,
      isCustom: true
    })
    customInput.value = ''
  }
}

const selectSpot = (spot) => {
  emit('select-location', spot)
}
</script>

<style scoped>
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-title-group {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.modal-icon {
  font-size: 1.8rem;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.4rem;
  border-radius: 12px;
}

.modal-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
}

.modal-subtitle {
  font-size: 0.875rem;
  color: #9ca3af;
}

.close-btn {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.2rem 0.5rem;
}

.close-btn:hover {
  color: #ffffff;
}

.custom-coord-box {
  margin-bottom: 1.25rem;
}

.input-label {
  display: block;
  font-size: 0.85rem;
  color: #d1d5db;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.input-row {
  display: flex;
  gap: 0.6rem;
}

.modal-input {
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 0.7rem 1rem;
  color: #ffffff;
  font-family: var(--font-body);
}

.modal-input:focus {
  outline: none;
  border-color: var(--contrast-amber);
}

.apply-btn {
  background: var(--contrast-amber);
  color: #000000;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.apply-btn:hover {
  background: #d97706;
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.divider span {
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  padding: 0 0.85rem;
  font-size: 0.8rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hotspots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.85rem;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 0.3rem;
}

.hotspot-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hotspot-card:hover {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.4);
  transform: translateY(-2px);
}

.hotspot-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.hotspot-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #ffffff;
}

.density-badge {
  font-size: 0.75rem;
  background: rgba(16, 185, 129, 0.2);
  color: var(--emerald-accent);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
}

.hotspot-country {
  font-size: 0.8rem;
  color: var(--contrast-amber);
  margin-bottom: 0.4rem;
}

.hotspot-desc {
  font-size: 0.78rem;
  color: #9ca3af;
  line-height: 1.35;
  margin-bottom: 0.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hotspot-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 0.4rem;
  font-size: 0.75rem;
}

.species-tag {
  color: #d1d5db;
}

.select-text {
  color: var(--contrast-amber);
  font-weight: 600;
}
</style>
