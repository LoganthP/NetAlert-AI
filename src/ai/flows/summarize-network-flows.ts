'use server';

/**
 * @fileOverview Summarizes network flows using AI to identify traffic patterns and potential issues.
 *
 * - summarizeNetworkFlows - A function that summarizes network flows.
 * - SummarizeNetworkFlowsInput - The input type for the summarizeNetworkFlows function.
 * - SummarizeNetworkFlowsOutput - The return type for the summarizeNetworkFlows function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNetworkFlowsInputSchema = z.object({
  networkFlowsData: z
    .string()
    .describe('A JSON string containing the array of network flow data.'),
});
export type SummarizeNetworkFlowsInput = z.infer<typeof SummarizeNetworkFlowsInputSchema>;

const SummarizeNetworkFlowsOutputSchema = z.object({
  summary: z.string().describe('A summary of the network flows.'),
});
export type SummarizeNetworkFlowsOutput = z.infer<typeof SummarizeNetworkFlowsOutputSchema>;

export async function summarizeNetworkFlows(input: SummarizeNetworkFlowsInput): Promise<SummarizeNetworkFlowsOutput> {
  return summarizeNetworkFlowsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNetworkFlowsPrompt',
  input: {schema: SummarizeNetworkFlowsInputSchema},
  output: {schema: SummarizeNetworkFlowsOutputSchema},
  prompt: `You are an expert network security analyst. Analyze the provided network flow data and provide a concise summary of the network traffic patterns, highlighting any potential issues or anomalies.

Network Flow Data:
{{{networkFlowsData}}}`,
});

const summarizeNetworkFlowsFlow = ai.defineFlow(
  {
    name: 'summarizeNetworkFlowsFlow',
    inputSchema: SummarizeNetworkFlowsInputSchema,
    outputSchema: SummarizeNetworkFlowsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
