// Servicio para obtener datos adicionales de la NASA API
const NASA_API_KEY = 'DEMO_KEY'; // Puedes obtener una clave real en https://api.nasa.gov/

export const nasaApiService = {
  // Obtener datos detallados de un NEO por su ID de la NASA
  async getNEODetails(neoId: string) {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${NASA_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de la NASA');
      }
      
      const data = await response.json();
      return this.transformNASAData(data);
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      return null;
    }
  },

  // Transformar datos de la NASA a nuestro formato
  transformNASAData(nasaData: any) {
    const closeApproach = nasaData.close_approach_data?.[0];
    
    return {
      id: nasaData.neo_reference_id,
      name: nasaData.name,
      diameter_min_m: nasaData.estimated_diameter?.meters?.estimated_diameter_min || 0,
      diameter_max_m: nasaData.estimated_diameter?.meters?.estimated_diameter_max || 0,
      is_potentially_hazardous: nasaData.is_potentially_hazardous_asteroid,
      close_approach_date: closeApproach?.close_approach_date,
      relative_velocity_km_per_sec: parseFloat(closeApproach?.relative_velocity?.kilometers_per_second || '0'),
      miss_distance_km: parseFloat(closeApproach?.miss_distance?.kilometers || '0'),
      orbital_period_days: nasaData.orbital_data?.orbital_period_days,
      composition_estimate: this.estimateComposition(nasaData.absolute_magnitude_h),
      image_url: this.getAsteroidImage(nasaData.neo_reference_id),
      next_approach: closeApproach?.close_approach_date,
      impact_probability: this.calculateImpactProbability(nasaData)
    };
  },

  // Estimar composición basada en magnitud absoluta
  estimateComposition(absoluteMagnitude: number) {
    if (absoluteMagnitude < 16) return 'Metálico (Hierro-Níquel)';
    if (absoluteMagnitude < 18) return 'Mixto (Roca-Metal)';
    if (absoluteMagnitude < 20) return 'Rocoso (Silicatos)';
    return 'Carbonáceo (C-Chondrites)';
  },

  // Obtener imagen del asteroide (usando un generador de imágenes o placeholder)
  getAsteroidImage(neoId: string) {
    // Por ahora usamos un placeholder, pero podrías usar:
    // - NASA's Image Gallery
    // - Generador de imágenes basado en características
    // - Base de datos de imágenes de asteroides
    return `https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Asteroid+${neoId}`;
  },

  // Calcular probabilidad de impacto (simplificado)
  calculateImpactProbability(neoData: any) {
    const isHazardous = neoData.is_potentially_hazardous_asteroid;
    const magnitude = neoData.absolute_magnitude_h;
    
    if (!isHazardous) return 0;
    if (magnitude < 16) return 0.001; // Muy baja
    if (magnitude < 18) return 0.0001; // Extremadamente baja
    return 0.00001; // Prácticamente cero
  }
};
