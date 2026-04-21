import type { GrammarSection } from "./types";

export const vocabulario: GrammarSection = {
  id: "vocabulario",
  badge: "05",
  title: "Vocabulario Clave",
  tag: "Vocabulario",
  description: "Diferencias sutiles entre palabras que marcan la diferencia.",
  content: [
    {
      type: "paragraph",
      text: "Más allá de las reglas gramaticales, hay palabras y frases que a menudo causan confusión. Aquí aclaramos algunas de las más importantes para que suenes más natural.",
    },
    {
      type: "vocab-grid",
      title: "Glosario de Términos Útiles",
      items: [
        { term: "Often", type: "Adverbio", meaning: "A menudo, frecuentemente", example: "I often go to the park." },
        { term: "Usually", type: "Adverbio", meaning: "Usualmente, normalmente", example: "She usually wakes up early." },
        { term: "Who", type: "Pronombre", meaning: "Quién (para personas)", example: "Who is that person?" },
        { term: "Where", type: "Adverbio", meaning: "Dónde (para lugares)", example: "Where do you live?" },
        { term: "That", type: "Pronombre", meaning: "Que, eso, aquel", example: "The book that I read was good." },
        { term: "Whose", type: "Pronombre", meaning: "De quién (posesión)", example: "Whose keys are these?" },
      ]
    },
    {
      type: "subtitle",
      text: "Comparación: 'Used to' vs. Pasado Simple",
    },
    {
      type: "paragraph",
      text: "Ambos se refieren al pasado, pero con un matiz diferente."
    },
    {
      type: "example-pair",
      correct: {
        sentence: "I `used to live` in London.",
        explanation: "Hábito o estado pasado que ya no es cierto. Implica que ya no vivo allí.",
      },
      incorrect: {
        sentence: "I `lived` in London.",
        explanation: "Informa de un hecho pasado, pero no aclara si la situación ha cambiado. Es menos específico que 'used to'.",
      },
    },
    {
      type: "subtitle",
      text: "Comparación: 'Could' vs. 'Was/Were able to'",
    },
    {
      type: "paragraph",
      text: "Ambos expresan habilidad en el pasado, pero su uso varía."
    },
     {
      type: "example-pair",
      correct: {
        sentence: "When I was young, I `could` run very fast.",
        explanation: "Expresa una habilidad general que se tenía en el pasado.",
      },
      incorrect: {
        sentence: "The fire spread, but we `were able to` escape.",
        explanation: "Correcto, pero se usa para una habilidad en una situación específica, un logro. 'Could' aquí sería menos común.",
      },
    },
    {
        type: "paragraph",
        text: "Nota: En oraciones negativas, 'couldn't' y 'wasn't/weren't able to' son a menudo intercambiables. Ej: 'I `couldn't` open the door' es igual a 'I `wasn't able to` open the door'."
    }
  ],
  quiz: [
    {
      question:
        "Elige la opción correcta para un hábito pasado que ya no existe: 'When I was a child, I ______ play outside all day.'",
      options: ["used to", "was able to", "played"],
      correctAnswerIndex: 0,
      explanation:
        "'Used to' es la forma correcta de expresar un hábito o estado pasado que ya no es verdad.",
    },
    {
      question:
        "¿Cuál expresa que lograste algo en una situación específica? 'The exam was difficult, but I ______ pass it.'",
      options: ["could", "used to", "was able to"],
      correctAnswerIndex: 2,
      explanation:
        "'Was able to' se usa para indicar que se tuvo éxito en una ocasión particular en el pasado.",
    },
    {
      question:
        "¿Qué palabra usarías para preguntar por una persona?",
      options: ["Where", "That", "Who"],
      correctAnswerIndex: 2,
      explanation: "'Who' es el pronombre interrogativo para referirse a personas.",
    },
    {
      question: "Completa la oración: 'I didn't see the car, but I heard the crash. Thankfully, I ______ help the driver.'",
      options: ["could", "used to", "was able to"],
      correctAnswerIndex: 2,
      explanation: "'Was able to' se usa para una habilidad demostrada en una situación específica (un logro), mientras que 'could' es para habilidad general."
    },
    {
      question: "Completa la oración: 'That's the man ______ dog is always barking.'",
      options: ["who", "whose", "which"],
      correctAnswerIndex: 1,
      explanation: "'Whose' es el pronombre posesivo para indicar 'de quién'. Se refiere a que el perro pertenece al hombre."
    }
  ],
};
