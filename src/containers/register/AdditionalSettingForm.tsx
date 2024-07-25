'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import {
  oauthRegister,
  smsCertificationSend,
  smsCertificationVerify,
} from '@/services/auth';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-react';
import locationList from '@/containers/location/locationList.json';
import { useRouter } from 'next/navigation';
import { useUserLoginCheck } from '@/hooks/useAuth';

const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

const AdditionalSettingForm = () => {
  const router = useRouter();

  const [showPhoneVerifyCodeInput, setShowPhoneVerifyCodeInput] =
    useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);
  const [open, setOpen] = useState(false);
  const [getUserInfo, setGetUserInfo] = useState(false);

  const { isSuccess, error } = useUserLoginCheck({ isReady: getUserInfo });

  const formSchema = z.object({
    location: z.string().min(1, { message: '지역을 선택해주세요.' }),
    phone: z
      .string()
      .min(1, { message: '핸드폰 번호를 입력해주세요.' })
      .regex(phoneRegex, '01012345678 형식에 맞춰 입력해주세요.'),
    phoneVerifyCode: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      phone: '',
      phoneVerifyCode: '',
    },
  });

  const sendPhoneCertificationNumber = async () => {
    const phoneNumberValue = form.getValues('phone');
    const validation = formSchema.shape.phone.safeParse(phoneNumberValue);

    if (!validation.success) {
      form.setError('phone', {
        type: 'manual',
        message: validation.error.errors[0].message,
      });
      return;
    }

    const { status, message } = await smsCertificationSend(
      form.getValues('phone'),
    );

    if (status === 'success') {
      form.clearErrors('phone');
      setShowPhoneVerifyCodeInput(true);
    } else {
      form.setError('phone', { type: 'manual', message });
    }
  };

  const verifyPhone = async () => {
    const { status, message } = await smsCertificationVerify({
      phoneNumber: form.getValues('phone'),
      certificationNumber: form.getValues('phoneVerifyCode'),
    });

    if (status === 'success') {
      form.clearErrors('phoneVerifyCode');
      setVerifiedPhone(true);
    } else {
      form.setError('phoneVerifyCode', { type: 'manual', message });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!showPhoneVerifyCodeInput) {
      form.setError('phone', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다.',
      });
      return;
    }

    if (!verifiedPhone) {
      form.setError('phoneVerifyCode', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다.',
      });
      return;
    }

    const { status, message } = await oauthRegister({
      phoneNumber: values.phone,
      sido: values.location.split(' ')[0],
      sigu: values.location.split(' ')[1],
      dong: values.location.split(' ')[2],
    });

    if (status === 'success') {
      setGetUserInfo(true);
    } else {
      alert(message);
      return;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert('로그인 되었습니다.');
      router.push('/home');
    } else {
      console.log(error);
    }
  }, [isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      role="combobox"
                      aria-expanded={open}
                      className="flex items-center justify-start p-0 bg-transparent border-gray-200 border w-[408px]"
                    >
                      <div className="flex items-center text-md px-3">
                        <span
                          className={cn(
                            !field.value ? 'text-gray-400' : 'text-black',
                          )}
                        >
                          {field.value
                            ? locationList.find(
                                (dong) => dong.label === field.value,
                              )?.value
                            : '동네 선택'}
                        </span>
                        <ChevronDown
                          className={cn(
                            !field.value ? 'text-gray-400' : 'text-black',
                            'ml-1 h-4 w-4 shrink-0',
                          )}
                        />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[408px] p-0 bg-white border-gray-500">
                    <Command>
                      <CommandInput
                        placeholder="동명으로 검색(ex. 서초동)"
                        className="border-gray-500"
                      />
                      <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {locationList.map((dong) => (
                            <CommandItem
                              key={dong.label}
                              value={dong.label}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === dong.label
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {dong.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    placeholder="01012345678"
                    {...field}
                    onChange={(e) => {
                      setShowPhoneVerifyCodeInput(false);
                      field.onChange(e.target.value);
                      form.setValue('phoneVerifyCode', '');
                      setVerifiedPhone(false);
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  className="text-white font-semibold"
                  onClick={sendPhoneCertificationNumber}
                  disabled={!field.value || showPhoneVerifyCodeInput}
                >
                  인증번호 전송
                </Button>
              </div>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        {showPhoneVerifyCodeInput && (
          <FormField
            control={form.control}
            name="phoneVerifyCode"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder="핸드폰 인증번호 입력"
                      {...field}
                      onChange={(e) => {
                        setVerifiedPhone(false);
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    className="text-white font-semibold"
                    onClick={verifyPhone}
                    disabled={verifiedPhone}
                  >
                    인증번호 확인
                  </Button>
                </div>
                {verifiedPhone && (
                  <p className="text-sm text-green-600 ml-1 mt-1">
                    인증에 성공하였습니다.
                  </p>
                )}
                <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
              </FormItem>
            )}
          />
        )}
        <Button
          type="submit"
          className={cn('bg-primary text-white font-bold text-lg w-full h-12')}
        >
          확인
        </Button>
      </form>
    </Form>
  );
};

export default AdditionalSettingForm;
