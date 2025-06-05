'use client';

import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { useSetLocation, useSetRadius } from '@/hooks/useLocation';
import LocationSettingComboBox from '@/components/LocationSettingComboBox';
import { MyNeighborhoods } from '@/types/location';

interface Props {
  radius: MyNeighborhoods['radius'];
}

const LocationRadiusSetting = ({ radius }: Props) => {
  const radiusOptions = [2, 5, 7, 10];
  const [value, setValue] = useState(radiusOptions.indexOf(radius));

  const locationMutation = useSetLocation();
  const radiusMutation = useSetRadius();

  const onLocationSelect = (sido: string, sgg: string, emd: string) => {
    locationMutation.mutate({
      sido,
      sgg,
      emd,
    });
  };

  return (
    <div className="bg-white rounded-t-2xl shadow-[0_-2px_10px_0_rgba(48,48,48,0.1)]">
      <div className="flex flex-col p-4 gap-4">
        <span className="font-semibold">내 동네 설정</span>
        <LocationSettingComboBox
          popOverWidth={416}
          onSelect={onLocationSelect}
        />
        <Slider
          value={[value]}
          onValueChange={([val]) => {
            setValue(val);
            const radiusType = [2, 5, 7, 10] as const;
            radiusMutation.mutate({ radius: radiusType[val] });
          }}
          min={0}
          max={3}
          step={1}
        />
        <div className="flex justify-between text-sm text-gray-800">
          <div>가까운 동네</div>
          <div>먼 동네</div>
        </div>
      </div>
    </div>
  );
};

export default LocationRadiusSetting;
