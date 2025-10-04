import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AsteroidData, ImpactData, SimulationState, LiveMetrics, TrajectoryPoint } from '../../types/simulation.types';
import IntegratedAsteroidSimulator from './IntegratedAsteroidSimulator';
import { CurvedMonitorWall } from './CurvedMonitorWall';
import { MonitorAgentes } from '../monitoring/MonitorAgentes';
import { useSimulation } from '../../contexts/SimulationContext';

export default function AsteroidSimulatorSection() {
  const { selectedAsteroid: contextAsteroid, isSimulationActive } = useSimulation();
  const [simulationState, setSimulationState] = useState<SimulationState>({
    phase: 'idle',
    progress: 0,
    currentAgent: null,
    isRunning: false
  });

  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
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

  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);

  // Generar trayectoria aleatoria
  const generateTrajectory = (): TrajectoryPoint[] => {
    const points: TrajectoryPoint[] = [];
    const numPoints = 20;
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * 400;
      const y = 20 + Math.sin((i / numPoints) * Math.PI) * 30 + Math.random() * 10;
      const z = Math.random() * 10;
      const time = (i / numPoints) * 30; // 30 días máximo
      points.push({ x, y, z, time });
    }
    
    return points;
  };

  // Simular datos del backend
  const simulateBackendData = async () => {
    if (!contextAsteroid) return;
    
    // Generar trayectoria
    setTrajectory(generateTrajectory());
    
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLiveMetrics(prev => ({ ...prev, energyMT: 45, damageReduction: 35 }));
    
    // Simular mitigación (Dr. Mitigation)
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

  const handleStartSimulation = () => {
    if (contextAsteroid) {
      simulateBackendData();
    }
  };

  return (
    <section id="simulator-section" className="relative w-full min-h-screen overflow-hidden bg-black py-20">
      {/* Fondo negro sólido */}
      <div className="absolute inset-0 bg-black" />

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Controles de Simulación */}
        <div className="mb-8 text-center">
          {contextAsteroid ? (
            <button
              onClick={handleStartSimulation}
              disabled={simulationState.isRunning}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                simulationState.isRunning
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-105'
              }`}
            >
              {simulationState.isRunning ? '🔄 Simulando...' : '🚀 Iniciar Simulación'}
            </button>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">🌍 Simulador de Impacto de Asteroides</h2>
              <p className="text-gray-400 mb-6">Selecciona un asteroide de la lista superior para comenzar la simulación</p>
            </div>
          )}
        </div>

        {/* Panel Principal de Simulación - Siempre visible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel Izquierdo - Simulador 3D */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-6 col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">🌍 Simulador 3D</h2>
            <div className="w-full h-[80vh]">
              <IntegratedAsteroidSimulator 
                onImpact={(impactData) => {
                  console.log('Impact detected:', impactData);
                }}
              />
            </div>
          </div>
        </div>

        {/* Panel Principal de Métricas - Siempre visible */}
        <div className="mt-8">
          <CurvedMonitorWall 
            gaugeData={[
              { value: liveMetrics.energyMT || 0, unit: "MT", label: "ENERGY", color: "#ef4444" },
              { value: liveMetrics.distanceKm ? liveMetrics.distanceKm / 1000 : 0, unit: "K KM", label: "DISTANCE", color: "#f59e0b" },
              { value: liveMetrics.velocityKmh ? liveMetrics.velocityKmh / 1000 : 0, unit: "K KM/H", label: "VELOCITY", color: "#10b981" }
            ]}
            trajectoryData={[
              { x: 0, y: 180 },
              { x: 50, y: 160 },
              { x: 100, y: 120 },
              { x: 150, y: 80 },
              { x: 200, y: 60 },
              { x: 250, y: 40 },
              { x: 300, y: 30 },
              { x: 350, y: 25 },
              { x: 400, y: 20 }
            ]}
            levelData={[
              { label: "LASER ARRAY", value: Math.min(100, liveMetrics.energyMT * 10), maxValue: 100 },
              { label: "MISSILE PODS", value: Math.min(100, liveMetrics.impactProbability * 100), maxValue: 100 },
              { label: "SHIELD GEN", value: Math.min(100, 100 - (liveMetrics.impactProbability * 100)), maxValue: 100 },
              { label: "REACTOR CORE", value: Math.min(100, liveMetrics.velocityKmh / 100), maxValue: 100 },
              { label: "COMMUNICATIONS", value: 100, maxValue: 100 }
            ]}
            impactTime={`T-${Math.max(0, Math.floor(liveMetrics.distanceKm / 1000))}:00:00`}
            impactZone="IMPACT ZONE"
          />
        </div>

        {/* Sistema de Monitores de Agentes AI - Siempre visible */}
        <div className="mt-8 -mx-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">
              AI AGENTS WORKSTATION
            </h2>
            <p className="text-gray-400 text-sm">
              Real-time agent processing and analysis
            </p>
          </div>
          <MonitorAgentes />
        </div>

      </div>
    </section>
  );
}