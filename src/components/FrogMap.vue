<template>
  <section id="map-section" class="map-section-wrapper">
    <div class="app-container">
      <!-- Section Header -->
      <div class="section-header">
        <div>
          <div class="section-badge">
            <span>🗺️ Interactive Map</span>
          </div>

          <h2 class="section-title">Global Frog Presence Map</h2>

          <p class="section-subtitle">
            Current active region:
            <strong class="location-highlight">
              {{ activeLocationName }}
            </strong>
          </p>
        </div>

        <div class="map-controls-top">
          <button @click="het()" class="quick-btn blue">
            📍 My Location
          </button>

          <button @click="hit()" class="quick-btn amber">
            🌐 Custom Location
          </button>
        </div>
      </div>

      <!-- Main Map & Info Grid -->
      <div class="map-grid">

        <!-- Map Canvas Container -->
        <div class="map-card">
          <div ref="mapContainer" class="map-container"></div>

          <!-- Map Floating Controls Overlay -->
          <div class="map-floating-overlay">
            <span class="live-tag">
              <span class="live-dot"></span>
              Live Sighting Feed
            </span>

            <span class="coord-tag">
              Lat: {{ lat }}° | Lng: {{ lon }}°
            </span>
          </div>
        </div>

        <!-- Sidebar Info Panel -->
        <div class="map-sidebar">

          <!-- Density Meter Box -->
          <div class="sidebar-box density-box">
            <div class="box-header">
              <span class="box-title">
                Frog Presence Index
              </span>

              <span
                class="density-val"
                :style="{ color: densityColor }"
              >
                {{ currentDensity }}%
              </span>
            </div>

            <div class="density-bar-bg">
              <div
                class="density-bar-fill"
                :style="{
                  width: Math.max(0, currentDensity) + '%',
                  backgroundColor: densityColor
                }"
              ></div>
            </div>

            <p class="density-text">
              <span
                class="status-indicator"
                :style="{ backgroundColor: densityColor }"
              ></span>

              {{ densityDescription }}
            </p>
          </div>

          <!-- Active Location Stats
          <div class="sidebar-box">
            <h4 class="box-title">Location Ecological Data</h4>

            <div class="stats-mini-grid">
              <div class="mini-stat">
                <span class="stat-label">Active Sightings</span>
                <span class="stat-num">142</span>
              </div>

              <div class="mini-stat">
                <span class="stat-label">Avg Humidity</span>
                <span class="stat-num">84%</span>
              </div>

              <div class="mini-stat">
                <span class="stat-label">Elevation</span>
                <span class="stat-num">350m</span>
              </div>

              <div class="mini-stat">
                <span class="stat-label">Endemic Rate</span>
                <span class="stat-num">High</span>
              </div>
            </div>
          </div>
          -->

          <div class="sidebar-box">
            <h4 class="box-title">Your points</h4>

            <div class="species-mini-list">

              <template v-if="points.length !== 0">

                <div
                  v-for="(sp, index) in points"
                  :key="`${sp.lat}-${sp.lon}`"
                  class="species-mini-item"
                  @click="frog(sp.lat, sp.lon, index)"
                >

                  <span
                    class="close"
                    @click.stop="cls(index)"
                  >
                    X
                  </span>

                  <span class="mini-icon">🐸</span>

                  <div class="mini-details">
                    <span class="mini-name">
                      lat {{ sp.lat.toFixed(2) }}
                      lon: {{ sp.lon.toFixed(2) }}
                    </span>
                  </div>

                  <span class="mini-rate">
                    {{ sp.score }}
                  </span>

                </div>

              </template>

              <div v-else>
                Click to some place at map where you want frog presence
              </div>

            </div>
          </div>
          <div class="sidebar-box r" v-if="joj">The limit is 10 points on the map.If you want new locations delete some of the map</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import L from 'leaflet'
import axios from 'axios'

/* --------------------------------------------------
   PROPS
-------------------------------------------------- */

