'use client';

import useKakaoMap from '@/hooks/custom/useKakaoMap';
import { Location } from '@/types/map';

interface Props {
  myNeighborhoods: Location;
  radius: number;
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
