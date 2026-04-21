'use server';
/**
 * @fileOverview A Genkit flow for generating additional English example sentences for a given grammar rule,
 * including Spanish translations and detailed explanations of the rule's application.
 *
 * - generateGrammarExamples - A function that handles the generation of grammar examples.
 * - GenerateGrammarExamplesInput - The input type for the generateGrammarExamples function.
 * - GenerateGrammarExamplesOutput - The return type for the generateGrammarExamples function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateGrammarExamplesInputSchema = z.object({
  grammarRule: z.string().describe('El nombre de la regla gramatical (ej. "Adverbios de Frecuencia").'),
  ruleExplanation: z.string().describe('Una explicación detallada de la regla gramatical en español, incluyendo su estructura y usos comunes.'),
  existingExamples: z.array(z.string()).describe('Una lista de oraciones de ejemplo existentes para guiar el estilo y la complejidad de la IA.'),
  numExamples: z.number().int().min(1).max(5).default(3).describe('El número de ejemplos nuevos a generar (entre 1 y 5).'),
});
export type GenerateGrammarExamplesInput = z.infer<typeof GenerateGrammarExamplesInputSchema>;

const GenerateGrammarExamplesOutputSchema = z.object({
  examples: z.array(
    z.object({
      englishSentence: z.string().describe('La oración de ejemplo generada en inglés.'),
      spanishTranslation: z.string().describe('La traducción al español de la oración en inglés.'),
      explanation: z.string().describe('Una explicación en español de cómo se aplica la regla gramatical en esta oración específica.'),
    })
  ).describe('Una lista de oraciones de ejemplo con sus traducciones y explicaciones.'),
});
export type GenerateGrammarExamplesOutput = z.infer<typeof GenerateGrammarExamplesOutputSchema>;

export async function generateGrammarExamples(input: GenerateGrammarExamplesInput): Promise<GenerateGrammarExamplesOutput> {
  return generateGrammarExamplesFlow(input);
}

const generateGrammarExamplesPrompt = ai.definePrompt({
  name: 'generateGrammarExamplesPrompt',
  input: { schema: GenerateGrammarExamplesInputSchema },
  output: { schema: GenerateGrammarExamplesOutputSchema },
  prompt: `Eres un profesor experto de gramática inglesa que se especializa en explicar conceptos a hablantes de español.

Tu tarea es generar {{numExamples}} oraciones de ejemplo nuevas y distintas para la regla gramatical "{{{grammarRule}}}".
Cada ejemplo debe incluir:
1.  Una oración en inglés que demuestre la regla.
2.  Su traducción precisa al español.
3.  Una explicación clara y concisa en español de cómo se aplica la regla "{{{grammarRule}}}" en esa oración específica.

La regla gramatical es:
Nombre de la Regla: {{{grammarRule}}}
Explicación: {{{ruleExplanation}}}

Considera estos ejemplos existentes para el estilo y el contexto:
{{#each existingExamples}}
- {{{this}}}
{{/each}}

Asegúrate de que los nuevos ejemplos sean únicos y que ilustren eficazmente la regla gramatical.
Proporciona la salida como un array JSON de objetos, donde cada objeto tenga los campos 'englishSentence', 'spanishTranslation' y 'explanation'.`,
});

const generateGrammarExamplesFlow = ai.defineFlow(
  {
    name: 'generateGrammarExamplesFlow',
    inputSchema: GenerateGrammarExamplesInputSchema,
    outputSchema: GenerateGrammarExamplesOutputSchema,
  },
  async (input) => {
    const { output } = await generateGrammarExamplesPrompt(input);
    return output!;
  }
);
