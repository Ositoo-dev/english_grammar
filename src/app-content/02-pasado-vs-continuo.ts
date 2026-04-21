import type { GrammarSection } from "./types";

export const pasadoVsContinuo: GrammarSection = {
  id: "pasado-vs-continuo",
  badge: "02",
  title: "Pasado Continuo vs. Simple",
  tag: "Tiempos Verbales",
  description: "Aprende a narrar acciones interrumpidas en el pasado.",
  rule: {
    name: "La Acción Interrumpida",
    explanation:
      "Se usa para mostrar una acción larga en progreso (Pasado Continuo) que fue interrumpida por una acción corta y repentina (Pasado Simple).",
    formulas: [
      "Acción Larga (was/were V-ing) → 'when' → Acción Corta (V-ed)",
      "'While' → Acción Larga (was/were V-ing) → , → Acción Corta (V-ed)",
    ],
  },
  content: [
    {
      type: "paragraph",
      text: "Esta combinación de tiempos es fundamental para narrar historias en pasado. Nos permite crear una escena de fondo y luego introducir un evento que la interrumpe, creando dinamismo y claridad en la secuencia de eventos.",
    },
    {
      type: "timeline",
      longAction: "I was watching a movie",
      shortAction: "The power went out",
    },
    {
      type: "example-pair",
      correct: {
        sentence:
          "I was studying for my exam `when` the phone rang.",
        explanation:
          "La acción de estudiar (larga) estaba en progreso y fue interrumpida por la llamada (corta).",
      },
      incorrect: {
        sentence:
          "I studied for my exam `when` the phone was ringing.",
        explanation:
          "Incorrecto. La interrupción es la acción corta y puntual ('rang'), no la acción en progreso.",
      },
    },
     {
      type: "example-pair",
      correct: {
        sentence:
          "`While` she was cooking dinner, she burned her hand.",
        explanation:
          "El conector 'while' introduce la acción larga. La interrupción ('burned') viene después.",
      },
      incorrect: {
        sentence:
          "`While` she cooked dinner, she was burning her hand.",
        explanation:
          "Incorrecto. 'While' acompaña a la acción en progreso. Quemarse la mano es el evento puntual que interrumpe.",
      },
    },
    {
      type: "subtitle",
      text: "Formas Negativas e Interrogativas",
    },
    {
        type: "paragraph",
        text: "Para formar negaciones y preguntas, aplicamos las reglas estándar a cada tiempo verbal por separado, manteniendo la lógica de la acción larga y la corta.",
    },
    {
        type: "table",
        headers: ["Tipo", "Estructura", "Ejemplo"],
        rows: [
            ["Negativa (Cont.)", "Sujeto + `wasn't/weren't` + V-ing", "I `wasn't sleeping` when you called."],
            ["Negativa (Simple)", "Sujeto + `didn't` + V (inf.)", "He `didn't call` while I was sleeping."],
            ["Pregunta (Cont.)", "`Was/Were` + Sujeto + V-ing?", "`Were you listening` when she arrived?"],
            ["Pregunta (Simple)", "`Did` + Sujeto + V (inf.)?", "`Did she arrive` while you were listening?"],
        ]
    },
    {
      type: "subtitle",
      text: "Conjugación: Was / Were",
    },
    {
      type: "table",
      headers: ["Pronombre", "Verbo 'to be' en Pasado"],
      rows: [
        ["I", "was"],
        ["You", "were"],
        ["He / She / It", "was"],
        ["We", "were"],
        ["They", "were"],
      ],
    },
    {
      type: "common-mistakes",
      title: "Errores Comunes",
      items: [
        { wrong: "I was watch TV when she called.", right: "I was `watching` TV when she called." },
        { wrong: "While I cooked, I was listening to music.", right: "While I `was cooking`, I was listening to music." },
        { wrong: "When the phone was ringing, I answered.", right: "When the phone `rang`, I answered." },
      ],
    },
    {
      type: "mnemonic",
      title: "Truco para Recordar",
      content: "Imagina una película. El `Pasado Continuo` es la escena larga que se desarrolla lentamente (alguien camina bajo la lluvia). El `Pasado Simple` es el susto repentino (¡un trueno!). `While` (mientras) describe la escena, `when` (cuando) introduce el susto.",
    },
  ],
  quiz: [
    {
      question:
        "Completa la oración: 'She was reading a book when the doorbell ______.'",
      options: ["was ringing", "rang", "ring"],
      correctAnswerIndex: 1,
      explanation:
        "La acción de leer (larga) fue interrumpida por la acción de sonar el timbre (corta). La acción corta va en Pasado Simple ('rang').",
    },
    {
      question:
        "¿Cuál de estas oraciones describe correctamente una acción interrumpida?",
      options: [
        "While I was walking home, it started to rain.",
        "While I walked home, it was starting to rain.",
        "I walked home when it was starting to rain.",
      ],
      correctAnswerIndex: 0,
      explanation:
        "'While' introduce la acción larga ('was walking'), y la interrupción ('started to rain') va en Pasado Simple.",
    },
    {
      question:
        "¿Qué tiempo verbal se usa para la acción más larga y de fondo?",
      options: ["Pasado Simple", "Presente Perfecto", "Pasado Continuo"],
      correctAnswerIndex: 2,
      explanation:
        "El Pasado Continuo (was/were + -ing) siempre se usa para la acción que estaba en progreso.",
    },
    {
      question:
        "Pregunta: 'What were you doing when the earthquake started?' Elige la mejor respuesta.",
      options: ["I watched TV.", "I was watching TV.", "I have watched TV."],
      correctAnswerIndex: 1,
      explanation: "La pregunta 'What were you doing' pide una respuesta en Pasado Continuo para describir la acción en progreso."
    },
    {
      question:
        "Elige la oración incorrecta:",
      options: [
        "While I was cooking, the alarm went off.",
        "I was cooking when the alarm went off.",
        "I cooked when the alarm was going off.",
      ],
      correctAnswerIndex: 2,
      explanation: "Esta oración invierte la lógica. La acción de sonar la alarma (corta) debería estar en Pasado Simple ('went off'), interrumpiendo la acción de cocinar (larga)."
    },
    {
      question:
        "Completa la oración: 'They ______ for the bus when it ______ to rain.'",
      options: ["waited / was starting", "were waiting / started", "waited / started"],
      correctAnswerIndex: 1,
      explanation: "La acción de esperar ('were waiting') es la acción de fondo que fue interrumpida por el comienzo de la lluvia ('started')."
    }
  ],
};
