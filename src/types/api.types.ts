// Tipos básicos para conectar con el backend
// Estos tipos le dicen a TypeScript qué estructura tienen los datos

// Un NEO (Near Earth Object) es un asteroide que se acerca a la Tierra
export interface NEO {
  neo_id: string;                // ID del NEO (string, no number)
  name: string;
  diameter_min_m: number | null; // Diámetro mínimo en metros
  diameter_max_m: number | null; // Diámetro máximo en metros
  is_potentially_hazardous: boolean;  // ¿Es peligroso?
  
  // Datos del backend real
  close_approach_date: string | null;  // Fecha de acercamiento
  miss_distance_km: number | null;     // Distancia de aproximación
  velocity_km_s: number | null;        // Velocidad en km/s
  risk_score: number | null;           // Puntuación de riesgo
  risk_category: string | null;        // Categoría de riesgo
  impact_energy_mt: number | null;     // Energía de impacto en megatones
  crater_diameter_km: number | null;   // Diámetro del cráter en km
  damage_radius_km: number | null;     // Radio de daño en km
  
  // Datos adicionales para el modal (calculados)
  composition_estimate?: string;  // Composición estimada
  image_url?: string;            // URL de la imagen
  next_approach?: string;        // Próximo acercamiento
  impact_probability?: number;   // Probabilidad de impacto
}

// Respuesta cuando pedimos una lista de NEOs
export interface NEOResponse {
  neos: NEO[];           // Lista de asteroides
  // Nota: El backend actual no devuelve pagination, solo neos
}

// Propiedades físicas para analizar un asteroide
export interface PhysicalProperties {
  diameter_m: number;    // Diámetro en metros
  mass_kg?: number;      // Masa en kilogramos (opcional)
  density_kg_m3?: number; // Densidad (opcional)
}

// Resultado del análisis de un asteroide
export interface AnalysisResult {
  neo_id: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  probability: number;   // Probabilidad de impacto (0-1)
  confidence: number;    // Confianza del análisis (0-1)
  recommendations: string[];  // Recomendaciones
}

// Estado del sistema del backend
export interface SystemStatus {
  status: 'healthy' | 'unhealthy';
  total_neos: number;
  hazardous_count: number;
  last_update: string;
}
