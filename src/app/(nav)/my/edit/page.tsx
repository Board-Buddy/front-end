import MyProfileEditForm from '@/containers/my/MyProfileEditForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = () => {
  return <MyProfileEditForm />;
};

export default page;
