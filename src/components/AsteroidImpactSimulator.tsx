import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AsteroidData, ImpactData, SimulationState, LiveMetrics } from '../types/simulation.types';

interface AsteroidImpactSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAsteroid?: AsteroidData;
}

export default function AsteroidImpactSimulator({ 
  isOpen, 
  onClose, 
  selectedAsteroid 
}: AsteroidImpactSimulatorProps) {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    phase: 'idle',
    progress: 0,
    currentAgent: null,
    isRunning: false
  });

  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    riskLevel: 'low',
    impactProbability: 0,
    energyMT: 0,
    distanceKm: 0,
    velocityKmh: 0,
    timeToImpact: 0
  });

  // Simular datos del backend
  const simulateBackendData = async () => {
    setSimulationState(prev => ({ ...prev, isRunning: true, phase: 'data_collecting' }));
    
    // Simular recolección de datos (Dr. Data)
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLiveMetrics(prev => ({ ...prev, distanceKm: 150000, velocityKmh: 25000 }));
    
    // Simular cálculo orbital (Dra. Orbital)
    setSimulationState(prev => ({ ...prev, phase: 'orbital_calculating', progress: 30 }));
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLiveMetrics(prev => ({ ...prev, impactProbability: 0.15, timeToImpact: 45 }));
    
    // Simular análisis de impacto (Dr. Impact)
    setSimulationState(prev => ({ ...prev, phase: 'impact_analyzing', progress: 60 }));
    await new Promise(resolve => setTimeout(resolve, 4000));
    setLiveMetrics(prev => ({ 
      ...prev, 
      energyMT: 150, 
      riskLevel: 'high',
      impactProbability: 0.25 
    }));
    
    // Simular planificación de mitigación (Dra. Mitigation)
    setSimulationState(prev => ({ ...prev, phase: 'mitigation_planning', progress: 80 }));
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Completar simulación
    setSimulationState(prev => ({ 
      ...prev, 
      phase: 'completed', 
      progress: 100,
      isRunning: false 
    }));
  };

  useEffect(() => {
    if (isOpen && selectedAsteroid) {
      simulateBackendData();
    }
  }, [isOpen, selectedAsteroid]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-cyan-400/30 w-full max-w-7xl h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">🛡️ Asteroid Impact Simulator</h1>
                <p className="text-gray-300 mt-2">
                  Simulación en tiempo real • {selectedAsteroid?.name || 'Asteroide seleccionado'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="flex h-full">
            {/* Panel Izquierdo - Simulador 3D */}
            <div className="w-1/2 border-r border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">🌍 Simulador 3D</h2>
              <div className="bg-gray-800/50 rounded-lg h-96 flex items-center justify-center border border-gray-600">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <div className="text-gray-300">Simulador Three.js</div>
                  <div className="text-gray-400 text-sm">Integración pendiente</div>
                </div>
              </div>
            </div>

            {/* Panel Derecho - Métricas en Vivo */}
            <div className="w-1/2 p-6">
              <h2 className="text-xl font-bold text-white mb-4">📊 Métricas en Tiempo Real</h2>
              
              {/* Estado de la simulación */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    simulationState.isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                  }`} />
                  <span className="text-white font-bold">
                    {simulationState.phase === 'idle' && 'Inactivo'}
                    {simulationState.phase === 'data_collecting' && 'Recolectando datos...'}
                    {simulationState.phase === 'orbital_calculating' && 'Calculando órbita...'}
                    {simulationState.phase === 'impact_analyzing' && 'Analizando impacto...'}
                    {simulationState.phase === 'mitigation_planning' && 'Planificando mitigación...'}
                    {simulationState.phase === 'completed' && 'Simulación completada'}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${simulationState.progress}%` }}
                  />
                </div>
              </div>

              {/* Métricas principales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-400">
                    {liveMetrics.impactProbability * 100}%
                  </div>
                  <div className="text-gray-300 text-sm">Probabilidad de Impacto</div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-400">
                    {liveMetrics.energyMT} MT
                  </div>
                  <div className="text-gray-300 text-sm">Energía del Impacto</div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {liveMetrics.distanceKm.toLocaleString()} km
                  </div>
                  <div className="text-gray-300 text-sm">Distancia Actual</div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {liveMetrics.velocityKmh.toLocaleString()} km/h
                  </div>
                  <div className="text-gray-300 text-sm">Velocidad</div>
                </div>
              </div>

              {/* Nivel de riesgo */}
              <div className="mt-6">
                <div className="text-white font-bold mb-2">Nivel de Riesgo</div>
                <div className={`px-4 py-2 rounded-lg text-center font-bold ${
                  liveMetrics.riskLevel === 'low' ? 'bg-green-900 text-green-300' :
                  liveMetrics.riskLevel === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                  liveMetrics.riskLevel === 'high' ? 'bg-orange-900 text-orange-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {liveMetrics.riskLevel.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
