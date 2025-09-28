import { apiClient } from './api';
import type { NEO, NEOResponse, PhysicalProperties, AnalysisResult } from '../types/api.types';

// Servicio para obtener datos de NEOs (asteroides)
export const neoService = {
  // Obtener lista de asteroides
  async getNEOs(page = 1, limit = 20): Promise<NEOResponse> {
    const response = await apiClient.get(`/neos/?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Obtener un asteroide específico por ID
  async getNEOById(id: number): Promise<NEO> {
    const response = await apiClient.get(`/neos/${id}`);
    return response.data;
  },

  // Analizar un asteroide
  async analyzeAsteroid(physicalProperties: PhysicalProperties): Promise<AnalysisResult> {
    const response = await apiClient.post('/analyze/asteroid', physicalProperties);
    return response.data;
  },

  // Obtener métricas del sistema
  async getSystemMetrics() {
    const response = await apiClient.get('/metrics/system');
    return response.data;
  }
};
