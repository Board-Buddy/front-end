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
import { formatDate, getYesterday, oneMonthLater } from '@/utils/date';
import { cn } from '@/utils/tailwind';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const ArticleWriteForm = () => {
  const [showTimeErrorMessage, setShowTimeErrorMessage] = useState(false);

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: '제목을 입력해주세요.' })
      .max(50, { message: '제목은 50자 이하로 입력 가능합니다.' }),
    date: z.date({ required_error: '날짜를 선택해주세요.' }),
    startHour: z.coerce.number().min(0).max(24),
    endHour: z.coerce.number().min(0).max(24),
    startMinute: z.coerce.number().min(0).max(59),
    endMinute: z.coerce.number().min(0).max(59),
    personnel: z.coerce
      .number({ message: '인원을 선택해주세요.' })
      .min(2)
      .max(10),
    location: z.string({ required_error: '위치를 선택해주세요.' }),
    content: z.string().min(1, { message: '내용을 입력해주세요.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: undefined,
      personnel: undefined,
      startHour: undefined,
      endHour: undefined,
      startMinute: undefined,
      endMinute: undefined,
      content: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const startHourValue = values.startHour;
    const endHourValue = values.endHour;
    const startMinuteValue = values.startMinute;
    const endMinuteValue = values.endMinute;

    if (
      startHourValue > endHourValue ||
      (startHourValue === endHourValue && startMinuteValue > endMinuteValue)
    ) {
      setShowTimeErrorMessage(true);
      return;
    } else {
      setShowTimeErrorMessage(false);
      // TODO: Article create API call
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
                        variant={'outline'}
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
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-20">
                        <SelectValue
                          className="placeholder:text-muted"
                          placeholder="시"
                        />
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
                  <Select onValueChange={field.onChange}>
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
                  <Select onValueChange={field.onChange}>
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
                  <Select onValueChange={field.onChange}>
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
          name="location"
          render={({ field }) => (
            <FormItem
              className={cn(!form.getFieldState('location').invalid && 'pb-4')}
            >
              <FormLabel className="font-semibold">모임 위치</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl className="mt-2">
                  <SelectTrigger>
                    <SelectValue placeholder="모임 위치 선택" />
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
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personnel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">모집 인원</FormLabel>
              <Select onValueChange={field.onChange}>
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
          name="content"
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
