import { config } from 'dotenv';
config();

import '@/ai/flows/generate-feature-explanations.ts';
import '@/ai/flows/summarize-network-flows.ts';
import '@/ai/flows/explain-anomalies.ts';