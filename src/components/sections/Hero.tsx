import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../3d/AnimatedBackground';
import NASAScientistSelector from '../features/neo/NASAScientistSelector';
import { NEOList } from '../features/neo/NEOList';
import AsteroidSimulatorSection from '../simulation/AsteroidSimulatorSection';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Fondo animado con partículas */}
      <AnimatedBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Sección 1: Selección de Científicos NASA */}
        <section className="relative w-full min-h-screen bg-black py-8 lg:py-20">
          <div>
            <motion.div 
              className="text-center mb-8 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

            </motion.div>
            <NASAScientistSelector />
          </div>
        </section>
        
        {/* Sección 2: Visualización de Meteoritos/Asteroides */}
        <section className="relative w-full min-h-screen overflow-hidden bg-black py-8 lg:py-20">
          <div>
            <motion.div 
              className="text-center mb-8 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
                Near Earth Objects
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-6">
                Asteroides cercanos a la Tierra monitoreados en tiempo real por nuestro sistema de IA
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Datos en Tiempo Real</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-blue-400 font-semibold">IA Avanzada</span>
                </div>
              </div>
            </motion.div>
            <NEOList />
          </div>
        </section>
        
        {/* Sección 3: Simulación 3D */}
        <section 
          id="simulator-section"
          className="relative w-full min-h-screen overflow-hidden bg-black py-8 lg:py-20"
        >
          <div>
            <motion.div 
              className="text-center mb-8 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
                Simulación 3D de Impacto
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                Visualiza el impacto de asteroides en tiempo real con tecnología 3D avanzada
              </p>
            </motion.div>
            <AsteroidSimulatorSection />
          </div>
        </section>
        
        
        
        {/* Footer minimalista */}
        <footer className="relative py-16 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Logo y descripción */}
              <div>
                <h3 className="text-lg uppercase tracking-[0.15em] text-white mb-4">
                  NASA-LLM-GRAPH
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Explorando el cosmos a través de inteligencia artificial y 
                  grafos de conocimiento interconectados.
                </p>
              </div>
              
              {/* Links de navegación */}
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                  Navegación
                </div>
                <div className="space-y-2">
                  {['Datos', 'Modelos', 'Documentación', 'API'].map((link) => (
                    <a key={link} href="#" 
                       className="block text-sm text-white/60 hover:text-white/80 
                                  transition-colors duration-300">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Contacto */}
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                  Contacto
                </div>
                <div className="space-y-2">
                  {['Investigación', 'Soporte', 'Colaboraciones'].map((link) => (
                    <a key={link} href="#" 
                       className="block text-sm text-white/60 hover:text-white/80 
                                  transition-colors duration-300">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                © 2025 NASA-LLM-Graph — Explorando el universo con IA
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
