import React from 'react';
import { useLiveMetrics } from '../../hooks/useLiveMetrics';

interface SystemBarProps {
  label: string;
  percentage: number;
  isActive: boolean;
  color: string;
}

const SystemBar: React.FC<SystemBarProps> = ({ label, percentage, isActive, color }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white text-sm font-mono">{label}</span>
        <span className="text-gray-400 text-xs font-mono">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            isActive ? 'bg-gradient-to-r from-green-400 to-orange-400' : 'bg-gray-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const DefenseSystemsPanel: React.FC = () => {
  const metrics = useLiveMetrics();
  
  // Calcular estado de sistemas basado en métricas
  const laserArray = metrics.patternRecognition > 95 ? 100 : metrics.patternRecognition;
  const missilePods = metrics.containmentProtocols > 15 ? 100 : (metrics.containmentProtocols / 15) * 100;
  const shieldGen = metrics.dataMiningActive ? 100 : 0;
  const reactorCore = metrics.modelAccuracy > 98 ? 100 : (metrics.modelAccuracy - 95) * 33.33;
  const communication = metrics.processedQueries > 5000 ? 100 : (metrics.processedQueries / 5000) * 100;
  
  return (
    <div className="w-full">
     
      <div className="space-y-4">
        <SystemBar
          label="LASER ARRAY"
          percentage={Math.max(0, laserArray)}
          isActive={laserArray > 80}
          color="green"
        />
        <SystemBar
          label="MISSILE PODS"
          percentage={Math.max(0, missilePods)}
          isActive={missilePods > 80}
          color="blue"
        />
        <SystemBar
          label="SHIELD GEN"
          percentage={Math.max(0, shieldGen)}
          isActive={shieldGen > 80}
          color="green"
        />
        <SystemBar
          label="REACTOR CORE"
          percentage={Math.max(0, reactorCore)}
          isActive={reactorCore > 80}
          color="yellow"
        />
        <SystemBar
          label="COMMUNICATION"
          percentage={Math.max(0, communication)}
          isActive={communication > 80}
          color="green"
        />
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-sm font-mono">
          <div className="text-green-400 mb-1">
            ACTIVE SYSTEMS: {[laserArray, missilePods, shieldGen, reactorCore, communication]
              .filter(p => p > 80).length}/5
          </div>
          <div className="text-gray-400 text-xs">
            STATUS: {metrics.dataMiningActive ? 'OPERATIONAL' : 'STANDBY'}
          </div>
        </div>
      </div>
    </div>
  );
};
