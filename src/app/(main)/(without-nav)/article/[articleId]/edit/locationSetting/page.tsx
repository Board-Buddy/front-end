import GeoLocation from '@/components/GeoLocation';

const page = ({ params }: { params: { articleId: string } }) => {
  return <GeoLocation redirectionURL={`/article/${params.articleId}/edit`} />;
};

export default page;
