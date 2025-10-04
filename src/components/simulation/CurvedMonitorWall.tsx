import React from 'react';
import { GaugeMonitor, ChartMonitor, LevelMonitor } from '../monitoring/Monitor';
import { useLiveMetrics } from '../../hooks/useLiveMetrics';

interface GaugeData {
  value: number;
  unit: string;
  label: string;
  color?: string;
}

interface TrajectoryPoint {
  x: number;
  y: number;
}

interface LevelData {
  label: string;
  value: number;
  maxValue?: number;
}

interface CurvedMonitorWallProps {
  gaugeData?: GaugeData[];
  trajectoryData?: TrajectoryPoint[];
  levelData?: LevelData[];
  impactTime?: string;
  impactZone?: string;
  className?: string;
}

export function CurvedMonitorWall({ 
  gaugeData, 
  trajectoryData, 
  levelData, 
  impactTime, 
  impactZone,
  className = "" 
}: CurvedMonitorWallProps) {
  const liveMetrics = useLiveMetrics();
  
  return (
    
    <div className={`curved-monitor-wall ${className}`}>
      {/* Background curved surface */}
      <div className="monitor-wall-surface">
        <div className="wall-grid"></div>
      </div>
      
      {/* Monitor arrangement */}
      <div className="monitor-arrangement">
        <div className="monitor-position left-position">
          <div className="monitor-mount">
            <GaugeMonitor 
              data={gaugeData} 
              liveMetrics={liveMetrics}
              className="curved-monitor" 
            />
          </div>
        </div>
        
        <div className="monitor-position center-position">
          <div className="monitor-mount">
            <ChartMonitor 
              trajectory={trajectoryData}
              impactTime={impactTime}
              impactZone={impactZone}
              liveMetrics={liveMetrics}
              className="curved-monitor center-main" 
            />
          </div>
        </div>
        
        <div className="monitor-position right-position">
          <div className="monitor-mount">
            <LevelMonitor 
              data={levelData} 
              liveMetrics={liveMetrics}
              className="curved-monitor" 
            />
          </div>
        </div>
      </div>
      
      {/* Lighting effects */}
      <div className="wall-lighting">
        <div className="light-beam left-beam"></div>
        <div className="light-beam center-beam"></div>
        <div className="light-beam right-beam"></div>
      </div>
    </div>
    
  );
}