const props = defineProps({
  activeLocationName: {
    type: String,
    default: 'Monteverde Reserve, Costa Rica'
  },

  activeCenter: {
    type: Object,
    default: () => ({
      lat: 10.3157,
      lng: -84.7963,
      zoom: 8
    })
  },

  pins: {
    type: Array,
    default: () => []
  },

  speciesList: {
    type: Array,
    default: () => []
  }
})

/* --------------------------------------------------
   EMITS
-------------------------------------------------- */

const emit = defineEmits([
  'trigger-my-location',
  'open-custom-location'
])

/* --------------------------------------------------
   MAP STATE
-------------------------------------------------- */

const lat = ref(props.activeCenter.lat)
const lon = ref(props.activeCenter.lng)

const mapContainer = ref(null)

let mapInstance = null
let markersLayer = null

const markers = ref([])
const points = ref([])

/* --------------------------------------------------
   DENSITY
-------------------------------------------------- */

const currentDensity = ref(-1)

const densityColor = computed(() => {
  if (currentDensity.value >= 80) {
    return '#10b981'
  }

  if (currentDensity.value >= 50) {
    return '#f59e0b'
  }

  if (currentDensity.value === -1) {
    return '#222'
  }

  return '#ef4444'
})

const densityDescription = computed(() => {
  if (currentDensity.value >= 80) {
    return 'Optimal Amphibian Habitat - High Vocal Activity'
  }

  if (currentDensity.value >= 50) {
    return 'Moderate Presence - Seasonal Breeding Grounds'
  }

  if (currentDensity.value === -1) {
    return 'Still didnt selected'
  }

  return 'Low Density - Arid or Sparse Habitat'
})

const activeSpeciesList = computed(() => {
  return props.speciesList.slice(0, 4)
})

/* --------------------------------------------------
   GET WEATHER DATA + FROG SCORE
-------------------------------------------------- */

async function getdata(latitude, longitude) {
  try {
    const response = await axios.get(
      'https://api.open-meteo.com/v1/forecast',
      {
        params: {
          latitude: latitude,
          longitude: longitude,

          current: [
            'temperature_2m',
            'precipitation',
            'shortwave_radiation',
            'vapour_pressure_deficit',
            'wind_speed_10m'
          ].join(','),

          daily: [
            'temperature_2m_min',
            'temperature_2m_max'
          ].join(','),

          timezone: 'auto'
        }
      }
    )

    const data = response.data

    const weatherData = {
      srad: data.current.shortwave_radiation,
      vpd: data.current.vapour_pressure_deficit,

      // minimum i maksimum za današnji dan
      tmin: data.daily.temperature_2m_min[0],
      tmax: data.daily.temperature_2m_max[0],

      ws: data.current.wind_speed_10m,
      ppt: data.current.precipitation,

      time: data.current.time
    }

    const frogResponse = await axios.post(
      'https://frogoback.onrender.com/frog',
      weatherData
    )

    return frogResponse.data

  } catch (err) {
    console.log('Open-Meteo / FastAPI error:', err)

    return null
  }
}

/* --------------------------------------------------
   CHECK IF LOCATION ALREADY EXISTS
-------------------------------------------------- */

function findExistingPoint(latitude, longitude) {
  const tolerance = 0.00001

  return points.value.findIndex(point => {
    return (
      Math.abs(point.lat - latitude) < tolerance &&
      Math.abs(point.lon - longitude) < tolerance
    )
  })
}

/* --------------------------------------------------
   GO TO EXISTING POINT
-------------------------------------------------- */

function goToExistingPoint(index) {
  if (index === -1) {
    return false
  }

  const point = points.value[index]

  lat.value = point.lat
  lon.value = point.lon

  currentDensity.value = Number(point.score) * 100

  mapInstance.flyTo(
    [point.lat, point.lon],
    14,
    {
      duration: 1
    }
  )

  markers.value[index]?.openPopup()

  return true
}

/* --------------------------------------------------
   CREATE FROG MARKER
-------------------------------------------------- */

