import React, { useState, useEffect } from 'react';
import { neoService } from '../services/neoService';

export const BackendConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error' | 'mock'>('testing');
  const [neoData, setNeoData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMock, setIsUsingMock] = useState(false);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Probar conexión a NASA API directamente
        // No necesitamos probar backend local

        // Probar endpoint de NEOs de NASA API
        const neosResponse = await neoService.getNEOsList(0, 5);
        setNeoData(neosResponse);
        
        // Verificar si está usando datos mock
        const isMock = neosResponse.neos.some((neo: any) => neo.risk_score !== null);
        setIsUsingMock(isMock);
        
        setConnectionStatus(isMock ? 'mock' : 'success');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setConnectionStatus('error');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-sm z-50">
      <h3 className="text-white font-bold mb-2">🔌 Backend Connection Test</h3>
      
      {connectionStatus === 'testing' && (
        <div className="text-yellow-400 text-sm">
          ⏳ Probando conexión...
        </div>
      )}
      
      {connectionStatus === 'success' && (
        <div className="text-green-400 text-sm">
          ✅ NASA API conectada correctamente
          {neoData && (
            <div className="mt-2 text-xs text-white/60">
              <div>NEOs encontrados: {neoData.neos?.length || 0}</div>
              <div>Página: {neoData.pagination?.page || 'N/A'}</div>
              <div>Total: {neoData.pagination?.total || 'N/A'}</div>
            </div>
          )}
        </div>
      )}
      
      {connectionStatus === 'mock' && (
        <div className="text-yellow-400 text-sm">
          ⚠️ Usando datos mock (NASA API con errores)
          {neoData && (
            <div className="mt-2 text-xs text-white/60">
              <div>NEOs mock: {neoData.neos?.length || 0}</div>
              <div>Datos completos: ✅</div>
              <div>Simulación: ✅</div>
            </div>
          )}
        </div>
      )}
      
      {connectionStatus === 'error' && (
        <div className="text-red-400 text-sm">
          ❌ Error de conexión: {error}
        </div>
      )}
    </div>
  );
};
