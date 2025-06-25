'use client';

import {
  useArticleFilterStore,
  useProvinceSelector,
} from '@/store/articleFilterStore';
import LocationFilter from '../location/LocationFilter';

const LocationFilterContainer = () => {
  const province = useProvinceSelector();
  const setSido = useArticleFilterStore((state) => state.setSido);
  const setSgg = useArticleFilterStore((state) => state.setSgg);
  const setProvince = useArticleFilterStore((state) => state.setProvince);

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
