// src/ai/flows/intelligent-job-matching.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligently matching customers with workers based on skills, experience, location, and desired wage.
 *
 * The flow takes customer job requirements and worker profiles as input and returns a list of workers that best match the job criteria.
 *
 * @interface IntelligentJobMatchingInput - The input type for the intelligentJobMatching function.
 * @interface IntelligentJobMatchingOutput - The output type for the intelligentJobMatching function.
 * @function intelligentJobMatching - A function that takes IntelligentJobMatchingInput and returns a Promise of IntelligentJobMatchingOutput.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for worker profiles
const WorkerProfileSchema = z.object({
  name: z.string().describe('Worker name'),
  mobileNumber: z.string().describe('Worker mobile number'),
  experience: z.string().describe('Worker experience'),
  location: z.string().describe('Worker location'),
  primarySkills: z.array(z.string()).describe('Worker primary skills'),
  secondarySkills: z.string().describe('Worker secondary skills'),
  desiredDailyWage: z.number().describe('Worker desired daily wage'),
});

// Define the schema for customer job requirements
const CustomerJobRequirementsSchema = z.object({
  jobDescription: z.string().describe('Job description provided by the customer'),
  requiredSkills: z.array(z.string()).describe('Skills required for the job'),
  jobLocation: z.string().describe('Job location'),
  maxWage: z.number().describe('Maximum wage customer is willing to pay'),
});

// Define the input schema for the intelligent job matching flow
const IntelligentJobMatchingInputSchema = z.object({
  jobRequirements: CustomerJobRequirementsSchema.describe('Customer job requirements'),
  workerProfiles: z.array(WorkerProfileSchema).describe('List of worker profiles'),
});

export type IntelligentJobMatchingInput = z.infer<typeof IntelligentJobMatchingInputSchema>;

// Define the output schema for the intelligent job matching flow
const IntelligentJobMatchingOutputSchema = z.array(WorkerProfileSchema).describe(
  'List of worker profiles that match the job requirements'
);

export type IntelligentJobMatchingOutput = z.infer<typeof IntelligentJobMatchingOutputSchema>;

// Define the prompt for the intelligent job matching flow
const intelligentJobMatchingPrompt = ai.definePrompt({
  name: 'intelligentJobMatchingPrompt',
  input: {schema: IntelligentJobMatchingInputSchema},
  output: {schema: IntelligentJobMatchingOutputSchema},
  prompt: `You are an expert job matching agent. Given a customer's job requirements and a list of worker profiles, determine which workers are the best fit for the job.

    Prioritize workers whose skills closely match the required skills, whose experience is relevant to the job description, whose location is near the job location, and whose desired daily wage is within the customer's maximum wage.

    Job Requirements: {{{JSON.stringify(jobRequirements, null, 2)}}}
    Worker Profiles: {{{JSON.stringify(workerProfiles, null, 2)}}}

    Return a JSON array of worker profiles that are the best match for the job requirements.  Only return workers who match all of the requirements.  Do not include any additional text in your response.`,
});

// Define the intelligent job matching flow
const intelligentJobMatchingFlow = ai.defineFlow(
  {
    name: 'intelligentJobMatchingFlow',
    inputSchema: IntelligentJobMatchingInputSchema,
    outputSchema: IntelligentJobMatchingOutputSchema,
  },
  async input => {
    const {output} = await intelligentJobMatchingPrompt(input);
    return output!;
  }
);

/**
 * Matches customer job requirements with suitable worker profiles.
 * @param input - The input containing job requirements and worker profiles.
 * @returns A promise that resolves with a list of matching worker profiles.
 */
export async function intelligentJobMatching(
  input: IntelligentJobMatchingInput
): Promise<IntelligentJobMatchingOutput> {
  return intelligentJobMatchingFlow(input);
}

