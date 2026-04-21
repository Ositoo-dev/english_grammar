"use client";

import * as React from "react";
import type { GrammarSection as GrammarSectionType } from "@/app-content/types";
import { ContentRenderer } from "./content-renderer";
import { Quiz } from "./quiz";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface GrammarSectionProps {
  section: GrammarSectionType;
  isCompleted: boolean;
  onToggleStatus: () => void;
  quizScore: { score: number; total: number } | undefined;
  onUpdateQuizScore: (score: number, total: number) => void;
  onResetQuiz: () => void;
}

const RuleCard: React.FC<{ rule: GrammarSectionType['rule'] }> = ({ rule }) => {
  if (!rule) return null;
  return (
    <div className="relative overflow-hidden rounded-xl border-l-4 border-accent bg-accent-dim p-4 sm:p-6">
      <Star className="absolute -right-4 -top-4 h-32 w-32 text-accent-glow" strokeWidth={0.5} fill="currentColor" />
      <div className="relative z-10">
        <h3 className="font-body text-xs font-medium uppercase tracking-[0.12em] text-accent">{rule.name}</h3>
        <p className="mt-2 text-text-secondary">{rule.explanation}</p>
        <div className="mt-4 space-y-4">
          {rule.formulas.map((formula, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              {formula.split("→").map((part, j) => (
                <React.Fragment key={j}>
                  <span className="whitespace-nowrap rounded-md border border-border-bright bg-text-primary px-2 py-1 font-code text-sm text-background">{part.trim()}</span>
                  {j < formula.split("→").length - 1 && <span className="text-text-hint">→</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const GrammarSection = React.forwardRef<
  HTMLElement,
  GrammarSectionProps
>(
  (
    {
      section,
      isCompleted,
      onToggleStatus,
      quizScore,
      onUpdateQuizScore,
      onResetQuiz,
    },
    ref
  ) => {
    return (
      <section id={section.id} ref={ref} className="relative scroll-mt-24">
        <div className="flex items-start gap-2 sm:gap-4">
          <span className="font-headline text-5xl font-bold leading-none text-text-hint -mt-1 sm:text-7xl">{section.badge}</span>
          <div className="w-full">
            <p className="font-body text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">{section.tag}</p>
            <h2 className="font-headline text-3xl font-black italic text-accent sm:text-5xl">{section.title}</h2>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base text-text-secondary">{section.description}</p>
        <hr className="my-8 sm:my-12 border-t border-border" />
        
        <div className="space-y-8 sm:space-y-12">
            {section.rule && <RuleCard rule={section.rule} />}
            {section.content.map((block, index) => (
              <ContentRenderer key={index} block={block} />
            ))}
        </div>

        <div className="mt-12 sm:mt-16">
            <Quiz
              sectionId={section.id}
              questions={section.quiz}
              initialScore={quizScore}
              onQuizComplete={onUpdateQuizScore}
              onQuizReset={onResetQuiz}
            />
        </div>

        <div className="mt-8 sm:mt-12 flex justify-center">
            <button
            onClick={onToggleStatus}
            className={cn(
                "inline-flex items-center gap-3 rounded-lg border px-6 py-3 text-sm font-medium transition-all",
                isCompleted 
                ? "border-transparent bg-accent text-white shadow-lg hover:bg-accent-hover" 
                : "border-border-bright bg-surface text-text-primary shadow-sm hover:border-accent hover:text-accent hover:shadow-md"
            )}
            >
            <Check className={cn("h-5 w-5 transition-all", isCompleted ? "scale-100" : "scale-0")} />
            {isCompleted ? "Completado" : "Marcar como completado"}
            </button>
        </div>
      </section>
    );
  }
);

GrammarSection.displayName = "GrammarSection";
