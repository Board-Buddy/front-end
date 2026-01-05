import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyArticle from './MyArticle';
import MyJoinedArticle from './MyJoinedArticle';
import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';

const MyActivity = () => {
  return (
    <Tabs defaultValue="myArticle" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-2">
        <TabsTrigger value="myArticle">내가 작성한 모집글</TabsTrigger>
        <TabsTrigger value="joinedArticle">참가한 모집글</TabsTrigger>
      </TabsList>
      <TabsContent value="myArticle">
        <QueryFallbackBoundary>
          <MyArticle />
        </QueryFallbackBoundary>
      </TabsContent>
      <TabsContent value="joinedArticle">
        <QueryFallbackBoundary>
          <MyJoinedArticle />
        </QueryFallbackBoundary>
      </TabsContent>
    </Tabs>
  );
};

export default MyActivity;
