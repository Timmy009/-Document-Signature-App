import { z } from 'zod';

export const AuthenticationSchema = {
  EMAIL_VERIFICATION_REQ: z.object({
    email: z.string().email(),
  }),
  VERIFY_EMAIL_REQ: z.object({
    email: z.string().email(),
    token: z.string(),
  }),
  SIGN_UP: z
    .object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      // usertype: z
      //   .union([z.literal('ROLE_STUDENT'), z.literal('ROLE_ORG')])
      //   .optional(),
      usertype: z.enum(['ROLE_STUDENT', 'ROLE_ORG']),
      password: z.string().min(8, {
        message: 'Min 8 characters',
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password don't match",
      path: ['confirmPassword'],
    }),
  FORGOT_PASSWORD: z.object({
    email: z.string().email(),
    token: z.string().min(6, {
      message: '"Your one-time password must be 6 characters.",',
    }),
    password: z.string().min(8, {
      message: 'Min 8 characters',
    }),
    confirmPassword: z.string(),
  }),
  SIGN_IN: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  PIN_FORM: z.object({
    pin: z.string().min(6, {
      message: '"Your one-time password must be 6 characters.",',
    }),
  }),
  USER_TYPE: z.object({
    usertype: z.enum(['ROLE_STUDENT', 'ROLE_ORG']),
  }),
};
