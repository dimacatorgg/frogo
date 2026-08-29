<template>
  <section id="stats-section" class="stats-banner-wrapper">
    <div class="app-container">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-box blue">📍</div>
          <div class="stat-info">
            <span class="stat-number">14,820+</span>
            <span class="stat-title">Verified Sightings</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box emerald">🐸</div>
          <div class="stat-info">
            <span class="stat-number">450+</span>
            <span class="stat-title">Tracked Frog Species</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box amber">⚡</div>
          <div class="stat-info">
            <span class="stat-number">90%*</span>
            <span class="stat-title">Map Accuracy Index</span>
          </div>
        </div>
       
      </div>
    </div>
     <p class="disclamer">*The accuracy was estimated using a dataset of approximately 10,000 samples.</p>
  </section>
</template>

<style scoped>
.stats-banner-wrapper {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(180deg, rgba(10, 14, 23, 0) 0%, rgba(17, 24, 39, 0.5) 100%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.disclamer{
width: 100%;
padding: 8px;
font-size: 10px;
color: rgb(109, 115, 204);
text-align: center;
height: 10px;
}
.stat-card {
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.1rem;
  backdrop-filter: blur(10px);
}

.stat-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}

.stat-icon-box.blue {
  background: rgba(37, 99, 235, 0.15);
  border: 1px solid rgba(37, 99, 235, 0.3);
}

.stat-icon-box.emerald {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.stat-icon-box.amber {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.stat-icon-box.cyan {
  background: rgba(6, 182, 212, 0.15);
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  font-family: var(--font-heading);
}

.stat-title {
  font-size: 0.82rem;
  color: #9ca3af;
}
</style>
