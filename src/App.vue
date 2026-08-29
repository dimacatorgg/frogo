<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import FrogMap from './components/FrogMap.vue'
import StatsBanner from './components/StatsBanner.vue'
import SpeciesCatalog from './components/SpeciesCatalog.vue'
import LocationModal from './components/LocationModal.vue'
import FooterSection from './components/FooterSection.vue'
import Sigin from './components/sigin.vue'
import { HOTSPOT_LOCATIONS, FROG_SPECIES, MAP_PINS } from './data/frogData.js'
import alert from './components/alert.vue'
import Cookies from 'js-cookie'
const register = Cookies.get("id") ? true : false
const router = useRouter()
function helo(){

}
const activeLocationName = ref('Monteverde Reserve, Costa Rica')
const activeCenter = ref({ lat: 10.3157, lng: -84.7963, zoom: 9 })
const isLocating = ref(false)
const isModalOpen = ref(false)

// Handle "My location" button click
const handleMyLocation = () => {
  isLocating.value = true
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        isLocating.value = false
        activeCenter.value = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          zoom: 11
        }
        activeLocationName.value = `My Current GPS Location (${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°)`
        scrollToMap()
      },
      (err) => {
        isLocating.value = false
        // Geolocation fallback demo location
        activeCenter.value = { lat: 45.1667, lng: 29.6500, zoom: 9 }
        activeLocationName.value = 'Danube Delta Sanctuary (GPS Fallback)'
        scrollToMap()
      },
      { timeout: 8000 }
    )
  } else {
    isLocating.value = false
    activeCenter.value = { lat: 45.1667, lng: 29.6500, zoom: 9 }
    activeLocationName.value = 'Danube Delta Sanctuary (GPS Fallback)'
    scrollToMap()
  }
}

// Handle selection of custom location or hotspot
const handleSelectLocation = (location) => {
  isModalOpen.value = false
  activeLocationName.value = location.name
  console.log(location.name[2])
  activeCenter.value = {
    lat: location.lat,
    lng: location.lng,
    zoom: location.zoom || 9
  }
  scrollToMap()
}

// Handle Search Query input from search bar
const handleSearchQuery = (query) => {
  activeLocationName.value = query
  // Match query with hotspots or center
  const matched = HOTSPOT_LOCATIONS.find(spot => 
    spot.name.toLowerCase().includes(query.toLowerCase()) || 
    spot.country.toLowerCase().includes(query.toLowerCase())
  )
  if (matched) {
    activeCenter.value = { lat: matched.lat, lng: matched.lng, zoom: matched.zoom }
  } else {
    activeCenter.value = { lat: -3.4653, lng: -62.2159, zoom: 8 }
  }
  scrollToMap()
}

const scrollToMap = () => {
  const mapElem = document.getElementById('map-section')
  if (mapElem) {
    mapElem.scrollIntoView({ behavior: 'smooth' })
  }
}
const login = ref(false);
</script>
<template>
 
  <div class="app-root">
    <!-- Navbar Header -->
    <Navbar @sigin='login=true' cookie='register'/>

    <!-- Hero Section with Dark World Map background -->
    <HeroSection 
      :is-locating="isLocating"
      :quick-spots="HOTSPOT_LOCATIONS"
      @trigger-my-location="handleMyLocation"
      @open-custom-location="isModalOpen = true"
      @select-hotspot="handleSelectLocation"
      @search-location="handleSearchQuery"
    />
   <alert></alert>
    <!-- Interactive Leaflet Frog Presence Map Section -->
    <FrogMap 
      :active-location-name="activeLocationName"
      :active-center="activeCenter"
      :pins="MAP_PINS"
      :species-list="FROG_SPECIES"
      @trigger-my-location="handleMyLocation"
      @open-custom-location="isModalOpen = true"
    />

    <!-- Live Metrics Banner -->
    <StatsBanner />

    <!-- Species Catalog & Acoustics -->


    <!-- Custom Location Selection Modal -->
    <LocationModal 
      :is-open="isModalOpen"
      :hotspots="HOTSPOT_LOCATIONS"
      @close="isModalOpen = false"
      @select-location="handleSelectLocation"
    />

    <!-- Footer -->
    <FooterSection />
     <Sigin @prvi="login=false" v-if="login"></Sigin>
    <div v-else></div>
  </div>
</template>



<style scoped>
.app-root {
  min-height: 100vh;
  background-color: var(--bg-dark);
  color: var(--text-main);
  position: relative;
}
</style>
