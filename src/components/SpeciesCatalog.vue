<template>
  <section id="species-section" class="species-catalog-wrapper">
    <div class="app-container">
      <div class="section-center-header">
        <div class="section-badge">
          <span>🐸 Amphibian Catalog</span>
        </div>
        <h2 class="section-title">Tracked Frog Species</h2>
        <p class="section-subtitle">Explore biological data, acoustic signatures, and habitats</p>
      </div>

      <!-- Species Cards Grid -->
      <div class="species-cards-grid">
        <div 
          v-for="species in speciesList" 
          :key="species.id"
          class="species-card"
        >
          <!-- Card Image Header -->
          <div class="card-image-box">
            <img :src="species.image" :alt="species.name" class="species-img" />
            <div class="status-chip" :style="{ backgroundColor: getStatusBg(species.status) }">
              {{ species.status }}
            </div>
            <div class="presence-chip">
              Presence: {{ species.presenceRate }}
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-body">
            <h3 class="species-title">{{ species.name }}</h3>
            <p class="scientific-name"><em>{{ species.scientificName }}</em></p>
            <p class="species-desc">{{ species.description }}</p>

            <div class="species-meta-grid">
              <div class="meta-item">
                <span class="meta-label">Family</span>
                <span class="meta-val">{{ species.family }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Acoustics</span>
                <span class="meta-val">{{ species.audioFreq }}</span>
              </div>
            </div>

            <!-- Audio Call Simulation Button -->
            <button 
              @click="playAudioSample(species)"
              class="audio-call-btn"
              :class="{ 'playing': activePlayingId === species.id }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              <span>{{ activePlayingId === species.id ? '🔊 Playing Call...' : 'Listen Call Acoustic' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  speciesList: {
    type: Array,
    default: () => []
  }
})

const activePlayingId = ref(null)

const getStatusBg = (status) => {
  if (status.includes('Critically')) return '#ef4444'
  if (status.includes('Vulnerable')) return '#f59e0b'
  if (status.includes('Protected')) return '#3b82f6'
  return '#10b981'
}

const playAudioSample = (species) => {
  activePlayingId.value = species.id
  
  // Synthesize soft frog croak pitch using Web Audio API for interactive realism!
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(180, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3)
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.35)
  } catch (e) {
    // audio fallback
  }

  setTimeout(() => {
    activePlayingId.value = null
  }, 1200)
}
</script>

<style scoped>
.species-catalog-wrapper {
  padding: 5rem 0;
  border-bottom: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.2);
}

.section-center-header {
  text-align: center;
  margin-bottom: 3rem;
}

.species-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
}

.species-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

.species-card:hover {
  border-color: rgba(16, 185, 129, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

.card-image-box {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.species-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.species-card:hover .species-img {
  transform: scale(1.06);
}

.status-chip {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

.presence-chip {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  background: rgba(10, 14, 23, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--emerald-accent);
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  backdrop-filter: blur(6px);
}

.card-body {
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.species-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
}

.scientific-name {
  font-size: 0.85rem;
  color: var(--emerald-accent);
  margin-bottom: 0.65rem;
}

.species-desc {
  font-size: 0.85rem;
  color: #9ca3af;
  line-height: 1.45;
  margin-bottom: 1rem;
}

.species-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.65rem;
  border-radius: 10px;
  margin-bottom: 1.1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.7rem;
  color: #6b7280;
}

.meta-val {
  font-size: 0.82rem;
  color: #e5e7eb;
  font-weight: 600;
}

.audio-call-btn {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 10px;
  color: var(--emerald-accent);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.audio-call-btn:hover, .audio-call-btn.playing {
  background: var(--emerald-accent);
  color: #042f1a;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
}
</style>
