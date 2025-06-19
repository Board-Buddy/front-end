'use client';

import { useState } from 'react';
import ProvinceSelector from './ProvinceSelector';
import DistrictSelector from './DistrictSelector';
import { District, Province } from '@/types/location';

const LocationFilter = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province>({
    code: 'SEOUL',
    name: '서울',
  });
  const [selectedDistrict, setSelectedDistrict] = useState<District>();

  return (
    <div className="flex items-start">
      <ProvinceSelector
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
      />
      <DistrictSelector province={selectedProvince} />
    </div>
  );
};

export default LocationFilter;
