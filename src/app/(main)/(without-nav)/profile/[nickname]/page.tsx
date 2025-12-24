import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import Profile from '@/containers/profile/Profile';
import ProfileContainer from '@/containers/profile/ProfileContainer';
import { getProfileOptions } from '@/hooks/useProfile';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Page = async ({ params }: PageProps<'/profile/[nickname]'>) => {
  const { nickname } = await params;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getProfileOptions(nickname));

  const dehydratedState = dehydrate(queryClient);

  return (
    <ProfileContainer>
      <HydrationBoundary state={dehydratedState}>
        <QueryFallbackBoundary>
          <Profile nickname={nickname} />
        </QueryFallbackBoundary>
      </HydrationBoundary>
    </ProfileContainer>
  );
};

export default Page;
