import LocationFilterContainer from '@/containers/home/LocationFilterContainer';

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <div className="flex flex-col">
      <LocationFilterContainer />
    </div>
  );
};

export default page;
