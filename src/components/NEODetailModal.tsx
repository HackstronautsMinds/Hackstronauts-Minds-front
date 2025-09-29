import React, { useState, useEffect } from 'react';
import { nasaApiService } from '../../services/nasaApiService';
import type { NEO } from '../../types/api.types';

interface NEODetailModalProps {
  neo: NEO;
  isOpen: boolean;
  onClose: () => void;
}

export const NEODetailModal: React.FC<NEODetailModalProps> = ({ neo, isOpen, onClose }) => {
  const [detailedData, setDetailedData] = useState<NEO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && neo.id) {
      setLoading(true);
      // Simular obtención de datos detallados
      // En producción, aquí llamarías a la NASA API
      setTimeout(() => {
        const mockDetailedData: NEO = {
          ...neo,
          close_approach_date: '2024-03-15',
          relative_velocity_km_per_sec: 15.2,
          miss_distance_km: 450000,
          orbital_period_days: 365.25,
          composition_estimate: 'Rocoso (Silicatos)',
          image_url: `https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Asteroid+${neo.name}`,
          next_approach: '2025-03-15',
          impact_probability: neo.is_potentially_hazardous ? 0.0001 : 0
        };
        setDetailedData(mockDetailedData);
        setLoading(false);
      }, 1000);
    }
  }, [isOpen, neo]);

  if (!isOpen) return null;

  const data = detailedData || neo;
  const averageDiameter = (data.diameter_min_m + data.diameter_max_m) / 2;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{data.name}</h2>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                data.is_potentially_hazardous 
                  ? 'text-red-400 bg-red-500/20' 
                  : 'text-green-400 bg-green-500/20'
              }`}>
                {data.is_potentially_hazardous ? 'POTENCIALMENTE PELIGROSO' : 'SEGURO'}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="mt-4 text-white/60">Obteniendo datos detallados...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Imagen */}
              <div>
                <img
                  src={data.image_url}
                  alt={`Asteroid ${data.name}`}
                  className="w-full h-64 object-cover rounded-lg border border-white/20"
                />
                <p className="text-sm text-white/60 mt-2 text-center">
                  Representación artística del asteroide
                </p>
              </div>

              {/* Información detallada */}
              <div className="space-y-6">
                {/* Características físicas */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Características Físicas</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Diámetro promedio:</span>
                      <span className="text-white font-mono">{averageDiameter.toFixed(0)}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Rango de diámetro:</span>
                      <span className="text-white font-mono">
                        {data.diameter_min_m.toFixed(0)}m - {data.diameter_max_m.toFixed(0)}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Composición estimada:</span>
                      <span className="text-white">{data.composition_estimate || 'No disponible'}</span>
                    </div>
                  </div>
                </div>

                {/* Datos orbitales */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Datos Orbitales</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Período orbital:</span>
                      <span className="text-white font-mono">
                        {data.orbital_period_days ? `${data.orbital_period_days.toFixed(1)} días` : 'No disponible'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Último acercamiento:</span>
                      <span className="text-white">{data.close_approach_date || 'No disponible'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Próximo acercamiento:</span>
                      <span className="text-white">{data.next_approach || 'No disponible'}</span>
                    </div>
                  </div>
                </div>

                {/* Datos de aproximación */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Última Aproximación</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Velocidad relativa:</span>
                      <span className="text-white font-mono">
                        {data.relative_velocity_km_per_sec ? `${data.relative_velocity_km_per_sec.toFixed(2)} km/s` : 'No disponible'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Distancia de aproximación:</span>
                      <span className="text-white font-mono">
                        {data.miss_distance_km ? `${(data.miss_distance_km / 1000).toFixed(2)} km` : 'No disponible'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Probabilidad de impacto:</span>
                      <span className={`font-mono ${
                        data.impact_probability && data.impact_probability > 0.001 
                          ? 'text-red-400' 
                          : 'text-green-400'
                      }`}>
                        {data.impact_probability ? `${(data.impact_probability * 100).toFixed(6)}%` : '0%'}
                      </span>
                    </div>
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
