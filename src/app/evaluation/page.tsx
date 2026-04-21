'use client';

import { finalEvaluation } from '@/app-content/final-evaluation';
import { grammarSections } from '@/app-content';
import { FinalEvaluation } from '@/components/final-evaluation';
import { TopNav } from '@/components/layout/top-nav';
import { useProgress } from '@/hooks/use-progress';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function EvaluationPage() {
  const { progress, resetProgress, isLoaded } = useProgress(
    grammarSections.length
  );

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
        activeSectionId={null}
        progress={progress}
        resetProgress={resetProgress}
      />
      <main className="mx-auto max-w-[860px] px-6 py-8 pt-20">
        {progress === 100 ? (
          <FinalEvaluation evaluation={finalEvaluation} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface p-6 text-center sm:p-12">
            <h1 className="font-headline text-2xl font-bold sm:text-3xl">
              Evaluación Bloqueada
            </h1>
            <p className="mt-2 text-text-secondary">
              Debes completar el 100% de las secciones del curso para acceder a
              la evaluación final.
            </p>
            <p className="mt-2 text-sm text-text-hint">
              Tu progreso actual es del {Math.round(progress)}%.
            </p>
            <Link
              href="/#adverbios-frecuencia"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <Home className="h-4 w-4" />
              Volver a la Guía
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
