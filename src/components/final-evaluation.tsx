'use client';

import type {
  FinalEvaluationContent,
  FinalQuizQuestion,
  MultipleChoiceQuestion,
  OrderSentenceQuestion,
  IdentifyErrorQuestion,
  MatchingQuestion,
} from '@/app-content/types';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  RefreshCw,
  Target,
  Timer,
  XCircle,
  Undo2,
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FinalEvaluationProps {
  evaluation: FinalEvaluationContent;
}

export function FinalEvaluation({ evaluation }: FinalEvaluationProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalScore = useMemo(() => {
    if (!isFinished) return 0;
    return evaluation.questions.reduce((acc, q) => {
      const answer = answers[q.id];
      let isCorrect = false;
      switch (q.type) {
        case 'multiple-choice':
        case 'identify-error':
          isCorrect = answer === q.correctAnswerIndex;
          break;
        case 'order-sentence':
          isCorrect =
            Array.isArray(answer) &&
            answer.join(' ').replace(/\.$/, '') ===
              q.correctOrder.join(' ').replace(/\.$/, '');
          break;
        case 'matching':
          isCorrect =
            q.pairs.every(
              (p) => answer && answer[p.id] === p.correctDescriptionId
            ) &&
            Object.keys(answer || {}).length === q.pairs.length;
          break;
      }
      return isCorrect ? acc + q.points : acc;
    }, 0);
  }, [isFinished, answers, evaluation.questions]);

  const feedback = useMemo(() => {
    if (!isFinished) return null;
    const percentage = (totalScore / evaluation.totalPoints) * 100;
    return evaluation.feedbackTiers.find(
      (tier) => percentage >= tier.minScore && percentage <= tier.maxScore
    );
  }, [isFinished, totalScore, evaluation.feedbackTiers]);

  const handleNext = () => {
    if (currentQuestionIndex < evaluation.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetake = () => {
    setIsStarted(true);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  if (isFinished) {
    return (
      <ResultsScreen
        evaluation={evaluation}
        answers={answers}
        score={totalScore}
        feedback={feedback}
        onRetake={handleRetake}
      />
    );
  }

  if (!isStarted) {
    return (
      <IntroScreen evaluation={evaluation} onStart={() => setIsStarted(true)} />
    );
  }

  const currentQuestion = evaluation.questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / evaluation.questions.length) * 100;

  const QuestionComponent = () => {
    switch (currentQuestion.type) {
      case 'order-sentence':
        return (
          <OrderSentenceComponent
            question={currentQuestion}
            answer={answers[currentQuestion.id] || []}
            onAnswer={(answer) =>
              setAnswers({ ...answers, [currentQuestion.id]: answer })
            }
          />
        );
      case 'multiple-choice':
      case 'identify-error':
        return (
          <MultipleChoiceComponent
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onAnswer={(answer) =>
              setAnswers({ ...answers, [currentQuestion.id]: answer })
            }
          />
        );
      case 'matching':
        return (
          <MatchingComponent
            question={currentQuestion}
            answer={answers[currentQuestion.id] || {}}
            onAnswer={(answer) =>
              setAnswers({ ...answers, [currentQuestion.id]: answer })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row">
        <Progress value={progressPercentage} className="h-2 w-full" />
        <Select
          value={String(currentQuestionIndex)}
          onValueChange={(value) => setCurrentQuestionIndex(Number(value))}
        >
          <SelectTrigger className="w-full shrink-0 sm:w-auto sm:min-w-[240px]">
            <SelectValue placeholder="Ir a la pregunta..." />
          </SelectTrigger>
          <SelectContent>
            {evaluation.questions.map((q, index) => {
              const isAnswered = answers[q.id] !== undefined;

              return (
                <SelectItem key={q.id} value={String(index)}>
                  <div className="flex w-full items-center justify-between gap-4">
                    <span>
                      Pregunta {index + 1}
                    </span>
                    {isAnswered ? (
                       <CheckCircle2 className="h-4 w-4 text-green" />
                    ) : (
                       <div className="h-2 w-2 shrink-0 rounded-full bg-text-hint/50" />
                    )}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <p className="mb-2 text-sm font-medium text-text-secondary">
        {currentQuestion.section} ({currentQuestion.points} pts)
      </p>
      
      <QuestionComponent />

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <Button onClick={handleNext} variant="default">
          {currentQuestionIndex === evaluation.questions.length - 1
            ? 'Finalizar'
            : 'Siguiente'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// --- Question Type Components ---

const OrderSentenceComponent = ({
  question,
  answer,
  onAnswer,
}: {
  question: OrderSentenceQuestion;
  answer: string[];
  onAnswer: (answer: string[]) => void;
}) => {
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    setShuffledWords(
      [...question.words, ...question.traps].sort(() => Math.random() - 0.5)
    );
  }, [question]);

  const handleWordClick = (word: string) => {
    onAnswer([...answer, word]);
  };

  const handleUndo = () => {
    onAnswer(answer.slice(0, -1));
  };

  return (
    <div>
      <p className="text-lg font-semibold text-text-primary">
        {question.prompt}
      </p>
      <div className="mt-4 min-h-[6rem] rounded-lg border-2 border-dashed border-border p-3">
        {answer.length > 0 ? (
          answer.map((word, i) => (
            <span key={i} className="inline-block p-1 font-code text-lg">
              {word}
            </span>
          ))
        ) : (
          <p className="text-text-hint">Construye tu oración aquí...</p>
        )}
      </div>
      <div className="mt-2 flex justify-end">
        <Button variant="ghost" size="sm" onClick={handleUndo} disabled={answer.length === 0}>
          <Undo2 className="mr-2 h-4 w-4" /> Deshacer
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {shuffledWords.map((word, i) => (
          <Button
            key={i}
            variant="outline"
            className={cn('text-base')}
            onClick={() => handleWordClick(word)}
          >
            {word}
          </Button>
        ))}
      </div>
    </div>
  );
};

const MultipleChoiceComponent = ({
  question,
  answer,
  onAnswer,
}: {
  question: MultipleChoiceQuestion | IdentifyErrorQuestion;
  answer: number | null;
  onAnswer: (answer: number) => void;
}) => (
  <div>
    <p className="text-lg font-semibold text-text-primary">
      {question.type === 'identify-error' ? (
        <HighlightedText text={question.sentence} />
      ) : (
        question.question
      )}
    </p>
    <div className="mt-6 space-y-3">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(index)}
          className={cn(
            'flex w-full items-start gap-3 rounded-lg border p-4 text-left text-base transition-all',
            answer === index
              ? 'border-accent bg-accent-glow ring-2 ring-accent'
              : 'border-border bg-bg-base hover:bg-bg-elevated'
          )}
        >
          <div
            className={cn(
              'mt-1 h-4 w-4 shrink-0 rounded-full border-2',
              answer === index ? 'border-accent bg-accent' : 'border-text-hint'
            )}
          />
          <span>{option}</span>
        </button>
      ))}
    </div>
  </div>
);

const MatchingComponent = ({
  question,
  answer,
  onAnswer,
}: {
  question: MatchingQuestion;
  answer: Record<string, string>;
  onAnswer: (answer: Record<string, string>) => void;
}) => {
  const [shuffledDescriptions, setShuffledDescriptions] = useState<any[]>([]);

  useEffect(() => {
    setShuffledDescriptions(
      [...question.descriptions].sort(() => Math.random() - 0.5)
    );
  }, [question]);

  const handleSelect = (pairId: string, descriptionId: string) => {
    onAnswer({ ...answer, [pairId]: descriptionId });
  };
  
  return (
    <div>
      <p className="text-lg font-semibold text-text-primary">{question.prompt}</p>
      <div className="mt-6 space-y-4">
        {question.pairs.map((pair) => (
          <div key={pair.id} className="grid items-center gap-4 md:grid-cols-2">
            <p className="rounded-md bg-bg-elevated p-3 font-code text-sm text-text-primary">
              {pair.sentence}
            </p>
            <Select
              value={answer[pair.id] || ''}
              onValueChange={(value) => handleSelect(pair.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Elige la descripción..." />
              </SelectTrigger>
              <SelectContent>
                {shuffledDescriptions.map((desc) => (
                  <SelectItem key={desc.id} value={desc.id}>
                    {desc.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Screens ---

const IntroScreen = ({
  evaluation,
  onStart,
}: {
  evaluation: FinalEvaluationContent;
  onStart: () => void;
}) => (
  <div className="rounded-2xl border-2 border-dashed border-border bg-surface p-8 text-center">
    <h1 className="font-headline text-4xl font-bold text-accent">
      {evaluation.title}
    </h1>
    <p className="mt-2 text-lg text-text-secondary">{evaluation.subtitle}</p>
    <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-text-primary">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-accent" />
        <span>Nivel: {evaluation.level}</span>
      </div>
      <div className="flex items-center gap-2">
        <Timer className="h-5 w-5 text-accent" />
        <span>{evaluation.time}</span>
      </div>
      <div className="flex items-center gap-2">
        <ClipboardList className="h-5 w-5 text-accent" />
        <span>{evaluation.totalPoints} Puntos</span>
      </div>
    </div>
    <p className="mx-auto mt-6 max-w-xl text-text-secondary">
      Esta evaluación final pondrá a prueba tu comprensión de las unidades
      gramaticales clave. Lee cada pregunta con atención. ¡Mucha suerte!
    </p>
    <Button size="lg" onClick={onStart} className="mt-8">
      Comenzar Evaluación
    </Button>
  </div>
);

const ResultsScreen = ({ evaluation, answers, score, feedback, onRetake }: any) => {
    return (
        <div className="space-y-8">
             <div className="rounded-2xl border-2 border-accent bg-accent-dim p-8 text-center">
                <h1 className="font-headline text-2xl font-bold text-text-primary">Resultados de la Evaluación</h1>
                <p className="mt-4 text-6xl font-bold text-accent">{score}<span className="text-3xl text-text-secondary">/{evaluation.totalPoints}</span></p>
                {feedback && (
                    <>
                        <p className="mt-2 text-2xl font-semibold text-accent">{feedback.title}</p>
                        <p className="mx-auto mt-1 max-w-md text-text-secondary">{feedback.message}</p>
                    </>
                )}
                 <Button size="lg" onClick={onRetake} className="mt-6">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Volver a intentar
                </Button>
             </div>

             <div className="space-y-4">
                <h2 className="font-headline text-2xl font-bold">Revisión de respuestas</h2>
                <Accordion type="single" collapsible className="w-full">
                {Object.values(
                    evaluation.questions.reduce((acc: any, q: any) => {
                        if (!acc[q.section]) acc[q.section] = { title: q.section, questions: [] };
                        acc[q.section].questions.push(q);
                        return acc;
                    }, {})
                ).map(({title, questions}: any, sectionIndex: number) => (
                    <AccordionItem value={`item-${sectionIndex}`} key={sectionIndex}>
                        <AccordionTrigger className="text-lg font-semibold">{title}</AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-6 p-2">
                           {questions.map((q: FinalQuizQuestion) => {
                                const userAnswer = answers[q.id];
                                let isCorrect = false;
                                let correctAnswerText = '';
                                let userAnswerText = 'No respondida';

                                switch (q.type) {
                                    case 'order-sentence':
                                        isCorrect = Array.isArray(userAnswer) && userAnswer.join(' ').replace(/\.$/, '') === q.correctOrder.join(' ').replace(/\.$/, '');
                                        correctAnswerText = q.correctOrder.join(' ');
                                        if (Array.isArray(userAnswer)) userAnswerText = userAnswer.join(' ');
                                        break;
                                    case 'multiple-choice':
                                    case 'identify-error':
                                        isCorrect = userAnswer === q.correctAnswerIndex;
                                        correctAnswerText = q.options[q.correctAnswerIndex];
                                        if (userAnswer !== undefined && userAnswer !== null) userAnswerText = q.options[userAnswer];
                                        break;
                                    case 'matching':
                                        const allCorrect = q.pairs.every(p => userAnswer && userAnswer[p.id] === p.correctDescriptionId);
                                        const answeredCount = Object.keys(userAnswer || {}).length;
                                        isCorrect = allCorrect && answeredCount === q.pairs.length;
                                        // For matching, we show correctness per item
                                        break;
                                }

                                if (q.type === 'matching') {
                                    return (
                                      <div key={q.id}>
                                          <p className="font-medium">{q.prompt}</p>
                                          {q.pairs.map(p => {
                                            const uAnswerId = userAnswer ? userAnswer[p.id] : undefined;
                                            const isPairCorrect = uAnswerId === p.correctDescriptionId;
                                            const uAnswerText = q.descriptions.find(d => d.id === uAnswerId)?.text || 'No respondida';
                                            const cAnswerText = q.descriptions.find(d => d.id === p.correctDescriptionId)?.text;
                                            return (
                                              <div key={p.id} className="mt-2 pl-4">
                                                <p className='font-code text-sm'>{p.sentence}</p>
                                                <div className={cn("mt-1 flex items-start gap-2 rounded-md border-l-4 p-2", isPairCorrect ? "border-green bg-green-dim" : "border-red bg-red-dim")}>
                                                {isPairCorrect ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green" /> : <XCircle className="h-5 w-5 flex-shrink-0 text-red" />}
                                                  <div>
                                                      <p className={cn("text-sm", isPairCorrect ? "text-green-text" : "text-red-text")}>
                                                        Tu respuesta: <span className="font-semibold">{uAnswerText}</span>
                                                      </p>
                                                      {!isPairCorrect && (
                                                          <p className="text-sm text-text-primary">Respuesta correcta: <span className="font-semibold">{cAnswerText}</span></p>
                                                      )}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          })}
                                      </div>
                                    )
                                }

                                return (
                                    <div key={q.id}>
                                        <p className="font-medium"><HighlightedText text={q.type === 'identify-error' ? q.sentence : (q as any).question || q.prompt} /></p>
                                        <div className={cn("mt-2 flex items-start gap-2 rounded-md border-l-4 p-3", isCorrect ? "border-green bg-green-dim" : "border-red bg-red-dim")}>
                                            {isCorrect ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green" /> : <XCircle className="h-5 w-5 flex-shrink-0 text-red" />}
                                            <div className="w-full">
                                                <p className={cn("text-sm", isCorrect ? "text-green-text" : "text-red-text")}>
                                                    Tu respuesta: <span className="font-semibold">{userAnswerText}</span>
                                                </p>
                                                {!isCorrect && <p className="text-sm text-text-primary">Respuesta correcta: <span className="font-semibold">{correctAnswerText}</span></p>}
                                                <p className="mt-1 text-xs italic text-text-secondary">{q.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                           })}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
             </div>
        </div>
    )
}

const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code key={i} className="rounded bg-bg-elevated px-1 py-0.5 font-semibold text-amber-text">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
};
