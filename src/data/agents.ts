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
  // Nuevos campos épicos
  tagline: string;
  oneLiner: string;
  epicDescription: string;
  signatureAbility: {
    name: string;
    description: string;
  };
  quote: string;
  icon: string;
  confidence: 'ALTA' | 'MEDIA' | 'BAJA';
  lastMission?: string;
  cta: string;
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
    importance: "Es el primer paso en toda la simulación. Sin datos buenos, todo lo demás falla.",
    // Campos épicos
    tagline: "DR. DATA — SENIOR · Recolector de datos espaciales. Base de verdad para la simulación.",
    oneLiner: "Extrae y valida feeds de la NASA y otras fuentes, limpia ruido y entrega el 'single source of truth' que el resto de agentes necesita.",
    epicDescription: "Arquitecto de la verdad numérica: convierte señales dispersas en la base inquebrantable de cada predicción. Sin él, toda la torre de decisión tiembla.",
    signatureAbility: {
      name: "Fusión de Feeds",
      description: "Integra APIs en tiempo real, valida y normaliza para producir una única fuente de confianza."
    },
    quote: "Los números no mienten; solo necesitan ser escuchados con cuidado.",
    icon: "🛰️",
    confidence: "ALTA",
    lastMission: "Última actualización: 2024-01-15 14:30 UTC",
    cta: "ANALIZAR DATOS"
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
    importance: "Proporciona la base científica para determinar si un asteroide impactará la Tierra.",
    // Campos épicos
    tagline: "DRA. ORBITAL — EXPERT · Mecánica celeste aplicada: determina si la roca besará la Tierra.",
    oneLiner: "Calcula trayectorias con física real para estimar aproximaciones y probabilidades de impacto. Maneja incertidumbre como herramienta.",
    epicDescription: "Cartógrafa del cielo: transforma ecuaciones en advertencias temporales. Si hay una trayectoria peligrosa, ella la encontrará.",
    signatureAbility: {
      name: "Vectoría Exacta",
      description: "Modelado orbital con análisis de incertidumbre; predice ventanas de aproximación."
    },
    quote: "Las órbitas hablan en ecuaciones; yo solo traduzco.",
    icon: "🪐",
    confidence: "ALTA",
    lastMission: "Análisis orbital: 2024-01-15 16:45 UTC",
    cta: "SIMULAR TRAYECTORIA"
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
    importance: "Determina qué daños causaría un impacto y cuánta población se vería afectada.",
    // Campos épicos
    tagline: "DR. IMPACT — EXPERT · Calcula energía del impacto y daño potencial.",
    oneLiner: "Convierte masa y velocidad en consecuencias: energía, tamaño de cráter, sismicidad y riesgo de tsunami.",
    epicDescription: "Medidor del desastre: toma una roca y calcula su furia. ¿Cuánto temblará la Tierra? ¿Qué ciudades quedarán en la sombra? Él lo sabe.",
    signatureAbility: {
      name: "Cálculo de Energía",
      description: "E = ½mv² + modelado geofísico para estimar daños y población afectada."
    },
    quote: "No es catastrofismo, es cálculo — y el cálculo salva vidas.",
    icon: "💥",
    confidence: "ALTA",
    lastMission: "Análisis de impacto: 2024-01-15 18:20 UTC",
    cta: "CALCULAR DAÑOS"
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
    importance: "Planifica cómo evitar el impacto y qué estrategias son más efectivas.",
    // Campos épicos
    tagline: "DRA. MITIGATION — SENIOR · Diseña estrategias para desviar amenazas.",
    oneLiner: "Evalúa Kinetic, Gravity Tractor, Nuclear y Ablation; calcula efectividad y coste para cada plan de acción.",
    epicDescription: "Planificadora de futuros: cuando el reloj corre, ella diseña la maniobra que cambie el destino del planeta.",
    signatureAbility: {
      name: "Plan Maestro",
      description: "Simula y compara estrategias de deflexión con métricas de coste/beneficio."
    },
    quote: "Hay más de una forma de desviar el problema; mi trabajo es encontrar la que menos duela al planeta.",
    icon: "🛡️",
    confidence: "ALTA",
    lastMission: "Plan de deflexión: 2024-01-15 20:10 UTC",
    cta: "DESPLEGAR ESTRATEGIA"
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
    importance: "Hace que los datos complejos sean comprensibles visualmente para todos.",
    // Campos épicos
    tagline: "DR. VISUALIZATION — SENIOR · Convierte datos en mapas y escenas 3D.",
    oneLiner: "Genera gráficos orbitales, mapas de impacto y diagramas de riesgo que hacen comprensible lo incomprensible.",
    epicDescription: "Cartógrafo de lo invisible: transforma ecuaciones y probabilidades en imágenes que cualquiera puede entender — desde ciudadanos hasta presidentes.",
    signatureAbility: {
      name: "Mapa de Daño",
      description: "Visualizaciones 2D/3D interactivas con capas de daño y confianza."
    },
    quote: "Si no puedes visualizarlo, no lo comprendes.",
    icon: "🎛️",
    confidence: "ALTA",
    lastMission: "Render 3D: 2024-01-15 22:30 UTC",
    cta: "ABRIR VISUALIZACIÓN"
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
    importance: "Mejora las predicciones usando inteligencia artificial y patrones históricos.",
    // Campos épicos
    tagline: "DRA. ML — EXPERT · Predice trayectorias y evolución del riesgo con ML.",
    oneLiner: "Entrena modelos sobre histórico, detecta patrones y proyecta trayectorias a futuro para anticipar cambios de riesgo.",
    epicDescription: "Oráculo entrenado: aprende del pasado para revelar futuros probables y ajustar la alarma con datos.",
    signatureAbility: {
      name: "Predicción Temporal",
      description: "Modelos que pronostican la evolución del riesgo hasta 10 años vista."
    },
    quote: "El pasado habla en patrones; mi trabajo es escucharlos y adelantar sus pasos.",
    icon: "🤖",
    confidence: "ALTA",
    lastMission: "Predicción ML: 2024-01-15 23:45 UTC",
    cta: "EJECUTAR PREDICCIÓN"
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
    importance: "Hace que la información científica sea accesible para todos, desde niños hasta gobiernos.",
    // Campos épicos
    tagline: "DR. EXPLAINER — SENIOR · Traduce lo técnico a lenguaje humano.",
    oneLiner: "Toma análisis complejos y los convierte en narrativas simples, adaptadas al público: niños, prensa o gobierno.",
    epicDescription: "Embajador del entendimiento: comunica la ciencia de forma que la gente pueda decidir con cabeza (y sin pánico).",
    signatureAbility: {
      name: "Narrativa Clara",
      description: "Resumen accionable y adaptado por audiencia, con comparaciones históricas y pasos recomendados."
    },
    quote: "No es hablar bonito; es dar a la gente la información que necesita para actuar.",
    icon: "📣",
    confidence: "ALTA",
    lastMission: "Comunicado oficial: 2024-01-16 00:15 UTC",
    cta: "GENERAR REPORTE"
  }
];
