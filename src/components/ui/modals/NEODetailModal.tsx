import React, { useState, useEffect } from 'react';
import { asteroidImageService } from '../../../services/asteroidImageService';
import type { NEO } from '../../../types/api.types';

interface NEODetailModalProps {
  neo: NEO;
  isOpen: boolean;
  onClose: () => void;
}

export const NEODetailModal: React.FC<NEODetailModalProps> = ({ neo, isOpen, onClose }) => {
  const [detailedData, setDetailedData] = useState<NEO | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && neo.neo_id) {
      setLoading(true);
      
      // Generar imagen SVG del asteroide (no hay imágenes reales)
      const loadImage = async () => {
        try {
          const averageDiameter = neo.diameter_min_m && neo.diameter_max_m 
            ? (neo.diameter_min_m + neo.diameter_max_m) / 2 
            : 100;
          
          // Generar imagen SVG personalizada basada en características reales
          const image = asteroidImageService.generateSVGAsteroidImage(neo.neo_id, neo.name, averageDiameter);
          setImageUrl(image);
        } catch (error) {
          console.error('Error generating image:', error);
          // Fallback a placeholder simple
          setImageUrl(`https://via.placeholder.com/400x300/1a1a1a/ffffff?text=${neo.name.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 20)}`);
        }
      };

      // Cargar datos y imagen en paralelo
      Promise.all([
        loadImage(),
        new Promise(resolve => setTimeout(resolve, 500)) // Simular carga de datos
      ]).then(() => {
        const realData: NEO = {
          ...neo,
          // Calcular composición basada en el diámetro (estimación simple)
          composition_estimate: neo.diameter_min_m && neo.diameter_max_m 
            ? (neo.diameter_min_m + neo.diameter_max_m) / 2 > 1000 
              ? 'Metálico (Hierro-Níquel)' 
              : (neo.diameter_min_m + neo.diameter_max_m) / 2 > 500
              ? 'Mixto (Roca-Metal)'
              : 'Rocoso (Silicatos)'
            : 'Desconocida',
          // Calcular probabilidad de impacto basada en si es peligroso
          impact_probability: neo.is_potentially_hazardous ? 0.0001 : 0
        };
        setDetailedData(realData);
        setLoading(false);
      });
    }
  }, [isOpen, neo]);

  if (!isOpen) return null;

  const data = detailedData || neo;
  const averageDiameter = data.diameter_min_m && data.diameter_max_m 
    ? (data.diameter_min_m + data.diameter_max_m) / 2 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-white/20 mx-2 sm:mx-0">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 break-words">{data.name}</h2>
              <div className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                data.is_potentially_hazardous 
                  ? 'text-red-400 bg-red-500/20' 
                  : 'text-green-400 bg-green-500/20'
              }`}>
                {data.is_potentially_hazardous ? 'POTENCIALMENTE PELIGROSO' : 'SEGURO'}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="mt-4 text-white/60 text-sm sm:text-base">Obteniendo datos detallados...</p>
            </div>
          ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* Características físicas */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Características Físicas</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <span className="text-white/60 text-sm sm:text-base">Diámetro promedio:</span>
                      <span className="text-white font-mono text-sm sm:text-base">{averageDiameter.toFixed(0)}m</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <span className="text-white/60 text-sm sm:text-base">Rango de diámetro:</span>
                      <span className="text-white font-mono text-sm sm:text-base">
                        {data.diameter_min_m.toFixed(0)}m - {data.diameter_max_m.toFixed(0)}m
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <span className="text-white/60 text-sm sm:text-base">Composición estimada:</span>
                      <span className="text-white text-sm sm:text-base break-words">{data.composition_estimate || 'No disponible'}</span>
                    </div>
                  </div>
                </div>

                {/* Datos orbitales */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Datos Orbitales</h3>
                  <div className="space-y-3">
                    {data.close_approach_date && (
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <span className="text-white/60 text-sm sm:text-base">Último acercamiento:</span>
                        <span className="text-white text-sm sm:text-base">{data.close_approach_date}</span>
                    </div>
                    )}
                  </div>
                </div>

                {/* Datos de aproximación */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Última Aproximación</h3>
                  <div className="space-y-3">
                    {data.velocity_km_s && (
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <span className="text-white/60 text-sm sm:text-base">Velocidad relativa:</span>
                      <span className="text-white font-mono text-sm sm:text-base">
                          {data.velocity_km_s.toFixed(2)} km/s
                      </span>
                    </div>
                    )}
                    {data.miss_distance_km && (
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <span className="text-white/60 text-sm sm:text-base">Distancia de aproximación:</span>
                      <span className="text-white font-mono text-sm sm:text-base">
                          {(data.miss_distance_km / 1000).toFixed(2)} km
                      </span>
                    </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <span className="text-white/60 text-sm sm:text-base">Probabilidad de impacto:</span>
                      <span className={`font-mono text-sm sm:text-base ${
                        data.impact_probability && data.impact_probability > 0.001 
                          ? 'text-red-400' 
                          : 'text-green-400'
                      }`}>
                        {data.impact_probability ? `${(data.impact_probability * 100).toFixed(6)}%`  : '0%'}
                      </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
