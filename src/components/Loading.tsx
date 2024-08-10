import { LoaderCircleIcon } from 'lucide-react';
import DeferredComponent from './svg/DeferredComponent';

const Loading = () => {
  return (
    <DeferredComponent>
      <div className="flex justify-center items-center h-[calc(100vh-53px)]">
        <LoaderCircleIcon className="animate-spin text-primary" />
      </div>
    </DeferredComponent>
  );
};

export default Loading;
