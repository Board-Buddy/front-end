'use client';

import { Article } from '@/types/article';
import {
  formatMeetingTime,
  formatRelativeTime,
  getTimeFormParameters,
} from '@/utils/date';
import { cn } from '@/utils/tailwind';
import Image from 'next/image';
import { EllipsisVerticalIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWriteFormContext } from '@/context/WriteFormContext';
import { useRouter } from 'next/navigation';
import { ARTICLE_STATUS } from '@/constants/article';
import { useDeleteArticle } from '@/hooks/useArticle';
import CustomAlert from '@/components/CustomAlert';
import { useState } from 'react';
import Map from './Map';

interface Props extends Omit<Article, 'author'> {
  isAuthor: boolean;
}

const ArticleContent = ({
  id,
  title,
  description,
  meetingLocation,
  sido,
  sgg,
  emd,
  x,
  y,
  maxParticipants,
  currentParticipants,
  startDateTime,
  endDateTime,
  createdAt,
  status,
  isAuthor,
}: Props) => {
  const { setFormState } = useWriteFormContext();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const mutation = useDeleteArticle(id);

  const handleEditButtonClick = () => {
    const { startHour, startMinute, endHour, endMinute } =
      getTimeFormParameters(startDateTime, endDateTime);

    setFormState({
      title,
      description,
      meetingLocation,
      maxParticipants: maxParticipants.toString(),
      startHour,
      startMinute,
      endHour,
      endMinute,
      sido: sido!,
      sgg: sgg!,
      emd: emd!,
      x: x!.toString(),
      y: y!.toString(),
      date: new Date(startDateTime),
    });

    router.push(`/article/${id}/edit`);
  };

  return (
    <>
      <div className="p-4">
        <div className="text-lg flex gap-2 font-bold ">
          <span
            className={cn(status === 'open' ? 'text-primary' : 'text-gray-500')}
          >
            {ARTICLE_STATUS[status]}
          </span>
          <span className="text-gray-800 ">{title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                isAuthor ? 'visible' : 'hidden',
                'ml-auto cursor-pointer',
              )}
            >
              <EllipsisVerticalIcon />
              <DropdownMenuContent className="bg-white mt-1 -ml-8 w-16">
                <DropdownMenuItem
                  className="hover:bg-slate-50 transition-all"
                  onClick={handleEditButtonClick}
                >
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-slate-50 transition-all"
                  onClick={() => setOpen(true)}
                >
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className="text-md mt-2 text-gray-800 py-4">{description}</div>
        <div className="text-sm">
          <div className="mr-auto text-gray-500 py-3">
            {formatRelativeTime(createdAt)}
          </div>
          <div>
            <div className="text-gray-600 flex items-center">
              <Image
                src="/images/icon/participants_icon.png"
                alt="participants"
                width={12}
                height={12}
                className="mr-1"
              />
              {currentParticipants}/{maxParticipants}명 참여
            </div>
            <div className="text-gray-700 flex items-center">
              <Image
                src="/images/icon/clock_icon.png"
                alt="clock"
                width={12}
                height={12}
                className="mr-1"
              />
              {formatMeetingTime(startDateTime, endDateTime)}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <span className="text-gray-700 text-lg font-bold">위치</span>
          <div className="text-secondary flex items-center text-sm mt-2 mb-2">
            <Image
              src="/images/icon/map_icon.png"
              alt="map"
              width={12}
              height={12}
              className="mr-1"
            />
            {meetingLocation}
          </div>
          <Map lat={y!} lng={x!} />
        </div>
      </div>
      <CustomAlert
        open={open}
        setOpen={setOpen}
        title="정말 삭제하시겠습니까?"
        description="삭제하시면 복구할 수 없습니다."
        cancelText="아니요"
        confirmText="네"
        onConfirm={() => mutation.mutate()}
      />
    </>
  );
};

export default ArticleContent;
