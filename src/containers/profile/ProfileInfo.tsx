'use client';

import CustomAvatar from '@/components/CustomAvatar';
import { UserInfo } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

const sampleImageURL = '/images/default_profile.png';

const ProfileInfo = ({
  description,
  rank,
}: {
  description: string;
  rank: number | null;
}) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  return (
    <div className="flex items-center">
      <div className="px-2 py-4">
        <CustomAvatar
          src={sampleImageURL || null}
          rank={rank}
          nickname="asdf"
          avatarSize="md"
        />
      </div>

      <div className="ml-3 items-center">
        <span className="text-lg font-bold">{nickname}</span>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex items-center text-sm text-gray-700 font-bold ml-auto self-start">
        <p>수정하기</p>
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </div>
    </div>
  );
};

export default ProfileInfo;
