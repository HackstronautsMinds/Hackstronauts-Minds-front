import React, { ReactNode } from 'react';

interface VintageMonitorProps {
  agentName: string;
  status: 'online' | 'processing' | 'standby';
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
}

export function VintageMonitor({ agentName, status, children, size }: VintageMonitorProps) {
  const sizeClasses = {
    small: 'w-48 h-36',
    medium: 'w-64 h-48', 
    large: 'w-80 h-60'
  };

  const statusColors = {
    online: 'from-cyan-400 to-cyan-600',
    processing: 'from-green-400 to-green-600',
    standby: 'from-blue-400 to-blue-600'
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* CRT Monitor Housing */}
      <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg shadow-2xl border-4 border-gray-700 relative">
        {/* Screen Bezel */}
        <div className="absolute inset-3 bg-gradient-to-br from-gray-900 to-black rounded border-2 border-gray-600">
          {/* CRT Screen */}
          <div className="w-full h-full bg-black rounded relative overflow-hidden">
            {/* CRT Curvature Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30 rounded"></div>
            
            {/* Scan Lines */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-full h-0.5 bg-cyan-400 mb-2 opacity-30"></div>
              ))}
            </div>

            {/* Agent Name Display */}
            <div className="absolute top-2 left-2 right-2 bg-black bg-opacity-60 p-2 border border-cyan-400 rounded">
              <div className="text-cyan-400 tracking-widest text-center font-mono">
                {agentName}
              </div>
              <div className="flex justify-center mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  status === 'online' ? 'bg-green-400 animate-pulse' :
                  status === 'processing' ? 'bg-yellow-400 animate-ping' :
                  'bg-blue-400'
                }`}></div>
              </div>
            </div>

            {/* Content Area */}
            <div className="absolute top-16 left-2 right-2 bottom-8 text-green-400 text-xs overflow-hidden font-mono">
              {children}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${statusColors[status]} animate-pulse`} 
                     style={{width: `${Math.random() * 40 + 60}%`}}></div>
              </div>
            </div>

            {/* CRT Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="absolute -bottom-2 left-2 right-2 h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b border-t border-gray-600">
          <div className="flex justify-around items-center h-full px-2">
            {/* LED Indicators */}
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            
            {/* Toggle Switches */}
            <div className="w-2 h-3 bg-gray-900 rounded-sm border border-gray-500"></div>
            <div className="w-2 h-3 bg-gray-900 rounded-sm border border-gray-500"></div>
          </div>
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b shadow-lg"></div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-700 rounded-full shadow-md"></div>

      {/* Holographic Icon */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 bg-opacity-20 rounded-full blur-sm animate-pulse"></div>
    </div>
  );
}
