import React, { ReactNode } from 'react';

interface VintageWorkstationProps {
  children: ReactNode;
  position: 'left' | 'center' | 'right';
}

export function VintageWorkstation({ children, position }: VintageWorkstationProps) {
  return (
    <div className="relative">
      {/* Console Desk */}
      <div className="relative">
        {/* Main Console Surface */}
        <div className="w-80 h-20 bg-gradient-to-b from-gray-400 to-gray-500 rounded-lg shadow-2xl transform perspective-1000 rotateX-15 border-2 border-gray-600">
          <div className="absolute inset-2 bg-gradient-to-br from-gray-300 to-gray-400 rounded shadow-inner">
            {/* Control Panel Sections */}
            <div className="absolute top-1 left-2 right-2 h-3 bg-gray-800 rounded flex space-x-1 p-0.5">
              {/* LED Panel */}
              <div className="flex space-x-0.5">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              {/* Toggle Switches */}
              <div className="flex space-x-1 ml-2">
                <div className="w-1.5 h-2 bg-gray-600 rounded-sm border border-gray-400"></div>
                <div className="w-1.5 h-2 bg-gray-600 rounded-sm border border-gray-400"></div>
                <div className="w-1.5 h-2 bg-gray-600 rounded-sm border border-gray-400"></div>
              </div>
              
              {/* Status Display */}
              <div className="flex-1 bg-black rounded-sm ml-2 flex items-center justify-center">
                <div className="text-green-400 text-xs font-mono" style={{ fontSize: '6px' }}>
                  ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Console Legs/Support */}
        <div className="absolute -bottom-6 left-8 w-1.5 h-6 bg-gray-600 transform skew-y-12 shadow-md"></div>
        <div className="absolute -bottom-6 right-8 w-1.5 h-6 bg-gray-600 transform -skew-y-12 shadow-md"></div>
        
        {/* Monitor Placement */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-4 items-end">
          {children}
        </div>

        {/* Coffee Mug */}
        {Math.random() > 0.5 && (
          <div className="absolute top-2 right-12 w-2 h-2.5 bg-gradient-to-b from-amber-200 to-amber-800 rounded-b-full shadow-md">
            <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-600 rounded-sm"></div>
            <div className="absolute top-0.5 right-0 w-0.5 h-1 bg-amber-600 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Connecting Light Beams */}
      {position !== 'center' && (
        <div className={`absolute top-4 ${position === 'left' ? 'right-0' : 'left-0'} w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent opacity-40 animate-pulse`}></div>
      )}
      
      {/* Vertical Connection Beam */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-cyan-400 to-transparent opacity-30 animate-pulse"></div>

      {/* Holographic Data Stream */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-t from-cyan-400/20 to-transparent rounded-full blur-sm animate-pulse"></div>
    </div>
  );
}
