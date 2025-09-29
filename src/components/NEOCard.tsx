import React, { useState } from 'react';
import { RotateCw, X } from 'lucide-react';
import type { NEO } from '../types/api.types';
import { Asteroid3D } from './Asteroid3D';

interface NEOCardProps {
  neo: NEO;
  onClick?: () => void;
}

export const NEOCard: React.FC<NEOCardProps> = ({ neo, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const averageDiameter = neo.diameter_min_m && neo.diameter_max_m 
    ? (neo.diameter_min_m + neo.diameter_max_m) / 2 
    : 0;
  
  const isHazardous = neo.is_potentially_hazardous;
  
  const getComposition = () => {
    if (averageDiameter > 1000) return 'Metálico (Hierro-Níquel)';
    if (averageDiameter > 500) return 'Mixto';
    return 'Rocoso';
  };

  const getAsteroidType = (): 'metallic' | 'rocky' | 'icy' => {
    if (averageDiameter > 1000) return 'metallic';
    if (averageDiameter > 500) return 'rocky';
    return 'rocky';
  };

  const getDangerLevel = (): 'low' | 'medium' | 'high' | 'extreme' => {
    if (!isHazardous) return 'low';
    if (neo.risk_category === 'Crítico') return 'extreme';
    if (neo.risk_category === 'Alto') return 'high';
    if (neo.risk_category === 'Moderado') return 'medium';
    return 'low';
  };

  const handleRotateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(true);
  };

  const handleCloseFlip = () => {
    setIsFlipped(false);
  };

  return (
    <>
      <div className="asteroid-card group">
        {/* Contenedor 3D interno */}
        <div className="perspective-1000 w-full h-full">
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            {/* FRONT SIDE - Tu diseño actual */}
            <div className="flip-card-front">
              {/* Header */}
              <header className="card-header">
                <h2 className="text-lg font-bold tracking-wider">
                  {neo.name.toUpperCase()}
                </h2>
                <button 
                  onClick={handleRotateClick}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-1 hover:rotate-180 transition-transform duration-300"
                  aria-label="Ver detalles"
                >
                  <RotateCw className="w-6 h-6" />
                </button>
              </header>

              {/* Visualización 3D */}
              <div className="asteroid-visual">
                <Asteroid3D 
                  asteroidType={getAsteroidType()}
                  dangerLevel={getDangerLevel()}
                  composition={[getComposition()]}
                />
              </div>

              {/* Grid de datos */}
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
            </div>

            {/* BACK SIDE - Información detallada */}
            <div className="flip-card-back">
              <div className="w-full h-full bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-2xl border-2 border-cyan-400/30 shadow-2xl shadow-cyan-400/20 overflow-hidden relative">
                {/* Holographic border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
                
                {/* Card frame */}
                <div className="absolute inset-2 bg-gradient-to-b from-slate-700/50 via-slate-800/50 to-slate-900/50 rounded-xl border border-cyan-300/20"></div>
                
                <div className="relative p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-600/50">
                    <div>
                      <h3 className="text-cyan-400 text-lg tracking-wide">
                        {neo.neo_id} ({neo.close_approach_date ? new Date(neo.close_approach_date).getFullYear().toString() : 'N/A'} {neo.name.split(' ').slice(1).join(' ') || 'NEO'})
                      </h3>
                      {neo.is_potentially_hazardous ? (
                        <p className="text-red-400 text-xs mt-1 uppercase tracking-widest">
                          Potencialmente Peligroso
                        </p>
                      ) : (
                        <p className="text-green-400 text-xs mt-1 uppercase tracking-widest">
                          Seguro
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={handleCloseFlip}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Cerrar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content sections */}
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {/* Características Físicas */}
                    <div className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-lg p-4 border border-slate-600/30">
                      <h4 className="text-white text-sm mb-3 tracking-wide">Características Físicas</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Diámetro promedio:</span>
                          <span className="text-white">{averageDiameter.toFixed(0)}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Rango de diámetro:</span>
                          <span className="text-white">{neo.diameter_min_m?.toFixed(0) || 'N/A'}m - {neo.diameter_max_m?.toFixed(0) || 'N/A'}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Composición estimada:</span>
                          <span className="text-white">{getComposition()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Datos Orbitales */}
                    <div className="bg-gradient-to-r from-blue-700/30 to-purple-700/30 rounded-lg p-4 border border-blue-600/30">
                      <h4 className="text-white text-sm mb-3 tracking-wide">Datos Orbitales</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Último acercamiento:</span>
                          <span className="text-white">{neo.close_approach_date || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Velocidad relativa:</span>
                          <span className="text-white">{neo.velocity_km_s ? `${neo.velocity_km_s.toFixed(2)} km/s` : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Distancia de aproximación:</span>
                          <span className="text-white">{neo.miss_distance_km ? `${(neo.miss_distance_km / 1000).toFixed(2)} km` : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Probabilidad de impacto:</span>
                          <span className="text-white">{neo.is_potentially_hazardous ? '0.010000%' : '0%'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer hint */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón SIMULAR IMPACTO debajo de la card - solo en el front */}
      {!isFlipped && (
        <div className="mt-4 flex justify-center">
          <button className="btn-sim">SIMULAR IMPACTO</button>
        </div>
      )}

    </>
  );
};