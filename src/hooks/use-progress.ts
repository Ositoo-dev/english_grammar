"use client";

import { useState, useEffect, useCallback } from "react";

const PROGRESS_KEY = "dominioGramaticalProgress_v2";

interface ProgressData {
  completedSections: string[];
  quizScores: Record<string, { score: number; total: number }>;
}

export function useProgress(totalSections: number) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<
    Record<string, { score: number; total: number }>
  >({});

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        const data: ProgressData = JSON.parse(savedProgress);
        setCompletedSections(data.completedSections || []);
        setQuizScores(data.quizScores || {});
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = useCallback(
    (data: ProgressData) => {
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
    },
    []
  );

  const toggleSectionStatus = useCallback(
    (sectionId: string) => {
      const newCompletedSections = completedSections.includes(sectionId)
        ? completedSections.filter((id) => id !== sectionId)
        : [...completedSections, sectionId];

      setCompletedSections(newCompletedSections);
      saveProgress({ completedSections: newCompletedSections, quizScores });
    },
    [completedSections, quizScores, saveProgress]
  );

  const updateQuizScore = useCallback(
    (sectionId: string, score: number, total: number) => {
      const newQuizScores = { ...quizScores, [sectionId]: { score, total } };
      setQuizScores(newQuizScores);
      
      const newCompletedSections = [...completedSections];
      // Auto-complete section on perfect score
      if (score === total && !newCompletedSections.includes(sectionId)) {
        newCompletedSections.push(sectionId);
        setCompletedSections(newCompletedSections);
      }

      saveProgress({ completedSections: newCompletedSections, quizScores: newQuizScores });
    },
    [completedSections, quizScores, saveProgress]
  );

  const resetQuiz = useCallback(
    (sectionId: string) => {
      const newQuizScores = { ...quizScores };
      delete newQuizScores[sectionId];
      setQuizScores(newQuizScores);
      saveProgress({ completedSections, quizScores: newQuizScores });
    },
    [quizScores, completedSections, saveProgress]
  );

  const resetProgress = useCallback(() => {
    setCompletedSections([]);
    setQuizScores({});
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch (error) {
      console.error("Failed to reset progress in localStorage", error);
    }
  }, []);

  const progress = isLoaded && totalSections > 0
    ? (completedSections.length / totalSections) * 100
    : 0;

  return {
    isLoaded,
    progress,
    completedSections,
    quizScores,
    toggleSectionStatus,
    updateQuizScore,
    resetQuiz,
    resetProgress,
  };
}
