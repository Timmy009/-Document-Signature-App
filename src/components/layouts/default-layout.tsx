import { Link, Outlet } from 'react-router-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  // useSignIn,
} from '@clerk/clerk-react';
import { Button, defaultClass } from '@/components/ui/button';

const Layout = () => {
  // const navigate = useNavigate();
  // const { signIn } = useSignIn();
  return (
    <ClerkProvider
      // navigate={navigate}
      // afterSignInUrl="/dashboard"
      // afterSignUpUrl="/dashboard"

      appearance={{
        elements: {
          formButtonPrimary: defaultClass,
        },
      }}
      afterMultiSessionSingleSignOutUrl="/dashboard"
      afterSignOutUrl="/dashboard"
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    >
      <header>
        <p>netlify-react-clerk</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <SignedIn>
            <li>
              <UserButton afterSwitchSessionUrl="/" />
            </li>
          </SignedIn>
          <SignedOut>
            <li>
              <Link to="/auth/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/auth/sign-up">Sign Up</Link>
            </li>
            <li>
              <Button onClick={() => {}}>Sign Up</Button>
            </li>
          </SignedOut>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
};

export default Layout;
