import { motion } from 'motion/react';
import { ScrollSection } from './ScrollSection';
import { FuturisticButton } from './FuturisticButton';
import { ArrowRight, Send, Star } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-full h-full max-w-4xl max-h-4xl rounded-full 
                        bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-3xl" />
      </div>

      <ScrollSection className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge minimalista */}
        <motion.div
          className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join the Future
        </motion.div>

        {/* Título principal estilo Cult Holdings */}
        <motion.h2 
          className="text-3xl md:text-5xl lg:text-6xl mb-8 text-white uppercase tracking-[0.1em] leading-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Space
          <br />
          <span className="text-white/70">
            Exploration
          </span>
        </motion.h2>

        {/* Descripción minimalista */}
        <motion.p 
          className="text-sm md:text-base text-white/60 mb-16 max-w-2xl mx-auto leading-loose"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Access the world's largest spatial database. Contribute to the future of cosmic 
          exploration through advanced artificial intelligence systems.
        </motion.p>

        {/* Botones minimalistas */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.2em] 
                       text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Access Data
          </motion.button>
          
          <motion.button
            className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white/80 
                       transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            View API
          </motion.button>
        </motion.div>

        {/* Métricas sociales minimalistas */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-lg text-white mb-1">4.9</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Rating</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg text-white mb-1">10K+</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Active Users</div>
          </div>
          
          <div className="text-center md:col-span-1 col-span-2">
            <div className="text-lg text-white mb-1">99.9%</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Uptime</div>
          </div>
        </motion.div>
      </ScrollSection>

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