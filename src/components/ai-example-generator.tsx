"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Sparkles, Loader2 } from "lucide-react";
import { grammarSections } from "@/app-content";
import { generateGrammarExamplesWithChatGPT } from "@/app/actions";
import type { GenerateGrammarExamplesOutput } from "@/ai/flows/generate-grammar-examples-chatgpt-flow";

export function AiExampleGenerator() {
  const [generatedExamples, setGeneratedExamples] = useState<GenerateGrammarExamplesOutput['examples']>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();
  
  const getRelevantSection = (element: HTMLElement | null) => {
    if (!element) return null;
    const sectionElement = element.closest('section');
    if (!sectionElement) return null;
    return grammarSections.find(s => s.id === sectionElement.id);
  }

  const onSubmit: SubmitHandler<{}> = async (data, event) => {
    const triggerButton = event?.nativeEvent.submitter as HTMLElement;
    const section = getRelevantSection(triggerButton);

    if (!section) {
        setError("No se pudo encontrar la sección de gramática actual.");
        return;
    }

    try {
      setError(null);
      setGeneratedExamples([]);
      const result = await generateGrammarExamplesWithChatGPT({
        grammarRule: section.rule?.name ?? section.title,
        ruleExplanation: section.rule?.explanation ?? section.description,
        // @ts-ignore
        existingExamples: section.content
          .filter(c => c.type === 'example-pair')
          // @ts-ignore
          .map(c => c.correct.sentence),
        numExamples: 2,
      });
      if (result && result.examples) {
        setGeneratedExamples(result.examples);
      }
    } catch (error) {
      console.error("AI example generation failed:", error);
      setError("No se pudieron generar los ejemplos. Revisa tu clave API de OpenAI o inténtalo de nuevo.");
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-accent" />
        <h3 className="font-headline text-xl text-text-primary">Expansión con IA</h3>
      </div>
      <p className="mt-2 text-text-secondary">
        ¿Necesitas más claridad? Genera nuevos ejemplos únicos con inteligencia artificial para ver la regla en diferentes contextos.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-inset ring-accent/20 transition-all hover:bg-accent/20 disabled:pointer-events-none disabled:opacity-50">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {isSubmitting ? "Generando..." : "Generar nuevos ejemplos"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-md bg-red-dim p-3 text-sm text-red-text">
          {error}
        </div>
      )}

      {generatedExamples.length > 0 && (
        <div className="mt-6 space-y-4">
          {generatedExamples.map((example, index) => (
            <div key={index} className="rounded-md border border-border bg-bg-base p-4">
              <p className="font-code text-base text-text-primary">"{example.englishSentence}"</p>
              <p className="mt-1 text-sm text-text-secondary">Traducción: "{example.spanishTranslation}"</p>
              <p className="mt-2 text-sm text-text-secondary"><strong className="text-text-primary">Explicación:</strong> {example.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
