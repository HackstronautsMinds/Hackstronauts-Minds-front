import { NEO } from '../types/api.types';

// Datos mock de NEOs para desarrollo y testing
export const mockNEOs: NEO[] = [
  {
    neo_id: "2001862",
    name: "Apollo",
    close_approach_date: "2024-02-20",
    miss_distance_km: 0.05,
    diameter_min_m: 150,
    diameter_max_m: 200,
    velocity_km_s: 4.35,
    is_potentially_hazardous: true,
    risk_score: 0.8,
    risk_category: "Alto",
    impact_energy_mt: 15.2,
    crater_diameter_km: 2.1,
    damage_radius_km: 15.5,
    composition_estimate: "Metálico (Hierro-Níquel)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2025-03-15",
    impact_probability: 0.0001
  },
  {
    neo_id: "2000433",
    name: "Eros",
    close_approach_date: "2024-12-25",
    miss_distance_km: 0.2,
    diameter_min_m: 16000,
    diameter_max_m: 17000,
    velocity_km_s: 3.43,
    is_potentially_hazardous: false,
    risk_score: 0.2,
    risk_category: "Bajo",
    impact_energy_mt: 120.5,
    crater_diameter_km: 8.2,
    damage_radius_km: 45.0,
    composition_estimate: "Rocoso (Silicatos)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2025-01-10",
    impact_probability: 0.00001
  },
  {
    neo_id: "2000001",
    name: "Apophis",
    close_approach_date: "2029-04-13",
    miss_distance_km: 0.0003,
    diameter_min_m: 340,
    diameter_max_m: 400,
    velocity_km_s: 12.6,
    is_potentially_hazardous: true,
    risk_score: 0.9,
    risk_category: "Crítico",
    impact_energy_mt: 1200.0,
    crater_diameter_km: 12.5,
    damage_radius_km: 75.0,
    composition_estimate: "Mixto (Roca-Metal)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2029-04-13",
    impact_probability: 0.0003
  },
  {
    neo_id: "2000002",
    name: "Bennu",
    close_approach_date: "2135-09-22",
    miss_distance_km: 0.0008,
    diameter_min_m: 450,
    diameter_max_m: 530,
    velocity_km_s: 4.2,
    is_potentially_hazardous: true,
    risk_score: 0.7,
    risk_category: "Moderado",
    impact_energy_mt: 800.0,
    crater_diameter_km: 10.2,
    damage_radius_km: 60.0,
    composition_estimate: "Rocoso (Silicatos)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2135-09-22",
    impact_probability: 0.0001
  },
  {
    neo_id: "2000003",
    name: "2004 MN4",
    close_approach_date: "2024-06-15",
    miss_distance_km: 0.001,
    diameter_min_m: 250,
    diameter_max_m: 300,
    velocity_km_s: 8.5,
    is_potentially_hazardous: true,
    risk_score: 0.6,
    risk_category: "Moderado",
    impact_energy_mt: 450.0,
    crater_diameter_km: 7.8,
    damage_radius_km: 40.0,
    composition_estimate: "Metálico (Hierro-Níquel)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2024-06-15",
    impact_probability: 0.00005
  },
  {
    neo_id: "2000004",
    name: "2012 DA14",
    close_approach_date: "2024-08-20",
    miss_distance_km: 0.002,
    diameter_min_m: 180,
    diameter_max_m: 220,
    velocity_km_s: 6.8,
    is_potentially_hazardous: true,
    risk_score: 0.4,
    risk_category: "Bajo",
    impact_energy_mt: 280.0,
    crater_diameter_km: 6.2,
    damage_radius_km: 30.0,
    composition_estimate: "Mixto (Roca-Metal)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2024-08-20",
    impact_probability: 0.00002
  },
  {
    neo_id: "2000005",
    name: "2013 TV135",
    close_approach_date: "2032-08-26",
    miss_distance_km: 0.0005,
    diameter_min_m: 400,
    diameter_max_m: 450,
    velocity_km_s: 9.2,
    is_potentially_hazardous: true,
    risk_score: 0.8,
    risk_category: "Alto",
    impact_energy_mt: 950.0,
    crater_diameter_km: 11.8,
    damage_radius_km: 65.0,
    composition_estimate: "Rocoso (Silicatos)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2032-08-26",
    impact_probability: 0.0002
  },
  {
    neo_id: "2000006",
    name: "2014 JO25",
    close_approach_date: "2024-11-10",
    miss_distance_km: 0.0015,
    diameter_min_m: 300,
    diameter_max_m: 350,
    velocity_km_s: 7.5,
    is_potentially_hazardous: true,
    risk_score: 0.5,
    risk_category: "Moderado",
    impact_energy_mt: 380.0,
    crater_diameter_km: 8.5,
    damage_radius_km: 45.0,
    composition_estimate: "Metálico (Hierro-Níquel)",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    next_approach: "2024-11-10",
    impact_probability: 0.00008
  }
];

// Función para simular respuesta del backend
export const getMockNEOResponse = (page: number = 1, limit: number = 20) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNEOs = mockNEOs.slice(startIndex, endIndex);
  
  return {
    neos: paginatedNEOs,
    pagination: {
      page,
      limit,
      total: mockNEOs.length,
      pages: Math.ceil(mockNEOs.length / limit)
    }
  };
};

// Función para obtener un NEO específico por ID
export const getMockNEOById = (id: string): NEO | null => {
  return mockNEOs.find(neo => neo.neo_id === id) || null;
};
