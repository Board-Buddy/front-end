'use client';

import { Suspense, useState } from 'react';
import ProvinceSelector from './ProvinceSelector';
import DistrictSelector from './DistrictSelector';
import { Province } from '@/types/location';
import Loading from '@/components/Loading';
import { useProvinceSelector } from '@/store/articleParamsStore';

export const NATION_WIDE = { code: 'ALL', name: '전체' };

const LocationFilter = () => {
  const province = useProvinceSelector();

  const [selectedProvince, setSelectedProvince] = useState<Province>(
    province ?? NATION_WIDE,
  );

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
