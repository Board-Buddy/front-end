import LocationRadiusSetting from '@/containers/location/LocationRadiusSetting';
import Map from '@/containers/location/Map';

const page = () => {
  return (
    <div className="flex flex-col min-h-full">
      <Map />
      <LocationRadiusSetting />
    </div>
  );
};

export default page;
