import { useLocation, useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const thereIsAPrevPage = location.key !== 'default';
  if (thereIsAPrevPage) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_arg: { fallback?: string }) => navigate(-1);
  } else {
    return ({ fallback }: { fallback?: string }) => navigate(fallback || '/');
  }
};
