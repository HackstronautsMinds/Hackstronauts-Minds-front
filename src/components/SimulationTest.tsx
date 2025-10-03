import React from 'react';
import { useSimulation } from '../contexts/SimulationContext';

export const SimulationTest: React.FC = () => {
  const { selectedAsteroid, simulationStep } = useSimulation();
  
  return (
    <div style={{ padding: '20px', background: '#333', color: 'white' }}>
      <h3>🧪 Test del Contexto de Simulación</h3>
      <p>Asteroide seleccionado: {selectedAsteroid ? selectedAsteroid.name : 'Ninguno'}</p>
      <p>Paso actual: {simulationStep}</p>
    </div>
  );
};
