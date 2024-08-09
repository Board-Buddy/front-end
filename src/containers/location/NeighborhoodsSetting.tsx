'use client';

import { useGetMyNeighborhoods } from '@/hooks/useLocation';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import Map from './Map';
import LocationRadiusSetting from './LocationRadiusSetting';

const NeighborhoodsSetting = () => {
  const { data, isPending, isError, error, refetch } = useGetMyNeighborhoods();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  return (
    <div>
      <Map
        myNeighborhoods={{
          latitude: data.latitude,
          longitude: data.longitude,
        }}
        radius={data.radius}
      />
      <LocationRadiusSetting radius={data.radius} />
    </div>
  );
};

export default NeighborhoodsSetting;
