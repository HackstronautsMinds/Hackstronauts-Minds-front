import React, { ReactNode } from 'react';

interface MonitorProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export function Monitor({ children, title, className = "" }: MonitorProps) {
  return (
    <div className={`main-monitor ${className}`}>
      <div className="main-monitor-frame">
        <div className="main-monitor-bezel">
          <div className="main-monitor-screen">
            <div className="main-scan-lines"></div>
            <div className="main-monitor-content">
              <div className="main-monitor-title">{title}</div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GaugeData {
  value: number;
  unit: string;
  label: string;
  color?: string;
}

interface GaugeMonitorProps {
  data?: GaugeData[];
}

export function GaugeMonitor({ data }: GaugeMonitorProps) {
  const defaultData: GaugeData[] = [
    { value: 0, unit: "ALERT", label: "PROXIMITY", color: "#00ff88" },
    { value: 0, unit: "KM/S", label: "VELOCITY", color: "#00ff88" },
    { value: 0, unit: "KM", label: "DIAMETER", color: "#00ff88" }
  ];

  const gaugeData = data || defaultData;

  return (
    <Monitor title="THREAT ASSESSMENT">
      <div className="flex justify-center items-center h-full space-x-4">
        {gaugeData.map((gauge, index) => (
          <div key={index} className="gauge">
            <div className="gauge-circle">
              <div className="gauge-value" style={{ color: gauge.color || "#00ff88" }}>
                {gauge.value}
              </div>
              <div className="gauge-unit">{gauge.unit}</div>
            </div>
            <div className="gauge-label">{gauge.label}</div>
          </div>
        ))}
      </div>
    </Monitor>
  );
}

interface TrajectoryPoint {
  x: number;
  y: number;
}

interface ChartMonitorProps {
  trajectory?: TrajectoryPoint[];
  impactTime?: string;
  impactZone?: string;
}

export function ChartMonitor({ trajectory, impactTime = "T-00:00:00", impactZone = "IMPACT ZONE" }: ChartMonitorProps) {
  const defaultTrajectory = [
    { x: 0, y: 180 },
    { x: 50, y: 160 },
    { x: 100, y: 120 },
    { x: 150, y: 80 },
    { x: 200, y: 60 },
    { x: 250, y: 40 },
    { x: 300, y: 30 },
    { x: 350, y: 25 },
    { x: 400, y: 20 }
  ];

  const trajectoryData = trajectory || defaultTrajectory;
  const points = trajectoryData.map(point => `${point.x},${point.y}`).join(' ');

  return (
    <Monitor title="TRAJECTORY ANALYSIS">
      <div className="chart-container">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="trajectory" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#ff0044" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          
          {/* Grid */}
          <g stroke="#00ffff" strokeOpacity="0.3" strokeWidth="0.5">
            {Array.from({length: 9}).map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="200"/>
            ))}
            {Array.from({length: 5}).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2={400} y2={i * 50}/>
            ))}
          </g>
          
          {/* Trajectory line */}
          <polyline
            fill="none"
            stroke="url(#trajectory)"
            strokeWidth="2"
            points={points}
            className="trajectory-line"
          />
          
          {/* Impact point */}
          {trajectoryData.length > 0 && (
            <circle 
              cx={trajectoryData[trajectoryData.length - 1].x} 
              cy={trajectoryData[trajectoryData.length - 1].y} 
              r="4" 
              fill="#ff0044" 
              className="impact-point"
            >
              <animate attributeName="r" values="4;8;4" dur="1s" repeatCount="indefinite"/>
            </circle>
          )}
        </svg>
        
        <div className="chart-labels">
          <div className="chart-label">{impactTime}</div>
          <div className="chart-label text-red-400">{impactZone}</div>
        </div>
      </div>
    </Monitor>
  );
}

interface LevelData {
  label: string;
  value: number;
  maxValue?: number;
}

interface LevelMonitorProps {
  data?: LevelData[];
}

export function LevelMonitor({ data }: LevelMonitorProps) {
  const defaultData: LevelData[] = [
    { label: "LASER ARRAY", value: 0, maxValue: 100 },
    { label: "MISSILE PODS", value: 0, maxValue: 100 },
    { label: "SHIELD GEN", value: 0, maxValue: 100 },
    { label: "REACTOR CORE", value: 0, maxValue: 100 },
    { label: "COMMUNICATIONS", value: 0, maxValue: 100 }
  ];

  const levelData = data || defaultData;

  return (
    <Monitor title="DEFENSE SYSTEMS">
      <div className="level-indicators">
        {levelData.map((level, index) => {
          const percentage = level.maxValue ? (level.value / level.maxValue) * 100 : 0;
          return (
            <div key={index} className="level-bar">
              <div className="level-label">{level.label}</div>
              <div className="level-track">
                <div 
                  className="level-fill" 
                  style={{width: `${Math.min(percentage, 100)}%`}}
                ></div>
              </div>
              <div className="level-value">{Math.round(percentage)}%</div>
            </div>
          );
        })}
      </div>
    </Monitor>
  );
}
