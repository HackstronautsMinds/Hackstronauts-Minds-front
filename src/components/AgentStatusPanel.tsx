import React from 'react';
import { motion } from 'framer-motion';
import { agents, Agent } from '../data/agents';

interface AgentStatusPanelProps {
  currentPhase: 'idle' | 'data_collecting' | 'orbital_calculating' | 'impact_analyzing' | 'mitigation_planning' | 'visualization_creating' | 'ml_predicting' | 'explaining' | 'completed';
  progress: number;
}

export default function AgentStatusPanel({ currentPhase, progress }: AgentStatusPanelProps) {
  // Mapear fases a agentes activos
  const getAgentStatus = (agent: Agent) => {
    switch (agent.abilityType) {
      case 'data':
        return {
          isActive: currentPhase === 'data_collecting',
          status: currentPhase === 'idle' ? 'waiting' : 
                 currentPhase === 'data_collecting' ? 'working' : 'completed',
          progress: currentPhase === 'data_collecting' ? Math.min(progress, 100) : 
                   currentPhase === 'idle' ? 0 : 100
        };
      case 'trajectory':
        return {
          isActive: currentPhase === 'orbital_calculating',
          status: ['idle', 'data_collecting'].includes(currentPhase) ? 'waiting' : 
                 currentPhase === 'orbital_calculating' ? 'working' : 'completed',
          progress: currentPhase === 'orbital_calculating' ? Math.max(0, progress - 20) : 
                   ['idle', 'data_collecting'].includes(currentPhase) ? 0 : 100
        };
      case 'impact':
        return {
          isActive: currentPhase === 'impact_analyzing',
          status: ['idle', 'data_collecting', 'orbital_calculating'].includes(currentPhase) ? 'waiting' : 
                 currentPhase === 'impact_analyzing' ? 'working' : 'completed',
          progress: currentPhase === 'impact_analyzing' ? Math.max(0, progress - 40) : 
                   ['idle', 'data_collecting', 'orbital_calculating'].includes(currentPhase) ? 0 : 100
        };
      case 'mitigation':
        return {
          isActive: currentPhase === 'mitigation_planning',
          status: ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing'].includes(currentPhase) ? 'waiting' : 
                 currentPhase === 'mitigation_planning' ? 'working' : 'completed',
          progress: currentPhase === 'mitigation_planning' ? Math.max(0, progress - 60) : 
                   ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing'].includes(currentPhase) ? 0 : 100
        };
      case 'visualization':
        return {
          isActive: currentPhase === 'visualization_creating',
          status: ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing', 'mitigation_planning'].includes(currentPhase) ? 'waiting' : 
                 currentPhase === 'visualization_creating' ? 'working' : 'completed',
          progress: currentPhase === 'visualization_creating' ? Math.max(0, progress - 70) : 
                   ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing', 'mitigation_planning'].includes(currentPhase) ? 0 : 100
        };
      case 'ml':
        return {
          isActive: currentPhase === 'ml_predicting',
          status: ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing', 'mitigation_planning', 'visualization_creating'].includes(currentPhase) ? 'waiting' : 
                 currentPhase === 'ml_predicting' ? 'working' : 'completed',
          progress: currentPhase === 'ml_predicting' ? Math.max(0, progress - 80) : 
                   ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing', 'mitigation_planning', 'visualization_creating'].includes(currentPhase) ? 0 : 100
        };
      case 'explainer':
        return {
          isActive: currentPhase === 'explaining',
          status: ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing', 'mitigation_planning', 'visualization_creating', 'ml_predicting'].includes(currentPhase) ? 'waiting' : 
                 currentPhase === 'explaining' ? 'working' : 'completed',
          progress: currentPhase === 'explaining' ? Math.max(0, progress - 90) : 
                   ['idle', 'data_collecting', 'orbital_calculating', 'impact_analyzing', 'mitigation_planning', 'visualization_creating', 'ml_predicting'].includes(currentPhase) ? 0 : 100
        };
      default:
        return {
          isActive: false,
          status: 'waiting' as const,
          progress: 0
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return '⏳';
      case 'working': return '🔄';
      case 'completed': return '✅';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'text-gray-400';
      case 'working': return 'text-cyan-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-4">
      <h2 className="text-lg font-bold text-white mb-4">🤖 Agentes de IA (Automáticos)</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {agents.map((agent, index) => {
          const agentStatus = getAgentStatus(agent);
          
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                agentStatus.isActive
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                  : agentStatus.status === 'completed'
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-600 bg-gray-800/50'
              }`}
            >
              {/* Header del agente */}
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xl">{agent.icon}</div>
                <div>
                  <h3 className="font-bold text-white text-xs">{agent.name}</h3>
                  <p className="text-xs text-gray-400">{agent.role}</p>
                </div>
              </div>

              {/* Estado y progreso */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${getStatusColor(agentStatus.status)}`}>
                    {getStatusIcon(agentStatus.status)} {agentStatus.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {agentStatus.progress}%
                  </span>
                </div>
                
                {/* Barra de progreso */}
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className={`h-1 rounded-full ${
                      agentStatus.status === 'completed' ? 'bg-green-400' : 'bg-cyan-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${agentStatus.progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {/* Descripción de la tarea */}
                <div className="text-xs text-gray-300">
                  {agentStatus.status === 'waiting' && 'Esperando...'}
                  {agentStatus.status === 'working' && agentStatus.isActive && (
                    <>
                      {agent.abilityType === 'data' && 'Recolectando datos...'}
                      {agent.abilityType === 'trajectory' && 'Calculando trayectoria...'}
                      {agent.abilityType === 'impact' && 'Analizando impacto...'}
                      {agent.abilityType === 'mitigation' && 'Planificando mitigación...'}
                      {agent.abilityType === 'visualization' && 'Creando visualizaciones...'}
                      {agent.abilityType === 'ml' && 'Ejecutando ML...'}
                      {agent.abilityType === 'explainer' && 'Generando reporte...'}
                    </>
                  )}
                  {agentStatus.status === 'completed' && 'Completado'}
                </div>
              </div>

              {/* Datos parciales (se muestran cuando el agente está trabajando) */}
              {agentStatus.status === 'working' && agentStatus.isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pt-2 border-t border-gray-600"
                >
                  <div className="text-xs text-gray-400 space-y-1">
                    {agent.abilityType === 'data' && (
                      <>
                        <div>• Diámetro: {Math.floor(Math.random() * 1000 + 100)}m</div>
                        <div>• Velocidad: {Math.floor(Math.random() * 20 + 5)} km/s</div>
                        <div>• Densidad: {Math.floor(Math.random() * 2000 + 1000)} kg/m³</div>
                      </>
                    )}
                    {agent.abilityType === 'trajectory' && (
                      <>
                        <div>• Probabilidad: {Math.floor(Math.random() * 30)}%</div>
                        <div>• Tiempo: {Math.floor(Math.random() * 100 + 10)} días</div>
                        <div>• Distancia: {Math.floor(Math.random() * 200000 + 50000)} km</div>
                      </>
                    )}
                    {agent.abilityType === 'impact' && (
                      <>
                        <div>• Energía: {Math.floor(Math.random() * 200 + 50)} MT</div>
                        <div>• Cráter: {Math.floor(Math.random() * 5000 + 1000)}m</div>
                        <div>• Área: {Math.floor(Math.random() * 1000 + 100)} km²</div>
                      </>
                    )}
                    {agent.abilityType === 'mitigation' && (
                      <>
                        <div>• Estrategia: Kinetic Impactor</div>
                        <div>• Tiempo: {Math.floor(Math.random() * 50 + 10)} días</div>
                        <div>• Éxito: {Math.floor(Math.random() * 30 + 70)}%</div>
                      </>
                    )}
                    {agent.abilityType === 'visualization' && (
                      <>
                        <div>• Render 3D: {Math.floor(Math.random() * 80 + 20)}%</div>
                        <div>• Mapas: {Math.floor(Math.random() * 5 + 3)} capas</div>
                        <div>• Resolución: {Math.floor(Math.random() * 2000 + 1000)}px</div>
                      </>
                    )}
                    {agent.abilityType === 'ml' && (
                      <>
                        <div>• Modelo: Neural Network</div>
                        <div>• Precisión: {Math.floor(Math.random() * 20 + 80)}%</div>
                        <div>• Predicción: {Math.floor(Math.random() * 100 + 50)} días</div>
                      </>
                    )}
                    {agent.abilityType === 'explainer' && (
                      <>
                        <div>• Audiencia: Público general</div>
                        <div>• Nivel: Básico</div>
                        <div>• Idiomas: {Math.floor(Math.random() * 3 + 2)}</div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Resumen del progreso general */}
      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-bold text-sm">Progreso General</span>
          <span className="text-cyan-400 font-bold text-sm">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {currentPhase === 'idle' && 'Iniciando simulación...'}
          {currentPhase === 'data_collecting' && 'Recolectando datos del asteroide...'}
          {currentPhase === 'orbital_calculating' && 'Calculando trayectoria orbital...'}
          {currentPhase === 'impact_analyzing' && 'Analizando efectos del impacto...'}
          {currentPhase === 'mitigation_planning' && 'Desarrollando estrategia de mitigación...'}
          {currentPhase === 'visualization_creating' && 'Creando visualizaciones 3D...'}
          {currentPhase === 'ml_predicting' && 'Ejecutando predicciones con ML...'}
          {currentPhase === 'explaining' && 'Generando reporte explicativo...'}
          {currentPhase === 'completed' && 'Simulación completada exitosamente'}
        </div>
      </div>
    </div>
  );
}
