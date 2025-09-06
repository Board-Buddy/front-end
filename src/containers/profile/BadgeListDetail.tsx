'use client';

import ErrorFallback from '@/components/ErrorFallback';
import FallbackRender from '@/components/FallbackRender';
import Loading from '@/components/Loading';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { useGetBadgeList } from '@/hooks/useProfile';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import Image from 'next/image';
import EmptyFallback from '@/components/EmptyFallback';
import useAppRouter from '@/hooks/custom/useAppRouter';
import DefaultProfile from '@images/default_profile.png';

interface Props {
  nickname?: UserInfo['nickname'];
}

const BadgeListDetail = ({ nickname }: Props) => {
  const router = useAppRouter();

  const { userInfo } = useUserInfo();
  const myNickname = userInfo?.nickname || '';

  const {
    data: badges,
    isPending,
    isError,
    error,
    refetch,
  } = useGetBadgeList(nickname || myNickname);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    if (error.response?.status === 401) {
      router.push({ href: '/login/guide' });
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

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
      </FallbackRender>
    </div>
  );
};

export default BadgeListDetail;
