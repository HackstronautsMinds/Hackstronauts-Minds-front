import React, { useState, useEffect } from 'react';
import { useLiveMetrics } from '../../hooks/useLiveMetrics';

export const TrajectoryAnalysisPanel: React.FC = () => {
  const metrics = useLiveMetrics();
  const [trajectoryPoints, setTrajectoryPoints] = useState<Array<{x: number, y: number, color: string}>>([]);
  
  useEffect(() => {
    // Generar puntos de trayectoria basados en las métricas
    const points: Array<{x: number, y: number, color: string}> = [];
    const numPoints = 20;
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * 100;
      const y = 20 + Math.sin((i / numPoints) * Math.PI) * 30 + Math.random() * 10;
      const color = i < numPoints - 3 ? '#10b981' : '#ef4444'; // Verde al inicio, rojo al final
      points.push({ x, y, color }); 
    }
    
    setTrajectoryPoints(points);
  }, [metrics.trackingObjects, metrics.collisionProbability]);
  
  return (
    <div className="w-full">
      
      
      <div className="relative h-48 bg-black/50 rounded border border-gray-700">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            {Array.from({length: 10}, (_, i) => (
              <g key={i}>
                <line x1={i * 10} y1="0" x2={i * 10} y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="0" y1={i * 10} x2="100%" y2={i * 10} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </g>
            ))}
          </svg>
        </div>
        
        {/* Trajectory line */}
        <svg className="w-full h-full">
          <polyline
            points={trajectoryPoints.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            className="transition-all duration-1000"
          />
          
          {/* Impact point */}
          {trajectoryPoints.length > 0 && (
            <circle
              cx={trajectoryPoints[trajectoryPoints.length - 1].x}
              cy={trajectoryPoints[trajectoryPoints.length - 1].y}
              r="4"
              fill="#ef4444"
              className="animate-pulse"
            />
          )}
        </svg>
        
        {/* Labels */}
        <div className="absolute bottom-2 left-2 text-gray-400 text-xs font-mono">
          TIME: 0s
        </div>
        <div className="absolute bottom-2 right-2 text-gray-400 text-xs font-mono">
          TIME: {trajectoryPoints.length * 0.5}s
        </div>
        <div className="absolute top-2 left-2 text-gray-400 text-xs font-mono">
          ALTITUDE
        </div>
      </div>
      
      <div className="mt-4 flex justify-between text-xs font-mono">
        <div className="text-green-400">
          PROBABILITY: {(metrics.collisionProbability * 100).toFixed(2)}%
        </div>
        <div className="text-yellow-400">
          ETA: {trajectoryPoints.length * 0.5}s
        </div>
        <div className="text-red-400">
          IMPACT: {metrics.impactLocation}
        </div>
      </div>
    </div>
  );
};
