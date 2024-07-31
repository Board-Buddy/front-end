const sampleImageURL = '/images/default_profile.png';

import CustomAvatar from '@/components/CustomAvatar';
import { ChevronRight } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex items-center p-4">
      <CustomAvatar
        src={sampleImageURL || null}
        rank="1"
        nickname="asdf"
        avatarSize="lg"
      />
      <div className="ml-3 items-center">
        <span className="text-lg font-bold">김보드</span>
        <p className="text-sm text-gray-600">자기소개</p>
      </div>
      <div className="ml-auto flex items-start mb-20">
        <p className="text-sm text-gray-700 font-bold">수정하기</p>
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </div>
    </div>
  );
};

export default Profile;
