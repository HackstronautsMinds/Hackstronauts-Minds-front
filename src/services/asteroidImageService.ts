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

  // Intentar obtener imagen de la NASA
  async getNASAImage(neoId: string): Promise<string | null> {
    try {
      // La NASA no tiene un endpoint directo para imágenes de asteroides específicos
      // Pero podemos usar su API de imágenes general
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=asteroid&media_type=image&page=1`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      const images = data.collection?.items || [];
      
      // Tomar una imagen aleatoria de asteroides
      if (images.length > 0) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        return randomImage.links?.[0]?.href || null;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching NASA image:', error);
      return null;
    }
  },

  // Generar imagen basada en características del asteroide
  generateAsteroidImage(neoId: string, name: string): string {
    // Crear un placeholder más atractivo con información del asteroide
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '');
    const asteroidNumber = neoId.slice(-4); // Últimos 4 dígitos del ID
    
    // Usar un servicio de placeholder más avanzado
    return `https://via.placeholder.com/400x300/1a1a2a/ffffff?text=${encodeURIComponent(cleanName)}&font-size=16`;
  },

  // Generar imagen SVG personalizada (más atractiva)
  generateSVGAsteroidImage(neoId: string, name: string, diameter: number): string {
    const size = Math.min(Math.max(diameter / 10, 50), 200); // Escalar el tamaño
    const color = diameter > 1000 ? '#8B4513' : diameter > 500 ? '#A0522D' : '#CD853F';
    
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="asteroidGradient" cx="30%" cy="30%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color}88;stop-opacity:0.8" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="#0a0a0a"/>
        <ellipse cx="200" cy="150" rx="${size}" ry="${size * 0.8}" fill="url(#asteroidGradient)"/>
        <text x="200" y="250" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">
          ${name}
        </text>
        <text x="200" y="270" text-anchor="middle" fill="#888888" font-family="Arial, sans-serif" font-size="12">
          Diámetro: ~${Math.round(diameter)}m
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
};
