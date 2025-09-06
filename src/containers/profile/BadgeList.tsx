import AppLink from '@/components/AppLink';
import { Badge } from '@/types/profile';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import DefaultProfile from '@images/default_profile.png';

interface Props {
  badges: Badge[];
  nickname?: UserInfo['nickname'];
}

const BadgeList = ({ badges, nickname }: Props) => {
  return (
    <div className="pb-4 pt-6">
      <div className="mb-4 flex items-center justify-between text-xl font-bold text-gray-600">
        <div className="flex gap-2">뱃지목록</div>
        <AppLink
          href={nickname ? `/profile/${nickname}/badges` : '/my/badges'}
          headerTitle={
            nickname ? `${nickname} 님의 뱃지 목록` : '나의 뱃지 목록'
          }
        >
          <div
            className={cn(
              'flex items-center text-sm text-white font-bold bg-gray-400 rounded-xl pl-2 py-0.5',
              badges.length === 0 ? 'hidden' : 'visible',
            )}
          >
            <p className="text-xs">전체목록</p>
            <ChevronRight className="size-4 text-white" />
          </div>
        </AppLink>
      </div>
      <div
        className={cn(
          'flex justify-center items-center space-x-10',
          badges.length === 0 ? 'pb-6' : 'p-4',
        )}
      >
        {badges.length === 0 && (
          <div className="text-sm text-gray-600">획득한 뱃지가 없습니다.</div>
        )}
        {badges.map(
          (badge) =>
            badge && (
              <div key={badge.badgeYearMonth}>
                <div className="flex size-24 items-center justify-center rounded-full bg-bgGray">
                  <Image
                    src={badge.badgeImageSignedURL || DefaultProfile}
                    alt="badge image"
                    width={65}
                    height={65}
                    className="bg-transparent"
                  />
                </div>
                <div className="mt-2 text-center text-sm font-bold text-gray-600">
                  {badge.badgeYearMonth}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default BadgeList;
