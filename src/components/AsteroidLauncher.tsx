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
      console.log('🚀 Launching asteroid at position:', mapClickPosition);
      
      // Simular lanzamiento de asteroide
      setIsLaunching(true);
      
      // Crear trail de partículas
      const newTrail = [];
      for (let i = 0; i < 15; i++) {
        newTrail.push({
          x: mapClickPosition.x + (Math.random() - 0.5) * 8,
          y: mapClickPosition.y + (Math.random() - 0.5) * 8,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      setTrail(newTrail);

      // Limpiar después de la animación
      setTimeout(() => {
        setIsLaunching(false);
        setTrail([]);
        onPositionUsed?.();
      }, 3000);
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
            className="absolute w-3 h-3 bg-orange-400 rounded-full shadow-lg"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 0],
              opacity: [0, particle.opacity, 0],
              x: [0, (Math.random() - 0.5) * 60],
              y: [0, (Math.random() - 0.5) * 60]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 2.5,
              delay: index * 0.05,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Explosión central */}
      <motion.div
        className="absolute w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-2xl"
        style={{
          left: `${mapClickPosition.x}%`,
          top: `${mapClickPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 4, 0],
          opacity: [1, 0.9, 0],
          boxShadow: [
            '0 0 0px #ff6b35',
            '0 0 40px #ff6b35',
            '0 0 80px #ff6b35'
          ]
        }}
        transition={{ 
          duration: 2,
          ease: "easeOut"
        }}
      />

      {/* Onda de choque */}
      <motion.div
        className="absolute border-4 border-yellow-300 rounded-full"
        style={{
          left: `${mapClickPosition.x}%`,
          top: `${mapClickPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ 
          width: 300,
          height: 300,
          opacity: 0
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut",
          delay: 0.2
        }}
      />

      {/* Segunda onda de choque */}
      <motion.div
        className="absolute border-2 border-red-400 rounded-full"
        style={{
          left: `${mapClickPosition.x}%`,
          top: `${mapClickPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ width: 0, height: 0, opacity: 0.8 }}
        animate={{ 
          width: 500,
          height: 500,
          opacity: 0
        }}
        transition={{ 
          duration: 2,
          ease: "easeOut",
          delay: 0.5
        }}
      />
    </div>
  );
}
