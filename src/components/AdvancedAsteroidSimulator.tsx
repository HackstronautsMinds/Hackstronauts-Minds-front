import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AsteroidData, TrajectoryPoint } from '../types/simulation.types';
import { mockAsteroids } from '../data/mockAsteroidData';

// Interfaces para el simulador avanzado
export interface AsteroidConfig {
  diameter: number;
  speed: number;
  material: 'iron' | 'stone' | 'ice' | 'gold' | 'diamond';
}

export interface AsteroidMaterial {
  name: string;
  color: string;
  gradient: string;
  trailColor: string;
  glowColor: string;
  density: number;
  icon: string;
  description: string;
}

export const ASTEROID_MATERIALS: Record<string, AsteroidMaterial> = {
  iron: {
    name: 'Hierro',
    color: '#8B4513',
    gradient: 'radial-gradient(circle, #A0522D 0%, #8B4513 40%, #654321 100%)',
    trailColor: '#FF6347',
    glowColor: '#FF4500',
    density: 1.0,
    icon: '🦾',
    description: 'Asteroide metálico denso'
  },
  stone: {
    name: 'Piedra',
    color: '#696969',
    gradient: 'radial-gradient(circle, #808080 0%, #696969 40%, #2F4F4F 100%)',
    trailColor: '#FF8C69',
    glowColor: '#FF6347',
    density: 0.8,
    icon: '🪨',
    description: 'Asteroide rocoso común'
  },
  ice: {
    name: 'Hielo',
    color: '#B0E0E6',
    gradient: 'radial-gradient(circle, #E0FFFF 0%, #B0E0E6 40%, #4682B4 100%)',
    trailColor: '#87CEEB',
    glowColor: '#00BFFF',
    density: 0.5,
    icon: '🧊',
    description: 'Asteroide helado ligero'
  },
  gold: {
    name: 'Oro',
    color: '#FFD700',
    gradient: 'radial-gradient(circle, #FFFFE0 0%, #FFD700 40%, #B8860B 100%)',
    trailColor: '#FFA500',
    glowColor: '#FFD700',
    density: 1.5,
    icon: '🏆',
    description: 'Asteroide dorado valioso'
  },
  diamond: {
    name: 'Diamante',
    color: '#B9F2FF',
    gradient: 'radial-gradient(circle, #FFFFFF 0%, #B9F2FF 30%, #4169E1 70%, #191970 100%)',
    trailColor: '#FFFFFF',
    glowColor: '#00FFFF',
    density: 2.0,
    icon: '💎',
    description: 'Asteroide cristalino ultra denso'
  }
};

interface ImpactPoint {
  x: number;
  y: number;
  id: number;
  craterSize: number;
  explosionSize: number;
  energy: number;
  location: { lat: number; lng: number };
}

interface Asteroid {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isAnimating: boolean;
  config: AsteroidConfig;
}

interface AdvancedAsteroidSimulatorProps {
  selectedAsteroid: AsteroidData | null;
  onImpact?: (impactData: any) => void;
  initialMapClick?: { x: number; y: number } | null;
}

