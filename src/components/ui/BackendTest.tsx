import React, { useState } from 'react';
import { testConnection } from '../../services/api';

// Componente simple para probar la conexión con el backend
export const BackendTest = () => {
  const [status, setStatus] = useState<string>('No probado');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    try {
      const result = await testConnection();
      setStatus(`✅ Backend conectado: ${result.status}`);
    } catch (error) {
      setStatus('❌ Error conectando al backend');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-white text-lg mb-2">Prueba de Conexión Backend</h3>
      <p className="text-gray-300 mb-4">Estado: {status}</p>
      <button
        onClick={testBackend}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Probando...' : 'Probar Conexión'}
      </button>
    </div>
  );
};
