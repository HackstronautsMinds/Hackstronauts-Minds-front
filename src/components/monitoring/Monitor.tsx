import React, { ReactNode } from 'react';
import { useLiveMetrics } from '../../hooks/useLiveMetrics';
import { ThreatAssessmentPanel } from './ThreatAssessmentPanel';
import { TrajectoryAnalysisPanel } from './TrajectoryAnalysisPanel';
import { DefenseSystemsPanel } from './DefenseSystemsPanel';

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
  liveMetrics?: any; // Añadimos prop para recibir datos reales
  className?: string;
}

export function GaugeMonitor({ data, liveMetrics, className = "" }: GaugeMonitorProps) {
  return (
    <div className={`main-monitor ${className}`}>
      <div className="main-monitor-frame">
        <div className="main-monitor-bezel">
          <div className="main-monitor-screen">
            <div className="main-scan-lines"></div>
            <div className="main-monitor-content">
              <div className="main-monitor-title">THREAT ASSESSMENT</div>
              <ThreatAssessmentPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
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
  liveMetrics?: any; // Añadimos prop para recibir datos reales
  className?: string;
}

export function ChartMonitor({ trajectory, impactTime = "T-00:00:00", impactZone = "IMPACT ZONE", liveMetrics, className = "" }: ChartMonitorProps) {
  return (
    <div className={`main-monitor ${className}`}>
      <div className="main-monitor-frame">
        <div className="main-monitor-bezel">
          <div className="main-monitor-screen">
            <div className="main-scan-lines"></div>
            <div className="main-monitor-content">
              <div className="main-monitor-title">TRAJECTORY ANALYSIS</div>
              <TrajectoryAnalysisPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LevelData {
  label: string;
  value: number;
  maxValue?: number;
}

interface LevelMonitorProps {
  data?: LevelData[];
  liveMetrics?: any; // Añadimos prop para recibir datos reales
  className?: string;
}

export function LevelMonitor({ data, liveMetrics, className = "" }: LevelMonitorProps) {
  return (
    <div className={`main-monitor ${className}`}>
      <div className="main-monitor-frame">
        <div className="main-monitor-bezel">
          <div className="main-monitor-screen">
            <div className="main-scan-lines"></div>
            <div className="main-monitor-content">
              <div className="main-monitor-title">DEFENSE SYSTEMS</div>
              <DefenseSystemsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}