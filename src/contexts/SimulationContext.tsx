import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Asteroid {
  id: string;
  name: string;
  diameter: string;
  velocity: string;
  is_hazardous: boolean;
  approach_date?: string;
  miss_distance?: string;
}

interface SimulationContextType {
  selectedAsteroid: Asteroid | null;
  setSelectedAsteroid: (asteroid: Asteroid | null) => void;
  impactCoordinates: { lat: number; lng: number } | null;
  setImpactCoordinates: (coords: { lat: number; lng: number } | null) => void;
  isSimulationActive: boolean;
  setIsSimulationActive: (active: boolean) => void;
  simulationStep: 'selection' | 'impact' | 'simulation' | 'results';
  setSimulationStep: (step: 'selection' | 'impact' | 'simulation' | 'results') => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null);
  const [impactCoordinates, setImpactCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [simulationStep, setSimulationStep] = useState<'selection' | 'impact' | 'simulation' | 'results'>('selection');

  return (
    <SimulationContext.Provider value={{
      selectedAsteroid,
      setSelectedAsteroid,
      impactCoordinates,
      setImpactCoordinates,
      isSimulationActive,
      setIsSimulationActive,
      simulationStep,
      setSimulationStep
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
