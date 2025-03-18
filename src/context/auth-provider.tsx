import { useLocalStorage } from '@/hooks/use-local-storage';
import { genericSignout, LOCAL_STORAGE_KEY } from '@/lib/auth';
import { getUserApi, signinApi } from '@/services/apis/auth';
import { AuthenticationSchema } from '@/zod/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { AuthContext } from './auth-context';
import { IUser, UserRoleEnum } from '@/dto/user';
import { QUERY_KEY } from '@/lib/queryKeys';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const navigate = useNavigate();
  // const [user, setUser] = useState<IUser | undefined>();
  const userRef = useRef<IUser | undefined>();
  const [accessToken, setAccessToken] = useLocalStorage<string | null>({
    key: LOCAL_STORAGE_KEY.ACCESS_TOKEN,
    defaultValue: null,
  });
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>({
    key: LOCAL_STORAGE_KEY.REFRESH_ACCESS_TOKEN,
    defaultValue: null,
  });
  const [user, setUser] = useLocalStorage<IUser | undefined>({
    key: QUERY_KEY.user.toUpperCase(),
    // defaultValue: undefined,
  });

  const [redirectUrl, setRedirectUrl] = useLocalStorage<string | null>({
    key: LOCAL_STORAGE_KEY.REDIRECT_KEY,
    defaultValue: null,
  });

  // const { user } = useUser(accessToken);

  const signinMutation = useMutation({
    mutationFn: signinApi,
  });

  const signoutMutation = useMutation({ mutationFn: genericSignout });

  const signin = (
    values: z.infer<typeof AuthenticationSchema.SIGN_IN>,
    onComplete?: () => void
  ) => {
    signinMutation.mutate(values, {
      onSuccess: async (data) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        const response = await getUserApi();

        console.log(response, '==> user response');
        userRef.current = response;
        setUser(response);
        // setUser(response);

        // navigate('/');
        if (onComplete) onComplete();
      },
      onError: (error) => {
        toast.error(
          (error as AxiosError<{ message: string }>)?.response?.data?.message ??
            'Invalid login.'
        );
      },
    });
  };

  const signout = () => {
    return signoutMutation.mutate(undefined, {
      onSuccess: () => {
        // setStep('otp');
        // setAccessToken(null);
        // setRefreshToken(null);
        // localStorage.clear();
        // navigate('/auth/sign-in');
        userRef.current = undefined;
        setUser(undefined);

        toast.success('User logged out successfully');
      },
      onError: (error) => {
        toast.error(
          (error as AxiosError<{ message: string }>)?.response?.data?.message ??
            'We could not process your request at this time.'
        );
      },
    });
  };

  useEffect(() => {}, []);

  const value = {
    user,
    signin,
    accessToken,
    refreshToken,
    isSigningOut: signoutMutation.isPending,
    isSigningIn: signinMutation.isPending,
    signout,
    isOrg: Boolean(user?.authorities?.includes(UserRoleEnum.ROLE_ORG)),
    redirectUrl,
    setRedirectUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
