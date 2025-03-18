import { lazy, Suspense } from 'react';

import 'react-quill/dist/quill.bubble.css';
import Loader from '../primitives/loader';

interface PreviewProps {
  value: string;
}

const ReactQuill = lazy(() => import('react-quill'));

export const Preview = ({ value }: PreviewProps) => {
  return (
    <Suspense fallback={<Loader />}>
      {ReactQuill ? <ReactQuill theme="bubble" value={value} readOnly /> : null}
    </Suspense>
  );
};
