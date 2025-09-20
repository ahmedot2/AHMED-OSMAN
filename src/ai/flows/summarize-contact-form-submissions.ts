'use server';

/**
 * @fileOverview A flow for summarizing contact form submissions using an LLM.
 *
 * - summarizeContactFormSubmission - A function that handles the summarization process.
 * - SummarizeContactFormSubmissionInput - The input type for the summarizeContactFormSubmission function.
 * - SummarizeContactFormSubmissionOutput - The return type for the summarizeContactFormSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContactFormSubmissionInputSchema = z.object({
  submissionText: z
    .string()
    .describe('The text of the contact form submission to summarize.'),
});
export type SummarizeContactFormSubmissionInput = z.infer<
  typeof SummarizeContactFormSubmissionInputSchema
>;

const SummarizeContactFormSubmissionOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the contact form submission.'),
});
export type SummarizeContactFormSubmissionOutput = z.infer<
  typeof SummarizeContactFormSubmissionOutputSchema
>;

export async function summarizeContactFormSubmission(
  input: SummarizeContactFormSubmissionInput
): Promise<SummarizeContactFormSubmissionOutput> {
  return summarizeContactFormSubmissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContactFormSubmissionPrompt',
  input: {schema: SummarizeContactFormSubmissionInputSchema},
  output: {schema: SummarizeContactFormSubmissionOutputSchema},
  prompt: `Summarize the following contact form submission in a concise manner:\n\n{{{submissionText}}}`,
});

const summarizeContactFormSubmissionFlow = ai.defineFlow(
  {
    name: 'summarizeContactFormSubmissionFlow',
    inputSchema: SummarizeContactFormSubmissionInputSchema,
    outputSchema: SummarizeContactFormSubmissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
