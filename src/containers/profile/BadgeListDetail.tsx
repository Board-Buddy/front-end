'use client';

import { cn } from '@/utils/tailwind';
import Image from 'next/image';

const BadgeListDetail = () => {
  const badges = [
    {
      badgeImageS3SavedURL: '',
    },
    {
      badgeImageS3SavedURL: '',
    },
    {
      badgeImageS3SavedURL: '',
    },
    {
      badgeImageS3SavedURL: '',
    },
    {
      badgeImageS3SavedURL: '',
    },
  ];

  return (
    <div className="px-4 py-8">
      <div className={cn('grid grid-cols-3 gap-y-10 place-items-center')}>
        {badges.length === 0 && (
          <div className="text-sm text-gray-600">획득한 뱃지가 없습니다.</div>
        )}
        {badges.map(
          (badge, i) =>
            badge && (
              <Image
                src={
                  badge.badgeImageS3SavedURL || '/images/default_profile.png'
                }
                alt="badge image"
                width={65}
                height={65}
                key={i}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default BadgeListDetail;
