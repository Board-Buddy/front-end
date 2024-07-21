import LocationRadiusSetting from '@/containers/location/LocationRadiusSetting';
import Map from '@/containers/location/Map';

const page = () => {
  return (
    <div className="flex flex-col">
      <Map />
      <LocationRadiusSetting />
    </div>
  );
};

export default page;
