
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { agents, Agent } from '../data/agents';


export default function AgentSelector() {
  const [hoveredScientist, setHoveredScientist] = useState<Agent | null>(null);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black py-20">
      {/* Fondo con gradiente radial */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #FF1B8D 0%, #8B2C7E 25%, #4A1B5C 50%, #2D4A5E 75%, #1B5C68 100%)'
        }}
      />

      {/* Contenedor principal - para mover todo el bloque */}
      <div className="relative z-10 w-full min-h-screen flex items-end justify-center px-8 pb-32">
        
        {/* CONTENEDOR PRINCIPAL - envuelve animación central y científicos */}
        <div className="relative w-full max-w-5xl flex flex-col items-center" style={{ marginRight: '420px', marginLeft: '-220px' }}>
          
          {/* CONTENEDOR DE ANIMACIÓN CENTRAL */}
          <div className="absolute z-0 flex items-center justify-center pointer-events-none" style={{ top: '50%', transform: 'translateY(-170%)' }}>
            <AnimatePresence mode="wait">
              {hoveredScientist && (
                <motion.div
                  key={hoveredScientist.id}
                  initial={{ scale: 0.5, opacity: 0, y: 30 }}
                  animate={{ scale: 1.5, opacity: 1, y: 0 }}
                  exit={{ scale: 0.5, opacity: 0, y: 30 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.3
                  }}
                  className="relative"
                >
                  {/* Imagen grande - avatar1.png */}
                  <img
                    src="/src/assets/images/avatar1.png"
                    alt="Avatar"
                    className="w-[350px] h-[450px] sm:w-[400px] sm:h-[500px] md:w-[450px] md:h-[550px] object-cover rounded-3xl border-4 border-pink-500 shadow-[0_0_40px_rgba(255,28,141,0.9)] "
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CONTENEDOR DE CIENTÍFICOS - abarca todas las imágenes de científicos */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center" style={{ bottom: '60px' }}>
            
            {/* CONTENEDOR FILA SUPERIOR - 2+2 científicos */}
            <div className="flex justify-between items-center mb-16" style={{ width: '100%', gap: '200px' }}>
              
                  {/* Fila izquierda: 2 agentes */}
                  <div className="flex gap-2">
                    {agents.slice(0, 2).map((scientist) => (
                  <ScientistCard
                    key={scientist.id}
                    scientist={scientist}
                    isSelected={hoveredScientist?.id === scientist.id}
                    isDimmed={hoveredScientist !== null && hoveredScientist.id !== scientist.id}
                    onMouseEnter={() => setHoveredScientist(scientist)}
                    onMouseLeave={() => setHoveredScientist(null)}
                  />
                ))}
              </div>

                  {/* Fila derecha: 2 agentes */}
                  <div className="flex gap-2">
                    {agents.slice(2, 4).map((scientist) => (
                  <ScientistCard
                    key={scientist.id}
                    scientist={scientist}
                    isSelected={hoveredScientist?.id === scientist.id}
                    isDimmed={hoveredScientist !== null && hoveredScientist.id !== scientist.id}
                    onMouseEnter={() => setHoveredScientist(scientist)}
                    onMouseLeave={() => setHoveredScientist(null)}
                  />
                ))}
              </div>
            </div>

                {/* CONTENEDOR FILA INFERIOR - 3 agentes */}
                <div className="flex justify-center">
                  <div className="flex gap-2">
                    {agents.slice(4).map((scientist) => (
                  <ScientistCard
                    key={scientist.id}
                    scientist={scientist}
                    isSelected={hoveredScientist?.id === scientist.id}
                    isDimmed={hoveredScientist !== null && hoveredScientist.id !== scientist.id}
                    onMouseEnter={() => setHoveredScientist(scientist)}
                    onMouseLeave={() => setHoveredScientist(null)}
                  />
                ))}
              </div>
            </div>
            
          </div>
          
        </div>

        {/* VENTANA DE INFORMACIÓN DEL CIENTÍFICO - Lado derecho */}
        <AnimatePresence>
          {hoveredScientist && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-1/2 transform -translate-y-1/2 z-20"
              style={{ 
                left: '60%',
                width: '380px',
                marginLeft: '10px'
              }}
            >
              <ScientistInfoWindow scientist={hoveredScientist} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface ScientistCardProps {
  scientist: Agent;
  isSelected: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ScientistCard({ scientist, isSelected, isDimmed, onMouseEnter, onMouseLeave }: ScientistCardProps) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative cursor-pointer transition-all duration-300 ${
        isDimmed
          ? 'opacity-25 blur-[2px] grayscale'
          : 'opacity-100'
      }`}
      style={{
        width: '140px',
        height: '175px',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(0, 212, 255, 0.3)'
      }}
    >
      <img
        src={scientist.image}
        alt={scientist.name}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      
      {/* Marco con esquinas angulares animado - solo cuando está seleccionado */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Marco principal */}
            <div 
              className="absolute inset-0 border-4"
              style={{
                borderColor: '#00D4FF',
                boxShadow: '0 0 30px #00D4FF, inset 0 0 30px rgba(0, 212, 255, 0.5)'
              }}
            />
            
            {/* Esquina superior izquierda */}
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-3 -left-3 w-8 h-8"
              style={{
                borderTop: '6px solid #00D4FF',
                borderLeft: '6px solid #00D4FF',
                boxShadow: '0 0 25px #00D4FF'
              }}
            />
            
            {/* Esquina superior derecha */}
            <motion.div
              animate={{ 
                x: [0, -5, 0],
                y: [0, -5, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -top-3 -right-3 w-8 h-8"
              style={{
                borderTop: '6px solid #00D4FF',
                borderRight: '6px solid #00D4FF',
                boxShadow: '0 0 25px #00D4FF'
              }}
            />
            
            {/* Esquina inferior izquierda */}
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                y: [0, 5, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-3 -left-3 w-8 h-8"
              style={{
                borderBottom: '6px solid #00D4FF',
                borderLeft: '6px solid #00D4FF',
                boxShadow: '0 0 25px #00D4FF'
              }}
            />
            
            {/* Esquina inferior derecha */}
            <motion.div
              animate={{ 
                x: [0, -5, 0],
                y: [0, 5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute -bottom-3 -right-3 w-8 h-8"
              style={{
                borderBottom: '6px solid #00D4FF',
                borderRight: '6px solid #00D4FF',
                boxShadow: '0 0 25px #00D4FF'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Componente de ventana de información del agente
interface ScientistInfoWindowProps {
  scientist: Agent;
}

function ScientistInfoWindow({ scientist }: ScientistInfoWindowProps) {
  return (
    <motion.div
      className="relative w-[1300px] h-[750px] rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(5, 10, 30, 0.4)',
        backdropFilter: 'blur(40px)',
        border: `2px solid ${scientist.color}`,
        boxShadow: `0 0 80px ${scientist.color}30, 0 0 200px ${scientist.color}20, inset 0 0 100px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Grid de fondo */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} 
        />
      </div>

      {/* Marcos decorativos en las esquinas */}
      <CornerFrames color={scientist.color} />

      {/* Rayas de velocidad animadas */}
      <SpeedLines />


      {/* Contenido */}
      <div className="relative z-10 p-12 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <motion.div
              className="absolute -inset-2 rounded-full"
              style={{
                border: `3px solid ${scientist.color}`,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div
              className="w-16 h-16 rounded-full overflow-hidden border-2 relative"
              style={{
                borderColor: scientist.color,
                boxShadow: `0 0 20px ${scientist.color}60`,
              }}
            >
              <img
                src={scientist.image}
                alt={scientist.name}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, transparent 40%, ${scientist.color}20 50%, transparent 60%)`,
                }}
              />
            </div>
          </div>
          <div>
            <h3 
              className="text-white text-xl font-black uppercase"
              style={{
                textShadow: `0 0 20px ${scientist.color}60`,
              }}
            >
              {scientist.name}
            </h3>
            <p 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: scientist.color }}
            >
              {scientist.role}
            </p>
          </div>
        </div>

        {/* Especialidad */}
        <div className="mb-4">
          <h4 className="text-white text-sm font-bold uppercase mb-2">Especialidad</h4>
          <p className="text-gray-300 text-sm">{scientist.specialty}</p>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <h4 className="text-white text-sm font-bold uppercase mb-2">Descripción</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{scientist.description}</p>
        </div>

            {/* Ciencias */}
            <div className="mb-4">
              <h4 className="text-white text-sm font-bold uppercase mb-2">Ciencias</h4>
              <div className="flex flex-wrap gap-1">
                {scientist.sciences.map((science, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: `${scientist.color}20`,
                      color: scientist.color,
                      border: `1px solid ${scientist.color}40`,
                    }}
                  >
                    {science}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsabilidades */}
            <div className="mb-4">
              <h4 className="text-white text-sm font-bold uppercase mb-2">Responsabilidades</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {scientist.responsibilities.map((responsibility, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: scientist.color }}
                    />
                    <span className="text-gray-300 text-xs">{responsibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Importancia */}
            <div className="mb-4">
              <h4 className="text-white text-sm font-bold uppercase mb-2">Importancia</h4>
              <p className="text-gray-300 text-xs leading-relaxed">{scientist.importance}</p>
            </div>

            {/* Logros */}
            <div className="flex-1">
              <h4 className="text-white text-sm font-bold uppercase mb-3">Logros Destacados</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {scientist.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg"
                    style={{
                      backgroundColor: `${scientist.color}10`,
                      border: `1px solid ${scientist.color}30`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: scientist.color }}
                    />
                    <span className="text-gray-300 text-xs">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

        {/* Stats si están disponibles */}
        {scientist.stats && (
          <div className="mt-4">
            <h4 className="text-white text-sm font-bold uppercase mb-3">Atributos</h4>
            <div className="space-y-2">
              {Object.entries(scientist.stats).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs w-20 capitalize">{key}:</span>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${scientist.color}, ${scientist.color}80)`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-white text-xs w-8">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Información adicional si está disponible */}
        {(scientist.yearsOfService || scientist.missionsCompleted || scientist.rank) && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            <div className="grid grid-cols-3 gap-2 text-center">
              {scientist.yearsOfService && (
                <div>
                  <p className="text-gray-400 text-xs">Años</p>
                  <p className="text-white text-lg font-bold">{scientist.yearsOfService}</p>
                </div>
              )}
              {scientist.missionsCompleted && (
                <div>
                  <p className="text-gray-400 text-xs">Misiones</p>
                  <p className="text-white text-lg font-bold">{scientist.missionsCompleted}</p>
                </div>
              )}
              {scientist.rank && (
                <div>
                  <p className="text-gray-400 text-xs">Rango</p>
                  <p className="text-white text-sm font-bold">{scientist.rank}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Marcos decorativos en las esquinas
function CornerFrames({ color }: { color: string }) {
  return (
    <>
      {/* Esquina superior izquierda */}
      <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full border-t-4 border-l-4 rounded-tl-3xl"
          style={{ 
            borderColor: color,
            boxShadow: `0 0 30px ${color}80`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Esquina superior derecha */}
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-full h-full border-t-4 border-r-4 rounded-tr-3xl"
          style={{ 
            borderColor: color,
            boxShadow: `0 0 30px ${color}80`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
      </div>

      {/* Esquina inferior izquierda */}
      <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-full border-b-4 border-l-4 rounded-bl-3xl"
          style={{ 
            borderColor: color,
            boxShadow: `0 0 30px ${color}80`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>

      {/* Esquina inferior derecha */}
      <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-full border-b-4 border-r-4 rounded-br-3xl"
          style={{ 
            borderColor: color,
            boxShadow: `0 0 30px ${color}80`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.5,
          }}
        />
      </div>
    </>
  );
}

// Rayas de velocidad con colores cyan y rosa
function SpeedLines() {
  const colors = ['#00d4ff', '#FF1B8D', '#00d4ff', '#FF1B8D', '#00d4ff'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
      {/* Rayas horizontales superiores */}
      {colors.map((color, index) => (
        <motion.div
          key={`top-${index}`}
          className="absolute h-0.5 rounded-full"
          style={{
            top: `${10 + index * 3}%`,
            left: 0,
            width: '300px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`,
          }}
          animate={{
            x: ['0%', '400%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Rayas horizontales inferiores */}
      {colors.map((color, index) => (
        <motion.div
          key={`bottom-${index}`}
          className="absolute h-0.5 rounded-full"
          style={{
            bottom: `${10 + index * 3}%`,
            right: 0,
            width: '300px',
            background: `linear-gradient(270deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`,
          }}
          animate={{
            x: ['0%', '-400%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Rayas verticales izquierda */}
      {colors.slice(0, 3).map((color, index) => (
        <motion.div
          key={`left-${index}`}
          className="absolute w-0.5 rounded-full"
          style={{
            left: `${10 + index * 4}%`,
            top: 0,
            height: '200px',
            background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`,
          }}
          animate={{
            y: ['0%', '350%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: index * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Rayas verticales derecha */}
      {colors.slice(0, 3).map((color, index) => (
        <motion.div
          key={`right-${index}`}
          className="absolute w-0.5 rounded-full"
          style={{
            right: `${10 + index * 4}%`,
            bottom: 0,
            height: '200px',
            background: `linear-gradient(0deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`,
          }}
          animate={{
            y: ['0%', '-350%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: index * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}