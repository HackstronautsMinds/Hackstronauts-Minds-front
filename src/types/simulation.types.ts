export interface AsteroidData {
  id: string;
  name: string;
  diameter: number; // metros
  velocity: number; // km/s
  density: number; // kg/m³
  angle: number; // grados
  mass: number; // kg (calculado)
}

export interface ImpactData {
  energy: number; // MT TNT
  craterDiameter: number; // metros
  affectedArea: number; // km²
  probability: number; // 0-1
  timeToImpact: number; // días
}

export interface TrajectoryPoint {
  x: number;
  y: number;
  z: number;
  time: number; // días desde ahora
}

export interface SimulationState {
  phase: 'idle' | 'data_collecting' | 'orbital_calculating' | 'impact_analyzing' | 'mitigation_planning' | 'completed';
  progress: number; // 0-100
  currentAgent: string | null;
  isRunning: boolean;
}

export interface LiveMetrics {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  impactProbability: number;
  energyMT: number;
  distanceKm: number;
  velocityKmh: number;
  timeToImpact: number;
}
