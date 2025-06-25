import { getProvinces } from './provinces';
import { getDistricts } from './provinces/[provinceCode]/districts';

export const RegionHandlers = [getProvinces, getDistricts];
