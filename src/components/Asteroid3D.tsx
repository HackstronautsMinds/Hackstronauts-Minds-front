import React from 'react';
import { motion } from 'motion/react';
import asteroidImage from '../assets/images/asteroid-psyche.png';

interface Asteroid3DProps {
  asteroidType: 'metallic' | 'rocky' | 'icy';
  dangerLevel: 'low' | 'medium' | 'high' | 'extreme';
  composition: string[];
}

export function Asteroid3D({ asteroidType, dangerLevel, composition }: Asteroid3DProps) {
  return (
    <div className="w-full h-full relative rounded-full overflow-hidden">
      {/* Imagen real del asteroide */}
      <img
        src={asteroidImage}
        alt="Asteroid Psyche-16"
        className="w-full h-full object-cover rounded-full"
        style={{
          filter: `
            brightness(1.1)
            contrast(1.2)
            saturate(1.3)
            hue-rotate(5deg)
          `,
          animation: 'rotateAsteroid 20s linear infinite',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        onError={(e) => {
          console.error('Error loading asteroid image:', e);
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />

      {/* Advanced scanning effect */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      >
        {/* Horizontal scan line */}
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          animate={{ 
            y: [-30, 320],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: 2,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.9), 0 0 30px rgba(0, 255, 255, 0.5)'
          }}
        />
        
        {/* Vertical scan line */}
        <motion.div
          className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-orange-300 to-transparent"
          animate={{ 
            x: [-30, 320],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: 4,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 12px rgba(255, 165, 0, 0.8), 0 0 25px rgba(255, 165, 0, 0.4)'
          }}
        />
      </motion.div>
    </div>
  );
}