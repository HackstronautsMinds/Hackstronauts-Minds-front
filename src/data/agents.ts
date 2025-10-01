export interface Agent {
  id: number;
  name: string;
  role: string;
  specialty: string;
  description: string;
  bio: string;
  achievements: string[];
  image: string;
  color: string;
  abilityType: 'data' | 'trajectory' | 'impact' | 'mitigation' | 'visualization' | 'ml' | 'explainer';
  stats: {
    intelligence: number;
    innovation: number;
    leadership: number;
    impact: number;
  };
  yearsOfService?: number;
  missionsCompleted?: number;
  rank?: string;
  sciences: string[];
  responsibilities: string[];
  importance: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    name: "DR. DATA",
    role: "DATA COLLECTOR AGENT",
    specialty: "RECOLECCIÓN DE DATOS ESPACIALES",
    description: "Recolecta datos de asteroides de la NASA y otras fuentes",
    bio: "Especialista en recolección y validación de datos espaciales. Maneja la integración con APIs externas y proporciona la base de información para todos los demás agentes.",
    achievements: [
      "Integración con APIs de la NASA",
      "Validación de datos de asteroides",
      "Manejo de fuentes múltiples",
      "Base de datos espaciales completa"
    ],
    image: "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#00D4FF",
    abilityType: "data",
    stats: {
      intelligence: 95,
      innovation: 88,
      leadership: 82,
      impact: 90
    },
    yearsOfService: 8,
    missionsCompleted: 156,
    rank: "SENIOR",
    sciences: ["Ciencia de Datos", "APIs", "Validación", "Integración"],
    responsibilities: [
      "Recolectar datos de asteroides",
      "Obtener información contextual",
      "Validar y limpiar datos",
      "Manejar APIs externas"
    ],
    importance: "Es el primer paso en toda la simulación. Sin datos buenos, todo lo demás falla."
  },
  {
    id: 2,
    name: "DRA. ORBITAL",
    role: "TRAJECTORY AGENT",
    specialty: "MECÁNICA CELESTE",
    description: "Calcula trayectorias orbitales usando mecánica celeste real",
    bio: "Experta en mecánica celeste y física orbital. Calcula aproximaciones cercanas a la Tierra y determina probabilidades de impacto basadas en física real.",
    achievements: [
      "Cálculos orbitales precisos",
      "Predicciones de aproximaciones",
      "Análisis de incertidumbre orbital",
      "Mecánica celeste avanzada"
    ],
    image: "https://images.unsplash.com/photo-1581008695823-bd71b9b3d2e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#FF6B2C",
    abilityType: "trajectory",
    stats: {
      intelligence: 98,
      innovation: 92,
      leadership: 85,
      impact: 95
    },
    yearsOfService: 12,
    missionsCompleted: 89,
    rank: "EXPERT",
    sciences: ["Mecánica Celeste", "Física Orbital", "Matemáticas", "Cálculo Diferencial"],
    responsibilities: [
      "Calcular trayectorias orbitales",
      "Determinar aproximaciones cercanas",
      "Calcular probabilidades de impacto",
      "Analizar incertidumbre orbital"
    ],
    importance: "Proporciona la base científica para determinar si un asteroide impactará la Tierra."
  },
  {
    id: 3,
    name: "DR. IMPACT",
    role: "IMPACT ANALYZER AGENT",
    specialty: "ANÁLISIS DE IMPACTO",
    description: "Calcula la energía del impacto y evalúa efectos sísmicos",
    bio: "Especialista en física de impactos y geología. Calcula la energía del impacto, estima el tamaño del cráter y evalúa efectos sísmicos y de tsunami.",
    achievements: [
      "Cálculos de energía de impacto",
      "Estimación de cráteres",
      "Análisis de efectos sísmicos",
      "Evaluación de tsunamis"
    ],
    image: "https://images.unsplash.com/photo-1655814563963-0fe0a7d6c279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#00FF7F",
    abilityType: "impact",
    stats: {
      intelligence: 96,
      innovation: 90,
      leadership: 88,
      impact: 98
    },
    yearsOfService: 10,
    missionsCompleted: 67,
    rank: "EXPERT",
    sciences: ["Física de Impactos", "Geología", "Sismología", "Oceanografía"],
    responsibilities: [
      "Calcular energía del impacto",
      "Estimar tamaño del cráter",
      "Evaluar efectos sísmicos",
      "Analizar efectos de tsunami"
    ],
    importance: "Determina qué daños causaría un impacto y cuánta población se vería afectada."
  },
  {
    id: 4,
    name: "DRA. MITIGATION",
    role: "MITIGATION AGENT",
    specialty: "ESTRATEGIAS DE DEFLEXIÓN",
    description: "Evalúa estrategias de deflexión y genera recomendaciones",
    bio: "Experta en ingeniería espacial y estrategias de deflexión. Evalúa 4 estrategias diferentes y calcula costos y efectividad de cada una.",
    achievements: [
      "Estrategias de deflexión",
      "Análisis de costos",
      "Optimización de misiones",
      "Recomendaciones científicas"
    ],
    image: "https://images.unsplash.com/photo-1701187260663-dc1ab7a67f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#B026FF",
    abilityType: "mitigation",
    stats: {
      intelligence: 94,
      innovation: 96,
      leadership: 92,
      impact: 93
    },
    yearsOfService: 9,
    missionsCompleted: 45,
    rank: "SENIOR",
    sciences: ["Ingeniería Espacial", "Mecánica Orbital", "Optimización", "Economía"],
    responsibilities: [
      "Evaluar estrategias de deflexión",
      "Calcular costos y efectividad",
      "Generar recomendaciones",
      "Optimizar misiones"
    ],
    importance: "Planifica cómo evitar el impacto y qué estrategias son más efectivas."
  },
  {
    id: 5,
    name: "DR. VISUALIZATION",
    role: "VISUALIZATION AGENT",
    specialty: "VISUALIZACIÓN CIENTÍFICA",
    description: "Crea gráficos de trayectorias orbitales y mapas de impacto",
    bio: "Especialista en visualización científica y gráficos 3D. Crea representaciones visuales de trayectorias orbitales y mapas de impacto con zonas de daño.",
    achievements: [
      "Gráficos orbitales 2D y 3D",
      "Mapas de impacto interactivos",
      "Visualizaciones de métricas",
      "Representaciones 3D"
    ],
    image: "https://images.unsplash.com/photo-1658632715383-f8c2b5cb7d61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#FFD700",
    abilityType: "visualization",
    stats: {
      intelligence: 92,
      innovation: 98,
      leadership: 85,
      impact: 89
    },
    yearsOfService: 7,
    missionsCompleted: 78,
    rank: "SENIOR",
    sciences: ["Visualización Científica", "Geografía", "Informática Gráfica", "Algoritmos 3D"],
    responsibilities: [
      "Crear gráficos orbitales",
      "Generar mapas de impacto",
      "Visualizar métricas de confianza",
      "Producir diagramas de riesgo"
    ],
    importance: "Hace que los datos complejos sean comprensibles visualmente para todos."
  },
  {
    id: 6,
    name: "DRA. ML",
    role: "ML PREDICTOR AGENT",
    specialty: "MACHINE LEARNING",
    description: "Genera predicciones avanzadas usando machine learning",
    bio: "Experta en machine learning y ciencia de datos. Genera predicciones avanzadas de trayectorias futuras y evalúa la evolución del riesgo a lo largo del tiempo.",
    achievements: [
      "Predicciones de trayectorias futuras",
      "Análisis de patrones históricos",
      "Cálculos de probabilidades con ML",
      "Evaluación de evolución del riesgo"
    ],
    image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#00FFFF",
    abilityType: "ml",
    stats: {
      intelligence: 99,
      innovation: 97,
      leadership: 90,
      impact: 94
    },
    yearsOfService: 6,
    missionsCompleted: 92,
    rank: "EXPERT",
    sciences: ["Machine Learning", "Estadística", "Ciencia de Datos", "Algoritmos de Predicción"],
    responsibilities: [
      "Generar predicciones avanzadas",
      "Predecir trayectorias futuras",
      "Evaluar evolución del riesgo",
      "Analizar patrones históricos"
    ],
    importance: "Mejora las predicciones usando inteligencia artificial y patrones históricos."
  },
  {
    id: 7,
    name: "DR. EXPLAINER",
    role: "EXPLAINER AGENT",
    specialty: "COMUNICACIÓN CIENTÍFICA",
    description: "Traduce datos técnicos a lenguaje simple y comprensible",
    bio: "Especialista en comunicación científica y educación. Traduce datos técnicos complejos a lenguaje simple y genera narrativas comprensibles para cualquier audiencia.",
    achievements: [
      "Traducción de datos técnicos",
      "Narrativas comprensibles",
      "Adaptación por audiencia",
      "Comunicación efectiva"
    ],
    image: "https://images.unsplash.com/photo-1623389095188-4a397c919674?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#FF00FF",
    abilityType: "explainer",
    stats: {
      intelligence: 93,
      innovation: 89,
      leadership: 96,
      impact: 91
    },
    yearsOfService: 11,
    missionsCompleted: 134,
    rank: "SENIOR",
    sciences: ["Lingüística", "Psicología", "Educación", "Comunicación"],
    responsibilities: [
      "Traducir datos técnicos",
      "Explicar el riesgo",
      "Generar narrativas",
      "Adaptar contenido por audiencia"
    ],
    importance: "Hace que la información científica sea accesible para todos, desde niños hasta gobiernos."
  }
];
