import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Earth3DGlobe from './Earth3DGlobe';
import LeafletMapComponent from './LeafletMapComponent';
import { AsteroidLauncher } from './AsteroidLauncher';
import { AsteroidData } from '../types/simulation.types';

interface IntegratedAsteroidSimulatorProps {
  selectedAsteroid: AsteroidData | null;
  onImpact?: (impactData: any) => void;
}

// Función para convertir lat/lng a coordenadas x/y del canvas
function latLngToXY(lat: number, lng: number): { x: number, y: number } {
  const x = (lng + 180) / 360 * 100; // 0–100%
  const y = (90 - lat) / 180 * 100;  // 0–100%
  return { x, y };
}

export default function IntegratedAsteroidSimulator({ 
  selectedAsteroid, 
  onImpact 
}: IntegratedAsteroidSimulatorProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showAsteroidLauncher, setShowAsteroidLauncher] = useState(false);
  const [impactData, setImpactData] = useState<any>(null);
  const [mapClickPosition, setMapClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [asteroidConfig, setAsteroidConfig] = useState({
    diameter: 50,
    speed: 100,
    material: 'iron' as 'iron' | 'stone' | 'ice'
  });

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    
    // Convertir lat/lng a coordenadas del mapa
    const mapCoords = latLngToXY(lat, lng);
    setMapClickPosition(mapCoords);
    
    // Automáticamente abrir el mapa después de un pequeño delay
    setTimeout(() => {
      setShowMap(true);
      setShowAsteroidLauncher(true);
    }, 1500);
  }, []);

  const handleMapClick = useCallback((lat: number, lng: number) => {
    console.log('Map clicked:', { lat, lng });
    
    // Convertir a coordenadas del mapa
    const mapCoords = latLngToXY(lat, lng);
    setMapClickPosition(mapCoords);
    
    // Simular impacto
    const mockImpact = {
      energy: Math.random() * 1000 + 100,
      craterSize: Math.random() * 500 + 50,
      location: { lat, lng },
      x: mapCoords.x,
      y: mapCoords.y
    };
    
    setImpactData(mockImpact);
    onImpact?.(mockImpact);
  }, [onImpact]);

  const handleAsteroidImpact = useCallback((impact: any) => {
    setImpactData(impact);
    onImpact?.(impact);
  }, [onImpact]);

  const handleBackToGlobe = useCallback(() => {
    setShowMap(false);
    setShowAsteroidLauncher(false);
    setSelectedLocation(null);
    setImpactData(null);
    setMapClickPosition(null);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Simulador de Choque de Meteoritos
          </h1>
          <div className="flex gap-2">
            {showMap && (
              <button 
                onClick={handleBackToGlobe}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                ← Volver al Globo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Contenido principal */}
      <div className="flex-1 flex" style={{ minHeight: '70vh' }}>
        <AnimatePresence mode="wait">
          {!showMap ? (
            // Vista del planeta 3D
            <motion.div
              key="globe"
              className="flex-1 relative w-full h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Earth3DGlobe onLocationSelect={handleLocationSelect} />
            </motion.div>
          ) : (
            // Vista del simulador de asteroides
            <motion.div 
              key="simulator"
              className="flex-1 relative bg-gray-900 rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {/* Mapa de Leaflet */}
              {selectedLocation && (
                <div className="w-full h-full">
                  <LeafletMapComponent
                    latitude={selectedLocation.lat}
                    longitude={selectedLocation.lng}
                    zoom={8}
                    onMapClick={handleMapClick}
                    showAsteroidLauncher={true}
                  />
                </div>
              )}
              
              {/* Lanzador de Asteroides */}
              <AsteroidLauncher
                onMapClick={handleMapClick}
                isVisible={showAsteroidLauncher}
                mapClickPosition={mapClickPosition}
                onPositionUsed={() => setMapClickPosition(null)}
              />
              
              {/* Información del mapa */}
              <div className="absolute top-4 left-4 z-30">
                <div className="bg-blue-600/90 text-white p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-bold text-lg mb-2">Mapa de Impacto</h3>
                  <div className="space-y-2 text-sm">
                    <p>🖱️ Haz clic en el mapa para lanzar un asteroide</p>
                    <p>⚙️ Usa el panel de configuración para personalizar el asteroide</p>
                    {selectedLocation && (
                      <p className="text-blue-200">
                        📍 Ubicación: {selectedLocation.lat.toFixed(2)}°, {selectedLocation.lng.toFixed(2)}°
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Panel de configuración */}
              <div className="absolute top-4 right-4 z-30">
                <div className="bg-gray-800/90 text-white p-4 rounded-lg backdrop-blur-sm w-64">
                  <h3 className="font-bold text-lg mb-3">Configuración del Asteroide</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Diámetro: {asteroidConfig.diameter}m</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="200" 
                        value={asteroidConfig.diameter}
                        onChange={(e) => setAsteroidConfig(prev => ({ ...prev, diameter: parseInt(e.target.value) }))}
                        className="w-full" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Velocidad: {asteroidConfig.speed}%</label>
                      <input 
                        type="range" 
                        min="25" 
                        max="200" 
                        value={asteroidConfig.speed}
                        onChange={(e) => setAsteroidConfig(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
                        className="w-full" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Material: {asteroidConfig.material}</label>
                      <select 
                        value={asteroidConfig.material}
                        onChange={(e) => setAsteroidConfig(prev => ({ ...prev, material: e.target.value as 'iron' | 'stone' | 'ice' }))}
                        className="w-full bg-gray-700 rounded px-2 py-1"
                      >
                        <option value="iron">Hierro</option>
                        <option value="stone">Piedra</option>
                        <option value="ice">Hielo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel de resultados de impacto */}
              {impactData && (
                <div className="absolute bottom-4 right-4 z-30 max-w-md">
                  <div className="bg-red-600/90 text-white p-4 rounded-lg backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-2">💥 Impacto Detectado</h3>
                    <div className="space-y-1 text-sm">
                      <p>💥 Energía: {impactData.energy?.toFixed(0)} MT TNT</p>
                      <p>🕳️ Cráter: {Math.round(impactData.craterSize || 0)}m</p>
                      <p>🌍 Ubicación: {impactData.location?.lat?.toFixed(2)}°, {impactData.location?.lng?.toFixed(2)}°</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
