'use client';

import { KAKAO_APP_KEY } from '@/constants/env';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/tailwind';
import { Cafe, Location } from '@/types/map';
import {
  LEVEL_TO_RADIUS,
  MAP_INITIAL_LEVEL,
  MAP_INITIAL_RADIUS,
  MAP_MAX_LEVEL,
} from '@/constants/map';
import { useGetBoardCafes } from '@/hooks/useMap';
import MapInfo from './MapInfo';
import ReloadButton from './ReloadButton';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ location }: { location: Location }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]); // 마커들을 저장하는 배열

  const [mapObject, setMapObject] = useState<any>(null);
  const [radius, setRadius] = useState<number>(MAP_INITIAL_RADIUS);
  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: location.latitude,
    y: location.longitude,
  });

  const {
    data: cafes,
    isPending,
    isError,
    refetch,
  } = useGetBoardCafes({
    x: center.x,
    y: center.y,
    radius,
  });

  const [showInfo, setShowInfo] = useState(false);
  const [clickListener, setClickListener] = useState(false);
  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const onReloadButtonClick = () => {
    // 보드게임 카페 조회 요청
    refetch();
    setShowReloadButton(false);

    if (isError) {
      console.log('error');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setCenter({ x: location.latitude, y: location.latitude });

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude,
          ),
          level: MAP_INITIAL_LEVEL,
          maxLevel: MAP_MAX_LEVEL,
        };

        const map = new window.kakao.maps.Map(container, options);
        setMapObject(map);

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(map, 'click', () => {
          setShowInfo(false);
        });

        // 지도 확대/축소 이벤트 등록
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          setShowReloadButton(true);
          const level = map.getLevel();
          setRadius(LEVEL_TO_RADIUS[level]);
        });

        // 지도 이동(드래그) 이벤트 등록
        window.kakao.maps.event.addListener(map, 'dragend', () => {
          const centerPoint = map.getCenter();
          setCenter({
            x: centerPoint.getLat(),
            y: centerPoint.getLng(),
          });
          setShowReloadButton(true);
        });

        // 현재 위치 마커 생성
        const currentMarkerImage = new window.kakao.maps.MarkerImage(
          '/images/sundy/sundy_map.png',
          new window.kakao.maps.Size(36, 56),
          { offset: new window.kakao.maps.Point(27, 60) },
        );

        const currentMarkerPosition = new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude,
        );

        const currentMarker = new window.kakao.maps.Marker({
          position: currentMarkerPosition,
          image: currentMarkerImage,
        });

        currentMarker.setMap(map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    if (cafes && mapObject) {
      console.log('cafes useEffect');
      // 기존 마커들을 지도에서 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // 새로운 마커들을 지도에 추가
      cafes.forEach((cafe) => {
        const markerPosition = new window.kakao.maps.LatLng(cafe.y, cafe.x);

        const marker = new window.kakao.maps.Marker({
          map: mapObject,
          position: markerPosition,
          clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
        });

        // 상세 정보를 표시하는 클로저를 만드는 함수
        function makeClickListener() {
          return function () {
            setShowInfo(true);
            setCafeInfo(cafe);
            setClickListener((old) => !old);
            setShowReloadButton(false);
          };
        }

        // 마커에 click 이벤트 등록
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        window.kakao.maps.event.addListener(
          marker,
          'click',
          makeClickListener(),
        );

        markersRef.current.push(marker); // 마커를 배열에 저장
      });
    }
  }, [cafes, mapObject]);

  useEffect(() => {
    if (cafeInfo) {
      setTimeout(() => {
        mapObject.relayout();

        if (showInfo) {
          const moveLatLon = new window.kakao.maps.LatLng(
            cafeInfo.y,
            cafeInfo.x,
          );
          mapObject.panTo(moveLatLon); // 지도 중심을 부드럽게 이동한다.
        }
      }, 150);
    }
  }, [clickListener, cafeInfo, mapObject, showInfo]);

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
      <MapInfo cafe={cafeInfo} />
    </div>
  );
};

export default Map;
