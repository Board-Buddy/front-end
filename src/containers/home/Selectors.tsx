import { Dispatch, SetStateAction } from 'react';
import { SearchParams } from '@/types/article';
import FilterList from './FilterList';
import LocationSettingButton from './LocationSettingButton';

interface Props {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  filter: Omit<SearchParams, 'location'>;
  setFilter: Dispatch<SetStateAction<Omit<SearchParams, 'location'>>>;
}

const Selectors = ({ location, setLocation, filter, setFilter }: Props) => {
  return (
    <>
      <LocationSettingButton location={location} setLocation={setLocation} />
      <FilterList filter={filter} setFilter={setFilter} />
    </>
  );
};

export default Selectors;
