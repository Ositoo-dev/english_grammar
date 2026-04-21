import type { GrammarSection } from "./types";

export const reportedSpeech: GrammarSection = {
  id: "reported-speech",
  badge: "04",
  title: "Reported Speech",
  tag: "Avanzado",
  description: "Aprende a contar lo que otros dijeron, como un reportero.",
  rule: {
    name: "La Regla del 'Backshift'",
    explanation:
      "Para reportar lo que alguien dijo, movemos el tiempo verbal 'un paso hacia el pasado', y ajustamos pronombres y expresiones de tiempo.",
    formulas: [
      "Declarativa → said (that) + Sujeto + Verbo 'backshifted'",
    ],
  },
  content: [
    {
      type: "paragraph",
      text: "El Reported Speech (o Estilo Indirecto) es como ser un 'reportero' de conversaciones. No citas directamente, sino que informas sobre lo que se dijo. Para hacer esto correctamente, necesitas hacer algunos cambios clave.",
    },
    {
      type: "subtitle",
      text: "El 'Backshift': Un Paso Atrás en el Tiempo",
    },
    {
      type: "table",
      headers: ["Discurso Directo", "Reported Speech"],
      rows: [
        ["Presente Simple → 'I `work` hard.'", "Pasado Simple → '...he `worked` hard.'"],
        ["Presente Continuo → 'I `am studying`.'", "Pasado Continuo → '...he `was studying`.'"],
        ["Pasado Simple → 'I `bought` a car.'", "Pasado Perfecto → '...he `had bought` a car.'"],
        ["Presente Perfecto → 'I `have finished`.'", "Pasado Perfecto → '...he `had finished`.'"],
        ["Futuro 'will' → 'I `will` help.'", "Condicional 'would' → '...he `would` help.'"],
        ["Modal 'can' → 'I `can` swim.'", "Modal 'could' → '...he `could` swim.'"],
      ],
    },
    {
      type: "subtitle",
      text: "Cambios de Pronombres y Expresiones de Tiempo/Lugar",
    },
    {
      type: "table",
      headers: ["Directo", "Reportado"],
      rows: [
        ["I / my / me", "he-she / his-her / him-her"],
        ["today", "that day"],
        ["now", "then / at that moment"],
        ["yesterday", "the day before"],
        ["tomorrow", "the next day"],
        ["here", "there"],
      ],
    },
     {
      type: "example-pair",
      correct: {
        sentence:
          "Directo: 'I will call you `tomorrow`,' she said.\nIndirecto: She said she would call me `the next day`.",
        explanation:
          "Nota los cambios: I → she, will → would, tomorrow → the next day.",
      },
      incorrect: {
        sentence:
          "Directo: 'I am `here`,' he said.\nIndirecto: He said he is `here`.",
        explanation:
          "Incorrecto. Faltó el backshift: am → was, y el cambio de lugar: here → there.",
      },
    },
    {
      type: "subtitle",
      text: "Reportar Preguntas y Negaciones",
    },
    {
      type: "paragraph",
      text: "Cuando reportamos preguntas, la estructura cambia a la de una oración afirmativa (el sujeto va antes del verbo) y usamos 'if'/'whether' o una WH-word. Las negaciones siguen la regla del 'backshift' normal."
    },
    {
      type: "table",
      headers: ["Tipo", "Discurso Directo", "Estructura Indirecta", "Ejemplo Indirecto"],
      rows: [
        ["Pregunta (Yes/No)", "'Are you tired?'", "`asked if` + Sujeto + Verbo (backshifted)", "He asked `if I was` tired."],
        ["Pregunta (WH-)", "'What are you doing?'", "`asked` + Wh-word + Sujeto + Verbo (backshifted)", "She asked `what I was` doing."],
        ["Negación", "'I don't like it.'", "`said` + Sujeto + Verbo Negativo (backshifted)", "He said that he `didn't like` it."],
      ],
    },
    {
      type: "subtitle",
      text: "La Diferencia entre 'Say' y 'Tell'",
    },
    {
      type: "paragraph",
      text: "La regla es simple: usas 'tell' cuando mencionas a la persona a la que se le habla (el objeto indirecto). Si no la mencionas, usas 'say'."
    },
    {
      type: "example-pair",
      correct: {
        sentence: "She `told me` a secret.",
        explanation: "'tell' se usa con un objeto (me, you, him...)."
      },
      incorrect: {
        sentence: "She `said me` a secret.",
        explanation: "'say' no va seguido de un objeto persona sin 'to'."
      },
    },
    {
      type: "mnemonic",
      title: "Truco para Recordar",
      content: "Piensa en el 'Backshift' como contar un chisme viejo. Como ocurrió en el pasado, todo lo que cuentas sobre ello también debe sonar más `pasado`. El presente se vuelve pasado, el pasado se vuelve 'súper pasado' (pasado perfecto).",
    },
    {
      type: "ai-generator",
    }
  ],
  quiz: [
    {
      question:
        "Convierte a Reported Speech: 'I am studying for my exam,' Tom said.",
      options: [
        "Tom said he is studying for his exam.",
        "Tom said he was studying for his exam.",
        "Tom said I was studying for my exam.",
      ],
      correctAnswerIndex: 1,
      explanation:
        "El Presente Continuo ('am studying') cambia a Pasado Continuo ('was studying'), y el pronombre 'I' cambia a 'he'.",
    },
    {
      question:
        "¿Cómo cambia 'tomorrow' en Reported Speech?",
      options: ["yesterday", "the next day", "that day"],
      correctAnswerIndex: 1,
      explanation: "'Tomorrow' se convierte en 'the next day' o 'the following day'.",
    },
    {
      question: "Elige la oración correcta:",
      options: [
        "She said me that she was busy.",
        "She told me that she was busy.",
        "She told that she was busy.",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Se usa 'tell' seguido de un pronombre objeto ('me', 'him', 'us', etc.). 'Tell' necesita saber a quién se le está diciendo algo.",
    },
    {
      question: "Directo: 'I bought a new car yesterday.' Reportado: He said he ______ a new car ______.",
      options: [
        "bought / yesterday",
        "had bought / the day before",
        "has bought / the day before"
      ],
      correctAnswerIndex: 1,
      explanation: "En Reported Speech, el Pasado Simple ('bought') cambia a Pasado Perfecto ('had bought'), y 'yesterday' cambia a 'the day before'."
    },
    {
      question: "Directo: 'We can meet here.' Reportado: They said they ______ meet ______.",
      options: [
        "can / here",
        "could / there",
        "could / here"
      ],
      correctAnswerIndex: 1,
      explanation: "El modal 'can' cambia a 'could' y la expresión de lugar 'here' cambia a 'there'."
    },
    {
      question: "Elige la oración indirecta correcta para: 'Where are you going?' he asked.",
      options: [
        "He asked me where am I going.",
        "He asked me where I am going.",
        "He asked me where I was going."
      ],
      correctAnswerIndex: 2,
      explanation: "En preguntas indirectas, no se invierte el sujeto y el verbo, y se aplica el 'backshift'. 'are going' se convierte en 'was going'."
    }
  ],
};
