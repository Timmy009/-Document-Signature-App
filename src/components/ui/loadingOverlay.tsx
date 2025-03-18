import { Loading02Icon } from 'hugeicons-react';

interface ILoadingOverlayProps {}

export const LoadingOverlay = ({}: ILoadingOverlayProps) => {
  return (
    <div className="absolute bg-white/10  z-10 h-full w-full flex items-center justify-center">
      <div className="flex items-center">
        <span className="text-3xl mr-4">Loading</span>
        <Loading02Icon className="w-5 h-5 animate-spin" />
      </div>
    </div>
  );
};
