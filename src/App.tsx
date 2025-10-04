import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlanetIntro, Hero } from './components/sections';
import { SimulationProvider } from './contexts/SimulationContext';
import './styles/monitor-styles.css';

const AppContent: React.FC = () => {
  return <Hero />;
};

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleIntroComplete = () => {
    setIsTransitioning(true);
    // Pequeño delay para que la transición sea suave
    setTimeout(() => {
      setShowMainContent(true);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <>
      {/* Intro con planeta que se encoge */}
      {!showMainContent && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <PlanetIntro onComplete={handleIntroComplete} />
        </motion.div>
      )}
      
      {/* Contenido principal */}
      {showMainContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SimulationProvider>
            <AppContent />
          </SimulationProvider>
        </motion.div>
      )}
    </>
  );
}