function createFrogMarker(latitude, longitude, index) {
  const customIcon = L.divIcon({
    className: 'frog-marker-div',

    html: `
      <div style="
        width:32px;
        height:32px;
        background:rgba(16,185,129,0.9);
        border:2px solid white;
        border-radius:50%;
        box-shadow:0 0 16px rgba(16,185,129,0.9);
        display:flex;
        align-items:center;
        justify-content:center;
        position:relative;
        cursor:pointer;
      ">
        🐸
      </div>
    `,

    iconSize: [32, 32],
    iconAnchor: [16, 16]
  })

  const marker = L.marker(
    [latitude, longitude],
    {
      icon: customIcon
    }
  ).addTo(markersLayer)

  marker.bindPopup(`
    <div style="color:black;padding:4px;">
      <h4 style="color:black;text-align:center">
        Location #${index + 1}
      </h4>
      Was there frogs?
      <span   style="
          width:100%;
          display:block;
          text-align:center;
          cursor:pointer;
          margin:4px 2px 0 2px;
          padding:3px;
          background:blue;
          color:white;
          border-radius:4px;
        " index=${index} seen=1>
        Yes</span>
        <span   style="
          width:100%;
          display:block;
          text-align:center;
          cursor:pointer;
          margin:4px 2px 0 2px;
          padding:3px;
          background:rgb(105, 29, 29);
          color:white;
          border-radius:4px;
        "  index=${index} seen=0>No</span>
      <spand
        class="bo"
        style="
          width:100%;
          display:block;
          text-align:center;
          cursor:pointer;
          margin:4px 2px 0 2px;
          padding:3px;
          background:red;
          color:white;
          border-radius:4px;
        "
      >
        Delete
      </spand>
    </div>
  `)
function sent(s){
  alert(s)
}
  marker.on('click', () => {
    const markerIndex = markers.value.indexOf(marker)

    if (markerIndex !== -1) {
      dlts(points.value[markerIndex].score)
    }
  })

  marker.on('popupopen', (e) => {
    const popupEl = e.popup.getElement()

  if (!popupEl) {
  return;
}

const btn2 = popupEl.querySelectorAll("span");

btn2.forEach((item) => {
  item.addEventListener("click", async (event) => {
    const target = event.currentTarget;

    const index = target.getAttribute("index");
    const activity = target.getAttribute("seen");

    try {
      const response = await axios.post(
        "https://frogoback.onrender.com/occ",
        {
          lat: points.value[index].lat,
          lon: points.value[index].lon,
          occ: Number(activity)
        }
      );

      console.log(response.data);
      alert("Poslato!");
    } catch (err) {
      console.error("Greška pri slanju:", err);
    }
  });
});


    btn?.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()

      const markerIndex = markers.value.indexOf(marker)

      if (markerIndex !== -1) {
        cls(markerIndex)
      }
    })
  })

  return marker
}

/* --------------------------------------------------
   ADD POINT
-------------------------------------------------- */

async function addPoint(latitude, longitude) {

  /* Check maximum of 10 markers */
  if (markers.value.length >= 10) {
    return
  }

  /* Check if this location already exists */
  const existingIndex = findExistingPoint(
    latitude,
    longitude
  )

  if (existingIndex !== -1) {
    goToExistingPoint(existingIndex)
    return
  }

  /* Update current coordinates */
  lat.value = latitude
  lon.value = longitude

  /* Get frog prediction */
  const result = await getdata(
    latitude,
    longitude
  )

  if (!result) {
    alert('Error on server. Try again later.')
    return
  }

  /*
    Backend can return either:
    { score: 0.83 }
    or directly a number.
  */

  let score

  if (typeof result === 'number') {
    score = result
  } else if (result.score !== undefined) {
    score = Number(result.score)
  } else {
    score = 0
  }

  /* Add point */
  points.value.push({
    lat: latitude,
    lon: longitude,
    score: score
  })

  const pointIndex = points.value.length - 1

  /* Create marker */
  const marker = createFrogMarker(
    latitude,
    longitude,
    pointIndex
  )

  markers.value.push(marker)

  /* Show score */
  dlts(score)

  /* Zoom */
  mapInstance.flyTo(
    [latitude, longitude],
    14,
    {
      animate: true,
      duration: 1
    }
  )
}

