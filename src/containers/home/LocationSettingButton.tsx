'use client';

import { UserInfo } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

const LocationSettingButton = () => {
  const cache = useQueryClient();

  const location = cache.getQueryData(['userInfo']) as UserInfo;

  return <p>{location.dong}</p>;
};

export default LocationSettingButton;
