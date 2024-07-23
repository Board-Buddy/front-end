'use client';

import { KAKAO_APP_KEY } from '@/constants/env';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          draggable: false, // 마우스 드래그 지도 이동 막기
          zoomable: false, // 줌인/줌아웃 막기
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 생성
        const markerImage = new window.kakao.maps.MarkerImage(
          '/images/sundy/sundy_map.png',
          new window.kakao.maps.Size(36, 56),
          { offset: new window.kakao.maps.Point(27, 60) },
        );

        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667,
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={mapRef} className="w-full h-[250px] bg-gray-200" />;
};

export default Map;
