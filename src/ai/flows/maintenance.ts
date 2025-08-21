'use server';

import { ai } from '../genkit';
import { z } from 'zod';

export const generateMaintenanceReminder = ai.defineFlow(
  {
    name: 'generateMaintenanceReminder',
    inputSchema: z.object({
      customerName: z.string(),
      vehicle: z.string(),
      lastServiceDate: z.string(),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
        prompt: `
        You are an assistant for a car repair shop named "Lion Fix Service SPA".
        Your task is to generate a friendly and professional maintenance reminder message for a customer.
        The message should be suitable for email or WhatsApp.
        Keep it concise and clear.
        
        Customer Name: ${input.customerName}
        Vehicle: ${input.vehicle}
        Last Service Date: ${input.lastServiceDate}
        
        Generate the reminder message. Start by greeting the customer by name.
        Remind them about their vehicle and suggest it's time for a periodic maintenance check-up based on their last service date.
        End with a friendly call to action to book an appointment.
        Sign off as "The team at Lion Fix Service".
      `,
      config: { temperature: 0.5 },
    });

    return text;
  }
);
