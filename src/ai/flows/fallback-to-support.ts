'use server';

/**
 * @fileOverview Determines whether to fallback to a default support message based on confidence score.
 * This is a simple deterministic function - no LLM call needed.
 */

import {z} from 'genkit';

const ShouldFallbackToSupportInputSchema = z.object({
  confidenceScore: z
    .number()
    .describe('The confidence score of the chatbot answer.'),
  defaultFallbackText: z.string().describe('The default fallback text to use.'),
  supportURL: z.string().describe('The support URL to include in the fallback message.'),
});
export type ShouldFallbackToSupportInput = z.infer<
  typeof ShouldFallbackToSupportInputSchema
>;

const ShouldFallbackToSupportOutputSchema = z.object({
  shouldFallback: z
    .boolean()
    .describe(
      'Whether or not the chatbot should fallback to the default message.'
    ),
  fallbackMessage: z
    .string()
    .optional()
    .describe('The fallback message to display if shouldFallback is true.'),
});
export type ShouldFallbackToSupportOutput = z.infer<
  typeof ShouldFallbackToSupportOutputSchema
>;

/**
 * Determines if bot response should fallback to support based on confidence score.
 * Threshold: < 0.5 = fallback, >= 0.5 = use response
 * No LLM call - simple deterministic logic.
 */
export async function shouldFallbackToSupport(
  input: ShouldFallbackToSupportInput
): Promise<ShouldFallbackToSupportOutput> {
  const shouldFallback = input.confidenceScore < 0.5;
  
  return {
    shouldFallback,
    fallbackMessage: shouldFallback
      ? `${input.defaultFallbackText} ${input.supportURL}`
      : undefined,
  };
}
