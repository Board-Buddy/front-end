import { Badge } from '@/types/profile';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  badges: Badge[];
  nickname?: UserInfo['nickname'];
}

const BadgeList = ({ badges, nickname }: Props) => {
  return (
    <div className="pt-6 pb-4">
      <div className="flex justify-between items-center font-bold mb-4 text-xl text-gray-600">
        <div className="flex gap-2">뱃지목록</div>
        <Link href={nickname ? `${nickname}/badges` : '/my/badges'}>
          <div
            className={cn(
              'flex items-center text-sm text-white font-bold bg-gray-400 rounded-xl pl-2 py-0.5',
              badges.length === 0 ? 'hidden' : 'visible',
            )}
          >
            <p className="text-xs">전체목록</p>
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>
      <div
        className={cn(
          'flex justify-center items-center space-x-10',
          badges.length === 0 ? 'pb-4' : 'p-4',
        )}
      >
        {badges.length === 0 && (
          <div className="text-sm text-gray-600">획득한 뱃지가 없습니다.</div>
        )}
        {badges.map(
          (badge) =>
            badge && (
              <div key={badge.badgeYearMonth}>
                <div className="bg-bgGray rounded-full size-24 flex justify-center items-center">
                  <Image
                    src={
                      badge.badgeImageS3SavedURL ||
                      '/images/default_profile.png'
                    }
                    alt="badge image"
                    width={65}
                    height={65}
                    className="bg-transparent"
                  />
                </div>
                <div className="mt-2 text-sm text-center font-bold text-gray-600">
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
