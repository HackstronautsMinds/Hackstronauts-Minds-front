import React from 'react';
import { VintageMonitor } from './VintageMonitor';

export function DataAgentScreen() {
  return (
    <VintageMonitor agentName="DR. DATA" status="online" size="large">
      <div className="space-y-1">
        <div>► NEURAL NETWORK ANALYSIS</div>
        <div>► PATTERN RECOGNITION: 94%</div>
        <div>► DATA MINING ACTIVE</div>
        <div className="mt-2">
          <div>DATASETS PROCESSED: 1,847</div>
          <div>ACCURACY RATE: 99.2%</div>
          <div>ANOMALIES DETECTED: 3</div>
        </div>
        <div className="mt-2 grid grid-cols-8 gap-1">
          {[...Array(32)].map((_, i) => (
            <div key={i} className="w-1 bg-green-400 rounded" 
                 style={{height: `${Math.random() * 12 + 2}px`}}></div>
          ))}
        </div>
        <div className="text-cyan-400">STATUS: ANALYZING...</div>
      </div>
    </VintageMonitor>
  );
}

export function OrbitalAgentScreen() {
  return (
    <VintageMonitor agentName="DRA. ORBITAL" status="processing" size="medium">
      <div className="space-y-1">
        <div>► ORBITAL MECHANICS</div>
        <div>► TRAJECTORY CALCULATED</div>
        <div className="mt-2">
          <div>ALTITUDE: 408.7 KM</div>
          <div>VELOCITY: 7.66 KM/S</div>
          <div>INCLINATION: 51.64°</div>
          <div>PERIOD: 92.68 MIN</div>
        </div>
        <div className="relative mt-2 h-8 bg-gray-900 rounded">
          <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1 right-4 w-0.5 h-0.5 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="text-yellow-400">ORBIT ADJUSTMENT +0.3°</div>
      </div>
    </VintageMonitor>
  );
}

export function ImpactAgentScreen() {
  return (
    <VintageMonitor agentName="DR. IMPACT" status="online" size="medium">
      <div className="space-y-1">
        <div>► IMPACT ASSESSMENT</div>
        <div>► COLLISION PROBABILITY</div>
        <div className="mt-2">
          <div>THREAT LEVEL: LOW</div>
          <div>DEBRIS TRACKED: 14,892</div>
          <div>CLOSE APPROACHES: 0</div>
          <div>RISK FACTOR: 0.001%</div>
        </div>
        <div className="mt-2">
          <div className="w-full h-2 bg-gray-800 rounded overflow-hidden">
            <div className="h-full bg-green-400 rounded" style={{width: '15%'}}></div>
          </div>
        </div>
        <div className="text-green-400">ALL CLEAR</div>
      </div>
    </VintageMonitor>
  );
}

export function MitigationAgentScreen() {
  return (
    <VintageMonitor agentName="DRA. MITIGATION" status="standby" size="medium">
      <div className="space-y-1">
        <div>► RISK MITIGATION</div>
        <div>► CONTINGENCY PROTOCOLS</div>
        <div className="mt-2">
          <div>BACKUP SYSTEMS: READY</div>
          <div>EMERGENCY PROCEDURES: SET</div>
          <div>RESPONSE TIME: 0.3 SEC</div>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-2">
          <div className="text-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1"></div>
            <div>PWR</div>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1"></div>
            <div>COM</div>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mb-1"></div>
            <div>BAK</div>
          </div>
        </div>
        <div className="text-blue-400">STANDBY MODE</div>
      </div>
    </VintageMonitor>
  );
}

export function VisualizationAgentScreen() {
  return (
    <VintageMonitor agentName="DR. VISUALIZATION" status="online" size="large">
      <div className="space-y-1">
        <div>► 3D RENDERING ENGINE</div>
        <div>► REAL-TIME VISUALIZATION</div>
        <div className="mt-2">
          <div>RENDER QUEUE: 127 OBJECTS</div>
          <div>FPS: 60 | LATENCY: 16MS</div>
          <div>GPU USAGE: 76%</div>
        </div>
        <div className="relative mt-2 h-12 bg-gray-900 rounded border border-cyan-400">
          <div className="absolute inset-1 grid grid-cols-12 grid-rows-6 gap-px">
            {[...Array(72)].map((_, i) => (
              <div key={i} className={`${
                Math.random() > 0.7 ? 'bg-cyan-400' : 
                Math.random() > 0.8 ? 'bg-green-400' : 'bg-gray-700'
              } opacity-60`}></div>
            ))}
          </div>
        </div>
        <div className="text-cyan-400">RENDERING COMPLETE</div>
      </div>
    </VintageMonitor>
  );
}

export function MLAgentScreen() {
  return (
    <VintageMonitor agentName="DRA. ML" status="processing" size="medium">
      <div className="space-y-1">
        <div>► MACHINE LEARNING</div>
        <div>► PREDICTIVE MODELING</div>
        <div className="mt-2">
          <div>MODEL ACCURACY: 97.8%</div>
          <div>TRAINING EPOCHS: 2,847</div>
          <div>LOSS FUNCTION: 0.023</div>
          <div>PREDICTIONS: 45,231</div>
        </div>
        <div className="mt-2 flex space-x-1">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 bg-yellow-400 rounded-t" 
                 style={{height: `${Math.sin(i) * 8 + 10}px`}}></div>
          ))}
        </div>
        <div className="text-yellow-400">LEARNING...</div>
      </div>
    </VintageMonitor>
  );
}

export function ExplainerAgentScreen() {
  return (
    <VintageMonitor agentName="DR. EXPLAINER" status="online" size="large">
      <div className="space-y-1">
        <div>► AI INTERPRETATION</div>
        <div>► NATURAL LANGUAGE</div>
        <div className="mt-2">
          <div>QUERIES PROCESSED: 5,094</div>
          <div>RESPONSE TIME: 0.12S</div>
          <div>ACCURACY: 99.1%</div>
          <div>LANGUAGES: 47</div>
        </div>
        <div className="mt-2 text-xs">
          <div>► "Analyzing orbital trajectory..."</div>
          <div>► "Risk assessment complete"</div>
          <div>► "Recommending course correction"</div>
        </div>
        <div className="mt-2">
          <div className="flex space-x-2">
            <div className="w-3 h-1 bg-green-400 rounded animate-pulse"></div>
            <div className="w-2 h-1 bg-cyan-400 rounded"></div>
            <div className="w-4 h-1 bg-green-400 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="text-green-400">EXPLANATION READY</div>
      </div>
    </VintageMonitor>
  );
}
