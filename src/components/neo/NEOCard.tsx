import React from 'react';
import type { NEO } from '../../types/api.types';

interface NEOCardProps {
  neo: NEO;
  onClick?: () => void;
}

export const NEOCard: React.FC<NEOCardProps> = ({ neo, onClick }) => {
  // Calcular el diámetro promedio
  const averageDiameter = (neo.diameter_min_m + neo.diameter_max_m) / 2;
  
  // Determinar el color basado en si es peligroso
  const isHazardous = neo.is_potentially_hazardous;
  const hazardColor = isHazardous ? 'text-red-400' : 'text-green-400';
  const borderColor = isHazardous ? 'border-red-500/30' : 'border-white/20';
  const bgColor = isHazardous ? 'bg-red-500/5' : 'bg-white/5';

  return (
    <div 
      className={`relative p-6 rounded-lg border ${borderColor} ${bgColor} 
                  backdrop-blur-sm hover:bg-white/10 transition-all duration-300
                  group hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      
      {/* Header con nombre y estado de peligro */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium text-white group-hover:text-blue-300 
                      transition-colors duration-300">
          {neo.name}
        </h3>
        
        {/* Indicador de peligro */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${hazardColor} 
                        ${isHazardous ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
          {isHazardous ? 'PELIGROSO' : 'SEGURO'}
        </div>
      </div>

      {/* Información del asteroide */}
      <div className="space-y-3">
        {/* Diámetro */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60 uppercase tracking-wider">
            Diámetro
          </span>
          <span className="text-white font-mono">
            {averageDiameter.toFixed(0)}m
          </span>
        </div>

        {/* Rango de diámetro */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60 uppercase tracking-wider">
            Rango
          </span>
          <span className="text-white/80 font-mono text-sm">
            {neo.diameter_min_m.toFixed(0)}m - {neo.diameter_max_m.toFixed(0)}m
          </span>
        </div>

        {/* ID del NEO */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60 uppercase tracking-wider">
            ID
          </span>
          <span className="text-white/60 font-mono text-sm">
            #{neo.id}
          </span>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                      ${isHazardous ? 'from-red-500/50 to-transparent' : 'from-blue-500/50 to-transparent'}`} />
    </div>
  );
};
