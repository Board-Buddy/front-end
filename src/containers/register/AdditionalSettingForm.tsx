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
import { useRouter } from 'next/navigation';
import { useUserLoginCheck } from '@/hooks/useAuth';
import LocationSettingComboBox from '@/components/LocationSettingComboBox';
import CustomAlert from '@/components/CustomAlert';

const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

const AdditionalSettingForm = () => {
  const router = useRouter();

  const [openLoginSuccess, setOpenLoginSuccess] = useState(false);
  const [openLoginError, setOpenLoginError] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [showPhoneVerifyCodeInput, setShowPhoneVerifyCodeInput] =
    useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);
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
      sgg: values.location.split(' ')[1],
      emd: values.location.split(' ')[2],
    });

    if (status === 'success') {
      setGetUserInfo(true);
    } else {
      setErrMsg(message);
      setOpenLoginError(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenLoginSuccess(true);
    } else {
      setOpenLoginError(true);
    }
  }, [isSuccess, error, router]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LocationSettingComboBox
                    popOverWidth={408}
                    onSelect={(sido, sgg, emd) => {
                      field.onChange(`${sido} ${sgg} ${emd}`);
                    }}
                  />
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
            className={cn(
              'bg-primary text-white font-bold text-lg w-full h-12',
            )}
          >
            확인
          </Button>
        </form>
      </Form>
      <CustomAlert
        open={openLoginSuccess}
        setOpen={setOpenLoginSuccess}
        title="로그인 성공"
        confirmText="확인"
        onConfirm={() => router.push('/home')}
      />
      <CustomAlert
        open={openLoginError}
        setOpen={setOpenLoginError}
        title="로그인 실패"
        description={errMsg || error?.message}
        confirmText="다시 시도"
        onConfirm={() => {}}
      />
    </>
  );
};

export default AdditionalSettingForm;
