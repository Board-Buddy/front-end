import { getProvinces } from './provinces';
import { getDistricts } from './provinces/[provinceCode]/districts';

export const regionHandlers = [getProvinces, getDistricts];
