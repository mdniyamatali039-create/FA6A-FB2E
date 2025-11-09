'use server';

/**
 * @fileOverview An AI chatbot to assist new users with onboarding, answering common questions and providing support.
 *
 * - onboardingAssistanceChatbot - A function that handles the chatbot interactions.
 * - OnboardingAssistanceChatbotInput - The input type for the onboardingAssistanceChatbot function.
 * - OnboardingAssistanceChatbotOutput - The return type for the onboardingAssistanceChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OnboardingAssistanceChatbotInputSchema = z.object({
  query: z.string().describe('The user query or message for the chatbot.'),
  userType: z.enum(['customer', 'worker']).describe('The type of user interacting with the chatbot.'),
});
export type OnboardingAssistanceChatbotInput = z.infer<typeof OnboardingAssistanceChatbotInputSchema>;

const OnboardingAssistanceChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type OnboardingAssistanceChatbotOutput = z.infer<typeof OnboardingAssistanceChatbotOutputSchema>;

export async function onboardingAssistanceChatbot(input: OnboardingAssistanceChatbotInput): Promise<OnboardingAssistanceChatbotOutput> {
  return onboardingAssistanceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'onboardingAssistanceChatbotPrompt',
  input: {schema: OnboardingAssistanceChatbotInputSchema},
  output: {schema: OnboardingAssistanceChatbotOutputSchema},
  prompt: `You are an AI chatbot designed to assist new users with onboarding to the LabourChok application.
  Your goal is to answer common questions and provide support to help users quickly understand how to use the application.

  The user is a {{{userType}}}.

  Here are some common questions and answers:
  - Customer: How do I post a job?
    - Post a job by navigating to the "Post Job" section in your dashboard and filling out the required information, such as job description, skills required, and desired wage.
  - Customer: How do I hire a worker?
    - You can hire a worker by reviewing their profile and clicking the "Hire" button. You can then manage the job progress and process payments securely through the app.
  - Worker: How do I create a profile?
    - Create a profile by navigating to the "Profile" section in your dashboard and filling out the required information, such as name, mobile number, experience, skills, and desired daily wage.
  - Worker: How do I find a job?
    - Find a job by browsing the available job listings in your dashboard or using the search function to filter jobs based on your skills, experience, and location.
  - Both: What languages are supported?
    - The application supports multiple languages including English, Hindi, and Bengali. You can select your preferred language during profile creation.

  Now respond to the following user query:
  {{{query}}}
  `,
});

const onboardingAssistanceChatbotFlow = ai.defineFlow(
  {
    name: 'onboardingAssistanceChatbotFlow',
    inputSchema: OnboardingAssistanceChatbotInputSchema,
    outputSchema: OnboardingAssistanceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
