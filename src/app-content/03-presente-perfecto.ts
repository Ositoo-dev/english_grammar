import type { GrammarSection } from "./types";

export const presentePerfecto: GrammarSection = {
  id: "presente-perfecto",
  badge: "03",
  title: "Presente Perfecto",
  tag: "Tiempos Verbales",
  description: "Conecta el pasado con el presente para hablar de experiencias.",
  rule: {
    name: "El Puente Pasado-Presente",
    explanation:
      "Se usa para hablar de acciones o experiencias en el pasado sin especificar el momento exacto. Lo importante es la relevancia que tiene esa acción en el presente.",
    formulas: [
      "Sujeto → have/has → Participio Pasado",
    ],
  },
  content: [
    {
      type: "paragraph",
      text: "El Presente Perfecto es el tiempo de las 'experiencias de vida'. No nos importa CUÁNDO pasó algo, sino el hecho de QUE pasó y su conexión con el ahora.",
    },
    {
      type: "use-cases",
      title: "Usos Principales",
      items: [
        { icon: "award", title: "Experiencias de vida", text: "'I `have seen` that movie before.'" },
        { icon: "zap", title: "Acciones recientes", text: "'I'`ve lost` my keys.' (Y ahora no puedo entrar)." },
        { icon: "calendar-days", title: "Tiempo no terminado", text: "'I `have worked` hard this week.' (La semana no ha acabado)." },
      ]
    },
    {
      type: "subtitle",
      text: "La Distinción Crítica: Presente Perfecto vs. Pasado Simple",
    },
    {
      type: "paragraph",
      text: "Esta es la regla más importante: si mencionas un tiempo específico en el pasado (`yesterday`, `last year`, `in 2019`), DEBES usar Pasado Simple. Si no hay tiempo específico, usas Presente Perfecto.",
    },
    {
      type: "example-pair",
      correct: {
        sentence: "I `have visited` Paris.",
        explanation:
          "Presente Perfecto: Experiencia de vida. No se dice cuándo.",
      },
      incorrect: {
        sentence: "I `have visited` Paris in 2019.",
        explanation:
          "Incorrecto. Al especificar 'in 2019' se debe usar Pasado Simple: 'I visited...'.",
      },
    },
    {
      type: "subtitle",
      text: "Formas Negativas e Interrogativas",
    },
    {
      type: "paragraph",
      text: "La estructura es consistente, usando `have/has` como verbo auxiliar.",
    },
    {
      type: "table",
      headers: ["Tipo", "Estructura", "Ejemplo"],
      rows: [
          ["Negativa", "Sujeto + `haven't/hasn't` + Participio", "She `hasn't finished` her work."],
          ["Pregunta", "`Have/Has` + Sujeto + Participio?", "`Have you ever eaten` sushi?"],
      ],
    },
    {
      type: "signal-words",
      title: "Palabras Clave (Signal Words)",
      words: ["Ever", "Never", "Already", "Yet", "Just", "For", "Since"],
    },
    {
      type: "subtitle",
      text: "Participios Irregulares Comunes",
    },
    {
      type: "table",
      headers: ["Infinitivo", "Pasado Simple", "Pasado Participio"],
      rows: [
        ["be", "was/were", "been"],
        ["do", "did", "done"],
        ["eat", "ate", "eaten"],
        ["go", "went", "gone"],
        ["see", "saw", "seen"],
        ["have", "had", "had"],
        ["make", "made", "made"],
        ["take", "took", "taken"],
        ["write", "wrote", "written"],
        ["speak", "spoke", "spoken"],
        ["know", "knew", "known"],
        ["give", "gave", "given"],
      ],
    },
    {
      type: "mnemonic",
      title: "Truco para Recordar",
      content: "Piensa en el Presente Perfecto como tu 'álbum de fotos de vida'. Cada foto es una experiencia (`he viajado`, `he comido`), pero no tienes la fecha exacta escrita. El Pasado Simple es como una página de diario: `15 de Mayo, 2022: Fui al cine.`",
    },
  ],
  quiz: [
    {
      question: "Elige la oración correcta:",
      options: [
        "I have seen that movie yesterday.",
        "I saw that movie yesterday.",
        "I have saw that movie yesterday.",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Al especificar un tiempo pasado ('yesterday'), se debe usar el Pasado Simple ('saw').",
    },
    {
      question: "Completa la oración: 'Have you ____ been to a concert?'",
      options: ["never", "yet", "ever"],
      correctAnswerIndex: 2,
      explanation:
        "'Ever' se usa en preguntas para preguntar sobre experiencias de vida ('alguna vez').",
    },
    {
      question:
        "¿Cuál es el pasado participio del verbo 'to write'?",
      options: ["wrote", "writed", "written"],
      correctAnswerIndex: 2,
      explanation:
        "El pasado participio de 'write' es 'written'. 'Wrote' es el pasado simple.",
    },
    {
      question: "Elige la oración correcta:",
      options: [
        "She has lived here since 5 years.",
        "She has lived here for 5 years.",
        "She lived here since 5 years ago.",
      ],
      correctAnswerIndex: 1,
      explanation:
        "'For' se usa para indicar una duración de tiempo ('por 5 años'). 'Since' se usa para un punto de inicio en el tiempo ('desde 2018').",
    },
    {
      question: "Completa: 'I haven't seen her ______ last Monday.'",
      options: ["for", "since", "ago"],
      correctAnswerIndex: 1,
      explanation: "'Since' se usa para marcar un punto de inicio específico en el tiempo ('desde el lunes pasado').",
    },
    {
      question: "Completa: 'My parents ______ to Japan.'",
      options: ["have never been", "have never went", "never were"],
      correctAnswerIndex: 0,
      explanation: "Para experiencias de vida (o la falta de ellas), se usa el Presente Perfecto ('have been'). 'Been' es el participio de 'be'."
    },
    {
      question: "Completa: 'She ______ all the cookies! Now there are none left.'",
      options: ["ate", "has eaten", "had eaten"],
      correctAnswerIndex: 1,
      explanation: "Se usa el Presente Perfecto ('has eaten') porque la acción pasada (comer las galletas) tiene un resultado directo en el presente (no queda ninguna)."
    }
  ],
};
