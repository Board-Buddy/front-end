import { SearchParams } from '@/types/article';
import { cn } from '@/utils/tailwind';
import { Dispatch, SetStateAction } from 'react';

const FilterList = ({
  filter,
  setFilter,
}: {
  filter: Omit<SearchParams, 'location'>;
  setFilter: Dispatch<SetStateAction<Omit<SearchParams, 'location'>>>;
}) => {
  const { status, sort } = filter;

  const all = status !== 'open';
  const open = status === 'open';
  const soon = sort === 'soon';

  const filterList = [
    {
      title: '전체보기',
      status: all,
      onClick: () => setFilter({ ...filter, status: null }),
    },
    {
      title: '모집중',
      status: open,
      onClick: () => setFilter({ ...filter, status: 'open' }),
    },
    {
      title: '임박순',
      status: soon,
      onClick: () => {
        if (soon) {
          setFilter({ ...filter, sort: null });
        } else setFilter({ ...filter, sort: 'soon' });
      },
    },
  ];

  return (
    <div className="flex gap-1 mb-3">
      {filterList.map((item) => (
        <button
          type="button"
          className={cn(
            'border border-gray-400 font-semibold text-gray-400 rounded-3xl py-1 px-4 text-sm hover:text-white hover:bg-primary hover:border-primary transition-all',
            item.status && 'text-white bg-primary border-primary',
          )}
          onClick={item.onClick}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default FilterList;
