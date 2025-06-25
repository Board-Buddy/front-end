'use client';

import { Suspense, useState } from 'react';
import ProvinceSelector from './ProvinceSelector';
import DistrictSelector from './DistrictSelector';
import { Province } from '@/types/location';
import Loading from '@/components/Loading';

export const NATION_WIDE = { code: 'ALL', name: '전체' };

interface Props {
  province: Province | null;
  setSido: (sido: string | null) => void;
  setSgg: (sgg: string | null) => void;
  setProvince: (province: Province | null) => void;
}

const LocationFilter = ({ province, setSido, setSgg, setProvince }: Props) => {
  const [selectedProvince, setSelectedProvince] = useState<Province>(
    province ?? NATION_WIDE,
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex items-start">
        <ProvinceSelector
          selectedProvince={selectedProvince}
          onSelectProvince={setSelectedProvince}
          setSido={setSido}
          setSgg={setSgg}
          setProvince={setProvince}
        />
        <Suspense fallback={null}>
          <DistrictSelector
            province={selectedProvince}
            setSido={setSido}
            setSgg={setSgg}
            setProvince={setProvince}
          />
        </Suspense>
      </div>
    </Suspense>
  );
};

export default LocationFilter;
