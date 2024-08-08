import { LoaderCircleIcon } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <LoaderCircleIcon className="animate-spin text-primary" />
    </div>
  );
};

export default Loading;
