import LocationFilterContainer from '@/containers/home/LocationFilterContainer';
import { getProvinceListOptions } from '@/hooks/useLocation';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getProvinceListOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-full flex-col">
        <LocationFilterContainer />
      </div>
    </HydrationBoundary>
  );
};

export default page;
