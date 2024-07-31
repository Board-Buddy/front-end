'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  formatDate,
  formatDateTime,
  getYesterday,
  oneMonthLater,
} from '@/utils/date';
import { cn } from '@/utils/tailwind';
import { useEffect, useState } from 'react';
import { formSchema, useWriteFormContext } from '@/context/WriteFormContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useAddArticle } from '@/hooks/useArticle';

const ArticleWriteForm = () => {
  const router = useRouter();

  const { formState, setFormState } = useWriteFormContext();
  const [showTimeErrorMessage, setShowTimeErrorMessage] = useState(false);

  const mutation = useAddArticle();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formState,
  });

  useEffect(() => {
    form.reset(formState);
  }, [formState, form]);

  const handleLocationSettingButton = () => {
    setFormState(form.getValues());

    // 위치 선택 페이지로 이동
    router.push('/write/locationSetting');
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const startHourValue = values.startHour;
    const endHourValue = values.endHour;
    const startMinuteValue = values.startMinute;
    const endMinuteValue = values.endMinute;

    if (
      startHourValue > endHourValue ||
      (startHourValue === endHourValue && startMinuteValue >= endMinuteValue)
    ) {
      setShowTimeErrorMessage(true);
    } else {
      setShowTimeErrorMessage(false);

      mutation.mutate({
        title: values.title,
        description: values.description,
        startDateTime: formatDateTime(
          values.date,
          values.startHour,
          values.startMinute,
        ),
        endDateTime: formatDateTime(
          values.date,
          values.endHour,
          values.endMinute,
        ),
        maxParticipants: parseInt(values.maxParticipants, 10),
        meetingLocation: values.meetingLocation,
        sido: values.sido,
        sgg: values.sgg,
        emd: values.emd,
        x: values.x,
        y: values.y,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">제목</FormLabel>
              <FormControl className="mt-2">
                <Input placeholder="제목" {...field} maxLength={50} />
              </FormControl>
              <div className="flex">
                <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
                <FormDescription className="text-right pt-1 ml-auto text-gray-500">
                  {field.value.length > 50 ? 50 : field.value.length}/50
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold pb-1">모임 날짜</FormLabel>
              <FormControl className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="mt-2">
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted',
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>모임 날짜 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < getYesterday() || date > oneMonthLater()
                      }
                      initialFocus
                      className="bg-white rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <div className="flex">
                <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
                <FormDescription className="text-right ml-auto pt-1 text-gray-500">
                  한 달 뒤까지만 선택 가능합니다.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="mt-4">
          <FormLabel className="font-semibold">
            모임 시작/종료 예상 시간
          </FormLabel>
          <div className="flex items-center justify-between !mt-2">
            <FormField
              control={form.control}
              name="startHour"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="시" />
                        <SelectContent className="bg-white h-[150px]">
                          {[...Array(24)].map((_, index) => (
                            <SelectItem
                              key={index}
                              value={(index + 1).toString()}
                            >
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
                </FormItem>
              )}
            />
            <p>:</p>
            <FormField
              control={form.control}
              name="startMinute"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-20">
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="분" />
                        <SelectContent className="bg-white h-[150px]">
                          {[...Array(12)].map((_, index) => (
                            <SelectItem
                              key={index}
                              value={(index * 5).toString()}
                            >
                              {index * 5}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
                </FormItem>
              )}
            />
            <p>~</p>
            <FormField
              control={form.control}
              name="endHour"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-20">
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="시" />
                        <SelectContent className="bg-white h-[150px]">
                          {[...Array(24)].map((_, index) => (
                            <SelectItem
                              key={index}
                              value={(index + 1).toString()}
                            >
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
                </FormItem>
              )}
            />
            <p>:</p>
            <FormField
              control={form.control}
              name="endMinute"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-20">
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="분" />
                        <SelectContent className="bg-white h-[150px]">
                          {[...Array(12)].map((_, index) => (
                            <SelectItem
                              key={index}
                              value={(index * 5).toString()}
                            >
                              {index * 5}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <FormMessage
              className={cn(
                'font-sm text-red-600 ml-1 mt-1',
                showTimeErrorMessage ? 'opacity-100' : 'opacity-0',
              )}
            >
              시간을 올바르게 입력해주세요.
            </FormMessage>
          </div>
        </div>
        <FormField
          control={form.control}
          name="meetingLocation"
          render={({ field }) => (
            <FormItem
              className={cn(
                !form.getFieldState('meetingLocation').invalid && 'pb-4',
              )}
            >
              <FormLabel className="font-semibold">모임 위치</FormLabel>
              <FormControl className="mt-2">
                <Button
                  type="button"
                  className="mt-2 block w-full bg-transparent text-left border border-slate-40 font-normal px-3"
                  onClick={handleLocationSettingButton}
                >
                  {field.value || '위치 선택'}
                </Button>
              </FormControl>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">모집 인원</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="모집 인원 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white w-20 h-[150px]">
                  {[...Array(9)].map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {index + 2}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex">
                <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
                <FormDescription className="text-right pt-1 ml-auto text-gray-500">
                  최소 2명에서 최대 10명까지 선택 가능합니다.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">내용</FormLabel>
              <FormControl className="w-full h-40 resize-none mt-2">
                <Textarea {...field} placeholder="모집글 내용을 입력하세요." />
              </FormControl>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn('bg-primary text-white font-bold text-lg w-full h-12')}
        >
          글쓰기
        </Button>
      </form>
    </Form>
  );
};

export default ArticleWriteForm;
