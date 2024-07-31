'use client';

import { useEffect, useState } from 'react';
import { Cafe } from '@/types/map';

/** 카페 데이터를 기반으로 마커 생성 */
const useCafesMarkers = (
  cafes: Cafe[],
  mapObject: any,
  markersRef: any,
  setShowInfo: (show: boolean) => void,
  setCafeInfo: (cafe: Cafe | null) => void,
  setShowReloadButton: (show: boolean) => void,
) => {
  const [clickListener, setClickListener] = useState(false);

  useEffect(() => {
    if (cafes && mapObject) {
      // 기존 마커들을 지도에서 제거
      markersRef.current.forEach((marker: any) => marker.setMap(null));
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
        // function makeClickListener() {
        //   return function () {
        //     console.log(cafe);
        //     setCafeInfo(cafe);
        //     // setShowInfo(true);
        //     // setClickListener((old) => !old);
        //     // setShowReloadButton(false);
        //   };
        // }

        // 마커에 click 이벤트 등록
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        window.kakao.maps.event.addListener(
          marker,
          'click',
          // makeClickListener(),
          () => {
            console.log('click');
            setCafeInfo(cafe);
            setShowInfo(true);
            setClickListener((old) => !old);
            setShowReloadButton(false);
          },
        );

        markersRef.current.push(marker); // 마커를 배열에 저장
      });
    }
  }, [
    cafes,
    mapObject,
    markersRef,
    setCafeInfo,
    setShowInfo,
    setShowReloadButton,
  ]);

  return clickListener;
};

export default useCafesMarkers;
