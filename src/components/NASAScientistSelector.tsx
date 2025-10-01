import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NASAScientist {
  id: string;
  name: string;
  role: string;
  bio: string;
  achievements: string[];
  image: string;
}

const nasaScientists: NASAScientist[] = [
  {
    id: "data",
    name: "Dr. Data",
    role: "Recolector de Datos",
    bio: "Recolecta datos de telescopios y satélites para entender el cosmos.",
    achievements: [
      "Análisis de 10,000+ imágenes espaciales",
      "Detección de exoplanetas ocultos",
      "Creación de bases de datos astronómicas"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face"
  },
  {
    id: "orbital",
    name: "Dra. Orbital",
    role: "Calculadora de Órbitas",
    bio: "Calcula trayectorias y órbitas de cuerpos celestes con precisión milimétrica.",
    achievements: [
      "Predicción de colisiones orbitales",
      "Optimización de misiones espaciales",
      "Modelado de sistemas planetarios"
    ],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face"
  },
  {
    id: "impact",
    name: "Dr. Impact",
    role: "Analista de Impactos",
    bio: "Analiza qué pasaría si un asteroide impactara la Tierra o cualquier planeta.",
    achievements: [
      "Simulaciones de impactos catastróficos",
      "Evaluación de riesgos planetarios",
      "Desarrollo de modelos de defensa planetaria"
    ],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face"
  },
  {
    id: "mitigation",
    name: "Dra. Mitigation",
    role: "Planificadora de Mitigación",
    bio: "Planifica cómo evitar desastres cósmicos mediante estrategias de defensa.",
    achievements: [
      "Diseño de misiones de desviación",
      "Coordinación internacional de defensa planetaria",
      "Implementación de protocolos de emergencia"
    ],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face"
  },
  {
    id: "visualization",
    name: "Dr. Visualization",
    role: "Creador de Gráficos",
    bio: "Crea gráficos, mapas y visualizaciones para hacer comprensible lo complejo.",
    achievements: [
      "Visualización de campos gravitacionales",
      "Mapas 3D de asteroides",
      "Infografías interactivas para la NASA"
    ],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face"
  },
  {
    id: "ml",
    name: "Dra. ML",
    role: "Experta en IA",
    bio: "Entrena modelos de inteligencia artificial para predecir eventos cósmicos.",
    achievements: [
      "Predicción de trayectorias con IA",
      "Clasificación automática de objetos espaciales",
      "Reducción de falsos positivos en alertas"
    ],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face"
  },
  {
    id: "explainer",
    name: "Dr. Explainer",
    role: "Explicador Científico",
    bio: "Explica todo en lenguaje simple para que todos puedan entender la ciencia espacial.",
    achievements: [
      "Más de 1 millón de seguidores en redes",
      "Videos educativos virales",
      "Colaboración con canales de divulgación científica"
    ],
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop&crop=face"
  }
];

export default function NASAScientistSelector() {
  const [hoveredScientist, setHoveredScientist] = useState<NASAScientist | null>(null);

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
        <div className="relative w-full max-w-5xl flex flex-col items-center" style={{ marginRight: '500px', marginLeft: '-220px' }}>
          
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
              
              {/* Fila izquierda: 2 científicos */}
              <div className="flex gap-2">
                {nasaScientists.slice(0, 2).map((scientist) => (
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

              {/* Fila derecha: 2 científicos */}
              <div className="flex gap-2">
                {nasaScientists.slice(2, 4).map((scientist) => (
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

            {/* CONTENEDOR FILA INFERIOR - 3 científicos */}
            <div className="flex justify-center">
              <div className="flex gap-2">
                {nasaScientists.slice(4).map((scientist) => (
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
      </div>
    </section>
  );
}

interface ScientistCardProps {
  scientist: NASAScientist;
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