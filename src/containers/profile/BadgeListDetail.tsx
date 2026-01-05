'use client';

import FallbackRender from '@/components/FallbackRender';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { useGetBadgeList } from '@/hooks/useProfile';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import Image from 'next/image';
import EmptyFallback from '@/components/EmptyFallback';

interface Props {
  nickname?: UserInfo['nickname'];
}

const BadgeListDetail = ({ nickname }: Props) => {
  const { userInfo } = useUserInfo();
  const myNickname = userInfo?.nickname || '';

  const { data: badges } = useGetBadgeList(nickname || myNickname);

  return (
    <div className="px-4 py-8">
      <FallbackRender
        render={badges.length === 0}
        component={
          <EmptyFallback
            message={`아직 획득한 뱃지가 없어요🥲\n다른 플레이어들과 함께 보드게임을 즐겨보세요!`}
          />
        }
      >
        <div className={cn('grid grid-cols-3 gap-y-10 place-items-center')}>
          {badges.map(
            (badge) =>
              badge && (
                <div key={badge.badgeYearMonth}>
                  <div className="flex size-24 items-center justify-center rounded-full bg-bgGray">
                    <Image
                      src={badge.badgeImageSignedURL}
                      alt="badge"
                      width={65}
                      height={65}
                      className="bg-transparent"
                      unoptimized
                    />
                  </div>
                  <div className="mt-2 text-center text-sm font-bold text-gray-600">
                    {badge.badgeYearMonth}
                  </div>
                </div>
              ),
          )}
        </div>
      </FallbackRender>
    </div>
  );
};

export default BadgeListDetail;
