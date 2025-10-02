import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface AgentMonitorProps {
  agentName: string;
  agentType: string;
  status: 'active' | 'standby' | 'completed' | 'initializing';
  progress: number;
  data: {
    [key: string]: string | number;
  };
  className?: string;
}

export function AgentMonitor({ 
  agentName, 
  agentType, 
  status, 
  progress, 
  data, 
  className = "" 
}: AgentMonitorProps) {
  const [currentLine, setCurrentLine] = useState(0);
  
  const dataEntries = Object.entries(data);

  useEffect(() => {
    if (status === 'active' || status === 'initializing') {
      const interval = setInterval(() => {
        setCurrentLine((prev) => (prev + 1) % dataEntries.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status, dataEntries.length]);

  return (
    <div className={`relative ${className}`}>
      {/* Retro Monitor Frame */}
      <div className="relative">
        
        {/* Monitor Frame with metallic look */}
        <div className="relative bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 p-4 rounded-lg shadow-2xl">
          
          {/* Side control panels */}
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
            <div className="w-2 h-2 bg-gray-600 rounded-full border border-gray-700"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full border border-gray-700"></div>
          </div>
          
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
            <div className="w-2 h-2 bg-gray-600 rounded-full border border-gray-700"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full border border-gray-700"></div>
          </div>

          {/* Inner bezel */}
          <div className="bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 p-2 rounded">
            
            {/* Screen */}
            <div className="relative bg-black rounded p-3 h-40 overflow-hidden border-2 border-gray-800">
              
              {/* CRT scanlines effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-px bg-green-400 mb-1"
                    style={{ 
                      animationDelay: `${i * 0.05}s`,
                      animation: 'scanline 2s infinite ease-in-out'
                    }}
                  />
                ))}
              </div>

              {/* Terminal Content */}
              <div className="relative z-10 h-full flex flex-col">
                
                {/* Header */}
                <div className="border-b border-green-400/30 pb-1 mb-2">
                  <h3 className="text-green-400 font-mono text-sm tracking-wider">
                    {agentName}
                  </h3>
                </div>
                
                {/* Agent Type */}
                <div className="text-green-400 font-mono text-xs mb-2 opacity-80">
                  {agentType}
                </div>
                
                {/* Data lines */}
                <div className="flex-1 space-y-1 font-mono text-xs">
                  {dataEntries.map(([key, value], index) => (
                    <motion.div 
                      key={key}
                      className={`flex justify-between ${
                        status === 'active' && index === currentLine 
                          ? 'text-green-300 bg-green-400/10' 
                          : 'text-green-400/90'
                      } px-1`}
                      animate={
                        status === 'active' && index === currentLine 
                          ? { backgroundColor: ['rgba(34, 197, 94, 0.05)', 'rgba(34, 197, 94, 0.15)', 'rgba(34, 197, 94, 0.05)'] }
                          : {}
                      }
                      transition={{ duration: 1 }}
                    >
                      <span>• {key.replace(/_/g, ' ').toUpperCase()}</span>
                      <span>{value}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Bottom status line with blinking cursor */}
                <div className="border-t border-green-400/30 pt-1 mt-auto">
                  <div className="flex items-center justify-between text-green-400 font-mono text-xs">
                    <span>ALTITUDE: 408.2 KM</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="bg-green-400 w-2 h-3 inline-block ml-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom status LEDs */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${
              status === 'active' ? 'bg-green-400' : 'bg-red-500'
            }`}></div>
            <div className={`w-1.5 h-1.5 rounded-full ${
              progress > 50 ? 'bg-yellow-400' : 'bg-gray-600'
            }`}></div>
            <div className={`w-1.5 h-1.5 rounded-full ${
              status === 'completed' ? 'bg-blue-400' : 'bg-gray-600'
            }`}></div>
          </div>
        </div>
        
        {/* Monitor Stand - Simple and small */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-2 bg-gradient-to-b from-gray-500 to-gray-600 rounded-b"></div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scanline {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
