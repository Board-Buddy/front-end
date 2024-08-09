'use client';

import useKakaoMap from '@/hooks/custom/useKakaoMap';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  lat: number;
  lng: number;
}

const Map = ({ lat, lng }: Props) => {
  const { mapRef } = useKakaoMap(
    {
      latitude: lat,
      longitude: lng,
    },
    false,
    undefined,
    undefined,
    true,
  );

  return <div ref={mapRef} className="w-full h-[250px] bg-gray-200" />;
};

export default Map;
