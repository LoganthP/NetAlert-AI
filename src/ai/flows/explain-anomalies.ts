'use server';

/**
 * @fileOverview A flow that explains why a particular network flow was flagged as anomalous.
 *
 * - explainAnomaly - A function that handles the anomaly explanation process.
 * - ExplainAnomalyInput - The input type for the explainAnomaly function.
 * - ExplainAnomalyOutput - The return type for the explainAnomaly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAnomalyInputSchema = z.object({
  flow_id: z.string().describe('The ID of the network flow to explain.'),
  src_ip: z.string().describe('The source IP address of the network flow.'),
  dst_ip: z.string().describe('The destination IP address of the network flow.'),
  src_port: z.number().describe('The source port of the network flow.'),
  dst_port: z.number().describe('The destination port of the network flow.'),
  protocol: z.string().describe('The protocol of the network flow.'),
  duration: z.number().describe('The duration of the network flow in seconds.'),
  bytes: z.number().describe('The number of bytes transferred in the network flow.'),
  packets: z.number().describe('The number of packets transferred in the network flow.'),
  timestamp: z.string().describe('The timestamp of the network flow.'),
  bytes_per_packet: z.number().describe('Bytes per packet.'),
  packets_per_second: z.number().describe('Packets per second.'),
  port_category: z.string().describe('The category of the destination port.'),
  protocol_tcp: z.number().describe('Whether the protocol is TCP (1) or not (0).'),
  protocol_udp: z.number().describe('Whether the protocol is UDP (1) or not (0).'),
  protocol_other: z.number().describe('Whether the protocol is other than TCP or UDP (1) or not (0).'),
  anomaly_score: z.number().describe('The anomaly score of the network flow.'),
  is_anomaly: z.boolean().describe('Whether the network flow is considered an anomaly.'),
});

export type ExplainAnomalyInput = z.infer<typeof ExplainAnomalyInputSchema>;

const ExplainAnomalyOutputSchema = z.object({
  explanation: z.string().describe('The explanation of why the network flow was flagged as anomalous.'),
});

export type ExplainAnomalyOutput = z.infer<typeof ExplainAnomalyOutputSchema>;

export async function explainAnomaly(input: ExplainAnomalyInput): Promise<ExplainAnomalyOutput> {
  return explainAnomalyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAnomalyPrompt',
  input: {schema: ExplainAnomalyInputSchema},
  output: {schema: ExplainAnomalyOutputSchema},
  prompt: `You are a network security expert explaining why a network flow was flagged as anomalous.

  Given the following information about the network flow, explain why it was flagged as anomalous. Focus on the features that contribute most to the anomaly score.

  Flow ID: {{{flow_id}}}
  Source IP: {{{src_ip}}}
  Destination IP: {{{dst_ip}}}
  Source Port: {{{src_port}}}
  Destination Port: {{{dst_port}}}
  Protocol: {{{protocol}}}
  Duration: {{{duration}}} seconds
  Bytes: {{{bytes}}}
  Packets: {{{packets}}}
  Timestamp: {{{timestamp}}}
  Bytes per Packet: {{{bytes_per_packet}}}
  Packets per Second: {{{packets_per_second}}}
  Port Category: {{{port_category}}}
  Protocol TCP: {{{protocol_tcp}}}
  Protocol UDP: {{{protocol_udp}}}
  Protocol Other: {{{protocol_other}}}
  Anomaly Score: {{{anomaly_score}}}
  Is Anomaly: {{{is_anomaly}}}
  `,
});

const explainAnomalyFlow = ai.defineFlow(
  {
    name: 'explainAnomalyFlow',
    inputSchema: ExplainAnomalyInputSchema,
    outputSchema: ExplainAnomalyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

