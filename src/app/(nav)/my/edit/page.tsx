import MyProfileEditForm from '@/containers/profile/MyProfileEditForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = () => {
  return <MyProfileEditForm />;
};

export default page;
