import api from '@/services';
import { SuccessResponse } from '@/types/api';
import { ENDPOINT } from './endpoint';
import { Province, District } from '@/types/location';

/** 지역 시/도 조회 API */
export const getProvinceList = () =>
  api
    .get<
      SuccessResponse<{ dataList: Province[] }>
    >(ENDPOINT.LOCATION.PROVINCES())
    .then((response) => response.data.data.dataList);

/** 지역 시/군/구 API */
export const getDistrictList = (provinceCode: Province['code']) =>
  api
    .get<
      SuccessResponse<{ dataList: District[] }>
    >(ENDPOINT.LOCATION.DISTRICTS(provinceCode))
    .then((response) => response.data.data.dataList);
