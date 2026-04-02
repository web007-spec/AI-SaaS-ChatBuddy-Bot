'use server';

/**
 * @fileOverview Validates and enhances sources from FAQ answers.
 * Since generateAnswerFromFAQ already returns sources, this flow
 * simply passes them through with validation.
 */

import {z} from 'genkit';

const CiteSourcesForAnswerInputSchema = z.object({
  answer: z.string().describe('The generated answer to the user question.'),
  sources: z.array(z.string()).describe('Initial sources from FAQ.'),
});
export type CiteSourcesForAnswerInput = z.infer<typeof CiteSourcesForAnswerInputSchema>;

const CiteSourcesForAnswerOutputSchema = z.object({
  sources: z.array(z.string()).describe('Validated sources for the answer.'),
});
export type CiteSourcesForAnswerOutput = z.infer<typeof CiteSourcesForAnswerOutputSchema>;

/**
 * Validates and returns sources for an answer.
 * This is a simple pass-through since sources are already extracted from FAQ content.
 * No LLM call needed - just validation logic.
 */
export async function citeSourcesForAnswer(
  input: CiteSourcesForAnswerInput
): Promise<CiteSourcesForAnswerOutput> {
  // Filter out empty/invalid sources
  const validSources = input.sources.filter(
    (source) => source && typeof source === 'string' && source.length > 0
  );
  
  return {
    sources: validSources,
  };
}
