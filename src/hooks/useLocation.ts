import { getDistrictList, getProvinceList } from '@/services/location';
import { CustomAxiosError } from '@/types/api';
import { District, Province } from '@/types/location';
import { locationQueryKeys } from '@/utils/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetProvinceList = () =>
  useSuspenseQuery<Province[], CustomAxiosError>({
    queryKey: locationQueryKeys.province(),
    queryFn: getProvinceList,
  });

export const useGetDistrictList = (provinceCode: Province['code']) =>
  useSuspenseQuery<District[], CustomAxiosError>({
    queryKey: locationQueryKeys.district(),
    queryFn: () => getDistrictList(provinceCode),
  });
