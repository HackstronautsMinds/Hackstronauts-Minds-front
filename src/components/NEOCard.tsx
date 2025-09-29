import React from 'react';
import type { NEO } from '../types/api.types';
import { Asteroid3D } from './Asteroid3D';

interface NEOCardProps {
  neo: NEO;
  onClick?: () => void;
}

export const NEOCard: React.FC<NEOCardProps> = ({ neo, onClick }) => {
  // Calcular el diámetro promedio (manejar valores null)
  const averageDiameter = neo.diameter_min_m && neo.diameter_max_m 
    ? (neo.diameter_min_m + neo.diameter_max_m) / 2 
    : 0;
  
  // Determinar si es peligroso
  const isHazardous = neo.is_potentially_hazardous;
  
  // Estimar composición basada en el diámetro
  const getComposition = () => {
    if (averageDiameter > 1000) return 'Metálico';
    if (averageDiameter > 500) return 'Mixto';
    return 'Rocoso';
  };

  // Mapear composición a tipo de asteroide para el componente 3D
  const getAsteroidType = (): 'metallic' | 'rocky' | 'icy' => {
    if (averageDiameter > 1000) return 'metallic';
    if (averageDiameter > 500) return 'rocky';
    return 'rocky'; // Por defecto rocoso
  };

  // Mapear nivel de peligro
  const getDangerLevel = (): 'low' | 'medium' | 'high' | 'extreme' => {
    if (!isHazardous) return 'low';
    if (neo.risk_category === 'Crítico') return 'extreme';
    if (neo.risk_category === 'Alto') return 'high';
    if (neo.risk_category === 'Moderado') return 'medium';
    return 'low';
  };

  return (
    <div 
      className="asteroid-card group cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <header className="card-header">
        <h2 className="text-lg font-bold tracking-wider">
          {neo.name.toUpperCase()}
        </h2>
        <span className="fav-star text-yellow-400 text-xl">★</span>
      </header>

      {/* Visualización 3D del asteroide */}
      <div className="asteroid-visual">
        <Asteroid3D 
          asteroidType={getAsteroidType()}
          dangerLevel={getDangerLevel()}
          composition={[getComposition()]}
        />
      </div>

      {/* Grid de datos - estilo de la imagen de referencia */}
      <div className="asteroid-data-grid">
        <div className="data-card">
          <div className="data-icon">📏</div>
          <div className="data-content">
            <label>DIÁMETRO</label>
            <span>{averageDiameter.toFixed(1)} km</span>
          </div>
        </div>
        <div className="data-card">
          <div className="data-icon">🌍</div>
          <div className="data-content">
            <label>DISTANCIA</label>
            <span>{neo.miss_distance_km ? `${(neo.miss_distance_km / 1000).toFixed(2)} km` : 'N/A'}</span>
          </div>
        </div>
        <div className="data-card">
          <div className="data-icon">⚡</div>
          <div className="data-content">
            <label>VELOCIDAD</label>
            <span>{neo.velocity_km_s ? `${neo.velocity_km_s.toFixed(2)} km/s` : 'N/A'}</span>
          </div>
        </div>
        <div className="data-card">
          <div className="data-icon">⚛️</div>
          <div className="data-content">
            <label>MASA</label>
            <span>{(averageDiameter * 1000).toFixed(0)} kg</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="actions">
        <button className="btn-sim">
          SIMULAR IMPACTO
        </button>
        <button className="btn-details">
          VER DETALLES
        </button>
      </div>
    </div>
  );
};
