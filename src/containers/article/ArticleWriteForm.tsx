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
  isValidTimeRange,
  oneMonthLater,
} from '@/utils/date';
import { cn } from '@/utils/tailwind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formSchema, useWriteFormContext } from '@/context/WriteFormContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAddArticle } from '@/hooks/useArticle';
import useAppRouter from '@/hooks/custom/useAppRouter';
import useRestoreAppState from '@/hooks/custom/useRestoreAppState';
import { saveStateToApp, STATE_KEYS } from '@/utils/webview';

const ArticleWriteForm = () => {
  const router = useAppRouter();

  const { formState, setFormState } = useWriteFormContext();
  const [timeErrorMessage, setTimeErrorMessage] = useState<string | null>(null);

  const didRestoreRef = useRef(false);

  const mutation = useAddArticle();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formState,
  });

  const onRestore = useCallback(
    (state: z.infer<typeof formSchema> | null) => {
      if (state) {
        form.reset({ ...state, date: new Date(state.date) });
        didRestoreRef.current = true;
      }
    },
    [form],
  );

  useRestoreAppState<z.infer<typeof formSchema> | null>(
    STATE_KEYS.ARTICLE_WRITE_FORM,
    onRestore,
  );

  useEffect(() => {
    if (!didRestoreRef.current) {
      form.reset(formState);
    }
  }, [formState, form]);

  useEffect(() => {
    return () => {
      saveStateToApp(STATE_KEYS.ARTICLE_WRITE_FORM, null);
    };
  }, []);

  const handleLocationSettingButton = () => {
    setFormState(form.getValues());

    saveStateToApp(STATE_KEYS.ARTICLE_WRITE_FORM, form.getValues());

    // 위치 선택 페이지로 이동
    router.push({
      href: '/write/locationSetting',
      headerTitle: '보드게임 카페 선택 ',
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const isTimeError = isValidTimeRange(
      values.date,
      values.startHour,
      values.startMinute,
      values.endHour,
      values.endMinute,
    );

    setTimeErrorMessage(isTimeError);

    if (isTimeError === null) {
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
        sido: values.sido!,
        sgg: values.sgg!,
        emd: values.emd!,
        x: values.x!,
        y: values.y!,
      });

      saveStateToApp(STATE_KEYS.ARTICLE_WRITE_FORM, null);
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
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
                <FormDescription className="ml-auto pt-1 text-right text-gray-500">
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
              <FormLabel className="pb-1 font-semibold">모임 날짜</FormLabel>
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
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
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
                      className="rounded-md bg-white"
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <div className="flex">
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
                <FormDescription className="ml-auto pt-1 text-right text-gray-500">
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
          <div className="!mt-2 mb-4 flex items-center justify-between">
            <FormField
              control={form.control}
              name="startHour"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="시" />
                        <SelectContent className="h-[150px] bg-white">
                          {Array.from({ length: 24 }, (_, i) => i + 1).map(
                            (num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ),
                          )}
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
                        <SelectContent className="h-[150px] bg-white">
                          {Array.from({ length: 12 }, (_, i) => i).map(
                            (num) => (
                              <SelectItem
                                key={num}
                                value={(num * 5).toString()}
                              >
                                {(num * 5).toString().padStart(2, '0')}
                              </SelectItem>
                            ),
                          )}
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
                        <SelectContent className="h-[150px] bg-white">
                          {Array.from({ length: 24 }, (_, i) => i + 1).map(
                            (num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ),
                          )}
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
                        <SelectContent className="h-[150px] bg-white">
                          {Array.from({ length: 12 }, (_, i) => i).map(
                            (num) => (
                              <SelectItem
                                key={num}
                                value={(num * 5).toString()}
                              >
                                {(num * 5).toString().padStart(2, '0')}
                              </SelectItem>
                            ),
                          )}
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
                'text-sm text-red-600 ml-1 mt-1',
                timeErrorMessage ? 'opacity-100' : 'opacity-0',
              )}
            >
              {timeErrorMessage}
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
                  className="mt-2 block w-full border border-input bg-transparent px-3 text-left font-normal"
                  onClick={handleLocationSettingButton}
                >
                  {field.value || '위치 선택'}
                </Button>
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
                <SelectContent className="h-[150px] w-20 bg-white">
                  {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex">
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
                <FormDescription className="ml-auto pt-1 text-right text-gray-500">
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
              <FormControl className="mt-2 h-40 w-full resize-none">
                <Textarea {...field} placeholder="모집글 내용을 입력하세요." />
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sido"
          render={({ field }) => (
            <FormItem className="!mt-0">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="x"
                  className="h-0 border-none p-0"
                />
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sgg"
          render={({ field }) => (
            <FormItem className="!mt-0">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="x"
                  className="h-0 border-none p-0"
                />
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emd"
          render={({ field }) => (
            <FormItem className="!mt-0">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="x"
                  className="h-0 border-none p-0"
                />
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="x"
          render={({ field }) => (
            <FormItem className="!mt-0">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="x"
                  className="h-0 border-none p-0"
                />
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="y"
          render={({ field }) => (
            <FormItem className="!mt-0">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="y"
                  className="h-0 border-none p-0"
                />
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
