'use client';

import FilterList from './FilterList';
import LocationSettingButton from './LocationSettingButton';
import { ArticleListProps } from './ArticleList';
import { usePathname } from 'next/navigation';

const Selectors = ({
  sido,
  sgg,
  status,
  sort,
  setStatus,
  setSort,
}: Omit<ArticleListProps, 'emptyGuideMessage'>) => {
  const pathname = usePathname();

  return (
    <>
      {pathname === '/home' && (
        <LocationSettingButton
          sido={sido}
          sgg={sgg}
          route="/setting/location"
        />
      )}
      {pathname === '/search' && (
        <LocationSettingButton sido={sido} sgg={sgg} route="/search/location" />
      )}
      <FilterList
        status={status}
        sort={sort}
        setStatus={setStatus}
        setSort={setSort}
      />
    </>
  );
};

export default Selectors;