/* --------------------------------------------------
   MY LOCATION
-------------------------------------------------- */

function het() {
  emit('trigger-my-location')

  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.')
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {

      const userLat = position.coords.latitude
      const userLon = position.coords.longitude

      const existingIndex = findExistingPoint(
        userLat,
        userLon
      )

      /*
        If location already exists:
        don't call API and don't create marker.
        Just go to existing result.
      */
      if (existingIndex !== -1) {
        goToExistingPoint(existingIndex)
        return
      }

      await addPoint(
        userLat,
        userLon
      )
    },

    (error) => {
      console.log('Geolocation error:', error)

      alert(
        'Could not get your location. Please allow location access.'
      )
    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  )
}

/* --------------------------------------------------
   CUSTOM LOCATION
-------------------------------------------------- */
const waitingForCustomLocation = ref(false)
function hit() {
    waitingForCustomLocation.value = true
  emit('open-custom-location')

 
}

/* --------------------------------------------------
   SIDEBAR POINT CLICK
-------------------------------------------------- */

function frog(latitude, longitude, index) {
  lat.value = latitude
  lon.value = longitude

  currentDensity.value =
    Number(points.value[index].score) * 100

  mapInstance.flyTo(
    [latitude, longitude],
    14,
    {
      duration: 1
    }
  )

  markers.value[index]?.openPopup()
}

/* --------------------------------------------------
   DELETE POINT
-------------------------------------------------- */

function cls(index) {
  if (
    index < 0 ||
    index >= markers.value.length
  ) {
    return
  }

  const marker = markers.value[index]

  if (mapInstance && marker) {
    mapInstance.removeLayer(marker)
  }

  markers.value.splice(index, 1)
  points.value.splice(index, 1)

  console.log('Remove ' + index)

  if (points.value.length === 0) {
    currentDensity.value = -1
  } else {
    const lastPoint =
      points.value[points.value.length - 1]

    dlts(lastPoint.score)
  }
}

/* --------------------------------------------------
   UPDATE DENSITY
-------------------------------------------------- */

function dlts(score) {
  const numericScore = Number(score)

  if (!Number.isFinite(numericScore)) {
    currentDensity.value = -1
    return
  }

  currentDensity.value = numericScore * 100
}

/* --------------------------------------------------
   INITIALIZE MAP
-------------------------------------------------- */

const initMap = () => {
  if (!mapContainer.value) {
    return
  }

  mapInstance = L.map(
    mapContainer.value,
    {
      zoomControl: false
    }
  ).setView(
    [
      props.activeCenter.lat,
      props.activeCenter.lng
    ],
    props.activeCenter.zoom
  )

  /* Dark Map Tiles (CartoDB Dark Matter) */
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; OpenStreetMap contributors &copy; CARTO',

      subdomains: 'abcd',

      maxZoom: 19
    }
  ).addTo(mapInstance)

  /* Zoom control top right */
  L.control.zoom({
    position: 'topright'
  }).addTo(mapInstance)

  /* Add markers layer */
  markersLayer = L.layerGroup()
    .addTo(mapInstance)
}

/* --------------------------------------------------
   MAP CLICK
-------------------------------------------------- */

onMounted(() => {
  initMap()

  if (!mapInstance) {
    return
  }

  mapInstance.on('click', async (e) => {

    await addPoint(
      e.latlng.lat,
      e.latlng.lng
    )
  })
})

/* --------------------------------------------------
   WATCH ACTIVE CENTER
-------------------------------------------------- */