export default function AdvancedAsteroidSimulator({ 
  selectedAsteroid, 
  onImpact,
  initialMapClick
}: AdvancedAsteroidSimulatorProps) {
  const [impacts, setImpacts] = useState<ImpactPoint[]>([]);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [nextId, setNextId] = useState(1);
  const [whiteFlash, setWhiteFlash] = useState(false);
  const [configPanelVisible, setConfigPanelVisible] = useState(false);
  const [asteroidConfig, setAsteroidConfig] = useState<AsteroidConfig>({
    diameter: 50,
    speed: 100,
    material: 'iron'
  });

  // Efecto para manejar el clic inicial del mapa
  useEffect(() => {
    if (initialMapClick) {
      // Simular un clic en el mapa con las coordenadas proporcionadas
      const mockEvent = {
        clientX: (initialMapClick.x / 100) * window.innerWidth,
        clientY: (initialMapClick.y / 100) * window.innerHeight,
      } as MouseEvent;
      
      // Lanzar asteroide automáticamente
      setTimeout(() => {
        handleMapClick(mockEvent);
      }, 1000); // Delay para que se vea la transición
    }
  }, [initialMapClick]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Generar ubicación aleatoria si no hay selección
  useEffect(() => {
    if (!selectedLocation) {
      setSelectedLocation({
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180
      });
    }
  }, [selectedLocation]);

  const launchAsteroid = useCallback((x: number, y: number) => {
    if (isLaunching) return;
    
    setIsLaunching(true);
    console.log('🚀 Launching asteroid at:', { x, y });
    
    const material = ASTEROID_MATERIALS[asteroidConfig.material];
    const animationDuration = 3000 / asteroidConfig.speed * 100;

    // Calcular efectos de impacto basados en la configuración
    const craterSize = Math.round(200 * (asteroidConfig.diameter / 50) * material.density);
    const explosionSize = Math.round(600 * (asteroidConfig.diameter / 50) * material.density * (asteroidConfig.speed / 100));
    const energy = Math.round(100 * (asteroidConfig.diameter / 50) * material.density * (asteroidConfig.speed / 100));

    // Crear nuevo asteroide
    const newAsteroid: Asteroid = {
      id: nextId,
      startX: Math.random() * 20 + 40,
      startY: -10,
      endX: x,
      endY: y,
      isAnimating: true,
      config: { ...asteroidConfig }
    };

    setAsteroids(prev => [...prev, newAsteroid]);
    setNextId(prev => prev + 1);

    // Después de que termine la animación, agregar impacto y remover asteroide
    setTimeout(() => {
      setWhiteFlash(true);
      setTimeout(() => setWhiteFlash(false), 200);
      
      const impactData = {
        x, y, id: nextId, craterSize, explosionSize, energy,
        location: selectedLocation || { lat: 0, lng: 0 }
      };
      
      setImpacts(prev => [...prev, impactData]);
      setAsteroids(prev => prev.filter(a => a.id !== newAsteroid.id));
      
      // Notificar al componente padre sobre el impacto
      onImpact?.(impactData);
      
      setTimeout(() => {
        setIsLaunching(false);
      }, 1000);
    }, animationDuration);
  }, [nextId, asteroidConfig, selectedLocation, onImpact, isLaunching]);

  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    launchAsteroid(x, y);
  }, [launchAsteroid]);

  const resetAnimation = () => {
    setImpacts([]);
    setAsteroids([]);
    setNextId(1);
    setWhiteFlash(false);
    setIsLaunching(false);
  };

  const toggleConfigPanel = () => {
    setConfigPanelVisible(!configPanelVisible);
  };

  return (
    <div className="relative w-full h-96 bg-gray-800/50 rounded-lg border border-gray-600 overflow-hidden">
      {/* Canvas del simulador */}
      <div 
        className="w-full h-full cursor-crosshair relative"
        onClick={handleMapClick}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        {/* Estrellas de fondo */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: Math.random() > 0.5 ? '#FF1B8D' : '#00D4FF',
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}

        {/* Asteroides */}
        <AnimatePresence>
          {asteroids.map((asteroid) => {
            const material = ASTEROID_MATERIALS[asteroid.config.material];
            const asteroidSize = Math.max(4, asteroid.config.diameter / 10);
            const animationDuration = 3000 / asteroid.config.speed * 100;
            
            return (
              <motion.div
                key={asteroid.id}
                className="absolute rounded-full"
                style={{
                  width: `${asteroidSize}px`,
                  height: `${asteroidSize}px`,
                  background: material.gradient,
                  boxShadow: `0 0 ${asteroidSize * 5}px ${material.glowColor}, 0 0 ${asteroidSize * 10}px ${material.trailColor}`,
                  left: `${asteroid.startX}%`,
                  top: `${asteroid.startY}%`,
                  border: asteroid.config.material === 'diamond' ? `2px solid ${material.glowColor}` : 'none',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.5,
                  opacity: 1,
                }}
                animate={{
                  x: `${(asteroid.endX - asteroid.startX) * (window.innerWidth / 100)}px`,
                  y: `${(asteroid.endY - asteroid.startY) * (window.innerHeight / 100)}px`,
                  scale: [0.3, 0.8, 1.2 + asteroid.config.diameter / 100, 1.0, 0.8],
                  opacity: [0, 0.8, 1, 1, 0],
                  rotate: [0, 180, 360, 540, 720],
                }}
                transition={{
                  duration: animationDuration / 1000,
                  ease: [0.25, 0.1, 0.25, 1],
                  times: [0, 0.2, 0.6, 0.8, 1],
                }}
                exit={{ opacity: 0 }}
              >
                {/* Estela del asteroide */}
                <motion.div
                  className="absolute opacity-80"
                  style={{
                    top: `-${asteroidSize * 3}px`,
                    left: `${asteroidSize / 4}px`,
                    width: `${asteroidSize * 0.8}px`,
                    height: `${asteroidSize * 3}px`,
                    background: `linear-gradient(180deg, transparent 0%, ${material.trailColor}40 20%, ${material.trailColor}80 40%, ${material.glowColor} 60%, ${material.glowColor} 100%)`,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    filter: 'blur(1px)',
                    boxShadow: `0 0 ${asteroidSize}px ${material.glowColor}40`,
                  }}
                  animate={{
                    scaleY: [0, 1.2, 0.8],
                    opacity: [0, 1, 0.6],
                    scaleX: [0.5, 1, 0.8],
                  }}
                  transition={{
                    duration: animationDuration / 1000,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Cráteres de impacto */}
        <AnimatePresence>
          {impacts.map((impact) => (
            <motion.div
              key={impact.id}
              className="absolute pointer-events-none"
              style={{
                left: `${impact.x}%`,
                top: `${impact.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Explosión */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,200,0.95) 8%, rgba(255,200,100,0.9) 15%, rgba(255,140,66,0.85) 25%, rgba(255,107,53,0.8) 35%, rgba(255,69,0,0.7) 50%, rgba(200,50,0,0.5) 70%, rgba(100,20,0,0.3) 85%, transparent 100%)`,
                  width: `${impact.explosionSize}px`,
                  height: `${impact.explosionSize}px`,
                  marginLeft: `-${impact.explosionSize / 2}px`,
                  marginTop: `-${impact.explosionSize / 2}px`,
                  filter: 'blur(1px)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1.8, 1.2, 1], 
                  opacity: [1, 0.95, 0.8, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
              
              {/* Cráter permanente */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: `${impact.craterSize}px`,
                  height: `${impact.craterSize}px`,
                  marginLeft: `-${impact.craterSize / 2}px`,
                  marginTop: `-${impact.craterSize / 2}px`,
                  background: `radial-gradient(ellipse at 30% 30%, rgba(40,20,10,1) 0%, rgba(60,30,15,0.95) 20%, rgba(80,40,20,0.9) 40%, rgba(101,67,33,0.85) 60%, rgba(139,69,19,0.8) 80%, rgba(160,82,45,0.6) 90%, transparent 100%)`,
                  boxShadow: `inset 0 0 ${impact.craterSize * 0.2}px rgba(0,0,0,0.9), inset 0 0 ${impact.craterSize * 0.4}px rgba(40,20,10,0.8)`,
                  border: `3px solid rgba(40,20,10,0.9)`,
                  filter: 'contrast(1.2) brightness(0.8)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.05, 0.98, 1], 
                  opacity: [0, 0.7, 0.9, 1],
                }}
                transition={{ 
                  duration: 1.0,
                  delay: 0.8,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                >
                  CRÁTER {Math.round(impact.craterSize)}m
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Panel de configuración */}
      {configPanelVisible && (
        <div className="absolute top-4 left-4 z-10 w-80">
          <div className="bg-black/80 border border-gray-600 rounded-lg backdrop-blur-sm text-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Configuración del Asteroide</h3>
              <button
                onClick={toggleConfigPanel}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Diámetro */}
              <div>
                <label className="block text-sm mb-2">Diámetro: {asteroidConfig.diameter}m</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={asteroidConfig.diameter}
                  onChange={(e) => setAsteroidConfig(prev => ({ ...prev, diameter: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Velocidad */}
              <div>
                <label className="block text-sm mb-2">Velocidad: {asteroidConfig.speed}%</label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={asteroidConfig.speed}
                  onChange={(e) => setAsteroidConfig(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm mb-2">Material</label>
                <select
                  value={asteroidConfig.material}
                  onChange={(e) => setAsteroidConfig(prev => ({ ...prev, material: e.target.value as any }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  {Object.entries(ASTEROID_MATERIALS).map(([key, material]) => (
                    <option key={key} value={key}>
                      {material.icon} {material.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleConfigPanel}
          className="bg-black/70 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-colors mr-2"
        >
          ⚙️
        </button>
        <button
          onClick={resetAnimation}
          className="bg-black/70 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
        >
          🔄
        </button>
      </div>

      {/* Instrucciones */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm max-w-sm">
        <h3 className="font-bold mb-1">Simulador de Impacto</h3>
        <p className="text-sm opacity-90">
          Haz clic en cualquier lugar para lanzar un asteroide y crear un cráter de impacto.
        </p>
      </div>

      {/* Flash blanco */}
      <AnimatePresence>
        {whiteFlash && (
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.9, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: "easeInOut",
              times: [0, 0.1, 0.3, 0.7, 1],
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
