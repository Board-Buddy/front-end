import LocationRadiusSetting from '@/containers/location/LocationRadiusSetting';
import Map from '@/containers/location/Map';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = () => {
  return (
    <div className="flex flex-col">
      <Map />
      <LocationRadiusSetting />
    </div>
  );
};

export default page;
