'use client';

import { useState } from 'react';
import { Cafe } from '@/types/map';
import { usePathname } from 'next/navigation';
import { useWriteFormContext } from '@/context/WriteFormContext';
import { GEOLOCATION_OPTIONS } from '@/constants/map';
import useGeoLocation from '@/hooks/custom/useGeoLocation';
import CafeInfo from '../containers/map/CafeInfo';
import Map from '../containers/map/Map';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { saveStateToApp, STATE_KEYS } from '@/utils/webview';
import useAppLocation from '@/hooks/custom/useAppLocation';
import useIsWebView from '@/hooks/custom/useIsWebView';
import EmptyFallback from './EmptyFallback';
import Loading from './Loading';

const GeoLocation = () => {
  const pathname = usePathname();
  const router = useAppRouter();

  const isWebView = useIsWebView();

  const { formState, setFormState } = useWriteFormContext();
  const { location: webLocation, error: webLocationError } =
    useGeoLocation(GEOLOCATION_OPTIONS);
  const { location: appLocation, error: appLocationError } = useAppLocation();

  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);

  const handleDirectionButtonClick = () => {};

  const handleSelectButtonClick = () => {
    if (!cafeInfo) return;

    const locationFormState = {
      meetingLocation: cafeInfo.placeName,
      sido: cafeInfo.sido,
      sgg: cafeInfo.sgg,
      emd: cafeInfo.emd,
      x: cafeInfo.x.toString(),
      y: cafeInfo.y.toString(),
    };

    setFormState({ ...formState, ...locationFormState });

    saveStateToApp(STATE_KEYS.ARTICLE_WRITE_FORM, locationFormState);

    router.back();
  };

  const location = appLocation ?? webLocation;
  const error = isWebView ? appLocationError : webLocationError;

  if (!location) {
    if (error) {
      return <EmptyFallback message={error} />;
    }

    return <Loading />;
  }

  return (
    <Map location={location} cafeInfo={cafeInfo} setCafeInfo={setCafeInfo}>
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
    </Map>
  );
};

export default GeoLocation;
