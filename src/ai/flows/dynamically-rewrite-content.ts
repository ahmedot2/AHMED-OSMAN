// src/ai/flows/dynamically-rewrite-content.ts
'use server';

/**
 * @fileOverview Dynamically rewrites content based on detected emotional state using generative AI.
 *
 * - rewriteContent - A function that rewrites content based on emotional state.
 * - RewriteContentInput - The input type for the rewriteContent function.
 * - RewriteContentOutput - The return type for the rewriteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteContentInputSchema = z.object({
  content: z.string().describe('The original content to be rewritten.'),
  emotionalState: z
    .string()
    .optional()
    .describe('The detected emotional state of the user.'),
});
export type RewriteContentInput = z.infer<typeof RewriteContentInputSchema>;

const RewriteContentOutputSchema = z.object({
  rewrittenContent: z.string().describe('The rewritten content.'),
});
export type RewriteContentOutput = z.infer<typeof RewriteContentOutputSchema>;

export async function rewriteContent(input: RewriteContentInput): Promise<RewriteContentOutput> {
  return rewriteContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteContentPrompt',
  input: {schema: RewriteContentInputSchema},
  output: {schema: RewriteContentOutputSchema},
  prompt: `You are an expert content rewriter, skilled at adapting content to different emotional states.

You will rewrite the given content to be more engaging based on the detected emotional state of the user.

If no emotional state is provided, rewrite the content to be generally engaging.

Content: {{{content}}}
Emotional State: {{{emotionalState}}}

Rewritten Content:`, // Just output the rewritten content, nothing else.
});

const rewriteContentFlow = ai.defineFlow(
  {
    name: 'rewriteContentFlow',
    inputSchema: RewriteContentInputSchema,
    outputSchema: RewriteContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      rewrittenContent: output?.rewrittenContent ?? 'Failed to rewrite content.',
    };
  }
);
