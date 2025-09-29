// Servicio para obtener imágenes de asteroides
export const asteroidImageService = {
  // Obtener imagen de un asteroide específico
  async getAsteroidImage(neoId: string, name: string): Promise<string> {
    try {
      // Intentar obtener imagen de la NASA Image Gallery
      const nasaImage = await this.getNASAImage(neoId);
      if (nasaImage) return nasaImage;

      // Si no hay imagen de la NASA, generar una basada en características
      return this.generateAsteroidImage(neoId, name);
    } catch (error) {
      console.error('Error getting asteroid image:', error);
      return this.generateAsteroidImage(neoId, name);
    }
  },

  // Intentar obtener imagen de la NASA (solo imágenes generales de asteroides)
  async getNASAImage(neoId: string): Promise<string | null> {
    // Los asteroides específicos no tienen imágenes reales
    // Solo hay imágenes generales de asteroides o representaciones artísticas
    return null; // No intentar obtener imágenes que no existen
  },

  // Generar imagen basada en características del asteroide
  generateAsteroidImage(neoId: string, name: string): string {
    // Crear un placeholder más atractivo con el nombre del asteroide
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 20); // Limitar longitud
    
    // Usar un servicio de placeholder más avanzado
    return `https://via.placeholder.com/400x300/1a1a2a/ffffff?text=${encodeURIComponent(cleanName)}&font-size=16`;
  },

  // Generar imagen SVG personalizada (más realista)
  generateSVGAsteroidImage(neoId: string, name: string, diameter: number): string {
    const size = Math.min(Math.max(diameter / 15, 30), 150); // Escalar el tamaño
    const color = diameter > 1000 ? '#8B4513' : diameter > 500 ? '#A0522D' : '#CD853F';
    const shadowColor = diameter > 1000 ? '#654321' : diameter > 500 ? '#7A4A2A' : '#B8860B';
    
    // Crear un asteroide más realista con forma irregular
    const points = this.generateAsteroidShape(size);
    
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="asteroidGradient" cx="30%" cy="30%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="70%" style="stop-color:${shadowColor};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:${shadowColor}66;stop-opacity:0.7" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="#0a0a0a"/>
        <g transform="translate(200, 150)">
          <polygon points="${points}" fill="url(#asteroidGradient)" filter="url(#glow)"/>
          <circle cx="${-size * 0.3}" cy="${-size * 0.2}" r="${size * 0.1}" fill="#ffffff" opacity="0.3"/>
        </g>
        <text x="200" y="220" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          ${name}
        </text>
        <text x="200" y="240" text-anchor="middle" fill="#888888" font-family="Arial, sans-serif" font-size="12">
          Diámetro: ~${Math.round(diameter)}m
        </text>
        <text x="200" y="260" text-anchor="middle" fill="#666666" font-family="Arial, sans-serif" font-size="10">
          Representación artística
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  },

  // Generar forma irregular de asteroide
  generateAsteroidShape(size: number): string {
    const points: string[] = [];
    const numPoints = 8;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const radius = size * (0.7 + Math.random() * 0.6); // Variar el radio
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.8; // Hacer más elíptico
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  }
};
