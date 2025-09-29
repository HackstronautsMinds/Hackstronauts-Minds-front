import React from 'react';
import type { NEO } from '../types/api.types';

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
        <div className="asteroid-placeholder">
          <div className="asteroid-icon">☄️</div>
        </div>
        <span className="badge top-right">
          Composición: {getComposition()}
        </span>
        <span className={`badge bottom-left ${isHazardous ? 'danger' : 'safe'}`}>
          {isHazardous ? '⚠ Peligroso' : '✓ Seguro'}
        </span>
      </div>

      {/* Grid de datos */}
      <div className="asteroid-data">
        <div className="metric">
          <label>DIÁMETRO</label>
          <span>{averageDiameter.toFixed(1)} km</span>
        </div>
        <div className="metric">
          <label>COMPOSICIÓN</label>
          <span>{getComposition()}</span>
        </div>
        <div className="metric">
          <label>VELOCIDAD</label>
          <span>{neo.velocity_km_s ? `${neo.velocity_km_s.toFixed(2)} km/s` : 'N/A'}</span>
        </div>
        <div className="metric">
          <label>RIESGO</label>
          <span className={isHazardous ? 'text-red-400' : 'text-green-400'}>
            {isHazardous ? 'ALTO' : 'BAJO'}
          </span>
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
