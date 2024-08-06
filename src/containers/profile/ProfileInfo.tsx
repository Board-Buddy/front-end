import CustomAvatar from '@/components/CustomAvatar';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  nickname?: string;
  description: string;
  rank: number | null;
  profileImageS3SavedURL?: string | null;
}

const ProfileInfo = ({
  nickname,
  description,
  rank,
  profileImageS3SavedURL,
}: Props) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname: myNickname } = userInfo;

  return (
    <div className="flex items-center">
      <div className="px-2 py-4">
        <CustomAvatar
          src={profileImageS3SavedURL || null}
          rank={rank}
          nickname={nickname || myNickname}
          avatarSize="md"
        />
      </div>
      <div className="ml-3 items-center">
        <span className="text-lg font-bold">{nickname || myNickname}</span>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-auto self-start cursor-pointer">
        <Link href="/my/edit">
          <div
            className={cn(
              'flex items-center text-sm text-gray-700 font-bold',
              nickname ? 'hidden' : 'visible',
            )}
          >
            <p>수정하기</p>
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
