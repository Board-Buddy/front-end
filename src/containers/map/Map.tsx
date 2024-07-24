'use client';

import { KAKAO_APP_KEY } from '@/constants/env';
import useGeoLocation from '@/hooks/useGeoLocation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/tailwind';
import { Cafe } from '@/types/map';
import {
  LEVEL_TO_RADIUS,
  MAP_INITIAL_LEVEL,
  MAP_INITIAL_RADIUS,
  MAP_MAX_LEVEL,
} from '@/constants/map';
import MapInfo from './MapInfo';
import ReloadButton from './ReloadButton';

declare global {
  interface Window {
    kakao: any;
  }
}

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const Map = () => {
  const cafes = [
    {
      addressName: '서울 종로구 내수동 73',
      distance: '1867',
      id: '841664157',
      phone: '070-8627-1688',
      placeName: '보드게임101 광화문점 24시간 무인카페',
      placeUrl: 'http://place.map.kakao.com/841664157',
      roadAddressName: '서울 종로구 새문안로3길 23',
      x: '126.972438244896',
      y: '37.5725658604431',
    },

    {
      addressName: '서울 종로구 관철동 19-11',
      distance: '2613',
      id: '621777615',
      phone: '070-4247-4562',
      placeName: '보드게임카페 주사위왕국',
      placeUrl: 'http://place.map.kakao.com/621777615',
      roadAddressName: '서울 종로구 우정국로2길 42',
      x: '126.985386588519',
      y: '37.5694300068762',
    },
    {
      addressName: '서울 종로구 관철동 13-1',
      distance: '2677',
      id: '2055835737',
      phone: '02-733-3799',
      placeName: '레드버튼 종로점',
      placeUrl: 'http://place.map.kakao.com/2055835737',
      roadAddressName: '서울 종로구 삼일대로19길 15',
      x: '126.986720016475',
      y: '37.569449085306',
    },
  ];

  const mapRef = useRef<HTMLDivElement>(null);
  const mapObjectRef = useRef<any>(null);
  const radiusRef = useRef<number>(MAP_INITIAL_RADIUS);

  const [showInfo, setShowInfo] = useState(false);
  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const onReloadButtonClick = () => {
    setShowReloadButton(false);
  };

  const { location, error } = useGeoLocation(geolocationOptions);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(
            location?.latitude,
            location?.longitude,
          ),
          level: MAP_INITIAL_LEVEL,
          maxLevel: MAP_MAX_LEVEL,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapObjectRef.current = map;

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(map, 'click', () => {
          setShowInfo(false);
        });

        // 지도 확대/축소 이벤트 등록
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          setShowReloadButton(true);
          const level = map.getLevel();
          radiusRef.current = LEVEL_TO_RADIUS[level];
        });

        // 지도 이동(드래그) 이벤트 등록
        window.kakao.maps.event.addListener(map, 'dragend', () => {
          const centerPoint = map.getCenter();
          console.log(centerPoint.getLat(), centerPoint.getLng());
          setShowReloadButton(true);
        });

        // 현재 위치 마커 생성
        const currentMarkerImage = new window.kakao.maps.MarkerImage(
          '/images/sundy/sundy_map.png',
          new window.kakao.maps.Size(36, 56),
          { offset: new window.kakao.maps.Point(27, 60) },
        );

        const currentMarkerPosition = new window.kakao.maps.LatLng(
          location?.latitude,
          location?.longitude,
        );

        const currentMarker = new window.kakao.maps.Marker({
          position: currentMarkerPosition,
          image: currentMarkerImage,
        });

        currentMarker.setMap(map);

        // 주변 보드게임 카페 마커 설정
        cafes.forEach((cafe) => {
          const markerPosition = new window.kakao.maps.LatLng(cafe.y, cafe.x);

          const marker = new window.kakao.maps.Marker({
            map,
            position: markerPosition,
            clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
          });

          // 상세 정보를 표시하는 클로저를 만드는 함수
          function makeClickListener() {
            return function () {
              setShowInfo(true);
              setCafeInfo(cafe);
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
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location]);

  useEffect(() => {
    if (mapObjectRef.current && cafeInfo) {
      mapObjectRef.current.relayout();

      const moveLatLon = new window.kakao.maps.LatLng(cafeInfo.y, cafeInfo.x);

      mapObjectRef.current.setLevel(3, { anchor: moveLatLon, animate: true }); // 지도 레벨을 3으로 설정한다.
      mapObjectRef.current.panTo(moveLatLon); // 지도 중심을 부드럽게 이동한다.
    }
  }, [showInfo, cafeInfo]);

  if (error) {
    return <div>위치 정보를 허용해주세요.</div>;
  }

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className={cn(
          'w-full bg-gray-200 transition-all ease-in',
          showInfo ? 'h-[calc(100vh-300px)]' : 'h-[calc(100vh-50px)]',
        )}
      />
      <ReloadButton show={showReloadButton} onClick={onReloadButtonClick} />
      <MapInfo cafe={cafeInfo} />
    </div>
  );
};

export default Map;
