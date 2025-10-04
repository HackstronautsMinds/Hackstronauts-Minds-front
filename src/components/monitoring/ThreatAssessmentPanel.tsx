import React from 'react';
import { useLiveMetrics } from '../../hooks/useLiveMetrics';

interface GaugeProps {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
}

const Gauge: React.FC<GaugeProps> = ({ label, value, unit, max, color }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-2">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-sm font-bold">{value.toFixed(0)}</div>
            <div className="text-gray-400 text-xs">{unit}</div>
          </div>
        </div>
      </div>
      <div className="text-white text-xs font-mono">{label}</div>
    </div>
  );
};

export const ThreatAssessmentPanel: React.FC = () => {
  const metrics = useLiveMetrics();
  
  // Calcular métricas de amenaza basadas en el asteroide
  const energy = metrics.trackingObjects * 0.5; // MT (Megatons)
  const distance = metrics.averageAltitude / 1000; // K KM
  const velocity = metrics.trainingIterations / 100; // K KM/H
  
  return (
    <div className="w-full">
      
      
      <div className="flex justify-around">
        <Gauge
          label="ENERGY"
          value={energy}
          unit="MT"
          max={100}
          color="#ef4444"
        />
        <Gauge
          label="DISTANCE"
          value={distance}
          unit="K KM"
          max={50}
          color="#f59e0b"
        />
        <Gauge
          label="VELOCITY"
          value={velocity}
          unit="K KM/H"
          max={200}
          color="#10b981"
        />
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-green-400 text-sm font-mono">
          STATUS: {energy > 50 ? 'HIGH THREAT' : energy > 20 ? 'MEDIUM THREAT' : 'LOW THREAT'}
        </div>
      </div>
    </div>
  );
};
