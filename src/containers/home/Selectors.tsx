import { Dispatch, SetStateAction } from 'react';
import { SearchParams } from '@/types/article';
import FilterList from './FilterList';
import LocationSettingButton from './LocationSettingButton';

interface Props {
  filter: Omit<SearchParams, 'location'>;
  setFilter: Dispatch<SetStateAction<Omit<SearchParams, 'location'>>>;
}

const Selectors = ({ filter, setFilter }: Props) => {
  return (
    <>
      <LocationSettingButton />
      <FilterList filter={filter} setFilter={setFilter} />
    </>
  );
};

export default Selectors;
