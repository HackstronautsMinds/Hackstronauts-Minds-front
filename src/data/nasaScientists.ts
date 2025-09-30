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
    color: "#FF1B8D" // Rosa neón
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
    color: "#FF6B2C" // Naranja
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
    color: "#00FF7F" // Verde neón
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
    color: "#00D4FF" // Azul cyan
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
    color: "#B026FF" // Púrpura
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
    color: "#FFD700" // Amarillo dorado
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
    color: "#00FFFF" // Cyan
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
    color: "#FF00FF" // Magenta
  }
];
