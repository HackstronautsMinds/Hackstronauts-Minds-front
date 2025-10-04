import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { agents, Agent } from '../../../data/agents';
import NEOSection from '../../sections/NEOSection';


export default function AgentSelector() {
  const [hoveredScientist, setHoveredScientist] = useState<Agent | null>(null);
  const [selectedScientist, setSelectedScientist] = useState<Agent | null>(null);
  const [showNEOSection, setShowNEOSection] = useState(false);

  const handleMouseEnter = (scientist: Agent) => {
    setHoveredScientist(scientist);
  };

  const handleMouseLeave = () => {
    setHoveredScientist(null);
  };

  const handleClick = (scientist: Agent) => {
    if (selectedScientist?.id === scientist.id) {
      setSelectedScientist(null);
    } else {
      setSelectedScientist(scientist);
    }
  };

  const handleAnalyzeData = () => {
    setShowNEOSection(true);
  };

  // El agente a mostrar es el seleccionado (si existe) o el hovered
  const displayScientist = selectedScientist || hoveredScientist;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black py-20">
      {/* Fondo negro sólido */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Fondo espacial con gradiente radial */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, #FF1B8D 0%, #8B2C7E 20%, #4A1B5C 40%, #2D4A5E 60%, transparent 80%, transparent 100%)'
        }}
      />
      
      {/* Estrellas de fondo */}
      <div className="absolute inset-0">
        {/* Estrellas pequeñas */}
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={`small-${i}`}
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
        
        {/* Estrellas medianas */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              backgroundColor: Math.random() > 0.5 ? '#FF1B8D' : '#00D4FF',
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              boxShadow: `0 0 ${Math.random() * 8 + 4}px ${Math.random() > 0.5 ? '#FF1B8D' : '#00D4FF'}`,
            }}
          />
        ))}
        
        {/* Estrellas grandes y brillantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 3}px`,
              height: `${Math.random() * 4 + 3}px`,
              backgroundColor: Math.random() > 0.5 ? '#FF1B8D' : '#00D4FF',
              opacity: Math.random() * 0.9 + 0.1,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 5 + 4}s`,
              boxShadow: `0 0 ${Math.random() * 12 + 8}px ${Math.random() > 0.5 ? '#FF1B8D' : '#00D4FF'}`,
            }}
          />
        ))}
      </div>

      {/* Contenedor principal - para mover todo el bloque */}
      <div className="relative z-10 w-full min-h-screen flex items-end justify-center px-4 sm:px-8 pb-32">
        
        {/* CONTENEDOR PRINCIPAL - envuelve animación central y científicos */}
        <div className="relative w-full max-w-5xl flex flex-col items-center mx-auto lg:mr-[200px] xl:mr-[300px] lg:ml-[-100px] xl:ml-[-200px]">
          
          {/* CONTENEDOR DE ANIMACIÓN CENTRAL */}
          <div className="absolute z-0 flex items-center justify-center pointer-events-none " style={{ top: '50%', transform: 'translateY(-170%)' }}>
            <AnimatePresence mode="wait">
              {hoveredScientist && (
                <motion.div
                  key={hoveredScientist.id}
                  initial={{ scale: 0.5, opacity: 0, y: 30 }}
                  animate={{ scale: 1.2, opacity: 1, y: 0 }}
                  exit={{ scale: 0.5, opacity: 0, y: 30 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.3
                  }}
                  className="relative top-[220px]"
                  style={{
                    top: '200px'
                  }}
                >
                  {/* Imagen grande - avatar1.png */}
                  <img
                    src="/src/assets/images/avatar1.png"
                    alt="Avatar"
                    className="w-[120px] h-[150px] sm:w-[150px] sm:h-[188px] md:w-[180px] md:h-[225px] lg:w-[200px] lg:h-[250px] xl:w-[220px] xl:h-[275px] object-cover rounded-3xl border-4 border-pink-500 shadow-[0_0_40px_rgba(255,28,141,0.9)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CONTENEDOR DE CIENTÍFICOS - abarca todas las imágenes de científicos */}
          <div className="absolute bottom-0 left-[70%] z-10 flex flex-col items-center" style={{ bottom: '60px' }}>
            
            {/* CONTENEDOR FILA SUPERIOR - 2+2 científicos */}
            <div className="flex justify-between items-center mb-8 sm:mb-12 lg:mb-16" style={{ width: '100%', gap: 'min(200px, max(50px, 15vw))' }}>
              
                  {/* Fila izquierda: 2 agentes */}
                  <div className="flex gap-1 sm:gap-2">
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
                  <div className="flex gap-1 sm:gap-2">
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
                  <div className="flex gap-1 sm:gap-2">
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

            {/* CONTENEDOR SEPARADO PARA VENTANA DE GLASSMORPHISM */}
            <div className="absolute top-0 !right-[10px] h-full z-20 flex items-center justify-start pl-8" style={{ right: '100px' }}>
              <AnimatePresence>
                {hoveredScientist && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-xs sm:max-w-sm lg:max-w-md"
                  >
                    <ScientistInfoWindow scientist={hoveredScientist} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
      </div>


      {/* Sección NEOs */}
      <NEOSection 
        isOpen={showNEOSection} 
        onClose={() => setShowNEOSection(false)} 
      />

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
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative cursor-pointer group ${
        isDimmed
          ? 'opacity-25 blur-[2px] grayscale'
          : 'opacity-100'
      }`}
      style={{
        width: 'min(140px, max(105px, 8vw))',
        height: 'min(175px, max(131px, 10vw))',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
    >
      <img
        src={scientist.image}
        alt={scientist.name}
        className="w-full h-full object-cover"
      />
      
      {/* Solo esquinas con borde grueso en hover */}
      {/* Esquina superior izquierda */}
      <div 
        className="absolute -top-1 -left-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderTop: '6px solid #00D4FF',
          borderLeft: '6px solid #00D4FF',
          boxShadow: '0 0 10px #00D4FF'
        }}
      />
      
      {/* Esquina superior derecha */}
      <div 
        className="absolute -top-1 -right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderTop: '6px solid #00D4FF',
          borderRight: '6px solid #00D4FF',
          boxShadow: '0 0 10px #00D4FF'
        }}
      />
      
      {/* Esquina inferior izquierda */}
      <div 
        className="absolute -bottom-1 -left-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderBottom: '6px solid #00D4FF',
          borderLeft: '6px solid #00D4FF',
          boxShadow: '0 0 10px #00D4FF'
        }}
      />
      
      {/* Esquina inferior derecha */}
      <div 
        className="absolute -bottom-1 -right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderBottom: '6px solid #00D4FF',
          borderRight: '6px solid #00D4FF',
          boxShadow: '0 0 10px #00D4FF'
        }}
      />
    </div>
  );
}

// Componente de ventana de información del agente
interface ScientistInfoWindowProps {
  scientist: Agent;
}

function ScientistInfoWindow({ scientist }: ScientistInfoWindowProps) {
  return (
    <motion.div
      className="relative w-full h-[350px] rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(5, 10, 30, 0.4)',
        backdropFilter: 'blur(40px)',
        border: `2px solid ${scientist.color}`,
        boxShadow: `0 0 80px ${scientist.color}30, 0 0 200px ${scientist.color}20, inset 0 0 100px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Grid de fondo */}
      <div className="absolute inset-0 opacity-8">
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
      <div className="relative z-10 p-4 h-full flex flex-col gap-3 overflow-y-auto">
        {/* Header y info principal */}
        <div className="flex flex-col">
          {/* Header épico */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative ">
              <motion.div
                className="absolute -inset-1 rounded-full"
                style={{
                  border: `2px solid ${scientist.color}`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div
                className="w-12 h-12 rounded-full overflow-hidden border-2 relative"
                style={{
                  borderColor: scientist.color,
                  boxShadow: `0 0 15px ${scientist.color}60`,
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
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{scientist.icon}</span>
                <h3 
                  className="text-white text-base font-black uppercase"
                  style={{
                    textShadow: `0 0 15px ${scientist.color}60`,
                  }}
                >
                  {scientist.name}
                </h3>
                <span 
                  className="px-2 py-1 text-sm font-bold rounded-full"
                  style={{
                    backgroundColor: `${scientist.color}20`,
                    color: scientist.color,
                    border: `1px solid ${scientist.color}40`,
                  }}
                >
                  {scientist.rank}
                </span>
              </div>
              <p 
                className="text-sm font-bold uppercase tracking-wider mb-1"
                style={{ color: scientist.color }}
              >
                {scientist.role}
              </p>
              <p className="text-gray-300 text-sm italic">"{scientist.quote}"</p>
            </div>
          </div>

          {/* Tagline épico */}
          <div className="mb-3 p-2 rounded-lg" style={{ backgroundColor: `${scientist.color}10` }}>
            <p className="text-white text-sm font-bold">{scientist.tagline}</p>
          </div>

          {/* One-liner */}
          <div className="mb-3">
            <p className="text-gray-200 text-sm leading-relaxed">{scientist.oneLiner}</p>
          </div>
        </div>

        {/* Habilidades y ciencias */}
        <div className="flex flex-col">

            {/* Habilidad firma */}
            <div className="mb-3 p-2 rounded-lg border" style={{ 
              backgroundColor: `${scientist.color}10`,
              borderColor: `${scientist.color}40`
            }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{scientist.icon}</span>
                <span className="text-white font-bold text-sm">{scientist.signatureAbility.name}</span>
              </div>
              <p className="text-gray-300 text-sm">{scientist.signatureAbility.description}</p>
            </div>

            {/* Confianza y Ciencias en una fila */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-bold uppercase">Confianza:</span>
                <span 
                  className="px-2 py-1 text-sm font-bold rounded-full"
                  style={{
                    backgroundColor: scientist.confidence === 'ALTA' ? '#00FF7F' : scientist.confidence === 'MEDIA' ? '#FFD700' : '#FF6B6B',
                    color: '#000'
                  }}
                >
                  {scientist.confidence}
                </span>
              </div>
              <div className="flex gap-1">
                {scientist.sciences.slice(0, 2).map((science, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm rounded-full"
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


        </div>

        {/* Responsabilidades y logros */}
        <div className="flex flex-col">

            {/* Responsabilidades compactas */}
            <div className="mb-3">
              <h4 className="text-white text-sm font-bold uppercase mb-2">Responsabilidades</h4>
              <div className="space-y-1 max-h-16 overflow-y-auto">
                {scientist.responsibilities.slice(0, 3).map((responsibility, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: scientist.color }}
                    />
                    <span className="text-gray-300 text-sm">{responsibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logros compactos */}
            <div className="mb-3">
              <h4 className="text-white text-sm font-bold uppercase mb-2">Logros</h4>
              <div className="space-y-1 max-h-16 overflow-y-auto">
                {scientist.achievements.slice(0, 2).map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-1 rounded"
                    style={{
                      backgroundColor: `${scientist.color}10`,
                      border: `1px solid ${scientist.color}30`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: scientist.color }}
                    />
                    <span className="text-gray-300 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA épico */}
            <div className="mt-auto">
              <button 
                className="w-full py-2 px-3 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 text-sm"
                style={{
                  backgroundColor: scientist.color,
                  color: '#000',
                  boxShadow: `0 0 15px ${scientist.color}60`
                }}
              >
                {scientist.cta}
              </button>
            </div>
        </div>
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