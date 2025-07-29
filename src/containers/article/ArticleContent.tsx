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
import { ARTICLE_STATUS } from '@/constants/article';
import { useDeleteArticle } from '@/hooks/useArticle';
import CustomAlert from '@/components/CustomAlert';
import { useState } from 'react';
import Map from './Map';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { saveStateToApp, STATE_KEYS } from '@/utils/appState';

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
  const router = useAppRouter();

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

    saveStateToApp(STATE_KEYS.ARTICLE_WRITE_FORM, {
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

    router.push({ href: `/article/${id}/edit`, headerTitle: '모집글 수정' });
  };

  return (
    <>
      <div className="p-4">
        <div className="flex gap-2 text-lg font-bold">
          <span
            className={cn(
              status === 'open' ? 'text-primary' : 'text-gray-500',
              'flex-none',
            )}
          >
            {ARTICLE_STATUS[status]}
          </span>
          <span className="line-clamp-1 text-gray-800">{title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                isAuthor ? 'visible' : 'hidden',
                'ml-auto cursor-pointer',
              )}
            >
              <EllipsisVerticalIcon />
              <DropdownMenuContent className="-ml-8 mt-1 w-16 bg-white">
                <DropdownMenuItem
                  className="transition-all hover:bg-slate-50"
                  onClick={handleEditButtonClick}
                >
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="transition-all hover:bg-slate-50"
                  onClick={() => setOpen(true)}
                >
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className="mt-2 py-4 text-base text-gray-800">{description}</div>
        <div className="text-sm">
          <div className="mr-auto py-3 text-gray-500">
            {formatRelativeTime(createdAt)}
          </div>
          <div>
            <div className="flex items-center text-gray-600">
              <Image
                src="/images/icon/participants_icon.png"
                alt="participants"
                width={12}
                height={12}
                className="mr-1"
              />
              {currentParticipants}/{maxParticipants}명 참여
            </div>
            <div className="flex items-center text-gray-700">
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
          <span className="text-lg font-bold text-gray-700">위치</span>
          <div className="my-2 flex items-center text-sm text-secondary">
            <Image
              src="/images/icon/map_icon.png"
              alt="map"
              width={12}
              height={12}
              className="mr-1"
            />
            {meetingLocation}
          </div>
          <div className="pointer-events-none">
            <Map lat={y!} lng={x!} />
          </div>
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
