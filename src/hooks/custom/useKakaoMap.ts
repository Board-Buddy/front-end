'use client';

import { useEffect, useRef, useState } from 'react';
import { KAKAO_APP_KEY } from '@/constants/env';
import {
  MAP_INITIAL_LEVEL,
  MAP_INITIAL_RADIUS,
  MAP_MAX_LEVEL,
} from '@/constants/map';
import { Location } from '@/types/map';

/** 카카오 지도 로드 및 초기화
 * @param location 초기화 시 center로 지정할 위치({lat: 위도, lng: 경도})
 */
const useKakaoMap = (
  location: Location,
  isMarkerSundy: boolean,
  setShowInfo?: (show: boolean) => void,
  setShowReloadButton?: (show: boolean) => void,
  setStatic?: boolean,
) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapObject, setMapObject] = useState<any>(null);
  const [radius, setRadius] = useState<number>(MAP_INITIAL_RADIUS);

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: location.latitude,
    lng: location.longitude,
  });

  const markersRef = useRef<any[]>([]); // 마커들을 저장하는 배열

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setCenter({ lat: location.latitude, lng: location.longitude });

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude,
          ),
          level: MAP_INITIAL_LEVEL,
          maxLevel: MAP_MAX_LEVEL,
          draggable: !setStatic,
          zoomable: !setStatic,
        };

        const map = new window.kakao.maps.Map(container, options);
        setMapObject(map);

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(map, 'click', () => {
          if (setShowInfo) {
            setShowInfo(false);
          }
        });

        // 두 좌표 간 거리 계산 (Harvesine 공식)
        const getDistance = (point1: any, point2: any) => {
          const lat1 = point1.getLat();
          const lng1 = point1.getLng();
          const lat2 = point2.getLat();
          const lng2 = point2.getLng();

          const R = 6371000; // 지구 반경 (m)
          const toRad = (deg: any) => (deg * Math.PI) / 180;

          const dLat = toRad(lat2 - lat1);
          const dLng = toRad(lng2 - lng1);

          const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
              Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) ** 2;

          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          return R * c;
        };

        // 지도 확대/축소 이벤트 등록
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          if (setShowReloadButton) {
            setShowReloadButton(true);
          }

          const bounds = map.getBounds(); // ((남, 서), (북, 동)) 좌표를 반환
          const ne = bounds.getNorthEast(); // 북동쪽 좌표
          const sw = bounds.getSouthWest(); // 남서쪽 좌표

          // 가로/세로 반경 계산
          const centerPoint = map.getCenter();

          const latDistance =
            getDistance(
              new window.kakao.maps.LatLng(centerPoint.getLat(), sw.getLng()),
              new window.kakao.maps.LatLng(centerPoint.getLat(), ne.getLng()),
            ) / 2;

          const lngDistance =
            getDistance(
              new window.kakao.maps.LatLng(sw.getLat(), centerPoint.getLng()),
              new window.kakao.maps.LatLng(ne.getLat(), centerPoint.getLng()),
            ) / 2;

          // 안전하게 화면 전체를 포함시키도록 큰 값으로 radius 설정
          setRadius(Math.ceil(Math.max(latDistance, lngDistance)));
        });

        // 지도 이동(드래그) 이벤트 등록
        window.kakao.maps.event.addListener(map, 'dragend', () => {
          const centerPoint = map.getCenter();
          setCenter({
            lat: centerPoint.getLat(),
            lng: centerPoint.getLng(),
          });
          if (setShowReloadButton) {
            setShowReloadButton(true);
          }
        });

        // 현재 위치 마커 생성
        const currentMarkerImage = new window.kakao.maps.MarkerImage(
          isMarkerSundy
            ? '/images/sundy/sundy_map.png'
            : '/images/icon/marker_icon.png',
          isMarkerSundy
            ? new window.kakao.maps.Size(36, 56)
            : new window.kakao.maps.Size(37, 50),
          {
            offset: isMarkerSundy
              ? new window.kakao.maps.Point(18, 56)
              : new window.kakao.maps.Point(18, 50),
          },
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
  }, [
    location.latitude,
    location.longitude,
    setShowInfo,
    setShowReloadButton,
    setStatic,
    isMarkerSundy,
  ]);

  return { mapRef, mapObject, markersRef, radius, center };
};

export default useKakaoMap;
