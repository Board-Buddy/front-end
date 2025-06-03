'use client';

import useKakaoMap from '@/hooks/custom/useKakaoMap';
import { MyNeighborhoods } from '@/types/location';
import { Location } from '@/types/map';

interface Props {
  myNeighborhoods: Location;
  radius: MyNeighborhoods['radius'];
}

const Map = ({ myNeighborhoods, radius }: Props) => {
  const { mapRef } = useKakaoMap(
    {
      latitude: myNeighborhoods.latitude,
      longitude: myNeighborhoods.longitude,
    },
    false,
    undefined,
    undefined,
    true,
    radius,
  );

  return <div ref={mapRef} className="h-[calc(100dvh-222px)]" />;
};

export default Map;
