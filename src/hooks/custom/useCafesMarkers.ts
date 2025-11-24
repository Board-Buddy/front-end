'use client';

import { useEffect, useRef } from 'react';
import { Cafe } from '@/types/map';

/** 카페 데이터를 기반으로 마커 생성 + 선택 상태에 따라 이미지 교체 */
const useCafesMarkers = (
  cafes: Cafe[],
  mapObject: any,
  markersRef: any,
  setShowInfo: (show: boolean) => void,
  setCafeInfo: (cafe: Cafe | null) => void,
  setShowReloadButton: (show: boolean) => void,
  selectedCafeId: Cafe['id'] | null,
  setSelectedCafeId: (id: Cafe['id'] | null) => void,
) => {
  // 마커 이미지 캐싱 (불필요한 마커 이미지 재생성 방지)
  const defaultImageRef = useRef<any>(null);
  const selectedImageRef = useRef<any>(null);

  // 이미지 초기화
  useEffect(() => {
    if (!mapObject) return; // mapObject가 준비되기 전까지 대기

    defaultImageRef.current = new window.kakao.maps.MarkerImage(
      '/images/icon/marker_icon.png',
      new window.kakao.maps.Size(30, 30),
    );

    selectedImageRef.current = new window.kakao.maps.MarkerImage(
      '/images/icon/selected_marker_icon.png',
      new window.kakao.maps.Size(37, 50),
    );
  }, [mapObject]);

  // 마커 생성
  useEffect(() => {
    if (!cafes || !mapObject) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker: any) => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 생성
    cafes.forEach((cafe) => {
      const position = new window.kakao.maps.LatLng(cafe.y, cafe.x);

      const marker = new window.kakao.maps.Marker({
        map: mapObject,
        position,
        image: defaultImageRef.current,
        clickable: true, // 마커 클릭 시 지도 클릭 이벤트 방지
      });

      // 마커에 id 저장 (나중에 선택된 마커인지 판단하기 위함)
      marker._cafeId = cafe.id;

      // 마커 클릭 이벤트 클로저 (클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됨)
      function makeClickListener() {
        return function () {
          setCafeInfo(cafe);
          setShowInfo(true);
          setShowReloadButton(false);
          setSelectedCafeId(cafe.id);
        };
      }

      // 마커에 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'click', makeClickListener());

      markersRef.current.push(marker); // 마커 저장
    });
  }, [
    cafes,
    mapObject,
    markersRef,
    setCafeInfo,
    setShowInfo,
    setShowReloadButton,
    setSelectedCafeId,
  ]);

  // 선택된 마커만 이미지 교체
  useEffect(() => {
    if (!markersRef.current.length) return;

    markersRef.current.forEach((marker: any) => {
      const isSelected = marker._cafeId === selectedCafeId;

      marker.setImage(
        isSelected ? selectedImageRef.current : defaultImageRef.current,
      );
    });
  }, [selectedCafeId, markersRef]);
};

export default useCafesMarkers;
