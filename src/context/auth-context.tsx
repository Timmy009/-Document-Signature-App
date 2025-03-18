import { IUser } from '@/dto/user';
import { AuthenticationSchema } from '@/zod/auth';
import { createContext } from 'react';
import { z } from 'zod';

interface AuthContextType {
  user: IUser | undefined;
  signin: (values: z.infer<typeof AuthenticationSchema.SIGN_IN>) => void;
  signout: () => void;
  accessToken: string | null;
  refreshToken: string | null;
  isSigningOut: boolean;
  isSigningIn: boolean;
  isOrg: boolean;
  redirectUrl: string | null;
  setRedirectUrl: (val: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);
