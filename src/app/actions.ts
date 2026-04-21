"use server";

import {
  generateGrammarExamples as generateGrammarExamplesFlow,
  type GenerateGrammarExamplesInput,
  type GenerateGrammarExamplesOutput,
} from "@/ai/flows/generate-grammar-examples-flow";
import { generateGrammarExamplesWithChatGPT as generateGrammarExamplesChatGPTFlow } from "@/ai/flows/generate-grammar-examples-chatgpt-flow";

export async function generateGrammarExamples(
  input: GenerateGrammarExamplesInput
): Promise<GenerateGrammarExamplesOutput> {
  return generateGrammarExamplesFlow(input);
}

export async function generateGrammarExamplesWithChatGPT(
  input: GenerateGrammarExamplesInput
): Promise<GenerateGrammarExamplesOutput> {
  return generateGrammarExamplesChatGPTFlow(input);
}
