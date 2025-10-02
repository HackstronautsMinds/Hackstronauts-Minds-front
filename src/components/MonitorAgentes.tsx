import React from 'react';

// Define types for our components
interface MonitorProps {
  agentName: string;
  status: 'online' | 'processing' | 'standby';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

// VintageMonitor Component
const VintageMonitor: React.FC<MonitorProps> = ({ agentName, status, size = 'medium', children }) => {
  const sizeClasses = {
    small: 'w-64 h-48',
    medium: 'w-80 h-64',
    large: 'w-96 h-80'
  };
  
  const statusColors = {
    online: 'bg-green-400',
    processing: 'bg-yellow-400',
    standby: 'bg-blue-400'
  };
  
  const statusIndicators = {
    online: ['bg-green-400', 'bg-yellow-400', 'bg-red-400'],
    processing: ['bg-yellow-400', 'bg-green-400', 'bg-red-400'],
    standby: ['bg-blue-400', 'bg-green-400', 'bg-yellow-400']
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} rounded-lg shadow-2xl overflow-hidden border-2 border-gray-700`}>
      {/* Monitor frame */}
      <div className="bg-gray-600 p-2 rounded-t-lg flex justify-between items-center border border-gray-700">
        <div className="text-white font-mono text-sm font-bold">{agentName}</div>
        <div className={`w-2 h-2 rounded-full ${statusColors[status]} shadow-lg`}></div>
      </div>
      
      {/* Screen */}
      <div className="bg-black p-3 border-l-2 border-r-2 border-gray-800">
        <div className="bg-gray-900 p-2 rounded h-full border border-gray-700 relative">
          {/* Scanlines effect */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-green-400 mb-1"></div>
            ))}
          </div>
          {children}
        </div>
      </div>
      
      {/* Monitor base */}
      <div className="bg-gray-600 h-4 rounded-b-lg flex justify-center items-center space-x-1 mt-1 border border-gray-700">
        {statusIndicators[status].map((color, index) => (
          <div key={index} className={`w-2 h-2 rounded-full ${color} shadow-sm`}></div>
        ))}
      </div>
      
      {/* Side buttons */}
      <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gray-700 rounded-full border border-gray-600"></div>
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gray-700 rounded-full border border-gray-600"></div>
      
      {/* Corner lights - green dots */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
    </div>
  );
};

// Main Component
export function MonitorAgentes() {
  return (
    <div 
      className="relative overflow-hidden" 
      style={{ 
        height: '50vh',
        width: '100%',
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
      
      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        {/* Top row - single monitor */}
        <div className="flex justify-center mb-12">
          <VintageMonitor agentName="DRA. ORBITAL" status="online" size="medium">
            <div className="space-y-1 text-green-400 text-xs font-mono">
              <div>ORBITAL RECONNAISSANCE</div>
              <div>• TRACKING AVG47 OBJECTS</div>
              <div>• ALTITUDE AVG 2,340 KM</div>
              <div>ALTITUDE: 408.2 KM</div>
            </div>
          </VintageMonitor>
        </div>
        
        {/* Middle row - two monitors */}
        <div className="flex justify-center gap-12 mb-12">
          <VintageMonitor agentName="DRA. MITIGATION" status="processing" size="medium">
            <div className="space-y-1 text-green-400 text-xs font-mono">
              <div>RISK MITIGATION</div>
              <div>• CONTAINMENT 12</div>
              <div>PROTOCOLS</div>
              <div>• DAMAGE OUTPUT REDUC47%</div>
              <div>ALTITUDE: 408.2 KM</div>
            </div>
          </VintageMonitor>
          
          <VintageMonitor agentName="DR. IMPACT" status="online" size="medium">
            <div className="space-y-1 text-green-400 text-xs font-mono">
              <div>IMPACT ASSESSMENT</div>
              <div>• COLLISION 0.03%</div>
              <div>PROBABILITY</div>
              <div>• IMPACT PACIFIC</div>
              <div>LOCATION OCEAN</div>
              <div>ALTITUDE: 408.2 KM</div>
            </div>
          </VintageMonitor>
        </div>
        
        {/* Bottom row - four monitors */}
        <div className="flex justify-center gap-8">
          <VintageMonitor agentName="DRA. ML" status="processing" size="medium">
            <div className="space-y-1 text-green-400 text-xs font-mono">
              <div>MACHINE LEARNING</div>
              <div>• TRAINING 1,247</div>
              <div>ITERATIONS</div>
              <div>• MODEL ACCURACY 97.8%</div>
              <div>ALTITUDE: 408.2 KM</div>
            </div>
          </VintageMonitor>
          
          <VintageMonitor agentName="DR. DATA" status="online" size="medium">
            <div className="space-y-1 text-green-400 text-xs font-mono">
              <div>NEURAL NETWORK</div>
              <div>ANALYSIS</div>
              <div>• PATTERN 94%</div>
              <div>RECOGNITION</div>
              <div>• DATA MINING YES</div>
              <div>ACTIVE</div>
            </div>
          </VintageMonitor>
          
          <VintageMonitor agentName="DR. VISUALIZATION" status="processing" size="medium">
            <div className="space-y-1 text-green-400 text-xs font-mono">
              <div>3D RENDERING ENGINE</div>
              <div>• REAL TIME ACTIVE</div>
              <div>VISUALIZATION</div>
              <div>• RENDERED 527</div>
              <div>OBJECTS</div>
              <div>• FPS 144</div>
            </div>
          </VintageMonitor>
          
          <VintageMonitor agentName="DR. EXPLAINER" status="online" size="medium">
            <div className="space-y-1 text-green-400 text-xs font-mono">
              <div>AI INTERPRETATION</div>
              <div>• NATURAL LANGUAGE</div>
              <div>ACTIVE</div>
              <div>• QUERIES 5,894</div>
              <div>PROCESSED</div>
              <div>• RESPONSE TIME 0.12s</div>
            </div>
          </VintageMonitor>
        </div>
      </div>
    </div>
  );
}
