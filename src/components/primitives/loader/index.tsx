import { Loading02Icon } from 'hugeicons-react';

interface ILoaderProps {
  text?: string;
}

const Loader: React.FC<ILoaderProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center">
      <Loading02Icon className="w-5 h-5 animate-spin" />
      {text && <span className="text-3xl mr-4">{text}</span>}
    </div>
  );
};

export default Loader;
