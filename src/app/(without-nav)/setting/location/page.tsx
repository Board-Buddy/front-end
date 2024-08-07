import NeighborhoodsSetting from '@/containers/location/NeighborhoodsSetting';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = () => {
  return (
    <div className="flex flex-col">
      <NeighborhoodsSetting />
    </div>
  );
};

export default page;
