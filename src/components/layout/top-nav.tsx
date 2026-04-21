"use client";

import * as React from "react";
import type { GrammarSection } from "@/app-content/types";
import { ResetButton } from "@/components/reset-button";
import { ProgressRing } from "@/components/progress-ring";
import { cn } from "@/lib/utils";
import { Menu, Trophy, X } from "lucide-react";
import { ThemeToggleButton } from "../theme-toggle-button";
import Link from "next/link";

interface TopNavProps {
  sections: GrammarSection[];
  activeSectionId: string | null;
  progress: number;
  resetProgress: () => void;
}

export function TopNav({
  sections,
  activeSectionId,
  progress,
  resetProgress,
}: TopNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavContent = () => (
    <>
      <nav className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`/#${section.id}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "rounded-full border border-transparent px-3 py-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary",
              activeSectionId === section.id
                ? "border-accent bg-accent-glow text-accent"
                : ""
            )}
          >
            <span className="text-accent">{section.badge}</span> {section.title.split(' ')[0]}
          </Link>
        ))}
      </nav>
      <div className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-6 md:hidden">
        {progress === 100 && (
          <Link href="/evaluation" className="inline-flex h-10 items-center gap-2 rounded-md bg-amber px-4 text-sm font-bold text-black shadow-md transition-transform hover:scale-105">
            <Trophy className="h-4 w-4" />
            Evaluación Final
          </Link>
        )}
        <div className="flex items-center gap-2">
            <ResetButton onReset={resetProgress} />
            <ThemeToggleButton />
        </div>
      </div>
    </>
  );

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-bg-base/80 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="font-headline text-xl font-black italic text-accent">
          Gramática EN
        </Link>
        
        <div className="hidden md:block">
            <NavContent />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <ProgressRing progress={progress} />
            {progress === 100 && (
                <Link href="/evaluation" className="inline-flex h-10 items-center gap-2 rounded-md bg-amber px-4 text-sm font-bold text-black shadow-md transition-transform hover:scale-105">
                    <Trophy className="h-4 w-4" />
                    Evaluación Final
                </Link>
            )}
            <ResetButton onReset={resetProgress} />
            <ThemeToggleButton />
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            {isMobileMenuOpen ? <X/> : <Menu/>}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-14 h-[calc(100vh-56px)] w-full bg-surface p-6 md:hidden">
            <NavContent />
        </div>
      )}
    </header>
  );
}
