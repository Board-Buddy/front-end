'use client';

import { ReactNode, useState } from 'react';
import { Cafe, Location } from '@/types/map';
import { useGetBoardCafes } from '@/hooks/useMap';
import useKakaoMap from '@/hooks/custom/useKakaoMap';
import useCafesMarkers from '@/hooks/custom/useCafesMarkers';
import usePanToCafe from '@/hooks/custom/usePanToCafe';
import ReloadButton from './ReloadButton';
import useIsWebView from '@/hooks/custom/useIsWebView';
import { MAX_SEARCH_RADIUS } from '@/constants/map';
import { errorToast } from '@/utils/customToast';

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

  const onReloadButtonClick = async () => {
    if (radius >= MAX_SEARCH_RADIUS) {
      errorToast(
        'max-radius',
        `한 번에 조회할 수 있는 반경은 최대 ${MAX_SEARCH_RADIUS / 1000}km입니다. 지도를 확대해서 다시 검색해 주세요.`,
      );

      setShowReloadButton(false);
      return;
    }

    const result = await refetch();

    if (result.isError) {
      errorToast(
        'cafe-fetch-error',
        '데이터를 불러오는 중에 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
      );
    }

    setShowReloadButton(false);
  };

  const getMapHeight = () => {
    const px = (showInfo ? infoHeight : 0) + (isWebView ? 0 : headerHeight);

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
