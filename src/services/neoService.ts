const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;; 

export const nasaApiService = {
  // Obtener lista de NEOs de la NASA
  async getNEOsList(page = 0, size = 20) {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}&page=${page}&size=${size}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de la NASA');
      }
      
      const data = await response.json();
      return {
        neos: data.near_earth_objects.map(neo => this.transformNASAData(neo)),
        total: data.page.total_elements,
        page: data.page.number,
        size: data.page.size
      };
    } catch (error) {
      console.warn('NASA API limit reached, using mock data:', error.message);
      // Fallback to mock data if NASA API fails
      
      const { mockNEOs } = await import('../data/mockNEOData');
      return {
        neos: mockNEOs.slice(page * size, (page + 1) * size),
        total: mockNEOs.length,
        page,
        size
      };
    }
  },

  // Obtener detalles específicos de un NEO
  async getNEODetails(neoId: string) {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${NASA_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener detalles del NEO');
      }
      
      const data = await response.json();
      return this.transformNASAData(data);
    } catch (error) {
      console.warn('NASA API limit reached, using mock data for NEO details:', error.message);
      // Fallback to mock data
      const { mockNEOs } = await import('../data/mockNEOData');
      return mockNEOs.find(neo => neo.id === neoId) || null;
    }
  },

  // Transformar datos de la NASA para las tarjetas
  transformNASAData(nasaData: any) {
    const closeApproach = nasaData.close_approach_data?.[0];
    const diameter = nasaData.estimated_diameter?.meters;
    const avgDiameter = diameter ? (diameter.estimated_diameter_min + diameter.estimated_diameter_max) / 2 : 0;
    
    return {
      id: nasaData.id.toString(),
      name: nasaData.name.split('(')[0].trim(), // Limpiar nombre
      diameter_min_m: diameter?.estimated_diameter_min || 0,
      diameter_max_m: diameter?.estimated_diameter_max || 0,
      diameter: avgDiameter >= 1000 ? `${(avgDiameter/1000).toFixed(1)} km` : `${avgDiameter.toFixed(0)} m`,
      velocity: closeApproach?.relative_velocity?.kilometers_per_second ? 
        `${parseFloat(closeApproach.relative_velocity.kilometers_per_second).toFixed(1)} km/s` : 'N/A',
      density: this.estimateDensity(nasaData.absolute_magnitude_h),
      is_hazardous: nasaData.is_potentially_hazardous_asteroid,
      approach_date: closeApproach?.close_approach_date,
      miss_distance: closeApproach?.miss_distance?.kilometers ? 
        `${(parseFloat(closeApproach.miss_distance.kilometers)/1000).toFixed(1)}k km` : 'N/A',
      absolute_magnitude_h: nasaData.absolute_magnitude_h,
      orbital_data: nasaData.orbital_data,
      close_approach_data: nasaData.close_approach_data
    };
  },

  // Estimar densidad basada en magnitud absoluta
  estimateDensity(absoluteMagnitude: number) {
    if (absoluteMagnitude < 16) return '5000 kg/m³'; // Metálico
    if (absoluteMagnitude < 18) return '3000 kg/m³'; // Mixto
    if (absoluteMagnitude < 20) return '2500 kg/m³'; // Rocoso
    return '1500 kg/m³'; // Carbonáceo
  }
};

// Mantener compatibilidad con el código existente
export const neoService = nasaApiService;