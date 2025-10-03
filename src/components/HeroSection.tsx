import React from 'react';
import { motion } from 'motion/react';
import { ScrollSection } from './ScrollSection';
import { FuturisticButton } from './FuturisticButton';
import { ArrowRight, Send, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-full h-full max-w-4xl max-h-4xl rounded-full 
                        bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Badge minimalista */}
        <motion.div
          className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SPATIAL ARTIFICIAL INTELLIGENCE
        </motion.div>

        {/* Título principal estilo Cult Holdings */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl mb-8 text-white uppercase tracking-[0.1em] leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          NASA-LLM
          <br />
          <span className="text-white/70">
            GRAPH
          </span>
        </motion.h1>

        {/* Descripción minimalista */}
        <motion.p 
          className="text-sm md:text-base text-white/60 mb-16 max-w-2xl mx-auto leading-loose"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Revolutionizing space exploration through knowledge graphs powered by advanced artificial intelligence and quantum-enhanced processing systems.
        </motion.p>

        {/* Botones minimalistas */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.button
            className="border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.2em] 
                       text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            EXPLORE DATA
          </motion.button>
          
          <motion.button
            className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white/80 
                       transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            VIEW AI MODELS
          </motion.button>
        </motion.div>

        {/* Métricas sociales minimalistas */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-2xl text-white mb-1">2.8M</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">DATA NODES</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl text-white mb-1">15.4K</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">AI CONNECTIONS</div>
          </div>
          
          <div className="text-center md:col-span-1 col-span-2">
            <div className="text-2xl text-white mb-1">890K</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">DAILY QUERIES</div>
          </div>
        </motion.div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4
            }}
          />
        ))}
      </div>
    </section>
  );
}