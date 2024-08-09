'use client';

import { useEffect, useRef, useState } from 'react';
import { KAKAO_APP_KEY } from '@/constants/env';
import {
  LEVEL_TO_RADIUS,
  MAP_INITIAL_LEVEL,
  MAP_MAX_LEVEL,
  RADIUS_TO_LEVEL,
} from '@/constants/map';
import { Location } from '@/types/map';

/** 카카오 지도 로드 및 초기화
 * @param location 초기화 시 center로 지정할 위치({lat: 위도, lng: 경도})
 */
const useKakaoMap = (
  location: Location,
  setShowInfo?: (show: boolean) => void,
  setShowReloadButton?: (show: boolean) => void,
  setStatic?: boolean,
  radiusSetting?: number,
) => {
  console.log(radiusSetting);

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapObject, setMapObject] = useState<any>(null);
  const [radius, setRadius] = useState<number>(
    LEVEL_TO_RADIUS[MAP_INITIAL_LEVEL],
  );

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
        setCenter({ lat: location.latitude, lng: location.latitude });

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude,
          ),
          level: radiusSetting
            ? RADIUS_TO_LEVEL[radiusSetting]
            : MAP_INITIAL_LEVEL,
          // maxLevel: MAP_MAX_LEVEL,
          draggable: !setStatic,
          zoomable: !setStatic,
        };

        console.log(options);
        const map = new window.kakao.maps.Map(container, options);
        setMapObject(map);

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(map, 'click', () => {
          if (setShowInfo) {
            setShowInfo(false);
          }
        });

        // 지도 확대/축소 이벤트 등록
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          if (setShowReloadButton) {
            setShowReloadButton(true);
          }
          const level = map.getLevel();
          setRadius(LEVEL_TO_RADIUS[level]);
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

        // 반경 정보가 주어졌다면(동네 설정 페이지) 반경 표시
        if (radiusSetting) {
          const circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(
              location.latitude,
              location.longitude,
            ),
            radius: radiusSetting * 1000,
            strokeWeight: 1, // 선의 두께
            strokeColor: '#F49C01', // 선의 색깔
            strokeOpacity: 1, // 선의 불투명도
            strokeStyle: 'line', // 선의 스타일
            fillColor: '#FFF3E0', // 채우기 색깔
            fillOpacity: 0.4, // 채우기 불투명도
          });

          circle.setMap(map);
        }
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
    radiusSetting,
  ]);

  return { mapRef, mapObject, markersRef, radius, center };
};

export default useKakaoMap;
