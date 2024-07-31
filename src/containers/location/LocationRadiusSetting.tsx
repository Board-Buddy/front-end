'use client';

import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { useSetLocation, useSetRadius } from '@/hooks/useLocation';
import LocationSettingComboBox from '@/components/LocationSettingComboBox';

const LocationRadiusSetting = () => {
  const [value, setValue] = useState(0);

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
          defaultValue={[0]}
          value={[value]}
          onValueChange={([val]) => {
            setValue(val);
            const radiusOptions = [2, 5, 7, 10] as const;
            radiusMutation.mutate({ radius: radiusOptions[val] });
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
