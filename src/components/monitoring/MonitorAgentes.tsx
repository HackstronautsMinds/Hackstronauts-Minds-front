import React from 'react';
import { useLiveMetrics } from '../../hooks/useLiveMetrics';

// Define types for our components
interface MonitorProps {
  agentName: string;
  status: 'online' | 'processing' | 'standby';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

// VintageMonitor Component with native CSS
const VintageMonitor: React.FC<MonitorProps> = ({ agentName, status, size = 'medium', children }) => {
  const sizeClasses = {
    small: { width: '16rem', height: '12rem' },
    medium: { width: '20rem', height: '16rem' },
    large: { width: '18rem', height: '16rem' }
  };
  
  const statusColors = {
    online: '#4ade80', // green-400
    processing: '#f59e0b', // yellow-400
    standby: '#3b82f6' // blue-400
  };
  
  const statusIndicators = {
    online: ['#4ade80', '#f59e0b', '#ef4444'],
    processing: ['#f59e0b', '#4ade80', '#ef4444'],
    standby: ['#3b82f6', '#4ade80', '#f59e0b']
  };
  
  return (
    <div 
      className="relative" 
      style={{
        width: sizeClasses[size].width,
        height: sizeClasses[size].height,
        borderRadius: '0.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        border: '2px solid #4b5563',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      {/* Monitor frame */}
      <div 
        style={{
          backgroundColor: '#6b7280',
          padding: '0.5rem',
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #4b5563'
        }}
      >
        <div style={{ color: 'white', fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 'bold' }}>
          {agentName}
        </div>
        <div 
          style={{
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            backgroundColor: statusColors[status],
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)'
          }}
        ></div>
      </div>
      
      {/* Screen */}
      <div 
        style={{
          backgroundColor: 'black',
          padding: '0.75rem',
          borderLeft: '2px solid #4b5563',
          borderRight: '2px solid #4b5563',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div 
          style={{
            backgroundColor: '#1f2937',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            flexGrow: 1,
            border: '1px solid #4b5563',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Scanlines effect */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                style={{
                  width: '100%',
                  height: '0.125rem',
                  backgroundColor: '#4ade80',
                  marginBottom: '0.25rem'
                }}
              ></div>
            ))}
          </div>
          {children}
        </div>
      </div>
      
      {/* Monitor base */}
      <div 
        style={{
          backgroundColor: '#6b7280',
          height: '1rem',
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.25rem',
          marginTop: '0.25rem',
          border: '1px solid #4b5563'
        }}
      >
        {statusIndicators[status].map((color, index) => (
          <div 
            key={index} 
            style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)'
            }}
          ></div>
        ))}
      </div>
      
      {/* Side buttons */}
      <div 
        style={{
          position: 'absolute',
          left: '0.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0.5rem',
          height: '2rem',
          backgroundColor: '#4b5563',
          borderRadius: '0.5rem',
          border: '1px solid #6b7280'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          right: '0.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0.5rem',
          height: '2rem',
          backgroundColor: '#4b5563',
          borderRadius: '0.5rem',
          border: '1px solid #6b7280'
        }}
      ></div>
      
      {/* Corner lights - green dots */}
      <div 
        style={{
          position: 'absolute',
          top: '0.25rem',
          left: '0.25rem',
          width: '0.375rem',
          height: '0.375rem',
          backgroundColor: '#4ade80',
          borderRadius: '50%',
          boxShadow: '0 0 4px #4ade80',
          animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.25rem',
          width: '0.375rem',
          height: '0.375rem',
          backgroundColor: '#4ade80',
          borderRadius: '50%',
          boxShadow: '0 0 4px #4ade80',
          animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          bottom: '0.25rem',
          left: '0.25rem',
          width: '0.375rem',
          height: '0.375rem',
          backgroundColor: '#4ade80',
          borderRadius: '50%',
          boxShadow: '0 0 4px #4ade80',
          animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          bottom: '0.25rem',
          right: '0.25rem',
          width: '0.375rem',
          height: '0.375rem',
          backgroundColor: '#4ade80',
          borderRadius: '50%',
          boxShadow: '0 0 4px #4ade80',
          animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      ></div>
    </div>
  );
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Main Component
export function MonitorAgentes() {
  const metrics = useLiveMetrics();
  
  return (
    <div 
      className="relative overflow-hidden" 
      style={{ 
        minHeight: '120vh',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        backgroundImage: 'radial-gradient(circle at 25% 75%, rgba(63, 41, 127, 0.2) 0%, transparent 0%), radial-gradient(circle at 75% 25%, rgba(63, 41, 127, 0.2) 0%, transparent 0%), linear-gradient(to bottom, rgba(63, 41, 127, 0.2) 0%, transparent 0%)', 
        backgroundSize: '100px 100px',
        backgroundColor: '#1e1b4b'
      }}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>
      
      <div 
        className="relative z-10 w-full h-full flex flex-col justify-center items-center"
        style={{
          padding: 'clamp(1rem, 2vw, 2rem)',
          minHeight: '100vh',
          gap: 'clamp(1rem, 2vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Top row - single monitor */}
        <div className="w-full flex justify-center">
          <div style={{ width: '40%', maxWidth: '28rem', height: '22rem' }}>
            <VintageMonitor agentName="DRA. ORBITAL" status="online" size="large">
              <div style={{ 
                color: '#4ade80', 
                fontFamily: 'monospace', 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)', 
                lineHeight: '1.25' 
              }}>
                <div>ORBITAL RECONNAISSANCE</div>
                <div>• TRACKING {metrics.trackingObjects} OBJECTS</div>
                <div>• ALTITUDE AVG {metrics.averageAltitude.toLocaleString()} KM</div>
                <div>ALTITUDE: {metrics.currentAltitude.toLocaleString()} KM</div>
              </div>
            </VintageMonitor>
          </div>
        </div>
        
        {/* Middle row - two monitors */}
        <div className="w-full flex justify-center gap-6 sm:gap-8 md:gap-12">
          <div style={{ width: '35%', maxWidth: '24rem', height: '20rem' }}>
            <VintageMonitor agentName="DRA. MITIGATION" status="processing" size="large">
              <div style={{ 
                color: '#4ade80', 
                fontFamily: 'monospace', 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)', 
                lineHeight: '1.25' 
              }}>
                <div>RISK MITIGATION</div>
                <div>• CONTAINMENT {metrics.containmentProtocols}</div>
                <div>PROTOCOLS</div>
                <div>• DAMAGE OUTPUT REDUC{metrics.damageReduction}%</div>
                <div>STATUS: ACTIVE</div>
              </div>
            </VintageMonitor>
          </div>
          
          <div style={{ width: '35%', maxWidth: '24rem', height: '20rem' }}>
            <VintageMonitor agentName="DR. IMPACT" status="online" size="large">
              <div style={{ 
                color: '#4ade80', 
                fontFamily: 'monospace', 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)', 
                lineHeight: '1.25' 
              }}>
                <div>IMPACT ASSESSMENT</div>
                <div>• COLLISION {(metrics.collisionProbability * 100).toFixed(2)}%</div>
                <div>PROBABILITY</div>
                <div>• IMPACT {metrics.impactLocation}</div>
                <div>LOCATION DETECTED</div>
                <div>STATUS: MONITORING</div>
              </div>
            </VintageMonitor>
          </div>
        </div>
        
        {/* Bottom row - four monitors */}
        <div className="w-full flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <div style={{ width: '22%', maxWidth: '18rem', height: '20rem' }}>
            <VintageMonitor agentName="DRA. ML" status="processing" size="large">
              <div style={{ 
                color: '#4ade80', 
                fontFamily: 'monospace', 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)', 
                lineHeight: '1.25' 
              }}>
                <div>MACHINE LEARNING</div>
                <div>• TRAINING {metrics.trainingIterations.toLocaleString()}</div>
                <div>ITERATIONS</div>
                <div>• MODEL ACCURACY {metrics.modelAccuracy.toFixed(1)}%</div>
                <div>STATUS: TRAINING</div>
              </div>
            </VintageMonitor>
          </div>
          
          <div style={{ width: '22%', maxWidth: '18rem', height: '20rem' }}>
            <VintageMonitor agentName="DR. DATA" status="online" size="large">
              <div style={{ 
                color: '#4ade80', 
                fontFamily: 'monospace', 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)', 
                lineHeight: '1.25' 
              }}>
                <div>NEURAL NETWORK</div>
                <div>ANALYSIS</div>
                <div>• PATTERN {metrics.patternRecognition.toFixed(0)}%</div>
                <div>RECOGNITION</div>
                <div>• DATA MINING {metrics.dataMiningActive ? 'YES' : 'NO'}</div>
                <div>ACTIVE</div>
              </div>
            </VintageMonitor>
          </div>
          
          <div style={{ width: '22%', maxWidth: '18rem', height: '20rem' }}>
            <VintageMonitor agentName="DR. VISUALIZATION" status="processing" size="large">
              <div style={{ 
                color: '#4ade80', 
                fontFamily: 'monospace', 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)', 
                lineHeight: '1.25' 
              }}>
                <div>3D RENDERING ENGINE</div>
                <div>• REAL TIME ACTIVE</div>
                <div>VISUALIZATION</div>
                <div>• RENDERED {metrics.renderedObjects}</div>
                <div>OBJECTS</div>
                <div>• FPS {metrics.fps}</div>
              </div>
            </VintageMonitor>
          </div>
          
          <div style={{ width: '22%', maxWidth: '18rem', height: '20rem' }}>
            <VintageMonitor agentName="DR. EXPLAINER" status="online" size="large">
              <div style={{ 
                color: '#4ade80', 
                fontFamily: 'monospace', 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)', 
                lineHeight: '1.25' 
              }}>
                <div>AI INTERPRETATION</div>
                <div>• NATURAL LANGUAGE</div>
                <div>ACTIVE</div>
                <div>• QUERIES {metrics.processedQueries.toLocaleString()}</div>
                <div>PROCESSED</div>
                <div>• RESPONSE TIME {metrics.responseTime.toFixed(2)}s</div>
              </div>
            </VintageMonitor>
          </div>
        </div>
      </div>
    </div>
  );
}
