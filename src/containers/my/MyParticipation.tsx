import AppLink from '@/components/AppLink';
import { Button } from '@/components/ui/button';
import { MessageSquareMoreIcon } from 'lucide-react';
import Image from 'next/image';
import SmallLogoOrange from '@images/logo/boardbuddy_small_logo_orange.png';

interface Props {
  joinCount: number;
  nickname?: string;
}

const MyParticipation = ({ joinCount, nickname }: Props) => {
  return (
    <div className="my-8 w-full rounded-2xl bg-[#f9ecd1] px-5 py-4">
      <div className="flex items-center">
        <div className="text-gray-600">
          <p className="text-sm">참여 횟수</p>
          <p className="text-xl font-bold">{joinCount}번</p>
        </div>
        <Image
          src={SmallLogoOrange}
          alt="보드버디 로고"
          width={50}
          height={50}
          className="ml-auto p-2 opacity-70"
        />
      </div>
      {!nickname && (
        <div className="mt-2 flex gap-4 text-gray-700">
          <AppLink
            href="my/activity"
            className="w-full"
            headerTitle="나의 활동"
          >
            <Button className="w-full bg-white text-base font-bold">
              <MessageSquareMoreIcon color="var(--main-color)" />
              <p className="ml-1">나의 활동</p>
            </Button>
          </AppLink>
        </div>
      )}
    </div>
  );
};

export default MyParticipation;
