
'use server';
import { z } from 'zod';
import { summarizeContactFormSubmission } from '@/ai/flows/summarize-contact-form-submissions';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
  summary?: string | null;
  success: boolean;
}

export async function handleContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      summary: null,
      success: false,
    };
  }

  try {
    const submissionText = `Name: ${validatedFields.data.name}\nEmail: ${validatedFields.data.email}\nMessage: ${validatedFields.data.message}`;
    const { summary } = await summarizeContactFormSubmission({ submissionText });
    
    return { errors: null, summary, success: true };
  } catch (error) {
    console.error(error);
    return { errors: null, summary: 'An error occurred while processing your request.', success: false };
  }
}
