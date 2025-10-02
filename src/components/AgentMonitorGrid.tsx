import React, { useState, useEffect } from 'react';
import { AgentMonitor } from './AgentMonitor';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'standby' | 'completed' | 'initializing';
  progress: number;
  data: {
    [key: string]: string | number;
  };
}

export function AgentMonitorGrid() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'DRA. ORBITAL',
      type: 'ORBITAL RECONNAISANCE',
      status: 'active',
      progress: 76,
      data: {
        'tracking_avg': '47 OBJECTS',
        'altitude_avg': '2,340 KM'
      }
    },
    {
      id: '2',
      name: 'DRA. MITIGATION',
      type: 'RISK MITIGATION',
      status: 'active',
      progress: 92,
      data: {
        'containment_protocols': '12',
        'damage_output_reduc': '47%'
      }
    },
    {
      id: '3',
      name: 'DR. IMPACT',
      type: 'IMPACT ASSESSMENT',
      status: 'standby',
      progress: 100,
      data: {
        'collision_probability': '0.03%',
        'impact_location': 'PACIFIC OCEAN'
      }
    },
    {
      id: '4',
      name: 'DRA. ML',
      type: 'MACHINE LEARNING',
      status: 'active',
      progress: 45,
      data: {
        'training_iterations': '1,247',
        'model_accuracy': '97.8%'
      }
    },
    {
      id: '5',
      name: 'DR. DATA',
      type: 'NEURAL NETWORK ANALYSIS',
      status: 'initializing',
      progress: 23,
      data: {
        'pattern_recognition': '94%',
        'data_mining_active': 'YES',
        'datasets_detected': '3',
        'accuracy_rate': '99.3%'
      }
    },
    {
      id: '6',
      name: 'DR. VISUALIZATION',
      type: '3D RENDERING ENGINE',
      status: 'standby',
      progress: 100,
      data: {
        'real_time_visualization': 'ACTIVE',
        'rendered_objects': '527 OBJECTS',
        'fps_in_realtime': '144 HZ',
        'cpu_usage': '76%'
      }
    },
    {
      id: '7',
      name: 'DR. EXPLAINER',
      type: 'AI INTERPRETATION',
      status: 'active',
      progress: 67,
      data: {
        'natural_language': 'ACTIVE',
        'queries_processed': '5,894',
        'response_time': '0.12s',
        'accuracy': '99.1%'
      }
    }
  ]);

  // Simulate agent state changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prevAgents => 
        prevAgents.map(agent => {
          // Random chance to change status or progress
          if (Math.random() < 0.1) {
            const newProgress = Math.min(100, agent.progress + Math.floor(Math.random() * 5));
            let newStatus = agent.status;
            
            if (newProgress === 100 && agent.status === 'active') {
              newStatus = 'completed';
            } else if (agent.status === 'completed' && Math.random() < 0.3) {
              newStatus = 'initializing';
              return { ...agent, status: newStatus, progress: 0 };
            } else if (agent.status === 'initializing' && newProgress > 20) {
              newStatus = 'active';
            }
            
            return { ...agent, status: newStatus, progress: newProgress };
          }
          return agent;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative overflow-hidden min-h-screen"
      style={{
        width: '100%'
      }}
    >
      {/* Exact background from image */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #4c1d95 0%, #3730a3 30%, #312e81 60%, #1e1b4b 100%)',
        }}
      />
      
      {/* Grid Pattern like in image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Pyramidal Layout Container */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center py-20">
        
        {/* TOP ROW - 1 monitor */}
        <div className="mb-16">
          <AgentMonitor
            agentName={agents[0].name}
            agentType={agents[0].type}
            status={agents[0].status}
            progress={agents[0].progress}
            data={agents[0].data}
            className="w-64"
          />
        </div>

        {/* MIDDLE ROW - 2 monitors */}
        <div className="flex gap-12 mb-16">
          <AgentMonitor
            agentName={agents[1].name}
            agentType={agents[1].type}
            status={agents[1].status}
            progress={agents[1].progress}
            data={agents[1].data}
            className="w-64"
          />
          <AgentMonitor
            agentName={agents[2].name}
            agentType={agents[2].type}
            status={agents[2].status}
            progress={agents[2].progress}
            data={agents[2].data}
            className="w-64"
          />
        </div>

        {/* BOTTOM ROW - 4 monitors */}
        <div className="flex gap-8">
          <AgentMonitor
            agentName={agents[3].name}
            agentType={agents[3].type}
            status={agents[3].status}
            progress={agents[3].progress}
            data={agents[3].data}
            className="w-60"
          />
          <AgentMonitor
            agentName={agents[4].name}
            agentType={agents[4].type}
            status={agents[4].status}
            progress={agents[4].progress}
            data={agents[4].data}
            className="w-60"
          />
          <AgentMonitor
            agentName={agents[5].name}
            agentType={agents[5].type}
            status={agents[5].status}
            progress={agents[5].progress}
            data={agents[5].data}
            className="w-60"
          />
          <AgentMonitor
            agentName={agents[6].name}
            agentType={agents[6].type}
            status={agents[6].status}
            progress={agents[6].progress}
            data={agents[6].data}
            className="w-60"
          />
        </div>
      </div>

      {/* Atmospheric glow effects like in image */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue glows behind monitors */}
        <div className="absolute top-12 left-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl transform -translate-x-1/2"></div>
        <div className="absolute top-36 left-1/4 w-24 h-24 bg-cyan-400/15 rounded-full blur-2xl"></div>
        <div className="absolute top-36 right-1/4 w-24 h-24 bg-cyan-400/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-16 left-1/6 w-20 h-20 bg-blue-400/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-16 right-1/6 w-20 h-20 bg-blue-400/15 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
