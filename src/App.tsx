import React, { useState } from 'react';
import { PlanetIntro } from './components/PlanetIntro';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeroSection } from './components/HeroSection';
import NASAScientistSelector from './components/NASAScientistSelector';
import { CTASection } from './components/CTASection';
import { BackendTest } from './components/BackendTest';
import { NEOList } from './components/NEOList';
import AsteroidSimulatorSection from './components/AsteroidSimulatorSection';
import './styles/monitor-styles.css';

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleIntroComplete = () => {
    setShowMainContent(true);
  };

  return (
    <>
      {/* Intro con planeta que se encoge */}
      {!showMainContent && <PlanetIntro onComplete={handleIntroComplete} />}
      
      {/* Contenido principal */}
      {showMainContent && (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden" style={{ position: 'relative' }}>
          {/* Fondo animado con partículas */}
          <AnimatedBackground />
          
          {/* Contenido principal */}
          <div className="relative z-10">
            {/* Sección Hero */}
            <HeroSection />
            
            {/* Sección de Selección de Científicos NASA */}
            <NASAScientistSelector />
            
            {/* Sección de Call to Action */}
            <CTASection />
            
            {/* Lista de NEOs */}
            <NEOList />
            
            {/* Simulador de Impacto de Asteroides */}
            <AsteroidSimulatorSection />
            
            {/* Prueba de conexión backend - TEMPORAL */}
            <div className="py-16 px-6">
              <div className="max-w-6xl mx-auto">
                <BackendTest />
              </div>
            </div>
            
            {/* Footer minimalista estilo Cult Holdings */}
            <footer className="relative py-16 px-6 border-t border-white/10">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Logo y descripción */}
                  <div>
                    <h3 className="text-lg uppercase tracking-[0.15em] text-white mb-4">
                      NASA-LLM-GRAPH
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Exploring the cosmos through artificial intelligence and 
                      interconnected knowledge graphs.
                    </p>
                  </div>
                  
                  {/* Links de navegación */}
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                      Navigation
                    </div>
                    <div className="space-y-2">
                      {['Data', 'Models', 'Documentation', 'API'].map((link) => (
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
                      Contact
                    </div>
                    <div className="space-y-2">
                      {['Research', 'Support', 'Partnerships'].map((link) => (
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
                    © 2025 NASA-LLM-Graph — Exploring the universe with AI
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}