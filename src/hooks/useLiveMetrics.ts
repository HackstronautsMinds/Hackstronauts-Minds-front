import { useState, useEffect, useCallback } from 'react';
import { useSimulation } from '../contexts/SimulationContext';

interface LiveMetrics {
  // Métricas orbitales
  trackingObjects: number;
  averageAltitude: number;
  currentAltitude: number;
  
  // Métricas de mitigación
  containmentProtocols: number;
  damageReduction: number;
  
  // Métricas de impacto
  collisionProbability: number;
  impactLocation: string;
  
  // Métricas de ML
  trainingIterations: number;
  modelAccuracy: number;
  
  // Métricas de datos
  patternRecognition: number;
  dataMiningActive: boolean;
  
  // Métricas de visualización
  renderedObjects: number;
  fps: number;
  
  // Métricas de explicación
  processedQueries: number;
  responseTime: number;
  
  // Métricas de amenaza (para los monitores)
  energyMT: number;
  distanceKm: number;
  velocityKmh: number;
  timeToImpact: number;
}

export const useLiveMetrics = () => {
  const { selectedAsteroid, impactCoordinates, isSimulationActive } = useSimulation();
  const [metrics, setMetrics] = useState<LiveMetrics>({
    trackingObjects: 0,
    averageAltitude: 0,
    currentAltitude: 0,
    containmentProtocols: 0,
    damageReduction: 0,
    collisionProbability: 0,
    impactLocation: 'N/A',
    trainingIterations: 0,
    modelAccuracy: 0,
    patternRecognition: 0,
    dataMiningActive: false,
    renderedObjects: 0,
    fps: 0,
    processedQueries: 0,
    responseTime: 0,
    energyMT: 0,
    distanceKm: 0,
    velocityKmh: 0,
    timeToImpact: 0
  });

  const updateMetrics = useCallback(() => {
    if (!selectedAsteroid) return;

    // Calcular métricas basadas en el asteroide seleccionado
    const diameter = parseFloat(selectedAsteroid.diameter?.replace(/[^\d.]/g, '') || '0');
    const velocity = parseFloat(selectedAsteroid.velocity?.replace(/[^\d.]/g, '') || '0');
    const isHazardous = selectedAsteroid.is_hazardous;

    // Métricas orbitales
    const trackingObjects = Math.floor(Math.random() * 50) + 20; // 20-70 objetos
    const averageAltitude = Math.floor(Math.random() * 1000) + 2000; // 2000-3000 km
    const currentAltitude = Math.floor(Math.random() * 500) + 300; // 300-800 km

    // Métricas de mitigación
    const containmentProtocols = Math.floor(Math.random() * 20) + 5; // 5-25 protocolos
    const damageReduction = Math.floor(Math.random() * 30) + 20; // 20-50% reducción

    // Métricas de impacto
    const collisionProbability = isHazardous ? 
      (Math.random() * 0.1 + 0.01) : // 0.01-0.11% para peligrosos
      (Math.random() * 0.01); // 0-0.01% para no peligrosos
    
    const impactLocation = impactCoordinates ? 
      `${impactCoordinates.lat.toFixed(2)}°, ${impactCoordinates.lng.toFixed(2)}°` : 
      'N/A';

    // Métricas de ML
    const trainingIterations = Math.floor(Math.random() * 2000) + 1000; // 1000-3000 iteraciones
    const modelAccuracy = Math.random() * 5 + 95; // 95-100% precisión

    // Métricas de datos
    const patternRecognition = Math.random() * 10 + 90; // 90-100% reconocimiento
    const dataMiningActive = Math.random() > 0.3; // 70% probabilidad de estar activo

    // Métricas de visualización
    const renderedObjects = Math.floor(Math.random() * 200) + 400; // 400-600 objetos
    const fps = Math.floor(Math.random() * 60) + 120; // 120-180 FPS

    // Métricas de explicación
    const processedQueries = Math.floor(Math.random() * 2000) + 4000; // 4000-6000 consultas
    const responseTime = Math.random() * 0.1 + 0.05; // 0.05-0.15s

    // Métricas de amenaza (para los monitores)
    const energyMT = diameter * velocity * 0.1; // Energía basada en diámetro y velocidad
    const distanceKm = averageAltitude; // Distancia = altitud promedio
    const velocityKmh = velocity * 3600; // Convertir km/s a km/h
    const timeToImpact = Math.floor(Math.random() * 30) + 10; // 10-40 segundos

    setMetrics({
      trackingObjects,
      averageAltitude,
      currentAltitude,
      containmentProtocols,
      damageReduction,
      collisionProbability,
      impactLocation,
      trainingIterations,
      modelAccuracy,
      patternRecognition,
      dataMiningActive,
      renderedObjects,
      fps,
      processedQueries,
      responseTime,
      energyMT,
      distanceKm,
      velocityKmh,
      timeToImpact
    });
  }, [selectedAsteroid, impactCoordinates]);

  // Actualizar métricas cada 2 segundos cuando la simulación está activa
  useEffect(() => {
    if (!isSimulationActive) return;

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, [isSimulationActive, updateMetrics]);

  // Actualizar métricas cuando cambia el asteroide
  useEffect(() => {
    if (selectedAsteroid) {
      updateMetrics();
    }
  }, [selectedAsteroid, updateMetrics]);

  return metrics;
};
