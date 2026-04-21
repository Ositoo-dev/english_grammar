"use client";

import * as React from "react";
import { grammarSections } from "@/app-content";
import { GrammarSection } from "@/components/grammar-section";
import { useProgress } from "@/hooks/use-progress";
import { TopNav } from "@/components/layout/top-nav";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  const {
    progress,
    completedSections,
    quizScores,
    toggleSectionStatus,
    updateQuizScore,
    resetQuiz,
    resetProgress,
    isLoaded,
  } = useProgress(grammarSections.length);

  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(null);
  const sectionRefs = React.useRef<Record<string, HTMLElement>>({});

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
    );

    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveSectionId(hash);
    } else if (grammarSections.length > 0) {
      setActiveSectionId(grammarSections[0].id);
    }


    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-accent">Cargando...</div>
      </div>
    );
  }

  return (
    <>
      <TopNav
        sections={grammarSections}
        activeSectionId={activeSectionId}
        progress={progress}
        resetProgress={resetProgress}
      />
      <main className="mx-auto max-w-[860px] px-6 py-8 pt-28">
        <div className="space-y-24">
          {grammarSections.map((section, index) => (
            <React.Fragment key={section.id}>
              <GrammarSection
                ref={(el) => {
                  if (el) sectionRefs.current[section.id] = el;
                }}
                section={section}
                isCompleted={completedSections.includes(section.id)}
                onToggleStatus={() => toggleSectionStatus(section.id)}
                quizScore={quizScores[section.id]}
                onUpdateQuizScore={(score, total) =>
                  updateQuizScore(section.id, score, total)
                }
                onResetQuiz={() => resetQuiz(section.id)}
              />
              {index < grammarSections.length - 1 && (
                 <SectionDivider sectionNumber={grammarSections[index + 1].badge} />
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </>
  );
}
