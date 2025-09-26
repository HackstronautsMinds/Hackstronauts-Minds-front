import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface CultHoldingsCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  delay?: number;
  wireframeElement?: 'cube' | 'pyramid' | 'orbit' | 'plane';
}

export function CultHoldingsCard({ 
  title, 
  description, 
  icon: Icon, 
  delay = 0,
  wireframeElement = 'cube'
}: CultHoldingsCardProps) {
  
  const renderWireframe = () => {
    switch (wireframeElement) {
      case 'cube':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0 m-auto">
            {/* Cubo 3D wireframe */}
            <g stroke="currentColor" strokeWidth="0.5" fill="none" className="text-white/30">
              {/* Cara frontal */}
              <rect x="30" y="30" width="40" height="40" />
              {/* Cara trasera */}
              <rect x="50" y="10" width="40" height="40" />
              {/* Conexiones */}
              <line x1="30" y1="30" x2="50" y2="10" />
              <line x1="70" y1="30" x2="90" y2="10" />
              <line x1="70" y1="70" x2="90" y2="50" />
              <line x1="30" y1="70" x2="50" y2="50" />
            </g>
          </svg>
        );
      
      case 'pyramid':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0 m-auto">
            <g stroke="currentColor" strokeWidth="0.5" fill="none" className="text-white/30">
              {/* Base del triángulo */}
              <polygon points="30,80 90,80 60,20" />
              {/* Líneas internas */}
              <line x1="30" y1="80" x2="75" y2="35" />
              <line x1="90" y1="80" x2="45" y2="35" />
            </g>
          </svg>
        );
      
      case 'orbit':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0 m-auto">
            <g stroke="currentColor" strokeWidth="0.5" fill="none" className="text-white/30">
              {/* Órbitas */}
              <circle cx="60" cy="60" r="30" />
              <circle cx="60" cy="60" r="20" strokeDasharray="2,2" />
              <circle cx="60" cy="60" r="10" />
              {/* Centro */}
              <circle cx="60" cy="60" r="2" fill="currentColor" className="text-white/50" />
              {/* Satélites */}
              <circle cx="90" cy="60" r="1.5" fill="currentColor" className="text-white/40" />
              <circle cx="60" cy="30" r="1" fill="currentColor" className="text-white/40" />
            </g>
          </svg>
        );
      
      case 'plane':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0 m-auto">
            <g stroke="currentColor" strokeWidth="0.5" fill="none" className="text-white/30">
              {/* Avion/flecha estilizada */}
              <path d="M20 60 L60 30 L100 60 L80 60 L80 80 L40 80 L40 60 Z" />
              {/* Líneas de detalle */}
              <line x1="40" y1="50" x2="80" y2="50" strokeDasharray="1,1" />
              <line x1="50" y1="70" x2="70" y2="70" strokeDasharray="1,1" />
            </g>
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative h-80 border border-white/10 bg-black/50 backdrop-blur-sm 
                      hover:border-white/20 transition-all duration-700 overflow-hidden">
        
        {/* Wireframe graphics */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60 
                        group-hover:opacity-80 transition-opacity duration-500">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {renderWireframe()}
          </motion.div>
        </div>

        {/* Corner details */}
        <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-white/20" />
        <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-white/20" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-white/20" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-white/20" />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          {Icon && (
            <motion.div 
              className="w-8 h-8 text-white/80 mb-4"
              whileHover={{ scale: 1.1 }}
            >
              <Icon size={32} />
            </motion.div>
          )}
          
          <h3 className="text-lg uppercase tracking-[0.2em] text-white mb-3 
                         group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/70 
                        transition-colors max-w-xs">
            {description}
          </p>
        </div>

        {/* Animated line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-white/30"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, delay: delay + 0.5 }}
        />
      </div>
    </motion.div>
  );
}