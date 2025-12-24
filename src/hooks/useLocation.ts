import { getDistrictList, getProvinceList } from '@/services/location';
import { Province } from '@/types/location';
import { locationQueryKeys } from '@/utils/queryKeys';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getProvinceListOptions = () =>
  queryOptions({
    queryKey: locationQueryKeys.province(),
    queryFn: getProvinceList,
  });

export const useGetProvinceList = () =>
  useSuspenseQuery(getProvinceListOptions());

export const getDistrictListOptions = (provinceCode: Province['code']) =>
  queryOptions({
    queryKey: locationQueryKeys.district(provinceCode),
    queryFn: () => getDistrictList(provinceCode),
  });

export const useGetDistrictList = (provinceCode: Province['code']) =>
  useSuspenseQuery(getDistrictListOptions(provinceCode));
