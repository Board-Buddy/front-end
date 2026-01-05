import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import BadgeListDetail from '@/containers/profile/BadgeListDetail';

// NOTE: 서버 측에서 닉네임에 접근할 수 없으므로 prefetch 불가
const page = () => {
  return (
    <QueryFallbackBoundary>
      <BadgeListDetail />
    </QueryFallbackBoundary>
  );
};

export default page;
