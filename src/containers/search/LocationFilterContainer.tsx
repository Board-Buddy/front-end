'use client';

import {
  useProvinceSelector,
  useSearchFilterStore,
} from '@/store/searchFilterStore';
import LocationFilter from '../location/LocationFilter';

const LocationFilterContainer = () => {
  const province = useProvinceSelector();
  const setSido = useSearchFilterStore((state) => state.setSido);
  const setSgg = useSearchFilterStore((state) => state.setSgg);
  const setProvince = useSearchFilterStore((state) => state.setProvince);

  return (
    <LocationFilter
      province={province}
      setSido={setSido}
      setSgg={setSgg}
      setProvince={setProvince}
    />
  );
};

export default LocationFilterContainer;
