import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email("Email notug'ri"),
	password: z.string().min(8, 'xato'),
});
