import { LoadingOverlay } from '@/components/ui/loadingOverlay';
import { useAuth } from '@/hooks/use-auth';
import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function withOrg<T>(WrappedComponent: ComponentType<T>) {
  // Try to create a nice displayName for React Dev Tools
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithOrg = (props: T) => {
    const navigate = useNavigate();
    const { user, isSigningIn, isOrg } = useAuth();
    useEffect(() => {
      if (isSigningIn) return; // Do nothing while loading
      // if (!isAdmin && !isAgent) navigate({ to: '/dashboard' });
      if (!isOrg) navigate('/dashboard', { replace: true });
    }, [isOrg, isSigningIn, navigate]);

    if (user?.userID && !isSigningIn) {
      return <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;
    }

    // Session is being fetched, or no user.
    // If not admin, useEffect() will redirect to customer view
    return <LoadingOverlay />;
  };
  ComponentWithOrg.displaName = `withOrg(${displayName})`;

  return ComponentWithOrg;
}

export default withOrg;
