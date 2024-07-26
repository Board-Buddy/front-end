import { useEffect } from 'react';
import { Cafe } from '@/types/map';

/** 클릭한 카페 정보를 기반으로 지도의 중심을 이동시킨다. */
const usePanToCafe = (
  cafeInfo: Cafe | null,
  mapObject: any,
  showInfo: boolean,
  clickListener: boolean,
) => {
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
};

export default usePanToCafe;
