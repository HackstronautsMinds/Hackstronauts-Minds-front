import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AsteroidData, ImpactData, SimulationState, LiveMetrics, TrajectoryPoint } from '../types/simulation.types';
import { mockAsteroids, fetchAsteroidData, calculateImpactData } from '../data/mockAsteroidData';
import AgentStatusPanel from './AgentStatusPanel';
import IntegratedAsteroidSimulator from './IntegratedAsteroidSimulator';
import { CurvedMonitorWall } from './CurvedMonitorWall';
import { CinematicControlRoom } from './CinematicControlRoom';

export default function AsteroidSimulatorSection() {
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData | null>(null);
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
    if (!selectedAsteroid) return;
    
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

  const handleAsteroidSelect = (asteroid: AsteroidData) => {
    setSelectedAsteroid(asteroid);
    setSimulationState({
      phase: 'idle',
      progress: 0,
      currentAgent: null,
      isRunning: false
    });
    setLiveMetrics({
      riskLevel: 'low',
      impactProbability: 0,
      energyMT: 0,
      distanceKm: 0,
      velocityKmh: 0,
      timeToImpact: 0
    });
  };

  const handleStartSimulation = () => {
    if (selectedAsteroid) {
      simulateBackendData();
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black py-20">
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🛡️ Asteroid Impact Simulator
          </h1>
          <p className="text-xl text-gray-300">
            Simulación en tiempo real de impactos de asteroides
          </p>
        </div>

        {/* Selector de Asteroides */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Selecciona un Asteroide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockAsteroids.map((asteroid) => (
              <motion.div
                key={asteroid.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAsteroidSelect(asteroid)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedAsteroid?.id === asteroid.id
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-gray-600 bg-gray-800/50 hover:border-cyan-400/50'
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{asteroid.name}</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>ID: {asteroid.id}</div>
                  <div>Diámetro: {asteroid.diameter.toLocaleString()} m</div>
                  <div>Velocidad: {asteroid.velocity} km/s</div>
                  <div>Densidad: {asteroid.density} kg/m³</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controles de Simulación */}
        {selectedAsteroid && (
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

        {/* Panel Principal de Simulación */}
        {selectedAsteroid && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Panel Izquierdo - Simulador 3D */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-6 col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">🌍 Simulador 3D</h2>
              <div className="w-full h-[80vh]">
                <IntegratedAsteroidSimulator 
                  selectedAsteroid={selectedAsteroid}
                  onImpact={(impactData) => {
                    console.log('Impact detected:', impactData);
                    // Aquí puedes manejar los datos del impacto
                  }}
                />
              </div>
            </div>

            {/* Panel Derecho - Sistema de Monitores de Control */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-6 col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">🎛️ Mission Control - Meteorite Defense System</h2>
              
              {/* Estado de la simulación */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    simulationState.isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                  }`} />
                  <span className="text-white font-bold">
                    STATUS: {simulationState.isRunning ? 'OPERATIONAL' : 'STANDBY'}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${simulationState.progress}%` }}
                  />
                </div>
              </div>

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

        {/* Sala de Control Cinematográfica - Reemplaza el panel de agentes */}
        {selectedAsteroid && (
          <div className="mt-8 relative" style={{ position: 'relative' }}>
            <CinematicControlRoom 
              simulationPhase={simulationState.phase}
              simulationProgress={simulationState.progress}
              isSimulationRunning={simulationState.isRunning}
            />
          </div>
        )}
      </div>
    </section>
  );
}
