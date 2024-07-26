'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/utils/tailwind';
import { Cafe, Location } from '@/types/map';
import { useGetBoardCafes } from '@/hooks/useMap';
import useKakaoMap from '@/hooks/custom/useKakaoMap';
import useCafesMarkers from '@/hooks/custom/useCafesMarkers';
import usePanToCafe from '@/hooks/custom/usePanToCafe';
import ReloadButton from './ReloadButton';
import MapInfo from './CafeInfo';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  location: Location;
  children?: ReactNode;
  cafeInfo: Cafe | null;
  setCafeInfo: (cafe: Cafe | null) => void;
}

const Map = ({ location, children, cafeInfo, setCafeInfo }: Props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const { mapRef, mapObject, markersRef, radius, center } = useKakaoMap(
    location,
    setShowInfo,
    setCafeInfo,
    setShowReloadButton,
  );

  const {
    data: cafes,
    isPending,
    isError,
    refetch,
  } = useGetBoardCafes({
    x: center.lng,
    y: center.lat,
    radius,
  });

  const clickListener = useCafesMarkers(
    cafes || [],
    mapObject,
    markersRef,
    setShowInfo,
    setCafeInfo,
    setShowReloadButton,
  );

  usePanToCafe(cafeInfo, mapObject, showInfo, clickListener);

  const onReloadButtonClick = () => {
    // 보드게임 카페 조회 요청
    refetch();
    setShowReloadButton(false);

    if (isError) {
      console.log('error');
    }
  };

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className={cn(
          'w-full bg-gray-200 transition-all ease-in',
          showInfo ? 'h-[calc(100vh-300px)]' : 'h-[calc(100vh-50px)]',
        )}
      />
      <ReloadButton
        show={showReloadButton}
        onClick={onReloadButtonClick}
        isPending={isPending}
      />
      {children}
    </div>
  );
};

export default Map;
