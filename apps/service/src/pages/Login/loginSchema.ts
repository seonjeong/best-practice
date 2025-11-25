import { z } from 'zod';

export const loginShema = z.object({
  email: z.email('이메일 형식이 올바르지 않음'),
  password: z.string().min(8),
});

export type LoginData = z.infer<typeof loginShema>;
