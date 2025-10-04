import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { neoService } from '../../../services/neoService';
import { NEOCard } from '../../ui/cards/NEOCard';
import { NEODetailModal } from '../../ui/modals/NEODetailModal';
import { Carousel } from '../carousel/Carousel';
import { useSimulation } from '../../../contexts/SimulationContext';
import type { NEO } from '../../../types/api.types';

export const NEOList: React.FC = () => {
  const [selectedNEO, setSelectedNEO] = useState<NEO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedAsteroid, setIsSimulationActive, setSimulationStep } = useSimulation();

  // Usar React Query para obtener los datos de la NASA API
  const { data, isLoading, error } = useQuery({
    queryKey: ['neos', 0, 20],
    queryFn: () => neoService.getNEOsList(0, 20),
    staleTime: 5 * 60 * 1000,
  });

  const handleNEOClick = (neo: NEO) => {
    setSelectedNEO(neo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNEO(null);
  };

  const handleSimulateImpact = (neo: NEO) => {
    console.log('Asteroide seleccionado:', neo); // Debug
    
    // Guardar el asteroide seleccionado en el contexto
    setSelectedAsteroid({
      id: neo.id || neo.neo_id || 'unknown',
      name: neo.name || 'Unknown',
      diameter: neo.diameter || 'N/A',
      velocity: neo.velocity || 'N/A',
      is_hazardous: neo.is_hazardous || neo.is_potentially_hazardous || false,
      approach_date: neo.approach_date,
      miss_distance: neo.miss_distance
    });
    
    // Activar la simulación
    setIsSimulationActive(true);
    setSimulationStep('impact');
    
    // Scroll hacia el simulador 3D
    setTimeout(() => {
      document.getElementById('simulator-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
    <div className="py-16">
      {/* Header de la sección */}
      <div className="text-center mb-12 px-6">
      <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Near Earth Objects
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Asteroides cercanos a la Tierra monitoreados en tiempo real por nuestro sistema de IA
          </p>
          <div className="mt-4 text-sm text-white/40">
            Mostrando {data?.neos?.length || 0} asteroides
          </div>
          {data && (
            <div className="mt-2 text-xs text-green-400/80 bg-green-400/10 px-3 py-1 rounded-full inline-block">
              ✅ Datos en tiempo real del backend
            </div>
          )}
          </div>
        </div>

      {/* Carrusel de asteroides - Sin restricción de ancho */}
      <Carousel
        items={data?.neos || []}
        renderItem={(neo, index, isActive) => (
            <NEOCard 
            key={neo.neo_id} 
              neo={neo} 
              onClick={() => handleNEOClick(neo)}
              onSimulate={handleSimulateImpact}
            />
        )}
        keyExtractor={(neo) => neo.neo_id}
        autoPlay={false}
        showIndicators={true}
        showNavigation={true}
      />

        {/* Información adicional */}
      <div className="mt-12 text-center px-6">
        <div className="max-w-6xl mx-auto">
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
