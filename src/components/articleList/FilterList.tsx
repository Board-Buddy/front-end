import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArticleListProps } from '../../components/articleList/ArticleList';

const FilterList = ({
  status,
  sort,
  setStatus,
  setSort,
}: Omit<ArticleListProps, 'emptyGuideMessage'>) => {
  return (
    <div className="mb-3 flex gap-1">
      <div className="flex items-center space-x-2">
        <Switch
          id="article-status-switch"
          checked={status === 'open' ? true : false}
          onCheckedChange={(checked) => setStatus(checked ? 'open' : null)}
        />
        <Label htmlFor="article-status-switch">모집중만 보기</Label>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-auto flex items-center bg-white p-0">
            <p className="text-sm font-medium">
              {sort === null ? '최신순' : '임박순'}
            </p>
            <ChevronDown className="ml-1 size-3 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-24 bg-white" align="end">
          <DropdownMenuRadioGroup
            value={sort ?? 'null'}
            onValueChange={(value) => setSort(value === 'null' ? null : value)}
          >
            <DropdownMenuRadioItem value="null">최신순</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="soon">임박순</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterList;
