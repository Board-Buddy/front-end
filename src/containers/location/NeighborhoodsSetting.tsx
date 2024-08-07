'use client';

import { useGetMyNeighborhoods } from '@/hooks/useLocation';
import Loading from '@/components/Loading';
import Map from './Map';
import LocationRadiusSetting from './LocationRadiusSetting';

const NeighborhoodsSetting = () => {
  const { data, isPending, isError, error } = useGetMyNeighborhoods();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
