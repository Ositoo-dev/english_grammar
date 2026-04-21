"use client";

import * as React from "react";
import type { ContentBlock, VerbTable } from "@/app-content/types";
import { Award, CalendarDays, Check, Star, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const iconMap: { [key: string]: React.FC<any> } = {
  award: Award,
  zap: Zap,
  'calendar-days': CalendarDays,
}

const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code key={i} className="highlight font-semibold text-amber-text">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
};

const VerbTableComponent: React.FC<{ block: VerbTable }> = ({ block }) => {
  const [showIrregular, setShowIrregular] = React.useState(true);
  const verbsToShow = showIrregular ? block.irregularVerbs : block.regularVerbs;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-4 rounded-lg bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="font-medium text-text-primary">{block.title}</h4>
        <div className="flex shrink-0 items-center space-x-2">
          <Label htmlFor="verb-type-switch" className={cn("font-medium", !showIrregular && "text-text-secondary")}>Regulares</Label>
          <Switch 
            id="verb-type-switch" 
            checked={showIrregular}
            onCheckedChange={setShowIrregular}
            aria-label="Cambiar entre verbos regulares e irregulares"
          />
          <Label htmlFor="verb-type-switch" className={cn("font-medium", showIrregular && "text-text-secondary")}>Irregulares</Label>
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full">
          <thead className="bg-bg-elevated">
            <tr>
              <th scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-accent sm:px-6">Infinitive</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-accent sm:px-6">Simple Past</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-accent sm:px-6">Past Participle</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-accent sm:px-6">Spanish</th>
            </tr>
          </thead>
          <tbody>
            {verbsToShow.map((verb, rowIndex) => (
              <tr key={verb.infinitive} className={cn("hover:bg-accent-glow", rowIndex % 2 === 0 ? 'bg-bg-base' : 'bg-surface')}>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-text-primary sm:px-6">{verb.infinitive}</td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-text-secondary font-code sm:px-6">{verb.simplePast}</td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-text-secondary font-code sm:px-6">{verb.pastParticiple}</td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-text-secondary italic sm:px-6">{verb.spanish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-base leading-relaxed text-text-secondary">{block.text}</p>;

    case "subtitle":
      return (
        <h3 className="font-body text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">
          {block.text}
        </h3>
      );
    
    case "verb-table":
      return <VerbTableComponent block={block} />;

    case "frequency-list":
      return (
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary">{block.title}</h4>
          <div className="space-y-2">
            {block.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-48 shrink-0 text-sm text-text-secondary">{item.label}</span>
                <div className="h-2 w-full rounded-full bg-bg-elevated">
                  <div 
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${item.frequency}%`}}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-code text-xs text-text-hint">{item.frequency}%</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "table":
      return (
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full">
            <thead className="bg-bg-elevated">
              <tr>
                {block.headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-accent sm:px-6"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={cn("hover:bg-accent-glow", rowIndex % 2 === 0 ? 'bg-bg-base' : 'bg-surface')}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "border-t border-border px-4 py-4 text-sm sm:px-6",
                         cellIndex === 0 ? "whitespace-nowrap text-text-primary font-medium" : "text-text-secondary",
                         (cell.includes('`')) && 'font-code text-accent/80'
                      )}
                    >
                      <HighlightedText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "example-pair":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border-l-4 border-green bg-green-dim p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-green"><Check className="mr-1 inline-block h-4 w-4" /> Correcto</p>
              <p className="font-code text-sm leading-relaxed text-text-primary"><HighlightedText text={block.correct.sentence} /></p>
              {block.correct.explanation && <p className="mt-2 text-sm italic text-green-text">{block.correct.explanation}</p>}
          </div>
          <div className="rounded-md border-l-4 border-red bg-red-dim p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-red"><X className="mr-1 inline-block h-4 w-4" /> Error Típico</p>
              <p className="font-code text-sm leading-relaxed text-text-primary"><HighlightedText text={block.incorrect.sentence} /></p>
              {block.incorrect.explanation && <p className="mt-2 text-sm italic text-red-text">{block.incorrect.explanation}</p>}
          </div>
        </div>
      );
    
    case "common-mistakes":
       return (
        <div className="space-y-4">
          <h3 className="font-body text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">{block.title}</h3>
          <div className="space-y-2">
            {block.items.map((item, i) => (
              <div key={i} className="rounded-md border border-border bg-surface p-3 text-sm">
                <p className="text-red-text/80 line-through"><HighlightedText text={item.wrong} /></p>
                <p className="text-green-text/80"><HighlightedText text={item.right} /></p>
              </div>
            ))}
          </div>
        </div>
       )

    case "mnemonic":
        return (
            <div className="rounded-xl border border-dashed border-amber bg-amber-dim p-6">
                <div className="flex items-start gap-4">
                    <div className="lightbulb mt-1" />
                    <div>
                        <h4 className="font-body text-xs font-medium uppercase tracking-[0.12em] text-amber">{block.title}</h4>
                        <p className="mt-2 font-headline text-lg italic text-text-primary/90"><HighlightedText text={block.content} /></p>
                    </div>
                </div>
            </div>
        )
    
    case "timeline":
        return (
          <div className="my-4 space-y-2">
            <p className="text-center text-xs uppercase text-text-secondary">Línea de tiempo</p>
            <div className="relative flex h-8 items-center justify-center rounded-full bg-surface p-2">
                <div className="absolute left-0 top-0 h-full w-[70%] rounded-l-full bg-accent/20" />
                <p className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-accent">{block.longAction}</p>
                <div className="absolute left-[70%] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                    <Zap fill="var(--amber)" stroke="var(--bg-base)" strokeWidth={1} className="h-6 w-6 text-amber"/>
                </div>
                <p className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-primary">{block.shortAction}</p>
            </div>
          </div>
        )
    
    case "use-cases":
      return (
        <div className="grid gap-4 md:grid-cols-3">
          {block.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
            <div key={i} className="rounded-lg bg-accent-2-dim p-4">
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 text-accent-2"/>}
                <h4 className="font-medium text-sm text-accent-2">{item.title}</h4>
              </div>
              <p className="mt-2 font-code text-sm text-accent-2-text"><HighlightedText text={item.text} /></p>
            </div>
            )}
          )}
        </div>
      )
    
    case "signal-words":
      return (
        <div className="rounded-lg bg-surface p-4">
          <h4 className="mb-3 font-medium text-text-primary">{block.title}</h4>
          <div className="flex flex-wrap gap-2">
            {block.words.map(word => (
              <span key={word} className="rounded-full bg-bg-elevated px-3 py-1 font-code text-sm text-text-secondary">{word}</span>
            ))}
          </div>
        </div>
      )
      
    case "vocab-grid":
      return (
        <div className="space-y-4">
           <h3 className="font-body text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">{block.title}</h3>
           <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
            {block.items.map(item => (
              <div key={item.term} className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
                <div className="h-1 w-full bg-accent" />
                <div className="flex flex-col p-4">
                  <div className="flex items-baseline justify-between">
                    <h5 className="font-headline text-lg font-bold text-text-primary">{item.term}</h5>
                    <span className="font-code text-[10px] uppercase text-amber-text">{item.type}</span>
                  </div>
                  <p className="text-sm italic text-text-secondary">{item.meaning}</p>
                </div>
                <div className="mt-auto border-t border-border p-4">
                  <p className="text-xs text-text-hint">{item.example}</p>
                </div>
              </div>
            ))}
           </div>
        </div>
      )

    default:
      return null;
  }
}
