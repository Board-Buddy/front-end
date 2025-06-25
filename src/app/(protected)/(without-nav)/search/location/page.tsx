import LocationFilterContainer from '@/containers/search/LocationFilterContainer';

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <div className="flex flex-col">
      <LocationFilterContainer />
    </div>
  );
};

export default page;
