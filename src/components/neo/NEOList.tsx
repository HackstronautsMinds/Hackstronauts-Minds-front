import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { neoService } from '../../services/neoService';
import { NEOCard } from './NEOCard';
import { NEODetailModal } from './NEODetailModal';
import type { NEO } from '../../types/api.types';

export const NEOList: React.FC = () => {
  const [selectedNEO, setSelectedNEO] = useState<NEO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos de prueba mientras se arregla el backend
  const mockData = {
    neos: [
      {
        id: 1,
        name: "2024 AB1",
        diameter_min_m: 15,
        diameter_max_m: 35,
        is_potentially_hazardous: true
      },
      {
        id: 2,
        name: "2024 CD2",
        diameter_min_m: 8,
        diameter_max_m: 18,
        is_potentially_hazardous: false
      },
      {
        id: 3,
        name: "2024 EF3",
        diameter_min_m: 25,
        diameter_max_m: 55,
        is_potentially_hazardous: true
      },
      {
        id: 4,
        name: "2024 GH4",
        diameter_min_m: 5,
        diameter_max_m: 12,
        is_potentially_hazardous: false
      },
      {
        id: 5,
        name: "2024 IJ5",
        diameter_min_m: 40,
        diameter_max_m: 90,
        is_potentially_hazardous: true
      },
      {
        id: 6,
        name: "2024 KL6",
        diameter_min_m: 12,
        diameter_max_m: 28,
        is_potentially_hazardous: false
      }
    ],
    total: 6,
    page: 1,
    limit: 20
  };

  // Usar React Query para obtener los datos del backend (comentado temporalmente)
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['neos', 1, 20],
  //   queryFn: () => neoService.getNEOs(1, 20),
  //   staleTime: 5 * 60 * 1000,
  // });

  // Usar datos de prueba por ahora
  const data = mockData;
  const isLoading = false;
  const error = null;

  const handleNEOClick = (neo: NEO) => {
    setSelectedNEO(neo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNEO(null);
  };

  if (isLoading) {
    return (
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-4 text-white/60">Cargando asteroides...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl text-white mb-2">Error al cargar datos</h3>
            <p className="text-white/60">No se pudieron obtener los asteroides del backend</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.neos || data.neos.length === 0) {
    return (
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-white/40 text-4xl mb-4">🌌</div>
            <h3 className="text-xl text-white mb-2">No hay asteroides disponibles</h3>
            <p className="text-white/60">No se encontraron asteroides en el sistema</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Near Earth Objects
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Asteroides cercanos a la Tierra monitoreados en tiempo real por nuestro sistema de IA
          </p>
          <div className="mt-4 text-sm text-white/40">
            Mostrando {data.neos.length} de {data.total} asteroides
          </div>
          <div className="mt-2 text-xs text-yellow-400/80 bg-yellow-400/10 px-3 py-1 rounded-full inline-block">
            ⚠️ Datos de prueba - Backend en mantenimiento
          </div>
        </div>

        {/* Grid de asteroides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.neos.map((neo) => (
            <NEOCard 
              key={neo.id} 
              neo={neo} 
              onClick={() => handleNEOClick(neo)}
            />
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-white/40">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Peligroso</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {selectedNEO && (
        <NEODetailModal
          neo={selectedNEO}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
