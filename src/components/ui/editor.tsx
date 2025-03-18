import { lazy, Suspense } from 'react';
import 'react-quill/dist/quill.snow.css';
import Loader from '../primitives/loader';

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const ReactQuil = lazy(() => import('react-quill'));

export const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactQuil
        theme="snow"
        value={value}
        onChange={onChange}
        className="rounded"
      />
      <style>{`
       .ql-toolbar.ql-snow {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }
          .ql-container.ql-snow {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }
      `}</style>
    </Suspense>
  );
};
