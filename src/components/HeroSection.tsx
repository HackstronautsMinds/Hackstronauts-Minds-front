import { motion } from 'motion/react';
import { TypewriterText, AnimatedWords } from './TypewriterText';
import { FuturisticButton } from './FuturisticButton';
import { ParallaxElement } from './ScrollSection';
import { ArrowRight, Rocket, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Elementos decorativos de fondo */}
      <ParallaxElement speed={0.3} className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-500" />
      </ParallaxElement>

      {/* Grid de fondo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Badge minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8"
        >
          Spatial Artificial Intelligence
        </motion.div>

        {/* Título principal estilo Cult Holdings */}
        <div className="mb-12">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-[0.1em] leading-tight mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <TypewriterText 
              text="NASA-LLM" 
              delay={800}
              speed={100}
            />
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl text-white/80 uppercase tracking-[0.15em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <AnimatedWords 
              text="GRAPH" 
              delay={2}
            />
          </motion.h2>
        </div>

        {/* Subtítulo minimalista */}
        <motion.p 
          className="text-sm md:text-base text-white/60 mb-16 max-w-2xl mx-auto leading-loose"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          Revolutionizing space exploration through knowledge graphs powered by 
          advanced artificial intelligence and quantum-enhanced processing systems.
        </motion.p>

        {/* Botones minimalistas */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.button
            className="border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.2em] 
                       text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Data
          </motion.button>
          
          <motion.button
            className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white/80 
                       transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            View AI Models
          </motion.button>
        </motion.div>

        {/* Métricas minimalistas */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-12 mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          {[
            { label: 'Data Nodes', value: '2.8M' },
            { label: 'AI Connections', value: '15.4K' },
            { label: 'Daily Queries', value: '890K' }
          ].map((metric, index) => (
            <div key={index} className="text-center">
              <motion.div 
                className="text-xl md:text-2xl text-white mb-1"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {metric.value}
              </motion.div>
              <div className="text-white/40 text-xs uppercase tracking-[0.2em]">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-blue-400 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}