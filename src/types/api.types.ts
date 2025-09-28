// Tipos básicos para conectar con el backend
// Estos tipos le dicen a TypeScript qué estructura tienen los datos

// Un NEO (Near Earth Object) es un asteroide que se acerca a la Tierra
export interface NEO {
  id: number;
  name: string;
  diameter_min_m: number;        // Diámetro mínimo en metros
  diameter_max_m: number;        // Diámetro máximo en metros
  is_potentially_hazardous: boolean;  // ¿Es peligroso?
  
  // Datos adicionales para el modal
  close_approach_date?: string;  // Fecha de acercamiento
  relative_velocity_km_per_sec?: number;  // Velocidad relativa
  miss_distance_km?: number;     // Distancia de aproximación
  orbital_period_days?: number;  // Período orbital
  composition_estimate?: string;  // Composición estimada
  image_url?: string;            // URL de la imagen
  next_approach?: string;        // Próximo acercamiento
  impact_probability?: number;   // Probabilidad de impacto
}

// Respuesta cuando pedimos una lista de NEOs
export interface NEOResponse {
  neos: NEO[];           // Lista de asteroides
  total: number;         // Total de asteroides
  page: number;          // Página actual
  limit: number;         // Cuántos por página
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
