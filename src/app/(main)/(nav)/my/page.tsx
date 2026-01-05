import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import Profile from '@/containers/profile/Profile';
import ProfileContainer from '@/containers/profile/ProfileContainer';

// NOTE: 서버 측에서 닉네임에 접근할 수 없으므로 prefetch 불가
const page = () => {
  return (
    <ProfileContainer>
      <QueryFallbackBoundary>
        <Profile />
      </QueryFallbackBoundary>
    </ProfileContainer>
  );
};

export default page;
