import { LoaderCircleIcon } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      <LoaderCircleIcon className="animate-spin text-primary" />
    </div>
  );
};

export default Loading;
