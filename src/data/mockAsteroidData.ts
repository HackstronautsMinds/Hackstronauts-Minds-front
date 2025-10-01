import { AsteroidData } from '../types/simulation.types';

// Datos mock de asteroides para probar el simulador
export const mockAsteroids: AsteroidData[] = [
  {
    id: '2000433',
    name: 'Eros',
    diameter: 16840, // metros
    velocity: 6.5, // km/s
    density: 2670, // kg/m³
    angle: 45, // grados
    mass: 6.69e15 // kg (calculado)
  },
  {
    id: '2000001',
    name: 'Apophis',
    diameter: 370, // metros
    velocity: 12.6, // km/s
    density: 2600, // kg/m³
    angle: 30, // grados
    mass: 2.7e10 // kg (calculado)
  },
  {
    id: '2000002',
    name: 'Bennu',
    diameter: 490, // metros
    velocity: 4.2, // km/s
    density: 1190, // kg/m³
    angle: 60, // grados
    mass: 7.3e10 // kg (calculado)
  }
];

// Función para simular llamada al backend
export const fetchAsteroidData = async (asteroidId: string): Promise<AsteroidData | null> => {
  // Simular delay del backend
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const asteroid = mockAsteroids.find(a => a.id === asteroidId);
  return asteroid || null;
};

// Función para simular cálculo de impacto
export const calculateImpactData = async (asteroid: AsteroidData): Promise<any> => {
  // Simular delay del backend
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Cálculos básicos de impacto
  const mass = asteroid.mass;
  const velocity = asteroid.velocity * 1000; // convertir a m/s
  const kineticEnergy = 0.5 * mass * velocity * velocity; // Joules
  const energyMT = kineticEnergy / (4.184e15); // convertir a MT TNT
  
  const craterDiameter = Math.pow(energyMT, 0.294) * 1000; // metros
  const affectedArea = Math.PI * Math.pow(craterDiameter / 2000, 2); // km²
  
  return {
    energy: Math.round(energyMT),
    craterDiameter: Math.round(craterDiameter),
    affectedArea: Math.round(affectedArea),
    probability: Math.random() * 0.3, // 0-30%
    timeToImpact: Math.random() * 100 + 10 // 10-110 días
  };
};
