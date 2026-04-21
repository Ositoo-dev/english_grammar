
import { FinalEvaluationContent } from './types';

export const finalEvaluation: FinalEvaluationContent = {
  title: 'EVALUACIÓN FINAL — Gramática EN',
  subtitle: 'Dominio Gramatical · Unidades 0 & 1',
  level: 'Universitario',
  time: '30–35 min',
  totalPoints: 100,
  questions: [
    // SECCIÓN 1 — Ordena la Oración (20 pts)
    {
      id: 'q1',
      section: 'SECCIÓN 1 — Ordena la Oración',
      type: 'order-sentence',
      points: 4,
      prompt: 'Arrastra las palabras para construir la oración correcta. Hay palabras trampa que no pertenecen.',
      words: ['she', 'reads', 'often', 'books', 'in', 'the', 'evening'],
      traps: ['always', 'never'],
      correctOrder: ['She', 'often', 'reads', 'books', 'in', 'the', 'evening.'],
      explanation: 'El adverbio de frecuencia "often" va antes del verbo principal "reads".'
    },
    {
      id: 'q2',
      section: 'SECCIÓN 1 — Ordena la Oración',
      type: 'order-sentence',
      points: 4,
      prompt: 'Arrastra las palabras para construir la oración correcta. Hay palabras trampa que no pertenecen.',
      words: ['I', 'was', 'walking', 'when', 'it', 'started', 'to', 'rain'],
      traps: ['walked', 'while', 'starts'],
      correctOrder: ['I', 'was', 'walking', 'when', 'it', 'started', 'to', 'rain.'],
      explanation: 'La acción larga en progreso (Pasado Continuo: "was walking") es interrumpida por la acción corta (Pasado Simple: "started").'
    },
    {
      id: 'q3',
      section: 'SECCIÓN 1 — Ordena la Oración',
      type: 'order-sentence',
      points: 4,
      prompt: 'Arrastra las palabras para construir la oración correcta. Hay palabras trampa que no pertenecen.',
      words: ['she', 'has', 'never', 'visited', 'Paris', 'before'],
      traps: ['have', 'visit', 'yesterday'],
      correctOrder: ['She', 'has', 'never', 'visited', 'Paris', 'before.'],
      explanation: 'En Presente Perfecto, el adverbio "never" generalmente se coloca entre el auxiliar "has" y el participio "visited".'
    },
    {
      id: 'q4',
      section: 'SECCIÓN 1 — Ordena la Oración',
      type: 'order-sentence',
      points: 4,
      prompt: 'Reporta la pregunta: "Are you tired?". Construye la oración indirecta correcta.',
      words: ['he', 'asked', 'if', 'I', 'was', 'tired'],
      traps: ['am', 'is', 'that'],
      correctOrder: ['He', 'asked', 'if', 'I', 'was', 'tired.'],
      explanation: 'Para reportar una pregunta "Yes/No", usamos "asked if" y la estructura de una oración afirmativa, aplicando el "backshift" (are -> was) y cambiando el pronombre.'
    },
    {
      id: 'q17',
      section: 'SECCIÓN 1 — Ordena la Oración',
      type: 'order-sentence',
      points: 4,
      prompt: 'Construye la oración negativa correcta.',
      words: ['He', 'doesn\'t', 'usually', 'work', 'on', 'weekends'],
      traps: ['don\'t', 'works', 'is'],
      correctOrder: ['He', 'doesn\'t', 'usually', 'work', 'on', 'weekends.'],
      explanation: 'Para negar en presente simple, se usa "doesn\'t" seguido del adverbio y el verbo en infinitivo.'
    },

    // SECCIÓN 2 — Selección Múltiple (28 pts)
    {
      id: 'q5',
      section: 'SECCIÓN 2 — Selección Múltiple',
      type: 'multiple-choice',
      points: 4,
      question: 'My brother ______ late to his morning lectures.',
      options: ['is never', 'never is', 'is always', 'always is'],
      correctAnswerIndex: 0,
      explanation: 'Con el verbo "to be", el adverbio de frecuencia (never) va después del verbo.',
    },
    {
      id: 'q6',
      section: 'SECCIÓN 2 — Selección Múltiple',
      type: 'multiple-choice',
      points: 4,
      question: '¿Cuál oración describe correctamente una acción interrumpida?',
      options: [
        'She studied when he called.',
        'She was studying when he called.',
        'She was studying when he was calling.',
        'She studied when he was called.',
      ],
      correctAnswerIndex: 1,
      explanation: 'La acción larga de fondo (was studying) es interrumpida por la acción corta y puntual (called).',
    },
    {
      id: 'q7',
      section: 'SECCIÓN 2 — Selección Múltiple',
      type: 'multiple-choice',
      points: 4,
      question: 'The professor _____ already _____ the exam results.',
      options: [
        'has / published',
        'have / published',
        'has / publishes',
        'did / publish',
      ],
      correctAnswerIndex: 0,
      explanation: 'Se usa "has" para el sujeto "The professor" (tercera persona singular) y el participio pasado "published" para el Presente Perfecto.',
    },
    {
      id: 'q8',
      section: 'SECCIÓN 2 — Selección Múltiple',
      type: 'multiple-choice',
      points: 4,
      question: '¿Cuál par de oraciones usa ambos tiempos correctamente?',
      options: [
        'I have visited Rome in 2019. / I visited Rome before.',
        'I visited Rome in 2019. / I have visited Rome before.',
        'I have visited Rome in 2019. / I have visited Rome before.',
        'I visited Rome in 2019. / I visited Rome before.',
      ],
      correctAnswerIndex: 1,
      explanation: 'Se usa Pasado Simple ("visited") con una fecha específica ("in 2019"). Se usa Presente Perfecto ("have visited") para experiencias de vida sin fecha específica ("before").',
    },
    {
      id: 'q9',
      section: 'SECCIÓN 2 — Selección Múltiple',
      type: 'multiple-choice',
      points: 4,
      question: 'Directo: "I don\'t work on Sundays," he said. Reportado correcto:',
      options: [
        'He said he don\'t work on Sundays.',
        'He said he didn\'t work on Sundays.',
        'He said he wasn\'t working on Sundays.',
        'He told that he didn\'t work on Sundays.',
      ],
      correctAnswerIndex: 1,
      explanation: 'El Presente Simple Negativo ("don\'t work") cambia a Pasado Simple Negativo ("didn\'t work") en Reported Speech (backshift).',
    },
    {
      id: 'q10',
      section: 'SECCIÓN 2 — Selección Múltiple',
      type: 'multiple-choice',
      points: 4,
      question: '¿Cuál oración expresa una habilidad específica lograda en el pasado, no un hábito?',
      options: [
        'I used to swim competitively.',
        'I could swim when I was five.',
        'I was able to finish the race despite my injury.',
        'I would swim every morning as a child.',
      ],
      correctAnswerIndex: 2,
      explanation: '"Was able to" se usa para expresar que se tuvo la habilidad y se tuvo éxito en una situación particular.',
    },
    {
      id: 'q18',
      section: 'SECCIÓN 2 — Selección Múltiple',
      type: 'multiple-choice',
      points: 4,
      question: 'Completa: "I haven\'t received the package ______."',
      options: [
        'already',
        'for',
        'yet',
        'since',
      ],
      correctAnswerIndex: 2,
      explanation: '"Yet" se usa típicamente en oraciones negativas y preguntas en Presente Perfecto para indicar que algo esperado no ha sucedido.'
    },

    // SECCIÓN 3 — Identifica el Error (24 pts)
    {
      id: 'q11',
      section: 'SECCIÓN 3 — Identifica el Error',
      type: 'identify-error',
      points: 4,
      sentence: 'The students `have finished` their thesis in 2023.',
      options: [
        '"have finished" debe ser "had finished"',
        'No se puede usar Presente Perfecto con una fecha específica — debe ser "finished"',
        '"their" debe ser "its"',
        'La oración es correcta',
      ],
      correctAnswerIndex: 1,
      explanation: 'Al usar una fecha específica en el pasado (in 2023), es obligatorio usar el Pasado Simple.',
    },
    {
      id: 'q12',
      section: 'SECCIÓN 3 — Identifica el Error',
      type: 'identify-error',
      points: 4,
      sentence: 'I `usually am` exhausted after seminars.',
      options: [
        '"usually" debe ir después de "am" — I am usually exhausted',
        '"usually" debe ir al final de la oración',
        'Debe usarse "always" en vez de "usually"',
        'La oración es correcta',
      ],
      correctAnswerIndex: 0,
      explanation: 'Con el verbo "to be", el adverbio de frecuencia siempre va después.',
    },
    {
      id: 'q13',
      section: 'SECCIÓN 3 — Identifica el Error',
      type: 'identify-error',
      points: 4,
      sentence: '`Did you was watching` TV when I called?',
      options: [
        '"Did you was watching" debe ser "Were you watching" — para formar la pregunta en Pasado Continuo.',
        '"called" debe ser "was calling"',
        '"when" debe ser "while"',
        'La oración es correcta',
      ],
      correctAnswerIndex: 0,
      explanation: 'La estructura correcta para una pregunta en Pasado Continuo es "Was/Were + sujeto + verbo-ing". No se usa el auxiliar "Did".',
    },
    {
      id: 'q14',
      section: 'SECCIÓN 3 — Identifica el Error',
      type: 'identify-error',
      points: 4,
      sentence: 'She `told` she was nervous about the defense.',
      options: [
        '"told" debe ser "said" — told requiere objeto indirecto: told me/him/us',
        '"was nervous" debe ser "is nervous"',
        '"about" debe ser "of"',
        'La oración es correcta',
      ],
      correctAnswerIndex: 0,
      explanation: 'El verbo "tell" requiere un objeto indirecto (la persona a la que se le habla). "Say" no lo necesita.',
    },
    {
      id: 'q15',
      section: 'SECCIÓN 3 — Identifica el Error',
      type: 'identify-error',
      points: 4,
      sentence: 'My colleague `has went` to three international conferences.',
      options: [
        '"has went" debe ser "has gone" — participio irregular de go',
        '"has went" debe ser "went"',
        'Debe usarse "have" en vez de "has"',
        'La oración es correcta',
      ],
      correctAnswerIndex: 0,
      explanation: 'El Presente Perfecto se forma con "have/has" + el Participio Pasado. El participio de "go" es "gone", no "went".',
    },
    {
      id: 'q19',
      section: 'SECCIÓN 3 — Identifica el Error',
      type: 'identify-error',
      points: 4,
      sentence: 'They `didn\'t went` to the library yesterday.',
      options: [
        '"didn\'t went" debe ser "didn\'t go" — se usa el infinitivo después de "didn\'t"',
        '"yesterday" debe estar al principio',
        '"didn\'t went" debe ser "haven\'t gone"',
        'La oración es correcta',
      ],
      correctAnswerIndex: 0,
      explanation: 'El auxiliar "didn\'t" ya marca el tiempo pasado, por lo que el verbo principal debe ir en su forma base (infinitivo), no en pasado.'
    },

    // SECCIÓN 4 — Emparejamiento (28 pts)
    {
      id: 'q16',
      section: 'SECCIÓN 4 — Emparejamiento',
      type: 'matching',
      points: 28,
      prompt: 'Conecta cada oración con su descripción gramatical correcta. Hay descripciones extra que no corresponden a ninguna.',
      pairs: [
        { id: 'p1', sentence: '"I have lived in three different countries."', correctDescriptionId: 'd1' },
        { id: 'p2', sentence: '"She was reading when the alarm went off."', correctDescriptionId: 'd2' },
        { id: 'p3', sentence: '"He said he would submit the report the next day."', correctDescriptionId: 'd3' },
        { id: 'p4', sentence: '"They rarely miss a deadline."', correctDescriptionId: 'd4' },
        { id: 'p5', sentence: '"I could speak French fluently as a child."', correctDescriptionId: 'd5' },
        { id: 'p6', sentence: '"We visited the campus last semester."', correctDescriptionId: 'd6' },
        { id: 'p7', sentence: '"Were you listening during the lecture?"', correctDescriptionId: 'd10' },
      ],
      descriptions: [
        { id: 'd1', text: 'Presente Perfecto — experiencia de vida sin fecha' },
        { id: 'd2', text: 'Pasado Continuo interrumpido por Pasado Simple' },
        { id: 'd3', text: 'Reported Speech con backshift de will → would' },
        { id: 'd4', text: 'Adverbio de frecuencia antes del verbo principal' },
        { id: 'd5', text: 'Habilidad general en el pasado con could' },
        { id: 'd6', text: 'Pasado Simple con referencia temporal específica' },
        { id: 'd7', text: 'Presente Perfecto con fecha específica' }, // Trap
        { id: 'd8', text: 'Pasado Simple sin contexto temporal' }, // Trap
        { id: 'd9', text: 'Reported Speech sin backshift' }, // Trap
        { id: 'd10', text: 'Pregunta en Pasado Continuo' },
        { id: 'd11', text: 'Pasado Continuo para dos acciones simultáneas' }, // Trap
      ],
      traps: [
        'Presente Perfecto con fecha específica',
        'Pasado Simple sin contexto temporal',
        'Reported Speech sin backshift',
        'Pasado Continuo para dos acciones simultáneas',
      ],
    },
  ],
  feedbackTiers: [
    {
      minScore: 90,
      maxScore: 100,
      title: 'Dominio Avanzado',
      message:
        'Dominas las estructuras gramaticales de estas unidades con precisión universitaria.',
    },
    {
      minScore: 75,
      maxScore: 89,
      title: 'Competencia Sólida',
      message:
        'Buen manejo general. Repasa las secciones donde cometiste errores.',
    },
    {
      minScore: 60,
      maxScore: 74,
      title: 'En Desarrollo',
      message:
        'Vas por buen camino. Te recomendamos revisar la guía antes de tu próxima evaluación.',
    },
    {
      minScore: 0,
      maxScore: 59,
      title: 'Necesita Refuerzo',
      message:
        'Vuelve a la guía completa. Cada sección tiene los trucos que necesitas.',
    },
  ],
};
