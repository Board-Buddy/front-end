'use client';

import { ReactNode, useState } from 'react';
import { Cafe, Location } from '@/types/map';
import { useGetBoardCafes } from '@/hooks/useMap';
import useKakaoMap from '@/hooks/custom/useKakaoMap';
import useCafesMarkers from '@/hooks/custom/useCafesMarkers';
import usePanToCafe from '@/hooks/custom/usePanToCafe';
import ReloadButton from './ReloadButton';
import useIsWebView from '@/hooks/custom/useIsWebView';

const headerHeight = 56;
const infoHeight = 250;

interface Props {
  location: Location;
  children?: ReactNode;
  cafeInfo: Cafe | null;
  setCafeInfo: (cafe: Cafe | null) => void;
}

const Map = ({ location, children, cafeInfo, setCafeInfo }: Props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const isWebView = useIsWebView();

  const { mapRef, mapObject, markersRef, radius, center } = useKakaoMap(
    location,
    true,
    setShowInfo,
    setShowReloadButton,
  );

  const {
    data: cafes = [],
    isPending,
    isError,
    refetch,
  } = useGetBoardCafes({
    x: center.lng,
    y: center.lat,
    radius,
  });

  const clickListener = useCafesMarkers(
    cafes,
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
      console.log('카페 데이터 조회 에러');
    }
  };

  const getMapHeight = () => {
    let px = 0;

    if (showInfo) {
      px += infoHeight;
      if (!isWebView) px += headerHeight;
    } else {
      if (!isWebView) px += headerHeight;
    }

    return `calc(100dvh - ${px}px)`;
  };

  return (
    <div className="relative">
      <div
        ref={mapRef}
        style={{ height: getMapHeight() }}
        className="w-full bg-gray-200 transition-all ease-in"
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
