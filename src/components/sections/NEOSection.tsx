import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NEOSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NEOSection({ isOpen, onClose }: NEOSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-cyan-400/30 w-full max-w-7xl h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-white">Near Earth Objects Monitor</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-300">Asteroides cercanos a la Tierra monitoreados en tiempo real por nuestro sistema de IA</p>
          </div>

          <div className="flex h-full">
            {/* Sidebar - Filtros y Lista */}
            <div className="w-1/3 border-r border-gray-700 p-6 overflow-y-auto">
              {/* ESTADÍSTICAS GLOBALES */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">📊 ESTADÍSTICAS GLOBALES</h2>
                <div className="space-y-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-cyan-400">28,000+</div>
                    <div className="text-gray-300 text-sm">Total NEOs monitoreados</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-400">127</div>
                    <div className="text-gray-300 text-sm">Objetos peligrosos activos</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">3</div>
                    <div className="text-gray-300 text-sm">Alertas en tiempo real</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-sm text-gray-300">Última actualización: 2024-01-15 14:30 UTC</div>
                  </div>
                </div>
              </div>

              {/* FILTROS Y BÚSQUEDA */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">🔍 FILTROS Y BÚSQUEDA</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Rango de fechas</label>
                    <input
                      type="date"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Nivel de peligrosidad (Torino 0-10)</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Tamaño del asteroide</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Distancia a la Tierra</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Buscar por ID</label>
                    <input
                      type="text"
                      placeholder="Ej: 2000433"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* CALENDARIO DE EVENTOS */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">📅 CALENDARIO DE EVENTOS</h2>
                <div className="space-y-2">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-cyan-400 font-bold">2024-03-15</div>
                    <div className="text-gray-300 text-sm">Asteroide 2024-AB123</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-cyan-400 font-bold">2024-03-22</div>
                    <div className="text-gray-300 text-sm">Asteroide 2024-CD456</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-cyan-400 font-bold">2024-04-01</div>
                    <div className="text-gray-300 text-sm">Asteroide 2024-EF789</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Central - Visualización */}
            <div className="flex-1 p-6">
              {/* VISUALIZACIÓN 3D */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">🌍 VISUALIZACIÓN 3D</h2>
                <div className="bg-gray-800/50 rounded-lg h-64 flex items-center justify-center border border-gray-600">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌍</div>
                    <div className="text-gray-300">Sistema solar interactivo</div>
                    <div className="text-gray-400 text-sm">Órbitas de asteroides en tiempo real</div>
                  </div>
                </div>
              </div>

              {/* GRÁFICOS Y ANÁLISIS */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">📊 GRÁFICOS Y ANÁLISIS</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 h-32 flex items-center justify-center border border-gray-600">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📈</div>
                      <div className="text-gray-300 text-sm">Gráfico temporal de detecciones</div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 h-32 flex items-center justify-center border border-gray-600">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-gray-300 text-sm">Distribución por nivel de peligro</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ALERTAS Y NOTIFICACIONES */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">⚠️ ALERTAS Y NOTIFICACIONES</h2>
                <div className="space-y-2">
                  <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="text-red-400 font-bold">Asteroide 2024-AB123 - Torino: 3</div>
                    </div>
                  </div>
                  <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="text-yellow-400 font-bold">Asteroide 2024-CD456 - Torino: 2</div>
                    </div>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="text-green-400 font-bold">Asteroide 2024-EF789 - Torino: 1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Derecho - Métricas */}
            <div className="w-1/4 border-l border-gray-700 p-6 overflow-y-auto">
              {/* MÉTRICAS EN TIEMPO REAL */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">📱 MÉTRICAS EN TIEMPO REAL</h2>
                <div className="space-y-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-cyan-400 font-bold">28,000+</div>
                    <div className="text-gray-300 text-sm">Contador de NEOs actualizado</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-green-400 font-bold">2024-01-15 14:30</div>
                    <div className="text-gray-300 text-sm">Timestamp de última actualización</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-green-400 font-bold">Online</div>
                    <div className="text-gray-300 text-sm">Estado de conexión del sistema</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-cyan-400 font-bold">98.5%</div>
                    <div className="text-gray-300 text-sm">Calidad de datos (porcentaje)</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-yellow-400 font-bold">1.2s</div>
                    <div className="text-gray-300 text-sm">Velocidad de procesamiento</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
