import AppLink from '@/components/AppLink';
import CustomAvatar from '@/components/CustomAvatar';
import { Author } from '@/types/article';
import { ChevronRight } from 'lucide-react';

const Profile = ({ author }: { author: Author }) => {
  return (
    <div className="flex items-center border-b border-gray-200 p-4">
      <CustomAvatar
        src={author.profileImageSignedURL || null}
        rank={author.rank}
        nickname={author.nickname}
        avatarSize="md"
      />
      <div className="ml-3">
        <span className="text-lg font-bold">{author.nickname}</span>
        <p className="text-sm text-gray-600">{author.description}</p>
      </div>
      <div className="ml-auto">
        <AppLink
          href={`/profile/${author.nickname}`}
          headerTitle={`${author.nickname} 님의 프로필`}
        >
          <ChevronRight className="size-5 text-gray-700" />
        </AppLink>
      </div>
    </div>
  );
};

export default Profile;
