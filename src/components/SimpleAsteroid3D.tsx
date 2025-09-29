import React from 'react';
import { motion } from 'motion/react';

interface SimpleAsteroid3DProps {
  asteroidType: 'metallic' | 'rocky' | 'icy';
  dangerLevel: 'low' | 'medium' | 'high' | 'extreme';
  composition: string[];
}

export function SimpleAsteroid3D({ asteroidType, dangerLevel, composition }: SimpleAsteroid3DProps) {
  const getBorderGlow = () => {
    switch (dangerLevel) {
      case 'low': return '#00FF00';
      case 'medium': return '#FFFF00';
      case 'high': return '#FF6B35';
      case 'extreme': return '#FF0000';
    }
  };

  const getDangerText = () => {
    switch (dangerLevel) {
      case 'low': return 'SEGURO';
      case 'medium': return 'MODERADO';
      case 'high': return 'ALTO';
      case 'extreme': return 'EXTREMO';
    }
  };

  const getAsteroidColors = () => {
    switch (asteroidType) {
      case 'metallic':
        return {
          base: '#1a2f4a',
          metallic1: '#4a7ba7',
          metallic2: '#6b9bd2',
          gold1: '#d4a574',
          gold2: '#e6b800',
          gold3: '#ffd700',
          dark: '#0f1a2a',
          highlight: '#87ceeb',
          glow: '#00d4ff'
        };
      case 'rocky':
        return {
          base: '#2d2520',
          metallic1: '#5d4e37',
          metallic2: '#8b7d6b',
          gold1: '#a0522d',
          gold2: '#cd853f',
          gold3: '#daa520',
          dark: '#1a1511',
          highlight: '#bc9a6a',
          glow: '#ff6b35'
        };
      case 'icy':
        return {
          base: '#1e3a5f',
          metallic1: '#4682b4',
          metallic2: '#87ceeb',
          gold1: '#5f9ea0',
          gold2: '#00ced1',
          gold3: '#40e0d0',
          dark: '#0f1e2f',
          highlight: '#b0e0e6',
          glow: '#00ffff'
        };
    }
  };

  const colors = getAsteroidColors();

  return (
    <div className="relative w-[280px] h-[280px] mx-auto">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${getBorderGlow()}`,
          boxShadow: `
            0 0 30px ${getBorderGlow()}40,
            0 0 60px ${getBorderGlow()}20,
            inset 0 0 30px ${getBorderGlow()}10
          `
        }}
        animate={{
          boxShadow: [
            `0 0 30px ${getBorderGlow()}40, 0 0 60px ${getBorderGlow()}20, inset 0 0 30px ${getBorderGlow()}10`,
            `0 0 50px ${getBorderGlow()}60, 0 0 80px ${getBorderGlow()}30, inset 0 0 40px ${getBorderGlow()}20`,
            `0 0 30px ${getBorderGlow()}40, 0 0 60px ${getBorderGlow()}20, inset 0 0 30px ${getBorderGlow()}10`
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main asteroid container */}
      <div className="absolute inset-3 overflow-hidden rounded-full">
        {/* Asteroid image with 3D effects */}
        <motion.div
          className="w-full h-full relative rounded-full overflow-hidden"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Base asteroid image */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, ${colors.metallic2} 0%, ${colors.metallic1} 25%, ${colors.base} 50%, ${colors.dark} 100%),
                radial-gradient(circle at 70% 70%, ${colors.gold2} 0%, ${colors.gold1} 30%, transparent 60%)
              `
            }}
          />

          {/* Metallic shine effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 30% 20% at 25% 25%, rgba(255, 215, 0, 0.5) 0%, rgba(255, 140, 0, 0.3) 25%, transparent 60%),
                radial-gradient(ellipse 25% 25% at 75% 35%, rgba(70, 130, 180, 0.4) 0%, rgba(135, 206, 235, 0.2) 30%, transparent 55%)
              `,
              mixBlendMode: 'screen'
            }}
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Depth shadows for 3D effect */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 120% 100% at 150% 150%, rgba(0, 0, 0, 0.4) 0%, transparent 40%),
                radial-gradient(ellipse 80% 60% at -20% -20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
              `,
              mixBlendMode: 'multiply'
            }}
          />
        </motion.div>
      </div>

      {/* Composition badge (top-right) */}
      <motion.div
        className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs backdrop-blur-md border"
        style={{
          background: 'rgba(0, 212, 255, 0.15)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          fontFamily: 'Orbitron, monospace'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[#00D4FF] uppercase tracking-wider">
          {asteroidType}
        </span>
      </motion.div>

      {/* Danger level badge (bottom-left) */}
      <motion.div
        className="absolute -bottom-2 -left-2 px-3 py-1 rounded-full text-xs backdrop-blur-md border"
        style={{
          background: `rgba(${dangerLevel === 'extreme' ? '255, 0, 0' : dangerLevel === 'high' ? '255, 107, 53' : dangerLevel === 'medium' ? '255, 255, 0' : '0, 255, 0'}, 0.15)`,
          border: `1px solid ${getBorderGlow()}50`,
          fontFamily: 'Orbitron, monospace'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span 
          className="uppercase tracking-wider"
          style={{ color: getBorderGlow() }}
        >
          {getDangerText()}
        </span>
      </motion.div>
    </div>
  );
}
