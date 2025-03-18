import { z } from 'zod';
import axiosInstance from '../axios';
import { AuthenticationSchema } from '@/zod/auth';
import { IUser } from '@/dto/user';

//TODO: update signOutUserApi response dto
export const signOutUserApi = (params: {
  refreshToken: string;
}): Promise<{ log: string }> => {
  return axiosInstance.post('/auth/logout', params);
  // .then((response) => response.data);
};

export const signupApi = (
  params: z.infer<typeof AuthenticationSchema.SIGN_UP>
): Promise<{ accessToken: string; refreshToken: string }> => {
  // const m = { ...params, usertype: 'ROLE_STUDENT' };,

  return axiosInstance
    .post('/auth/register', params, {
      withCredentials: false,
      params: {},
    })
    .then((res) => res.data);
};
export const signinApi = (
  params: z.infer<typeof AuthenticationSchema.SIGN_IN>
): Promise<{ accessToken: string; refreshToken: string }> => {
  return axiosInstance
    .post('/auth/login', params, {
      withCredentials: false,
    })
    .then((res) => res.data);
};

// request email verification code
export const requestVerificationCodeApi = async (
  params: z.infer<typeof AuthenticationSchema.EMAIL_VERIFICATION_REQ>
) => {
  return axiosInstance.post(
    `/email-verification/request?email=${params.email}`
  );
};
export const verifyEmailApi = async (
  params: z.infer<typeof AuthenticationSchema.VERIFY_EMAIL_REQ>
) => {
  return axiosInstance.post(
    `/email-verification/validate?email=${params.email}&token=${params.token}`
  );
};

// get current user detail
export const getUserApi = async (): Promise<IUser> => {
  return axiosInstance
    .get('/user/current-user')
    .then((response) => response.data);
};

export const requestPasswordResetApi = async ({ email }: { email: string }) => {
  return axiosInstance.post(`/password-reset/request?email=${email}`);
};

export const validatePasswordResetTokenApi = async (params: {
  email: string;
  plainToken: string;
}) => {
  return axiosInstance.post(`/password-reset/validate`, params);
};

export const forgotPaForgotPasswordApi = async (
  params: z.infer<typeof AuthenticationSchema.FORGOT_PASSWORD>
) => {
  return axiosInstance.post(`/password-reset/reset`, params);
};