watch(
  () => props.activeCenter,

  async (newCenter) => {
    if (!mapInstance || !newCenter) {
      return
    }

    const newLat = Number(newCenter.lat)
    const newLng = Number(newCenter.lng)
    const newZoom = Number(newCenter.zoom) || 8

    if (
      !Number.isFinite(newLat) ||
      !Number.isFinite(newLng)
    ) {
      console.warn(
        'Invalid activeCenter:',
        newCenter
      )

      return
    }

    if (
      newLat < -90 ||
      newLat > 90 ||
      newLng < -180 ||
      newLng > 180
    ) {
      console.warn(
        'Coordinates out of range:',
        newCenter
      )

      return
    }

    lat.value = newLat
    lon.value = newLng

    /*
      Ako je promena activeCenter došla
      zbog Custom Location dugmeta,
      dodaj marker za novu lokaciju.
    */
    if (waitingForCustomLocation.value) {

      waitingForCustomLocation.value = false

      const existingIndex = findExistingPoint(
        newLat,
        newLng
      )

      if (existingIndex !== -1) {
        goToExistingPoint(existingIndex)
        return
      }

      await addPoint(
        newLat,
        newLng
      )

      return
    }

    /*
      Normalna promena activeCenter-a:
      samo pomeri mapu.
    */
    mapInstance.flyTo(
      [newLat, newLng],
      newZoom,
      {
        duration: 1.5
      }
    )
  },

  {
    deep: true
  }
)
const joj = computed(()=> {
  return markers.value.length==10 ? true : false
})
</script>

<style scoped>
.bo:hover {
  background: rgb(204, 38, 38);
  color: red;
  z-index: 999999;
}

.map-section-wrapper {
  padding: 5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 9999px;
  color: var(--emerald-accent);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 2.2rem;
  line-height: 1.2;
}

.section-subtitle {
  color: #9ca3af;
  font-size: 1rem;
  margin-top: 0.25rem;
}

.location-highlight {
  color: var(--emerald-accent);
}

.map-controls-top {
  display: flex;
  gap: 0.75rem;
}

.quick-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.quick-btn.blue {
  background: var(--primary-blue);
  color: #ffffff;
}

.quick-btn.blue:hover {
  background: var(--primary-blue-hover);
}

.quick-btn.amber {
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid var(--contrast-amber);
  color: #ffffff;
}

.quick-btn.amber:hover {
  background: var(--contrast-amber);
  color: #000000;
}

.map-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 1.5rem;
}

.map-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.map-floating-overlay {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 999;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.live-tag,
.coord-tag {
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #ffffff;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.live-dot {
  width: 6px;
  height: 6px;
  background-color: var(--emerald-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--emerald-accent);
}

.map-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-box {
  background: rgba(17, 24, 39, 0.7);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 1.2rem;
  backdrop-filter: blur(10px);
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.box-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
}

.density-val {
  font-size: 1.4rem;
  font-weight: 800;
}

.density-bar-bg {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.density-bar-fill {
  height: 100%;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.density-text {
  font-size: 0.78rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.stats-mini-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.mini-stat {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.6rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.7rem;
  color: #9ca3af;
}

.stat-num {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
}

.species-mini-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.75rem;
  overflow-y: auto;
  max-height: 200px;
  overflow-x: hidden;
}

.species-mini-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
}
.r{
  background: rgb(216, 71, 71);
}
.species-mini-item .close {
  position: absolute;
  top: 7px;
  right: -999px;
  border-radius: 2px;
  background: red;
  color: white;
  transition: all 0.4s;
  width: 25px;
  height: 25px;
  text-align: center;
  z-index: 9999;
}

.species-mini-item:hover .close {
  right: 5px;
}

.species-mini-item:hover {
  box-shadow:
    0 4px 8px 0 rgba(9, 209, 182, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.mini-icon {
  font-size: 1.1rem;
}

.mini-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mini-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
}

.mini-habitat {
  font-size: 0.7rem;
  color: #6b7280;
}

.mini-rate {
  font-size: 0.72rem;
  color: var(--emerald-accent);
  font-weight: 700;
}

@media (max-width: 992px) {
  .map-grid {
    grid-template-columns: 1fr;
  }
}
</style>