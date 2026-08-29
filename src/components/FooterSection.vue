<template>
  <footer class="footer-wrapper">
    <div class="app-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <span>🐸</span> Frog<span class="highlight">GO</span>
          </div>
          <p class="footer-tagline">
            Global Frog Presence Map & Ecological Biodiversity Analytics platform.
          </p>
        </div>

        <div class="footer-links-grid">
          <div class="link-col">
            <h4 class="col-title">Navigation</h4>
            <a href="#hero">Hero Section</a>
            <a href="#map-section">Presence Map</a>
            <a href="#species-section">Species Catalog</a>
            <a href="#stats-section">Live Metrics</a>
          </div>

          <div class="link-col">
            <h4 class="col-title">Resources</h4>
            <a href="#">Bio Data API</a>
            <a href="#">Acoustic Audio Database</a>
            <a href="#">Conservation Map</a>
            <a href="#">Research Papers</a>
          </div>

          <div class="link-col">
            <h4 class="col-title">Developer</h4>
            <a href="#">Vue 3 + Vite Architecture</a>
            <a href="#">Leaflet Mapping API</a>
            <a href="#">Documentation</a>
            <a href="#">Status</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 FrogGO Application. All rights reserved. Input location and get frog presence map.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  padding: 4rem 0 2rem 0;
  background: #070a10;
  border-top: 1px solid var(--border-color);
}

.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.footer-brand {
  max-width: 320px;
}

.footer-logo {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo .highlight {
  color: var(--emerald-accent);
}

.footer-tagline {
  font-size: 0.9rem;
  color: #9ca3af;
  line-height: 1.5;
}

.footer-links-grid {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
}

.link-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.col-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link-col a {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.link-col a:hover {
  color: var(--emerald-accent);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: #6b7280;
}
</style>
