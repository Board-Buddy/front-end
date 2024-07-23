'use client';

import { KAKAO_APP_KEY } from '@/constants/env';
import useGeoLocation from '@/hooks/useGeoLocation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/tailwind';
import { Cafe } from '@/types/map';
import {
  MAP_INITIAL_LEVEL,
  MAP_INITIAL_RADIUS,
  MAP_MAX_LEVEL,
} from '@/constants/map';
import MapInfo from './MapInfo';

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
  const mapRef = useRef<HTMLDivElement>(null);

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

  const [showInfo, setShowInfo] = useState(false);
  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);
  const [radius, setRadius] = useState(MAP_INITIAL_RADIUS);

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

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(map, 'click', () => {
          setShowInfo(false);
          map.relayout();
        });

        // 지도 확대/축소 이벤트 등록
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          const level = map.getLevel();
          const radiusValue = [0, 70, 150, 300, 600, 1300, 2700, 5500, 12000];
          setRadius(radiusValue[level]);
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
              map.relayout();
            };
          }

          // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
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

  if (error) {
    return <div>위치 정보를 허용해주세요.</div>;
  }

  return (
    <>
      <div
        ref={mapRef}
        className={cn(
          'w-full bg-gray-200 transition-all ease-in',
          showInfo ? 'h-[calc(100vh-300px)]' : 'h-[calc(100vh-50px)]',
        )}
      />
      <MapInfo cafe={cafeInfo} />
    </>
  );
};

export default Map;
