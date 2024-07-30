'use client';

import { Command, CommandInput } from '@/components/ui/command';
import { Location } from '@/types/location';
import { useState } from 'react';
import { SearchResults } from './SearchResults';

interface SearchProps {
  selectedResult?: Location;
  onSelectResult: (location: Location) => void;
}

export function Search({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectResult = (location: Location) => {
    onSelectResult(location);
    setSearchQuery('');
  };

  return (
    <Command shouldFilter={false} className="h-auto rounded-lg">
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="읍, 면, 동 검색(ex. 서초동)"
      />
      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}
