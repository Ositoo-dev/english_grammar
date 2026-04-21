import type { GrammarSection } from "./types";

export const adverbiosDeFrecuencia: GrammarSection = {
  id: "adverbios-frecuencia",
  badge: "01",
  title: "Adverbios de Frecuencia",
  tag: "Fundamentos",
  description: "Describen qué tan seguido ocurre una acción.",
  rule: {
    name: "La Regla de Oro: Posición del Adverbio",
    explanation:
      "La posición del adverbio cambia dependiendo de si el verbo principal es el verbo 'to be' (ser/estar) o cualquier otro verbo, incluyendo las formas negativas e interrogativas.",
    formulas: [
      "Sujeto → [Adverbio] → Verbo Principal",
      "Sujeto → Verbo 'to be' → [Adverbio]",
    ],
  },
  content: [
    {
      type: "paragraph",
      text: "Estos adverbios nos dicen con qué regularidad sucede algo. Son clave para añadir detalle y precisión a nuestras conversaciones. La clave es saber dónde ubicarlos.",
    },
    {
      type: "frequency-list",
      title: "Principales Adverbios y su Frecuencia",
      items: [
        { label: "Always (Siempre)", frequency: 100 },
        { label: "Usually (Usualmente)", frequency: 90 },
        { label: "Often (A menudo)", frequency: 70 },
        { label: "Sometimes (A veces)", frequency: 50 },
        { label: "Rarely / Seldom (Rara vez)", frequency: 20 },
        { label: "Never (Nunca)", frequency: 0 },
      ],
    },
    {
      type: "example-pair",
      correct: {
        sentence: "She `often` reads books in the evening.",
        explanation: "El adverbio 'often' va ANTES del verbo principal 'reads'.",
      },
      incorrect: {
        sentence: "She reads `often` books in the evening.",
        explanation: "Incorrecto. El adverbio no debe separar el verbo del objeto.",
      },
    },
    {
      type: "example-pair",
      correct: {
        sentence: "They are `always` happy to help.",
        explanation:
          "El adverbio 'always' va DESPUÉS del verbo 'to be' ('are').",
      },
      incorrect: {
        sentence: "They `always` are happy to help.",
        explanation:
          "Incorrecto. Con el verbo 'to be', el adverbio va después.",
      },
    },
    {
      type: "subtitle",
      text: "Negaciones y Preguntas",
    },
    {
      type: "paragraph",
      text: "En oraciones negativas y preguntas, la posición del adverbio también sigue una lógica, usualmente yendo después del sujeto en preguntas y después del auxiliar en negaciones.",
    },
    {
      type: "table",
      headers: ["Tipo", "Ejemplo", "Estructura"],
      rows: [
          ["Negativa (Main Verb)", "He `doesn't usually` work on weekends.", "Aux (don't/doesn't) → Adverbio → Verbo"],
          ["Negativa (Verbo 'be')", "She `isn't always` late.", "Verbo 'be' → not → Adverbio"],
          ["Pregunta (Main Verb)", "Do `you often` go to the cinema?", "Do/Does → Sujeto → Adverbio → Verbo"],
          ["Pregunta (Verbo 'be')", "`Is he usually` so quiet?", "Verbo 'be' → Sujeto → Adverbio"],
      ]
    },
    {
      type: "subtitle",
      text: "Ejemplos con todos los pronombres",
    },
    {
      type: "table",
      headers: ["Pronombre", "Ejemplo Correcto (con 'main verb')", "Ejemplo Correcto (con 'be')"],
      rows: [
        ["I", "I `usually` walk to work.", "I am `rarely` late."],
        ["You", "You `sometimes` cook dinner.", "You are `always` kind."],
        ["He", "He `never` forgets her birthday.", "He is `often` busy."],
        ["She", "She `always` studies hard.", "She is `usually` on time."],
        ["It", "It `rarely` rains in the desert.", "It is `sometimes` cold."],
        ["We", "We `often` watch movies.", "We are `never` sad."],
        ["They", "They `usually` travel in summer.", "They are `often` tired."],
      ],
    },
    {
      type: "common-mistakes",
      title: "Errores Comunes",
      items: [
        { wrong: "I go `sometimes` to the gym.", right: "I `sometimes` go to the gym." },
        { wrong: "He is `never` late for class?", right: "Is he `never` late for class?" },
        { wrong: "I don't see `often` my friends.", right: "I don't `often` see my friends." },
      ],
    },
    {
      type: "mnemonic",
      title: "Truco para Recordar",
      content: "Piensa en el verbo `to be` como un rey: es tan importante que el adverbio le cede el paso y va `después`. Con los demás verbos (los 'comunes'), el adverbio toma la delantera y va `antes`.",
    },
  ],
  quiz: [
    {
      question: "¿Cuál oración es gramaticalmente correcta?",
      options: [
        "She is always on time for her appointments.",
        "She always is on time for her appointments.",
        "She is on time for her appointments always.",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Con el verbo 'to be' (is), el adverbio de frecuencia (always) se coloca después.",
    },
    {
      question: "Completa el espacio en blanco: 'My brother ______ eats meat. He's a vegetarian.'",
      options: ["usually", "never", "sometimes"],
      correctAnswerIndex: 1,
      explanation:
        "Si es vegetariano, nunca come carne. 'Never' indica 0% de frecuencia.",
    },
    {
      question: "¿Dónde va el adverbio en esta oración? 'We ______ watch TV after dinner.'",
      options: [
        "often (después de 'watch')",
        "often (antes de 'watch')",
        "often (al final de la oración)",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Con un verbo principal como 'watch', el adverbio de frecuencia (often) se coloca antes.",
    },
    {
      question: "¿Cuál oración está en el orden incorrecto?",
      options: [
        "He often is tired after work.",
        "He is often tired after work.",
        "I never eat breakfast.",
      ],
      correctAnswerIndex: 0,
      explanation: "Incorrecto. Con el verbo 'to be' (is), el adverbio (often) debe ir después."
    },
    {
      question: "Reordena la oración usando 'rarely': (They go to the cinema)",
      options: [
        "They rarely go to the cinema.",
        "They go rarely to the cinema.",
        "Rarely they go to the cinema.",
      ],
      correctAnswerIndex: 0,
      explanation: "El adverbio 'Rarely' va antes del verbo principal 'go'."
    },
    {
      question: "Reordena la oración usando 'usually': (I check my email)",
      options: [
        "I am usually check my email.",
        "I usually check my email.",
        "I check my email usually.",
      ],
      correctAnswerIndex: 1,
      explanation: "El adverbio 'usually' se coloca antes del verbo principal 'check', y no se usa el verbo 'to be'."
    }
  ],
};
