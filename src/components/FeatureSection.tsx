import { motion } from 'motion/react';
import { ScrollSection } from './ScrollSection';
import { CultHoldingsCard } from './CultHoldingsCard';
import { Brain, Cpu, Rocket, Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Knowledge Graphs',
    description: 'Complex networks connecting spatial and scientific data intelligently through advanced graph structures.',
    wireframe: 'cube' as const
  },
  {
    icon: Cpu,
    title: 'Data Processing',
    description: 'Massive analysis of spatial information in real-time with quantum-enhanced algorithms.',
    wireframe: 'pyramid' as const
  },
  {
    icon: Shield,
    title: 'Scientific Validation',
    description: 'Automatic data verification with NASA standards and peer-review protocols.',
    wireframe: 'orbit' as const
  },
  {
    icon: Rocket,
    title: 'Space Exploration',
    description: 'AI tools for missions and cosmic discoveries across multiple dimensional planes.',
    wireframe: 'plane' as const
  },
  {
    icon: Zap,
    title: 'Instant Queries',
    description: 'Complex searches in seconds through optimized graph traversal mechanisms.',
    wireframe: 'cube' as const
  },
  {
    icon: Globe,
    title: 'Collaborative Network',
    description: 'Global platform for scientists and space researchers sharing knowledge graphs.',
    wireframe: 'orbit' as const
  }
];

export function FeatureSection() {
  return (
    <section className="relative py-32 px-6">
      {/* Título de sección */}
      <ScrollSection className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
            Navigate Our Capabilities
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl mb-6 text-white uppercase tracking-[0.1em]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Spatial Intelligence
        </motion.h2>
        
        <motion.p 
          className="text-sm text-white/60 max-w-2xl mx-auto leading-loose"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Advanced tools for exploring, analyzing and understanding the universe through 
          interconnected knowledge structures.
        </motion.p>
      </ScrollSection>

      {/* Grid de características estilo Cult Holdings */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {features.map((feature, index) => (
            <CultHoldingsCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              wireframeElement={feature.wireframe}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Sección de estadísticas minimalista */}
      <ScrollSection className="mt-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              Important Metrics
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              { value: '99.9', unit: '%', label: 'Precision Rate' },
              { value: '2.1', unit: 'PB', label: 'Spatial Data' },
              { value: '847', unit: 'K', label: 'Graph Entities' },
              { value: '24', unit: '/7', label: 'Analysis Time' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="border border-white/10 bg-black/30 p-8 text-center
                           hover:border-white/20 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl md:text-3xl text-white mb-1">
                  {stat.value}
                  <span className="text-white/60 text-lg">{stat.unit}</span>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>
    </section>
  );
}