'use client';

import { useDebounce } from 'use-debounce';
import {
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Location } from '@/types/location';
import { Check } from 'lucide-react';
import { cn } from '@/utils/tailwind';
import { useSearchLocation } from '@/hooks/useSearchLocation';

interface SearchResultsProps {
  query: string;
  selectedResult?: Location;
  onSelectResult: (location: Location) => void;
}

export function SearchResults({
  query,
  selectedResult,
  onSelectResult,
}: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const { data, isPending, isError, error } = useSearchLocation(
    enabled,
    debouncedSearchQuery,
  );

  const isLoading = enabled && isPending;

  if (!enabled) return null;

  return (
    <CommandList>
      <CommandGroup>
        {isLoading && <div className="p-4 text-sm">검색 중...</div>}
        {isError && (
          <div className="p-4 text-sm">
            {error.message || '오류가 발생하였습니다.'}
          </div>
        )}
        {data?.map(({ sido, sgg, emd, latitude, longitude }) => {
          return (
            <CommandItem
              key={`${sido} ${sgg} ${emd}`}
              onSelect={() =>
                onSelectResult({ sido, sgg, emd, latitude, longitude })
              }
              value={`${sido} ${sgg} ${emd}`}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  selectedResult?.latitude === latitude &&
                    selectedResult?.longitude === longitude
                    ? 'opacity-100'
                    : 'opacity-0',
                )}
              />
              {`${sido} ${sgg} ${emd}`}
            </CommandItem>
          );
        })}
      </CommandGroup>
    </CommandList>
  );
}
