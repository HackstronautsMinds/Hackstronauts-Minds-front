import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  onMapClick?: (lat: number, lng: number, coords?: {x: number, y: number}) => void;
  showAsteroidLauncher?: boolean;
}

export default function LeafletMapComponent({ 
  latitude, 
  longitude, 
  zoom = 10, 
  onMapClick
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let leafletMap: any = null;
    let leafletMarker: any = null;

    // Cargar Leaflet dinámicamente
    const loadLeaflet = async () => {
      try {
        const L = await import('leaflet');
        
        // Fix para los iconos de Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Esperar a que el contenedor esté listo
        setTimeout(() => {
          if (!mapRef.current) return;

          // Crear mapa
          leafletMap = L.map(mapRef.current, {
            center: [latitude, longitude],
            zoom: zoom,
            zoomControl: true
          });

          // Agregar capa de tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            maxNativeZoom: 18
          }).addTo(leafletMap);

          // Agregar marcador
          leafletMarker = L.marker([latitude, longitude]).addTo(leafletMap);
          leafletMarker.bindPopup(`
            <div class="text-center">
              <h3 class="font-bold text-lg">Ubicación Seleccionada</h3>
              <p>Lat: ${latitude.toFixed(4)}°</p>
              <p>Lng: ${longitude.toFixed(4)}°</p>
            </div>
          `);

          // Manejar clics en el mapa
          leafletMap.on('click', (e: any) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            
            // Calcular coordenadas relativas dentro del contenedor
            const containerPoint = leafletMap.latLngToContainerPoint(e.latlng);
            const rect = mapRef.current!.getBoundingClientRect();
            const x = (containerPoint.x / rect.width) * 100;
            const y = (containerPoint.y / rect.height) * 100;
            
            console.log('📍 Map click position:', { lat, lng, x, y });
            
            // Llamar a la función de clic del mapa con coordenadas relativas
            onMapClick?.(lat, lng, { x, y });
          });

          setMap(leafletMap);
          setMarker(leafletMarker);
        }, 200);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    loadLeaflet();

    // Limpieza al desmontar
    return () => {
      if (leafletMap) {
        leafletMap.remove();
      }
    };
  }, []);

  // Actualizar posición del marcador cuando cambien las coordenadas
  useEffect(() => {
    if (map && marker) {
      map.setView([latitude, longitude], zoom);
      marker.setLatLng([latitude, longitude]);
      marker.bindPopup(`
        <div class="text-center">
          <h3 class="font-bold text-lg">Ubicación Seleccionada</h3>
          <p>Lat: ${latitude.toFixed(4)}°</p>
          <p>Lng: ${longitude.toFixed(4)}°</p>
        </div>
      `);
    }
  }, [latitude, longitude, zoom, map, marker]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full z-10" />
    </div>
  );
}
