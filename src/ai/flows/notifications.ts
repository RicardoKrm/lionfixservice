'use server';

import { ai } from '../genkit';
import { z } from 'zod';

export const generateServiceNotification = ai.defineFlow(
  {
    name: 'generateServiceNotification',
    inputSchema: z.object({
      customerName: z.string(),
      vehicle: z.string(),
      serviceType: z.string(),
      status: z.string(),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
        prompt: `
        You are an assistant for a car repair shop named "Lion Fix Service SPA".
        Your task is to generate a concise and professional notification for a customer about their vehicle's service status.
        The message should be suitable for email or a short message.

        Customer Name: ${input.customerName}
        Vehicle: ${input.vehicle}
        Service Type: ${input.serviceType}
        Current Status: ${input.status}

        Generate the notification message. Address the customer by name.
        Clearly state the service and the new status of their vehicle.
        If the status is 'Completed', inform them that their vehicle is ready for pickup.
        If the status is 'Awaiting Parts', briefly mention there's a delay and that you'll notify them again.
        If the status is 'In Repair', just provide a quick update.
        Sign off as "The team at Lion Fix Service".
      `,
      config: { temperature: 0.3 },
    });

    return text;
  }
);
