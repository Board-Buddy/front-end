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
import { useState } from 'react';
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
  register,
  smsCertificationSend,
  smsCertificationVerify,
} from '@/services/auth';
import { useRouter } from 'next/navigation';
import LocationSettingComboBox from '@/components/LocationSettingComboBox';
import { passwordRegex, phoneRegex } from '@/utils/regex';
import CustomAlert from '@/components/CustomAlert';
import { CustomAxiosError } from '@/types/api';

const RegisterForm = () => {
  const [openRegisterSuccess, setOpenRegisterSuccess] = useState(false);
  const [openRegisterError, setOpenRegisterError] = useState(false);
  const [msg, setMsg] = useState<string>('');

  const [uniqueId, setUniqueId] = useState(false);
  const [uniqueNickname, setUniqueNickname] = useState(false);
  const [showPhoneVerifyCodeInput, setShowPhoneVerifyCodeInput] =
    useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);

  const router = useRouter();

  const formSchema = z
    .object({
      id: z
        .string()
        .min(1, {
          message: '아이디를 입력해주세요.',
        })
        .max(16, {
          message: '아이디는 2자 이상 16자 이하로 입력하세요.',
        }),
      password: z
        .string()
        .min(1, { message: '비밀번호를 입력해주세요.' })
        .regex(
          passwordRegex,
          '비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 20자 이하여야 합니다.',
        ),
      passwordConfirm: z.string().min(1, {
        message: '비밀번호를 한번 더 입력해주세요.',
      }),
      email: z
        .string()
        .min(1, { message: '이메일을 입력해주세요.' })
        .email({ message: '이메일 형태로 입력해주세요.' }),
      location: z.string().min(1, { message: '지역을 선택해주세요.' }),
      nickname: z
        .string()
        .min(1, { message: '닉네임을 입력해주세요.' })
        .max(8, {
          message: '닉네임은 2자 이상 8자 이하로 입력하세요.',
        }),
      phone: z
        .string()
        .min(1, { message: '핸드폰 번호를 입력해주세요.' })
        .regex(phoneRegex, '01012345678 형식에 맞춰 입력해주세요.'),
      phoneVerifyCode: z.string(),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '비밀번호가 일치하지 않습니다.',
          path: ['passwordConfirm'],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      email: '',
      location: '',
      nickname: '',
      phone: '',
      phoneVerifyCode: '',
    },
  });

  const verifyId = async () => {
    const idValue = form.getValues('id');
    const validation = formSchema._def.schema.shape.id.safeParse(idValue);

    if (!validation.success) {
      form.setError('id', {
        type: 'manual',
        message: validation.error.errors[0].message,
      });
      return;
    }

    try {
      await checkIdDuplicate(form.getValues('id'));

      form.clearErrors('id');
      setUniqueId(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        form.setError('id', { type: 'manual', message: error.message });
      }
    }
  };

  const verifyNickname = async () => {
    const nicknameValue = form.getValues('nickname');
    const validation =
      formSchema._def.schema.shape.nickname.safeParse(nicknameValue);

    if (!validation.success) {
      form.setError('nickname', {
        type: 'manual',
        message: validation.error.errors[0].message,
      });
      return;
    }

    try {
      await checkNicknameDuplicate(form.getValues('nickname'));

      form.clearErrors('nickname');
      setUniqueNickname(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        form.setError('nickname', { type: 'manual', message: error.message });
      }
    }
  };

  const sendPhoneCertificationNumber = async () => {
    const phoneNumberValue = form.getValues('phone');
    const validation =
      formSchema._def.schema.shape.phone.safeParse(phoneNumberValue);

    if (!validation.success) {
      form.setError('phone', {
        type: 'manual',
        message: validation.error.errors[0].message,
      });
      return;
    }

    try {
      await smsCertificationSend(form.getValues('phone'));

      form.clearErrors('phone');
      setShowPhoneVerifyCodeInput(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        form.setError('phone', { type: 'manual', message: error.message });
      }
    }
  };

  const verifyPhone = async () => {
    try {
      await smsCertificationVerify({
        phoneNumber: form.getValues('phone'),
        certificationNumber: form.getValues('phoneVerifyCode'),
      });

      form.clearErrors('phoneVerifyCode');
      setVerifiedPhone(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        form.setError('phoneVerifyCode', {
          type: 'manual',
          message: error.message,
        });
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!uniqueId) {
      form.setError('id', {
        type: 'manual',
        message: '아이디 중복확인이 필요합니다.',
      });
      return;
    }

    if (!uniqueNickname) {
      form.setError('nickname', {
        type: 'manual',
        message: '닉네임 중복확인이 필요합니다.',
      });
      return;
    }

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

    try {
      await register({
        username: values.id,
        password: values.password,
        email: values.email,
        nickname: values.nickname,
        phoneNumber: values.phone,
        sido: values.location.split(' ')[0],
        sgg: values.location.split(' ')[1],
        emd: values.location.split(' ')[2],
      });

      setOpenRegisterSuccess(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        setMsg(error.message);
        setOpenRegisterError(true);
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder="아이디 입력"
                      {...field}
                      onChange={(e) => {
                        setUniqueId(false);
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    className="font-semibold text-white"
                    onClick={verifyId}
                    disabled={uniqueId || !field.value}
                  >
                    중복확인
                  </Button>
                </div>
                {uniqueId && (
                  <p className="ml-1 mt-1 text-sm text-green-600">
                    사용 가능한 아이디입니다.
                  </p>
                )}
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="비밀번호 입력"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="비밀번호 재입력"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="이메일 입력" type="email" {...field} />
                </FormControl>
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder="닉네임 입력"
                      {...field}
                      onChange={(e) => {
                        setUniqueNickname(false);
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    className="font-semibold text-white"
                    onClick={verifyNickname}
                    disabled={uniqueNickname || !field.value}
                  >
                    중복확인
                  </Button>
                </div>
                {uniqueNickname && (
                  <p className="ml-1 mt-1 text-sm text-green-600">
                    사용 가능한 닉네임입니다.
                  </p>
                )}
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />
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
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
                    className="font-semibold text-white"
                    onClick={sendPhoneCertificationNumber}
                    disabled={!field.value || showPhoneVerifyCodeInput}
                  >
                    인증번호 전송
                  </Button>
                </div>
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
                      className="font-semibold text-white"
                      onClick={verifyPhone}
                      disabled={verifiedPhone}
                    >
                      인증번호 확인
                    </Button>
                  </div>
                  {verifiedPhone && (
                    <p className="ml-1 mt-1 text-sm text-green-600">
                      인증에 성공하였습니다.
                    </p>
                  )}
                  <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
            가입하기
          </Button>
        </form>
      </Form>
      <CustomAlert
        open={openRegisterSuccess}
        setOpen={setOpenRegisterSuccess}
        title="회원가입 성공"
        confirmText="로그인하러 가기"
        onConfirm={() => router.push('/login')}
      />
      <CustomAlert
        open={openRegisterError}
        setOpen={setOpenRegisterError}
        title="로그인 실패"
        description={msg}
        confirmText="다시 시도"
        onConfirm={() => router.push('/')}
      />
    </>
  );
};

export default RegisterForm;
