import React, { useState } from 'react';
import { RotateCw, X } from 'lucide-react';
import type { NEO } from '../../../types/api.types';
import { Asteroid3D } from '../../3d/Asteroid3D';

interface NEOCardProps {
  neo: NEO;
  onClick?: () => void;
  onSimulate?: (neo: NEO) => void;
}

export const NEOCard: React.FC<NEOCardProps> = ({ neo, onClick, onSimulate }) => {
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
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #1e3a8a, #374151, #1f2937)',
                  borderRadius: '16px',
                  border: '2px solid rgba(34, 211, 238, 0.6)',
                  boxShadow: `
                    0 0 20px rgba(34, 211, 238, 0.4),
                    0 0 40px rgba(34, 211, 238, 0.2),
                    0 0 60px rgba(34, 211, 238, 0.1),
                    inset 0 0 20px rgba(34, 211, 238, 0.1)
                  `,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Efecto de resplandor cian */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    background: 'linear-gradient(45deg, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.2), rgba(34, 211, 238, 0.3))',
                    borderRadius: '18px',
                    filter: 'blur(8px)',
                    zIndex: -1
                  }}
                ></div>
                
                {/* Holographic border effect */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, transparent, rgba(34, 211, 238, 0.1), transparent)',
                    animation: 'pulse 2s infinite'
                  }}
                ></div>
                
                <div style={{ position: 'relative', padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        color: '#f472b6', 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        letterSpacing: '0.05em',
                        marginBottom: '2px',
                        margin: 0
                      }}>
                        {neo.neo_id} ({neo.close_approach_date ? new Date(neo.close_approach_date).getFullYear().toString() : 'N/A'} {neo.name.split(' ').slice(1).join(' ') || 'NEO'})
        </h3>
                      {neo.is_potentially_hazardous ? (
                        <p style={{ 
                          color: '#fca5a5', 
                          fontSize: '10px', 
                          fontWeight: '600', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          margin: 0
                        }}>
                          Potencialmente Peligroso
                        </p>
                      ) : (
                        <p style={{ 
                          color: '#86efac', 
                          fontSize: '10px', 
                          fontWeight: '600', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          margin: 0
                        }}>
                          Seguro
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={handleCloseFlip}
                      style={{
                        color: '#f472b6',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginLeft: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#f9a8d4';
                        e.currentTarget.style.transform = 'rotate(180deg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#f472b6';
                        e.currentTarget.style.transform = 'rotate(0deg)';
                      }}
                      aria-label="Cerrar"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Content sections - Ocupa todo el espacio disponible */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
                    {/* Características Físicas */}
                    <div style={{
                      background: 'linear-gradient(to right, rgba(55, 65, 81, 0.4), rgba(31, 41, 55, 0.4))',
                      borderRadius: '6px',
                      padding: '16px',
                      border: '1px solid rgba(75, 85, 99, 0.3)',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <h4 style={{ 
                        color: 'white', 
                        fontSize: '15px', 
                        fontWeight: 'bold', 
                        letterSpacing: '0.05em',
                        marginBottom: '12px',
                        textAlign: 'center',
                        margin: '0 0 12px 0'
                      }}>Características Físicas</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                          <span style={{ color: '#d1d5db' }}>Diámetro promedio:</span>
                          <span style={{ color: 'white', fontWeight: '600' }}>{averageDiameter.toFixed(0)}m</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                          <span style={{ color: '#d1d5db' }}>Rango de diámetro:</span>
                          <span style={{ color: 'white', fontWeight: '600' }}>{neo.diameter_min_m?.toFixed(0) || 'N/A'}m - {neo.diameter_max_m?.toFixed(0) || 'N/A'}m</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                          <span style={{ color: '#d1d5db' }}>Composición estimada:</span>
                          <span style={{ color: 'white', fontWeight: '600' }}>{getComposition()}</span>
                        </div>
        </div>
      </div>

                    {/* Datos Orbitales */}
                    <div style={{
                      background: 'linear-gradient(to right, rgba(37, 99, 235, 0.3), rgba(147, 51, 234, 0.3))',
                      borderRadius: '6px',
                      padding: '16px',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <h4 style={{ 
                        color: 'white', 
                        fontSize: '15px', 
                        fontWeight: 'bold', 
                        letterSpacing: '0.05em',
                        marginBottom: '12px',
                        textAlign: 'center',
                        margin: '0 0 12px 0'
                      }}>Datos Orbitales</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                          <span style={{ color: '#d1d5db' }}>Último acercamiento:</span>
                          <span style={{ color: 'white', fontWeight: '600' }}>{neo.close_approach_date || 'N/A'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                          <span style={{ color: '#d1d5db' }}>Velocidad relativa:</span>
                          <span style={{ color: 'white', fontWeight: '600' }}>{neo.velocity_km_s ? `${neo.velocity_km_s.toFixed(2)} km/s` : 'N/A'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                          <span style={{ color: '#d1d5db' }}>Distancia de aproximación:</span>
                          <span style={{ color: 'white', fontWeight: '600' }}>{neo.miss_distance_km ? `${(neo.miss_distance_km / 1000).toFixed(2)} km` : 'N/A'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                          <span style={{ color: '#d1d5db' }}>Probabilidad de impacto:</span>
                          <span style={{ color: 'white', fontWeight: '600' }}>{neo.is_potentially_hazardous ? '0.010000%' : '0%'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        </div>
        </div>
      </div>

      {/* Botón SIMULAR IMPACTO debajo de la card - solo en el front */}
      {!isFlipped && (
        <div className="mt-4 flex justify-center">
          <button 
            className="btn-sim"
            onClick={() => onSimulate?.(neo)}
          >
            SIMULAR IMPACTO
          </button>
        </div>
      )}

    </>
  );
};