import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Earth3DGlobeProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function Earth3DGlobe({ onLocationSelect }: Earth3DGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Canvas controlado por React
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const earthRef = useRef<THREE.Mesh>();
  const raycasterRef = useRef<THREE.Raycaster>();
  const mouseRef = useRef<THREE.Vector2>();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Crear escena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Crear cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7; // Más lejos para acomodar el globo más grande
    cameraRef.current = camera;

    // Crear renderer sobre el canvas de React
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Crear raycaster para detección de clics
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    raycasterRef.current = raycaster;
    mouseRef.current = mouse;

    // Crear geometría de la esfera (4 veces más grande)
    const geometry = new THREE.SphereGeometry(4, 64, 32);

    // Crear material de la Tierra con textura
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      undefined,
      undefined,
      (error) => {
        console.warn('Error loading Earth texture:', error);
      }
    );

    const normalMap = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );

    const bumpMap = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'
    );

    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalMap: normalMap,
      bumpMap: bumpMap,
      bumpScale: 0.1,
      shininess: 100,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0
    });

    // Crear malla de la Tierra
    const earth = new THREE.Mesh(geometry, earthMaterial);
    earth.userData = { isEarth: true };
    scene.add(earth);
    earthRef.current = earth;

    // Crear atmósfera (proporcionalmente más grande)
    const atmosphereGeometry = new THREE.SphereGeometry(4.2, 64, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Crear luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Luz adicional para mejor iluminación
    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Crear estrellas de fondo
    createStars(scene);

    // Variables para rotación
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationSpeed = 0.005;

    // Event listeners para mouse
    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isMouseDown) {
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        
        mouseX = event.clientX;
        mouseY = event.clientY;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoomSpeed = 0.1;
      camera.position.z += event.deltaY * zoomSpeed * 0.01;
      camera.position.z = Math.max(6, Math.min(20, camera.position.z));
    };

    const handleClick = (event: MouseEvent) => {
      if (!raycaster || !camera || !earth) return;

      const rect = canvasRef.current!.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(earth);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        const lat = Math.asin(point.y) * (180 / Math.PI);
        const lng = Math.atan2(point.x, point.z) * (180 / Math.PI);
        
        setSelectedLocation({ lat, lng });
        onLocationSelect(lat, lng);
        console.log(`Ubicación Seleccionada: Lat ${lat.toFixed(2)}, Lng ${lng.toFixed(2)}`);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      // Aumentar brillo al hacer hover
      if (earthMaterial) {
        earthMaterial.emissive.setHex(0x222222);
        earthMaterial.emissiveIntensity = 0.3;
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Restaurar brillo normal
      if (earthMaterial) {
        earthMaterial.emissive.setHex(0x000000);
        earthMaterial.emissiveIntensity = 0;
      }
    };

    // Agregar event listeners
    canvasRef.current.addEventListener('mousedown', handleMouseDown);
    canvasRef.current.addEventListener('mouseup', handleMouseUp);
    canvasRef.current.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('wheel', handleWheel);
    canvasRef.current.addEventListener('click', handleClick);
    canvasRef.current.addEventListener('mouseenter', handleMouseEnter);
    canvasRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      if (earth) {
        // Rotación suave hacia el objetivo
        earth.rotation.y += (targetRotationY - earth.rotation.y) * 0.1;
        earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.1;

        // Rotación automática cuando no hay interacción
        if (!isMouseDown) {
          earth.rotation.y += rotationSpeed;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Función de limpieza
    return () => {
      renderer.dispose();
      if (earthMaterial.map) earthMaterial.map.dispose();
      if (earthMaterial.normalMap) earthMaterial.normalMap.dispose();
      if (earthMaterial.bumpMap) earthMaterial.bumpMap.dispose();
      earthMaterial.dispose();
      geometry.dispose();
      atmosphereMaterial.dispose();
      atmosphereGeometry.dispose();
      scene.clear();
    };
  }, [onLocationSelect]);

  // Función para crear estrellas de fondo
  const createStars = (scene: THREE.Scene) => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });

    const starsVertices: number[] = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
  };

  // Manejar redimensionamiento
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && cameraRef.current && rendererRef.current) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Canvas controlado por React */}
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Overlay de instrucciones */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm max-w-sm">
          <h3 className="font-bold text-lg mb-3">Instrucciones</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-white rounded-sm"></span>
              Haz clic en cualquier parte del planeta para seleccionar una ubicación
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-400 rounded-sm"></span>
              Usa el mouse para rotar y hacer zoom
            </p>
            <p className="flex items-center gap-2 text-yellow-400">
              <span className="w-4 h-4 bg-yellow-400 rounded-sm"></span>
              El planeta se ilumina cuando pasas el mouse sobre él
            </p>
            <p className="flex items-center gap-2 text-green-400">
              <span className="w-4 h-4 bg-green-400 rounded-sm"></span>
              El mapa se abrirá automáticamente al seleccionar
            </p>
          </div>
        </div>
      </div>

      {/* Información de ubicación seleccionada */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-green-600/90 text-white p-4 rounded-lg backdrop-blur-sm">
            <p className="font-semibold">Ubicación Seleccionada:</p>
            <p>Lat: {selectedLocation.lat.toFixed(4)}°</p>
            <p>Lng: {selectedLocation.lng.toFixed(4)}°</p>
            <p className="text-sm mt-2 text-green-200">
              🗺️ Abriendo mapa automáticamente...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}