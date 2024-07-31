'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/utils/tailwind';
import { Cafe, Location } from '@/types/map';
import { useGetBoardCafes } from '@/hooks/useMap';
import useKakaoMap from '@/hooks/custom/useKakaoMap';
import useCafesMarkers from '@/hooks/custom/useCafesMarkers';
import usePanToCafe from '@/hooks/custom/usePanToCafe';
import { usePathname, useRouter } from 'next/navigation';
import { useWriteFormContext } from '@/context/WriteFormContext';
import ReloadButton from './ReloadButton';
import CafeInfo from './CafeInfo';

interface Props {
  location: Location;
  redirectionURL?: string;
}

const Map = ({ location, redirectionURL }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const { formState, setFormState } = useWriteFormContext();

  const [showInfo, setShowInfo] = useState(false);
  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const { mapRef, mapObject, markersRef, radius, center } = useKakaoMap(
    location,
    setShowInfo,
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

  // usePanToCafe(cafeInfo, mapObject, showInfo, clickListener);

  const onReloadButtonClick = () => {
    // 보드게임 카페 조회 요청
    refetch();
    setShowReloadButton(false);

    if (isError) {
      console.log('error');
    }
  };

  const handleDirectionButtonClick = () => {};

  const handleSelectButtonClick = () => {
    setFormState({
      ...formState,
      meetingLocation: cafeInfo!.place_name,
      sido: cafeInfo!.sido,
      sgg: cafeInfo!.sgg,
      emd: cafeInfo!.emd,
      x: cafeInfo!.x,
      y: cafeInfo!.y,
    });

    router.push(redirectionURL!);
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
      {pathname.includes('map') && (
        <CafeInfo
          cafe={cafeInfo}
          onClick={handleDirectionButtonClick}
          buttonTitle="길찾기"
        />
      )}
      {pathname.includes('locationSetting') && (
        <CafeInfo
          cafe={cafeInfo}
          onClick={handleSelectButtonClick}
          buttonTitle="이곳에서 만날게요"
        />
      )}
    </div>
  );
};

export default Map;
