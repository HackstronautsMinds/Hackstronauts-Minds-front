import React from 'react';
import { motion } from 'motion/react';
// @ts-ignore
import asteroidImage from '../../assets/images/asteroid-psyche.jpg';

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
          animation: 'rotateAsteroid 15s linear infinite',
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
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        {/* Horizontal scan line */}
        <motion.div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          animate={{ 
            y: [-20, 300],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: 1,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)'
          }}
        />
        
        {/* Vertical scan line */}
        <motion.div
          className="absolute h-full w-1 bg-gradient-to-b from-transparent via-orange-300 to-transparent"
          animate={{ 
            x: [-20, 300],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: 2.5,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 15px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 165, 0, 0.6)'
          }}
        />
      </motion.div>
    </div>
  );
}