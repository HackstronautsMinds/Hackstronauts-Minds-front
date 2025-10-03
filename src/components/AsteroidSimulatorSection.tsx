import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AsteroidData, ImpactData, SimulationState, LiveMetrics, TrajectoryPoint } from '../types/simulation.types';
import IntegratedAsteroidSimulator from './IntegratedAsteroidSimulator';
import { CurvedMonitorWall } from './CurvedMonitorWall';
import { MonitorAgentes } from './MonitorAgentes';
import { useSimulation } from '../contexts/SimulationContext';

export default function AsteroidSimulatorSection() {
  const { selectedAsteroid: contextAsteroid, isSimulationActive } = useSimulation();
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

  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);

  // Generar trayectoria mock
  const generateTrajectory = (): TrajectoryPoint[] => {
    const points: TrajectoryPoint[] = [];
    const steps = 50;
    
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2;
      const radius = 200 - t * 100; // Se acerca a la Tierra
      
      points.push({
        x: Math.cos(angle) * radius,
        y: 0,
        z: Math.sin(angle) * radius,
        time: t * 100 // días
      });
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


  const handleStartSimulation = () => {
    if (contextAsteroid) {
      simulateBackendData();
    }
  };

  return (
    <section id="simulator-section" className="relative w-full min-h-screen overflow-hidden bg-black py-20">
      {/* Fondo negro sólido */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Fondo espacial con gradiente radial */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, #FF1B8D 0%, #8B2C7E 20%, #4A1B5C 40%, #2D4A5E 60%, transparent 80%, transparent 100%)'
        }}
      />

      {/* Estrellas de fondo */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: Math.random() > 0.5 ? '#FF1B8D' : '#00D4FF',
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
       


          {/* Controles de Simulación */}
          {contextAsteroid && (
          <div className="mb-8 text-center">
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
          </div>
        )}

        {/* Panel Principal de Simulación - Mostrar siempre si hay asteroide del contexto */}
        {contextAsteroid && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Panel Izquierdo - Simulador 3D */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-6 col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">🌍 Simulador 3D</h2>
              <div className="w-full h-[80vh]">
                <IntegratedAsteroidSimulator 
                  onImpact={(impactData) => {
                    console.log('Impact detected:', impactData);
                    // Aquí puedes manejar los datos del impacto
                  }}
                />
              </div>
            </div>

            {/* Panel Derecho - Sistema de Monitores de Control */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-6 col-span-2">
             
              
            

              {/* Sistema de Monitores */}
              <div className="w-full h-[60vh]">
                <CurvedMonitorWall
                  gaugeData={[
                    { 
                      value: Math.round(liveMetrics.energyMT), 
                      unit: "MT", 
                      label: "ENERGY", 
                      color: "#00ff88" 
                    },
                    { 
                      value: Math.round(liveMetrics.distanceKm / 1000), 
                      unit: "K KM", 
                      label: "DISTANCE", 
                      color: "#ff4444" 
                    },
                    { 
                      value: Math.round(liveMetrics.velocityKmh / 1000), 
                      unit: "K KM/H", 
                      label: "VELOCITY", 
                      color: "#ffaa00" 
                    }
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
            </div>
          </div>
        )}


        {/* Sistema de Monitores de Agentes AI */}
        {contextAsteroid && (
          <div className="mt-8 -mx-6">
            
            <MonitorAgentes />
          </div>
        )}

      </div>
    </section>
  );
}
