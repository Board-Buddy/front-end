import { getDistrictList, getProvinceList } from '@/services/location';
import { CustomAxiosError } from '@/types/api';
import { District, Province } from '@/types/location';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetProvinceList = () =>
  useSuspenseQuery<Province[], CustomAxiosError>({
    queryKey: ['province'],
    queryFn: getProvinceList,
  });

export const useGetDistrictList = (provinceCode: Province['code']) =>
  useSuspenseQuery<District[], CustomAxiosError>({
    queryKey: ['district', { provinceCode }],
    queryFn: () => getDistrictList(provinceCode),
  });
