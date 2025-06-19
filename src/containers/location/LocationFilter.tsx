'use client';

import { Suspense, useState } from 'react';
import ProvinceSelector from './ProvinceSelector';
import DistrictSelector from './DistrictSelector';
import { District, Province } from '@/types/location';
import Loading from '@/components/Loading';

export const NATION_WIDE = { code: 'ALL', name: '전체' };

const LocationFilter = () => {
  const [selectedProvince, setSelectedProvince] =
    useState<Province>(NATION_WIDE);
  const [selectedDistrict, setSelectedDistrict] = useState<District>();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex items-start">
        <ProvinceSelector
          selectedProvince={selectedProvince}
          onSelectProvince={setSelectedProvince}
        />
        <Suspense fallback={null}>
          <DistrictSelector province={selectedProvince} />
        </Suspense>
      </div>
    </Suspense>
  );
};

export default LocationFilter;
