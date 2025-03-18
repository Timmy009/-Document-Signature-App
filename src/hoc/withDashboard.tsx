import { LoadingOverlay } from '@/components/ui/loadingOverlay';
import { useAuth } from '@/hooks/use-auth';

import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function withDashboard<T>(WrappedComponent: ComponentType<T>) {
  //Try to get wrapped component display name
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  // creating inner component to perform operations
  const ComponentWithoutAuth = (props: T) => {
    const navigate = useNavigate();
    const {
      user,
      isSigningIn: loading,
      redirectUrl,
      setRedirectUrl,
    } = useAuth();

    useEffect(() => {
      if (loading) return; // Do nothing while loading
      if (user?.userID) {
        const previousReidrectUrl = redirectUrl;
        navigate(
          previousReidrectUrl && ![null, 'null'].includes(previousReidrectUrl)
            ? decodeURIComponent(previousReidrectUrl)
            : '/dashboard',
          { replace: true }
        );
        //clear reidrect
        setTimeout(() => setRedirectUrl(null), 3000);
      } // If authenticated, redirect to dashboard
    }, [user, loading, navigate, redirectUrl, setRedirectUrl]);

    if (!loading && !user?.userID)
      return <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;

    return <LoadingOverlay />;
  };

  ComponentWithoutAuth.displayName = `withDashboard${displayName}`;

  return ComponentWithoutAuth;
}

export default withDashboard;
