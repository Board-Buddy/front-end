import { LoaderCircleIcon } from 'lucide-react';
import DeferredComponent from './svg/DeferredComponent';

const Loading = () => {
  return (
    <DeferredComponent>
      <div className="flex h-[calc(100vh-53px)] items-center justify-center">
        <LoaderCircleIcon className="animate-spin text-primary" />
      </div>
    </DeferredComponent>
  );
};

export default Loading;
