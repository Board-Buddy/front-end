import Image from 'next/image';
import SundyMap from '@images/sundy/sundy_map.png';

const NationwideFallback = () => {
  return (
    <div className="flex flex-col items-center pt-12 text-sm text-gray-700">
      <Image src={SundyMap} alt="map_sundy" width={36} height={56} />
      <div className="pt-4 text-center text-sm text-gray-700">
        시/도를 선택하면 <br /> 시/군/구까지 세부 선택이 가능해요
      </div>
    </div>
  );
};

export default NationwideFallback;
