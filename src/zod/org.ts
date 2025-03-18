import { z } from 'zod';

export const OrgSchema = {
  INVITE_TEAM_MEMBER_FORM: z.object({
    fullName: z.string(),
    email: z.string().email(),
    role: z.enum(['STUDENT', 'ADMIN', 'TUTOR']),
  }),
};
