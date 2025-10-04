import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Earth3DGlobe from '../3d/Earth3DGlobe';
import LeafletMapComponent from '../features/maps/LeafletMapComponent';
import { AsteroidLauncher } from './AsteroidLauncher';
import { useSimulation } from '../../contexts/SimulationContext';
import { AsteroidData } from '../../types/simulation.types';

interface IntegratedAsteroidSimulatorProps {
  onImpact?: (impactData: any) => void;
}

// Función para convertir lat/lng a coordenadas x/y del canvas
function latLngToXY(lat: number, lng: number): { x: number, y: number } {
  const x = (lng + 180) / 360 * 100; // 0–100%
  const y = (90 - lat) / 180 * 100;  // 0–100%
  return { x, y };
}

export default function IntegratedAsteroidSimulator({ 
  onImpact 
}: IntegratedAsteroidSimulatorProps) {
  const { selectedAsteroid, setImpactCoordinates, setSimulationStep } = useSimulation();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showAsteroidLauncher, setShowAsteroidLauncher] = useState(false);
  const [impactData, setImpactData] = useState<any>(null);
  const [mapClickPosition, setMapClickPosition] = useState<{ x: number; y: number } | undefined>(undefined);
  


  // Estados para la simulación de agentes
  const [simulationPhase, setSimulationPhase] = useState<'idle' | 'data_collecting' | 'orbital_calculating' | 'impact_analyzing' | 'mitigation_planning' | 'visualization_creating' | 'ml_predicting' | 'explaining' | 'completed'>('idle');
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  
  // Métricas en tiempo real
  const [liveMetrics, setLiveMetrics] = useState({
    energy: 0,
    craterSize: 0,
    affectedArea: 0,
    populationAtRisk: 0,
    infrastructureDamage: 0,
    mitigationTime: 0
  });

  // Generar trayectoria simulada basada en las métricas
  const generateTrajectory = (): Array<{ altitude: number; time: number }> => {
    const points: Array<{ altitude: number; time: number }> = [];
    const maxAltitude = 1000; // km
    const steps = 20;
    
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const altitude = maxAltitude * (1 - progress) + (Math.random() - 0.5) * 50;
      points.push({
        altitude: Math.max(0, altitude),
        time: progress * 100 // segundos
      });
    }
    return points;
  };

  const trajectory = generateTrajectory();

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    
    // Guardar coordenadas en el contexto
    setImpactCoordinates({ lat, lng });
    setSimulationStep('simulation');
    
    // Convertir lat/lng a coordenadas del mapa
    const mapCoords = latLngToXY(lat, lng);
    setMapClickPosition(mapCoords);
    
    // Automáticamente abrir el mapa después de un pequeño delay
    setTimeout(() => {
      setShowMap(true);
      setShowAsteroidLauncher(true);
    }, 1500);
  }, [setImpactCoordinates, setSimulationStep]);

  // Función para simular el trabajo de los agentes
  const startAgentSimulation = useCallback(() => {
    if (isSimulationRunning) return;
    
    setIsSimulationRunning(true);
    setSimulationPhase('data_collecting');
    setSimulationProgress(0);

    // Calcular métricas basadas en el asteroide seleccionado
    const baseEnergy = 100; // Valor fijo para simplificar
    const baseCrater = 50; // Valor fijo para simplificar
    const baseArea = Math.PI * Math.pow(baseCrater / 2, 2);
    
    // Simular progreso de los agentes con métricas dinámicas
    const phases = [
      { 
        phase: 'data_collecting' as const, 
        duration: 2000,
        metrics: { energy: baseEnergy, craterSize: baseCrater, affectedArea: baseArea }
      },
      { 
        phase: 'orbital_calculating' as const, 
        duration: 3000,
        metrics: { populationAtRisk: Math.floor(baseArea * 0.1) }
      },
      { 
        phase: 'impact_analyzing' as const, 
        duration: 2500,
        metrics: { infrastructureDamage: Math.floor(baseEnergy * 0.3) }
      },
      { 
        phase: 'mitigation_planning' as const, 
        duration: 2000,
        metrics: { mitigationTime: Math.floor(baseEnergy / 100) }
      },
      { 
        phase: 'visualization_creating' as const, 
        duration: 3000,
        metrics: { visualizationProgress: 100 }
      },
      { 
        phase: 'ml_predicting' as const, 
        duration: 2500,
        metrics: { predictionAccuracy: Math.floor(Math.random() * 20 + 80) }
      },
      { 
        phase: 'explaining' as const, 
        duration: 2000,
        metrics: { reportGenerated: true }
      },
      { 
        phase: 'completed' as const, 
        duration: 1000,
        metrics: {}
      }
    ];

    let currentPhaseIndex = 0;
    let progress = 0;

    const updateProgress = () => {
      if (currentPhaseIndex >= phases.length) {
        setIsSimulationRunning(false);
        return;
      }

      const currentPhaseData = phases[currentPhaseIndex];
      setSimulationPhase(currentPhaseData.phase);
      
      // Actualizar métricas para esta fase
      if (currentPhaseData.metrics) {
        setLiveMetrics(prev => ({ ...prev, ...currentPhaseData.metrics }));
      }
      
      const progressInterval = setInterval(() => {
        progress += 2;
        const totalProgress = Math.min(progress + (currentPhaseIndex * 100), 100);
        setSimulationProgress(totalProgress);
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          progress = 0;
          currentPhaseIndex++;
          setTimeout(updateProgress, 500);
        }
      }, currentPhaseData.duration / 50);
    };

    updateProgress();
  }, [isSimulationRunning]);

  const handleMapClick = useCallback((lat: number, lng: number, coords?: {x: number, y: number}) => {
    // Usar las coordenadas calculadas del clic o convertir lat/lng
    const mapCoords = coords || latLngToXY(lat, lng);
    
    setMapClickPosition(mapCoords);
    
    // Activar el lanzador de asteroides
    setShowAsteroidLauncher(true);
    
    // Iniciar simulación de agentes
    startAgentSimulation();
    
    // Simular impacto
    const mockImpact = {
      energy: Math.random() * 1000 + 100,
      craterSize: Math.random() * 500 + 50,
      location: { lat, lng },
      x: mapCoords.x,
      y: mapCoords.y
    };
    
    setImpactData(mockImpact);
    onImpact?.(mockImpact);
  }, [onImpact, startAgentSimulation]);

  const handleAsteroidImpact = useCallback((impact: any) => {
    setImpactData(impact);
    onImpact?.(impact);
  }, [onImpact]);

  const handleBackToGlobe = useCallback(() => {
    setShowMap(false);
    setShowAsteroidLauncher(false);
    setSelectedLocation(null);
    setImpactData(null);
    setMapClickPosition(undefined);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Simulador de Choque de Meteoritos
          </h1>
          <div className="flex gap-2">
            {showMap && (
              <button 
                onClick={handleBackToGlobe}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                ← Volver al Globo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `
      }} />

      {/* Contenido principal */}
      <div className="flex-1 flex" style={{ minHeight: '70vh' }}>
        <AnimatePresence mode="wait">
          {!showMap ? (
            // Vista del planeta 3D
            <motion.div
              key="globe"
              className="flex-1 relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Earth3DGlobe onLocationSelect={handleLocationSelect} />
            </motion.div>
          ) : (
            // Vista del simulador de asteroides
            <motion.div 
              key="simulator"
              className="flex-1 relative bg-gray-900 rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {/* Mapa de Leaflet */}
              {selectedLocation && (
                <div className="w-full h-full relative">
                  <LeafletMapComponent
                    latitude={selectedLocation.lat}
                    longitude={selectedLocation.lng}
                    zoom={8}
                    onMapClick={handleMapClick}
                    showAsteroidLauncher={true}
                  />
                  
                  {/* Instrucciones flotantes - Parte Superior */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 backdrop-blur-md text-white p-2 rounded-lg border-2 border-cyan-400/50 pointer-events-auto shadow-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="font-bold text-cyan-400 text-sm">INSTRUCCIONES</span>
                    </div>
                    <p className="text-xs mb-1 text-white">🖱️ Haz clic en el mapa para lanzar asteroide</p>
                    <p className="text-xs text-cyan-300">
                      📍 {selectedLocation.lat.toFixed(2)}°, {selectedLocation.lng.toFixed(2)}°
                    </p>
                  </div>

                  {/* Botón para volver al globo */}
                  <button
                    onClick={() => {
                      setShowMap(false);
                      setSelectedLocation(null);
                      setMapClickPosition(undefined);
                    }}
                    className="absolute top-4 right-4 z-50 bg-red-600/80 hover:bg-red-600 text-white p-3 rounded-lg backdrop-blur-sm transition-colors pointer-events-auto"
                  >
                    🌍 Volver al Globo
                  </button>

                </div>
              )}
              
              {/* Lanzador de Asteroides - Solo cuando el mapa esté visible */}
              {showMap && (
                <AsteroidLauncher
                  onMapClick={handleMapClick}
                  isVisible={showAsteroidLauncher}
                  mapClickPosition={mapClickPosition}
                  onPositionUsed={() => setMapClickPosition(undefined)}
                  asteroidMaterial="iron"
                />
              )}

            

              
              {/* Información del mapa */}
              <div className="absolute top-4 left-4 z-30">
                <div className="bg-blue-600/90 text-white p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-bold text-lg mb-2">Mapa de Impacto</h3>
                  <div className="space-y-2 text-sm">
                    <p>🖱️ Haz clic en el mapa para lanzar un asteroide</p>
                    <p>⚙️ Usa el panel de configuración para personalizar el asteroide</p>
                    {selectedLocation && (
                      <p className="text-blue-200">
                        📍 Ubicación: {selectedLocation.lat.toFixed(2)}°, {selectedLocation.lng.toFixed(2)}°
                      </p>
                    )}
                  </div>
                </div>
              </div>


              {/* Panel de resultados de impacto */}
              {impactData && (
                <div className="absolute bottom-4 right-4 z-30 max-w-md">
                  <div className="bg-red-600/90 text-white p-4 rounded-lg backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-2">💥 Impacto Detectado</h3>
                    <div className="space-y-1 text-sm">
                      <p>💥 Energía: {impactData.energy?.toFixed(0)} MT TNT</p>
                      <p>🕳️ Cráter: {Math.round(impactData.craterSize || 0)}m</p>
                      <p>🌍 Ubicación: {impactData.location?.lat?.toFixed(2)}°, {impactData.location?.lng?.toFixed(2)}°</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
