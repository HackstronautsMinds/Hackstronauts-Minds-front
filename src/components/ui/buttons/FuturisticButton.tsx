import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface FuturisticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FuturisticButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = ''
}: FuturisticButtonProps) {
  const baseClasses = 'relative overflow-hidden group cursor-pointer transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white border border-blue-500/50',
    secondary: 'bg-transparent text-blue-400 border border-blue-500/50 hover:bg-blue-500/10',
    ghost: 'bg-transparent text-gray-300 border border-gray-500/30 hover:bg-gray-500/10'
  };

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} rounded-lg`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === 'primary' 
          ? '0 0 30px rgba(59, 130, 246, 0.5)' 
          : '0 0 20px rgba(59, 130, 246, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* Partículas en hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>

      {/* Contenido del botón */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Borde animado */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-transparent"
        style={{
          background: variant === 'primary' 
            ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4) border-box'
            : 'linear-gradient(45deg, #3b82f6, #6366f1) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'subtract'
        }}
        animate={{
          background: [
            'linear-gradient(0deg, #3b82f6, #8b5cf6, #06b6d4)',
            'linear-gradient(360deg, #3b82f6, #8b5cf6, #06b6d4)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.button>
  );
}