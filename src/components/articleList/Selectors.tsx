'use client';

import FilterList from './FilterList';
import LocationSettingButton from './LocationSettingButton';
import { ArticleListProps } from './ArticleList';
import { usePathname } from 'next/navigation';

const Selectors = ({
  sgg,
  status,
  sort,
  setStatus,
  setSort,
  province,
}: Omit<ArticleListProps, 'emptyGuideMessage'>) => {
  const pathname = usePathname();
  const route =
    pathname === '/home'
      ? '/setting/location?from=home'
      : '/search/location?from=search';

  return (
    <>
      <LocationSettingButton province={province} sgg={sgg} route={route} />
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
