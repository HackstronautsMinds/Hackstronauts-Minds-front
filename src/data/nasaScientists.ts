export interface NASAScientist {
  id: number;
  name: string;
  specialty: string;
  description: string;
  role: string;
  bio: string;
  achievements: string[];
  image: string;
  color: string;
  abilityType: 'orbit' | 'math' | 'rocket' | 'cosmos' | 'physics' | 'engineering' | 'medicine' | 'space';
  stats: {
    intelligence: number;
    innovation: number;
    leadership: number;
    impact: number;
  };
  yearsOfService?: number;
  missionsCompleted?: number;
  rank?: string;
}

export const nasaScientists: NASAScientist[] = [
  {
    id: 1,
    name: "KATHERINE JOHNSON",
    specialty: "MATEMÁTICA COMPUTACIONAL",
    description: "Pionera en cálculos orbitales para misiones espaciales de la NASA",
    role: "MATEMÁTICA COMPUTACIONAL",
    bio: "Pionera en cálculos orbitales para misiones espaciales de la NASA",
    achievements: [
      "Calculó trayectorias para Apollo 11",
      "Medalla Presidencial de la Libertad",
      "Pionera en el programa Mercury",
      "Contribuciones críticas al programa espacial"
    ],
    image: "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#FF1B8D",
    abilityType: "math",
    stats: {
      intelligence: 98,
      innovation: 95,
      leadership: 85,
      impact: 99
    },
    yearsOfService: 33,
    missionsCompleted: 26,
    rank: "LEGEND"
  },
  {
    id: 2,
    name: "NEIL DEGRASSE TYSON",
    specialty: "ASTROFÍSICA",
    description: "Director del Planetario Hayden y divulgador científico",
    role: "ASTROFÍSICO",
    bio: "Director del Planetario Hayden y divulgador científico",
    achievements: [
      "Director del Planetario Hayden",
      "Autor de 14 libros científicos",
      "Presentador de Cosmos",
      "Medalla de la NASA Distinguished Public Service"
    ],
    image: "https://images.unsplash.com/photo-1581008695823-bd71b9b3d2e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#FF6B2C",
    abilityType: "cosmos",
    stats: {
      intelligence: 96,
      innovation: 88,
      leadership: 92,
      impact: 94
    },
    yearsOfService: 25,
    missionsCompleted: 0,
    rank: "DIRECTOR"
  },
  {
    id: 3,
    name: "MAE JEMISON",
    specialty: "ASTRONAUTA & MÉDICA",
    description: "Primera mujer afroamericana en viajar al espacio",
    role: "ASTRONAUTA & MÉDICA",
    bio: "Primera mujer afroamericana en viajar al espacio",
    achievements: [
      "Primera mujer afroamericana astronauta",
      "Misión STS-47 Endeavour (1992)",
      "Médica y ingeniera química",
      "Fundadora de empresas tecnológicas"
    ],
    image: "https://images.unsplash.com/photo-1655814563963-0fe0a7d6c279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#00FF7F",
    abilityType: "medicine",
    stats: {
      intelligence: 94,
      innovation: 92,
      leadership: 90,
      impact: 91
    },
    yearsOfService: 15,
    missionsCompleted: 1,
    rank: "PIONEER"
  },
  {
    id: 4,
    name: "CARL SAGAN",
    specialty: "ASTROFÍSICA & COSMOLOGÍA",
    description: "Astrónomo, cosmólogo y divulgador científico legendario",
    role: "ASTROFÍSICO & COSMÓLOGO",
    bio: "Astrónomo, cosmólogo y divulgador científico legendario",
    achievements: [
      "Creador de la serie Cosmos",
      "Diseñador de mensajes de Pioneer y Voyager",
      "Premio Pulitzer por 'Los dragones del Edén'",
      "Contribuciones a misiones espaciales"
    ],
    image: "https://images.unsplash.com/photo-1701187260663-dc1ab7a67f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#00D4FF",
    abilityType: "orbit",
    stats: {
      intelligence: 97,
      innovation: 96,
      leadership: 89,
      impact: 98
    },
    yearsOfService: 40,
    missionsCompleted: 0,
    rank: "MASTER"
  },
  {
    id: 5,
    name: "SALLY RIDE",
    specialty: "ASTRONAUTA & FÍSICA",
    description: "Primera mujer estadounidense en el espacio",
    role: "ASTRONAUTA & FÍSICA",
    bio: "Primera mujer estadounidense en el espacio",
    achievements: [
      "Primera mujer estadounidense en el espacio",
      "Dos misiones del transbordador espacial",
      "Doctora en Física de Stanford",
      "Defensora de la educación STEM"
    ],
    image: "https://images.unsplash.com/photo-1658632715383-f8c2b5cb7d61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#B026FF",
    abilityType: "rocket",
    stats: {
      intelligence: 93,
      innovation: 90,
      leadership: 88,
      impact: 92
    },
    yearsOfService: 20,
    missionsCompleted: 2,
    rank: "HERO"
  },
  {
    id: 6,
    name: "STEPHEN HAWKING",
    specialty: "FÍSICA TEÓRICA",
    description: "Físico teórico revolucionario en agujeros negros y cosmología",
    role: "FÍSICO TEÓRICO",
    bio: "Físico teórico revolucionario en agujeros negros y cosmología",
    achievements: [
      "Radiación de Hawking",
      "Autor de 'Breve historia del tiempo'",
      "Premio Fundación BBVA Fronteras",
      "Contribuciones a teoría del Big Bang"
    ],
    image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#FFD700",
    abilityType: "physics",
    stats: {
      intelligence: 99,
      innovation: 98,
      leadership: 87,
      impact: 100
    },
    yearsOfService: 50,
    missionsCompleted: 0,
    rank: "GENIUS"
  },
  {
    id: 7,
    name: "ELLEN OCHOA",
    specialty: "INGENIERA & ASTRONAUTA",
    description: "Primera mujer hispana astronauta y directora del JSC",
    role: "INGENIERA & ASTRONAUTA",
    bio: "Primera mujer hispana astronauta y directora del JSC",
    achievements: [
      "Primera mujer hispana en el espacio",
      "Cuatro misiones espaciales",
      "Directora del Johnson Space Center",
      "Patentes en sistemas ópticos"
    ],
    image: "https://images.unsplash.com/photo-1623389095188-4a397c919674?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#00FFFF",
    abilityType: "engineering",
    stats: {
      intelligence: 95,
      innovation: 94,
      leadership: 96,
      impact: 90
    },
    yearsOfService: 30,
    missionsCompleted: 4,
    rank: "EXPERT"
  },
  {
    id: 8,
    name: "BUZZ ALDRIN",
    specialty: "ASTRONAUTA & INGENIERO",
    description: "Segundo humano en caminar sobre la Luna en Apollo 11",
    role: "ASTRONAUTA & INGENIERO",
    bio: "Segundo humano en caminar sobre la Luna en Apollo 11",
    achievements: [
      "Segunda persona en la Luna",
      "Piloto del módulo lunar Apollo 11",
      "Doctorado en Astronáutica del MIT",
      "Pionero en técnicas de acoplamiento orbital"
    ],
    image: "https://images.unsplash.com/photo-1581087725018-45eb42ace6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#FF00FF",
    abilityType: "space",
    stats: {
      intelligence: 92,
      innovation: 91,
      leadership: 93,
      impact: 97
    },
    yearsOfService: 35,
    missionsCompleted: 2,
    rank: "LEGEND"
  }
];
