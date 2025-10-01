import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AsteroidLauncherProps {
  onMapClick?: (lat: number, lng: number) => void;
  isVisible: boolean;
  mapClickPosition?: { x: number; y: number };
  onPositionUsed?: () => void;
}

export function AsteroidLauncher({ 
  onMapClick, 
  isVisible, 
  mapClickPosition, 
  onPositionUsed 
}: AsteroidLauncherProps) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; opacity: number }>>([]);

  useEffect(() => {
    if (mapClickPosition && isVisible) {
      // Simular lanzamiento de asteroide
      setIsLaunching(true);
      
      // Crear trail de partículas
      const newTrail = [];
      for (let i = 0; i < 20; i++) {
        newTrail.push({
          x: mapClickPosition.x + (Math.random() - 0.5) * 10,
          y: mapClickPosition.y + (Math.random() - 0.5) * 10,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      setTrail(newTrail);

      // Limpiar después de la animación
      setTimeout(() => {
        setIsLaunching(false);
        setTrail([]);
        onPositionUsed?.();
      }, 2000);
    }
  }, [mapClickPosition, isVisible, onPositionUsed]);

  if (!isVisible || !mapClickPosition) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Trail de partículas */}
      <AnimatePresence>
        {trail.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-orange-500 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, particle.opacity, 0],
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 2,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Explosión central */}
      <motion.div
        className="absolute w-8 h-8 bg-red-500 rounded-full"
        style={{
          left: `${mapClickPosition.x}%`,
          top: `${mapClickPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 3, 0],
          opacity: [1, 0.8, 0]
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut"
        }}
      />

      {/* Onda de choque */}
      <motion.div
        className="absolute border-2 border-yellow-400 rounded-full"
        style={{
          left: `${mapClickPosition.x}%`,
          top: `${mapClickPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ 
          width: 200,
          height: 200,
          opacity: 0
        }}
        transition={{ 
          duration: 1,
          ease: "easeOut"
        }}
      />
    </div>
  );
}
