import CustomAvatar from '@/components/CustomAvatar';
import { Author } from '@/types/article';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Profile = ({ author }: { author: Author }) => {
  return (
    <Link href={`/profile/${author.nickname}`}>
      <div className="flex items-center border-b-[1px] border-gray-200 p-4">
        <CustomAvatar
          src={author.profileURL || ''}
          rank={author.rank}
          nickname={author.nickname}
          avatarSize={16}
          badgeSize={22}
        />
        <div className="ml-3">
          <span className="text-lg font-bold">{author.nickname}</span>
          <p className="text-sm text-gray-600">{author.description}</p>
        </div>
        <ChevronRight className="ml-auto w-5 h-5 text-gray-700" />
      </div>
    </Link>
  );
};

export default Profile;
