"use client";

import { useState, useEffect } from "react";
import type { QuizQuestion } from "@/app-content/types";
import { cn } from "@/lib/utils";

interface QuizProps {
  sectionId: string;
  questions: QuizQuestion[];
  initialScore: { score: number; total: number } | undefined;
  onQuizComplete: (score: number, total: number) => void;
  onQuizReset: () => void;
}

type AnswerStatus = "unanswered" | "correct" | "incorrect";

// Helper to shuffle array and pick a few questions
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
const QUIZ_LENGTH = 3;


export function Quiz({
  sectionId,
  questions,
  initialScore,
  onQuizComplete,
  onQuizReset,
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>("unanswered");
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(!!initialScore);
  const [finalScore, setFinalScore] = useState(initialScore?.score ?? 0);
  const [animationClass, setAnimationClass] = useState("");
  const [questionsForAttempt, setQuestionsForAttempt] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setIsQuizFinished(!!initialScore);
    setFinalScore(initialScore?.score ?? 0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerStatus("unanswered");
    setScore(0);
  }, [initialScore, sectionId]);

  useEffect(() => {
    // This effect handles setting/resetting the questions for a new attempt.
    if (!isQuizFinished) {
      const newQuestions = questions.length > QUIZ_LENGTH 
        ? shuffleArray(questions).slice(0, QUIZ_LENGTH)
        : questions; // If not enough questions, use all
      setQuestionsForAttempt(newQuestions);
    }
  }, [isQuizFinished, questions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answerStatus !== "unanswered") return;

    setSelectedAnswer(answerIndex);
    const isCorrect =
      answerIndex === questionsForAttempt[currentQuestionIndex].correctAnswerIndex;
    if (isCorrect) {
      setAnswerStatus("correct");
      setScore(score + 1);
      setAnimationClass("animate-draw-in");
    } else {
      setAnswerStatus("incorrect");
      setAnimationClass("animate-shake");
    }
  };

  const handleNextQuestion = () => {
    setAnimationClass("");
    if (currentQuestionIndex < questionsForAttempt.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswerStatus("unanswered");
    } else {
      setIsQuizFinished(true);
      setFinalScore(score);
      onQuizComplete(score, questionsForAttempt.length);
    }
  };

  const restartQuiz = () => {
    onQuizReset();
  };
  
  if (questionsForAttempt.length === 0 && !isQuizFinished) {
    return null;
  }
  
  const currentQuestion = questionsForAttempt[currentQuestionIndex];
  const scoreBadge = `${isQuizFinished ? finalScore : score}/${isQuizFinished ? (initialScore?.total ?? questionsForAttempt.length) : questionsForAttempt.length}`;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-body text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">Mini-Quiz</h3>
        <span className="rounded-full bg-bg-elevated px-2 py-0.5 font-code text-xs text-text-primary">{scoreBadge}</span>
      </div>

      <div className="mt-4">
        {isQuizFinished ? (
          <div className="text-center">
            <h4 className="text-xl font-bold text-text-primary">¡Prueba completada!</h4>
            <p className="mt-1 text-text-secondary">Tu puntuación final es {finalScore} de {initialScore?.total ?? questionsForAttempt.length}.</p>
            <button onClick={restartQuiz} className="mt-4 rounded-md border border-border-bright bg-bg-elevated px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-accent-glow hover:text-accent">
              Volver a intentar
            </button>
          </div>
        ) : (
          <div>
            <p className="text-base text-text-primary">{currentQuestion.question}</p>
            <div className="mt-4 space-y-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswerIndex;
                const isRevealed = selectedAnswer !== null;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isRevealed}
                    className={cn(
                      "w-full rounded-md border p-3 text-left text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed",
                      !isRevealed && "border-border-bright bg-transparent hover:bg-bg-elevated",
                      isRevealed && !isCorrect && "opacity-50",
                      isRevealed && isSelected && isCorrect && `border-green bg-green-dim text-green-text ${animationClass}`,
                      isRevealed && isSelected && !isCorrect && `border-red bg-red-dim text-red-text ${animationClass}`,
                      isRevealed && isCorrect && !isSelected && "border-green/50 bg-green-dim/30 text-green-text/70",
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {selectedAnswer !== null && (
              <div className="mt-4 space-y-4">
                <p className="text-sm italic text-text-secondary">{currentQuestion.explanation}</p>
                <button onClick={handleNextQuestion} className="w-full rounded-md bg-accent px-4 py-2 text-sm font-bold text-text-primary transition-opacity hover:opacity-90 hover:bg-accent-hover">
                  {currentQuestionIndex < questionsForAttempt.length - 1 ? "Siguiente" : "Finalizar"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
