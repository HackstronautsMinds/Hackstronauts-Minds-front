import { X } from 'lucide-react';

interface PlanetData {
  id: string;
  year: string;
  type: string;
  dangerous: boolean;
  avgDiameter: string;
  diameterRange: string;
  composition: string;
  lastApproach: string;
  relativeVelocity: string;
  approachDistance: string;
  impactProbability: string;
}

interface PlanetCardBackProps {
  planet: PlanetData;
  onClose?: () => void;
}

export function PlanetCardBack({ planet, onClose }: PlanetCardBackProps) {
  return (
    <div className="w-80 h-[500px] bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 rounded-2xl border-2 border-cyan-400/30 shadow-2xl shadow-cyan-400/20 overflow-hidden relative">
      {/* Holographic border effect */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-400/10 to-transparent animate-pulse"></div>
      
      {/* Card frame */}
      <div className="absolute inset-2 bg-gradient-to-b from-slate-700/50 via-slate-800/50 to-slate-900/50 rounded-xl border border-purple-300/20"></div>
      
      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-600/50">
          <div>
            <h3 className="text-cyan-400 text-lg tracking-wide">
              {planet.id} ({planet.year} {planet.type})
            </h3>
            {planet.dangerous && (
              <p className="text-red-400 text-xs mt-1 uppercase tracking-widest">
                Potencialmente Peligroso
              </p>
            )}
          </div>
        </div>

        {/* X button en la esquina superior derecha como el icono de giro */}
        {onClose && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300 transition-colors p-1 hover:rotate-180 transition-transform duration-300"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Content sections */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {/* Características Físicas */}
          <div className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-lg p-4 border border-slate-600/30">
            <h4 className="text-white text-sm mb-3 tracking-wide">Características Físicas</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Diámetro promedio:</span>
                <span className="text-white">{planet.avgDiameter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Rango de diámetro:</span>
                <span className="text-white">{planet.diameterRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Composición estimada:</span>
                <span className="text-white">{planet.composition}</span>
              </div>
            </div>
          </div>

          {/* Datos Orbitales */}
          <div className="bg-gradient-to-r from-blue-700/30 to-purple-700/30 rounded-lg p-4 border border-blue-600/30">
            <h4 className="text-white text-sm mb-3 tracking-wide">Datos Orbitales</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Último acercamiento:</span>
                <span className="text-white">{planet.lastApproach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Velocidad relativa:</span>
                <span className="text-white">{planet.relativeVelocity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Distancia de aproximación:</span>
                <span className="text-white">{planet.approachDistance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Probabilidad de impacto:</span>
                <span className="text-white">{planet.impactProbability}</span>
              </div>
            </div>
          </div>

          {/* Última Aproximación */}
          <div className="bg-gradient-to-r from-purple-700/30 to-pink-700/30 rounded-lg p-4 border border-purple-600/30">
            <h4 className="text-white text-sm mb-2 tracking-wide">Última Aproximación</h4>
            <div className="text-xs text-slate-300">
              <p>El objeto se acercó a una distancia de <span className="text-cyan-400">{planet.approachDistance}</span> el {planet.lastApproach}, viajando a una velocidad relativa de <span className="text-yellow-400">{planet.relativeVelocity}</span>.</p>
            </div>
          </div>
        </div>

        {/* Footer hint - opcional */}
        <div className="text-center text-slate-500 text-xs mt-3 pt-3 border-t border-slate-600/30">
          Información detallada del objeto
        </div>
      </div>
    </div>
  );
}
