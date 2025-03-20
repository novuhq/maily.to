'use server';

import { z } from 'zod';
import { render } from '@maily-to/render';

const previewEmailSchema = z.object({
  json: z.string().min(1, 'Please provide a JSON'),
  previewText: z.string(),
});

export async function previewEmailAction(formData: FormData) {
  const result = previewEmailSchema.safeParse({
    json: formData.get('json'),
    previewText: formData.get('previewText'),
  });

  if (!result.success) {
    return {
      data: null,
      error: {
        message: result.error.issues.map((issue) => issue.message).join(', '),
        code: 'validation_error',
        errors: result.error.issues.map((issue) => issue.message),
      },
    };
  }

  const { json, previewText } = result.data;

  const content = JSON.parse(json);
  const html = await render(content, {
    preview: previewText,
  });

  return {
    data: html,
    error: null,
  };
}
