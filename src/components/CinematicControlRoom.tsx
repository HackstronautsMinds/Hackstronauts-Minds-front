import React from 'react';
import { VintageWorkstation } from './VintageWorkstation';
import { 
  DataAgentScreen,
  OrbitalAgentScreen,
  ImpactAgentScreen,
  MitigationAgentScreen,
  VisualizationAgentScreen,
  MLAgentScreen,
  ExplainerAgentScreen
} from './AgentScreens';

interface CinematicControlRoomProps {
  simulationPhase?: string;
  simulationProgress?: number;
  isSimulationRunning?: boolean;
}

export function CinematicControlRoom({ 
  simulationPhase = 'idle',
  simulationProgress = 0,
  isSimulationRunning = false 
}: CinematicControlRoomProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black relative overflow-hidden">
      {/* Space Background Effects */}
      <div className="absolute inset-0">
        {/* Particle Field */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Atmospheric Lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-15"></div>
        <div className="absolute bottom-1/3 left-1/2 w-128 h-128 bg-purple-600 rounded-full blur-3xl opacity-10 transform -translate-x-1/2"></div>

        {/* Floor Grid Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 opacity-5">
          <div className="grid grid-cols-32 grid-rows-24 h-full w-full">
            {[...Array(768)].map((_, i) => (
              <div key={i} className="border border-cyan-400"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Overhead Fluorescent Lighting Strips */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/8 to-transparent"></div>
      <div className="absolute top-12 left-1/3 right-1/3 h-1 bg-cyan-300/15 blur-sm"></div>

      {/* Main Control Room Layout - Triangular Ascending Perspective */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-8">
        
        {/* Top Level - 1 Station (Peak of Triangle) */}
        <div className="flex justify-center items-end mb-20">
          <div className="transform scale-90">
            <VintageWorkstation position="center">
              <OrbitalAgentScreen />
            </VintageWorkstation>
          </div>
        </div>

        {/* Upper Level - 2 Stations */}
        <div className="flex justify-center items-end space-x-24 mb-20">
          <div className="transform scale-95">
            <VintageWorkstation position="left">
              <MitigationAgentScreen />
            </VintageWorkstation>
          </div>
          
          <div className="transform scale-95">
            <VintageWorkstation position="right">
              <ImpactAgentScreen />
            </VintageWorkstation>
          </div>
        </div>

        {/* Lower Level - 4 Stations (Base of Triangle) */}
        <div className="flex justify-center items-end space-x-16">
          <VintageWorkstation position="left">
            <MLAgentScreen />
          </VintageWorkstation>
          
          <VintageWorkstation position="left">
            <DataAgentScreen />
          </VintageWorkstation>
          
          <VintageWorkstation position="right">
            <VisualizationAgentScreen />
          </VintageWorkstation>
          
          <VintageWorkstation position="right">
            <ExplainerAgentScreen />
          </VintageWorkstation>
        </div>
      </div>

      {/* CRT Glow and Reflection Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-cyan-900/5 to-transparent"></div>
      
      {/* Atmospheric Depth Haze */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none"></div>
    </div>
  );
}
