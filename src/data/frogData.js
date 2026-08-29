export const HOTSPOT_LOCATIONS = [
  {
    id: 'amazon',
    name: 'Amazon Cloud Forest',
    country: 'Brazil / Peru',
    lat: -3.4653,
    lng: -62.2159,
    zoom: 7,
    densityIndex: 96,
    activeSpeciesCount: 48,
    dominantSpecies: 'Poison Dart Frog',
    description: 'High biodiversity zone with dense rainforest canopy, ideal breeding humidity, and 45+ recorded species.'
  },
  {
    id: 'costa_rica',
    name: 'Monteverde Reserve',
    country: 'Costa Rica',
    lat: 10.3157,
    lng: -84.7963,
    zoom: 9,
    densityIndex: 92,
    activeSpeciesCount: 34,
    dominantSpecies: 'Red-Eyed Tree Frog',
    description: 'Famous cloud forest ecosystem hosting iconic Agalychnis callidryas and glass frog populations.'
  },
  {
    id: 'danube_delta',
    name: 'Danube Delta Wetlands',
    country: 'Romania / Europe',
    lat: 45.1667,
    lng: 29.6500,
    zoom: 8,
    densityIndex: 84,
    activeSpeciesCount: 18,
    dominantSpecies: 'European Tree Frog',
    description: 'UNESCO protected wetland delta with high seasonal breeding calls and marshland frog sanctuaries.'
  },
  {
    id: 'borneo',
    name: 'Kinabalu Rainforest',
    country: 'Malaysia / Borneo',
    lat: 6.0753,
    lng: 116.5594,
    zoom: 8,
    densityIndex: 89,
    activeSpeciesCount: 29,
    dominantSpecies: 'Bornean Horned Frog',
    description: 'Montane primary rainforest with endemic micro-hylid frogs and pristine mountain stream habitats.'
  },
  {
    id: 'everglades',
    name: 'Everglades National Park',
    country: 'USA (Florida)',
    lat: 25.2866,
    lng: -80.8987,
    zoom: 8,
    densityIndex: 79,
    activeSpeciesCount: 22,
    dominantSpecies: 'Green Tree Frog',
    description: 'Subtropical wetland marsh with widespread tree frog calls, green bullfrogs, and chorus frogs.'
  },
  {
    id: 'madagascar',
    name: 'Masoala National Park',
    country: 'Madagascar',
    lat: -15.7000,
    lng: 50.2167,
    zoom: 8,
    densityIndex: 94,
    activeSpeciesCount: 41,
    dominantSpecies: 'Golden Mantella',
    description: 'Isolated tropical biome home to bright endemic Mantella species and tiny micro-endemics.'
  }
];

export const FROG_SPECIES = [
  {
    id: 'red_eyed_tree',
    name: 'Red-Eyed Tree Frog',
    scientificName: 'Agalychnis callidryas',
    family: 'Hylidae',
    status: 'Least Concern',
    presenceRate: 'High (88%)',
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80',
    habitat: 'Neotropical Rainforest Canopy',
    color: '#10b981',
    audioFreq: '2.4 kHz (Ribbit-chack)',
    description: 'Vibrant green arboreal frog with striking scarlet eyes, blue-flanked sides, and webbed orange feet.'
  },
  {
    id: 'poison_dart',
    name: 'Dyeing Poison Dart Frog',
    scientificName: 'Dendrobates tinctorius',
    family: 'Dendrobatidae',
    status: 'Vulnerable',
    presenceRate: 'Moderate (64%)',
    image: 'https://images.unsplash.com/photo-1579380656108-f98e4df8ea97?auto=format&fit=crop&w=600&q=80',
    habitat: 'Primary Lowland Rain Forest Floor',
    color: '#06b6d4',
    audioFreq: '3.1 kHz (Trilling chirp)',
    description: 'Aposematic warning coloration of bright cobalt blue and yellow stripes, diurnal hunter.'
  },
  {
    id: 'european_tree',
    name: 'European Tree Frog',
    scientificName: 'Hyla arborea',
    family: 'Hylidae',
    status: 'Protected',
    presenceRate: 'High (82%)',
    image: 'https://images.unsplash.com/photo-1596706938361-b4f0b2f5bf77?auto=format&fit=crop&w=600&q=80',
    habitat: 'Deciduous Meadows & Ponds',
    color: '#84cc16',
    audioFreq: '1.9 kHz (Krek-krek-krek)',
    description: 'Small smooth leaf-green frog with a distinctive dark lateral stripe from nostril to hip.'
  },
  {
    id: 'golden_mantella',
    name: 'Golden Mantella',
    scientificName: 'Mantella aurantiaca',
    family: 'Mantellidae',
    status: 'Critically Endangered',
    presenceRate: 'Localized (35%)',
    image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80',
    habitat: 'Damp Pandanus Forests',
    color: '#f59e0b',
    audioFreq: '4.0 kHz (Click-click)',
    description: 'Uniform bright orange to golden yellow dwarf frog endemic to east-central Madagascar.'
  },
  {
    id: 'amazon_milk',
    name: 'Amazon Milk Frog',
    scientificName: 'Trachycephalus resinifictrix',
    family: 'Hylidae',
    status: 'Least Concern',
    presenceRate: 'High (79%)',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&q=80',
    habitat: 'High Tree Cavities & Water Holes',
    color: '#3b82f6',
    audioFreq: '1.2 kHz (Deep Croak)',
    description: 'Large canopy tree frog featuring greyish-blue and black banding with golden cross-shaped pupils.'
  }
];

export const MAP_PINS = [
  { id: 1, lat: 10.3157, lng: -84.7963, title: 'Monteverde Cloud Forest', count: 142, density: 'Very High', species: 'Red-Eyed Tree Frog' },
  { id: 2, lat: -3.4653, lng: -62.2159, title: 'Manaus Reserve', count: 320, density: 'Extreme', species: 'Poison Dart Frog' },
  { id: 3, lat: 45.1667, lng: 29.6500, title: 'Sfântu Gheorghe Marsh', count: 98, density: 'High', species: 'European Tree Frog' },
  { id: 4, lat: 6.0753, lng: 116.5594, title: 'Mount Kinabalu Base', count: 185, density: 'High', species: 'Bornean Horned Frog' },
  { id: 5, lat: 25.2866, lng: -80.8987, title: 'Shark Valley Basin', count: 110, density: 'Moderate', species: 'Green Tree Frog' },
  { id: 6, lat: -15.7000, lng: 50.2167, title: 'Masoala Coast', count: 215, density: 'Very High', species: 'Golden Mantella' },
  { id: 7, lat: -27.4698, lng: 153.0251, title: 'Brisbane Wetlands', count: 76, density: 'Moderate', species: 'Green Reed Frog' },
  { id: 8, lat: 46.2044, lng: 6.1432, title: 'Lake Geneva Reeds', count: 54, density: 'Low', species: 'Common Toad' },
  { id: 9, lat: -1.2921, lng: 36.8219, title: 'Nairobi River Basin', count: 88, density: 'Moderate', species: 'African Reed Frog' },
  { id: 10, lat: 35.6762, lng: 139.6503, title: 'Saitama Paddy Fields', count: 130, density: 'High', species: 'Japanese Tree Frog' }
];
