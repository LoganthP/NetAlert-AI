'use server';
/**
 * @fileOverview An AI agent for generating explanations for engineered features.
 *
 * - generateFeatureExplanations - A function that handles the generation of feature explanations.
 * - GenerateFeatureExplanationsInput - The input type for the generateFeatureExplanations function.
 * - GenerateFeatureExplanationsOutput - The return type for the generateFeatureExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFeatureExplanationsInputSchema = z.object({
  featureName: z.string().describe('The name of the engineered feature.'),
  featureDescription: z.string().describe('A detailed description of the engineered feature and how it is calculated.'),
  anomalyScore: z.number().describe('The anomaly score associated with the feature.'),
});
export type GenerateFeatureExplanationsInput = z.infer<typeof GenerateFeatureExplanationsInputSchema>;

const GenerateFeatureExplanationsOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of why the feature might be important for anomaly detection, given the anomaly score.'),
});
export type GenerateFeatureExplanationsOutput = z.infer<typeof GenerateFeatureExplanationsOutputSchema>;

export async function generateFeatureExplanations(input: GenerateFeatureExplanationsInput): Promise<GenerateFeatureExplanationsOutput> {
  return generateFeatureExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFeatureExplanationsPrompt',
  input: {schema: GenerateFeatureExplanationsInputSchema},
  output: {schema: GenerateFeatureExplanationsOutputSchema},
  prompt: `You are an expert data scientist specializing in network anomaly detection.

You will use the provided information about an engineered feature and its associated anomaly score to generate an explanation of why the feature might be important for detecting network anomalies.

Feature Name: {{{featureName}}}
Feature Description: {{{featureDescription}}}
Anomaly Score: {{{anomalyScore}}}

Explanation: `,
});

const generateFeatureExplanationsFlow = ai.defineFlow(
  {
    name: 'generateFeatureExplanationsFlow',
    inputSchema: GenerateFeatureExplanationsInputSchema,
    outputSchema: GenerateFeatureExplanationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
