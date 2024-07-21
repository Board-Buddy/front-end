'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useState } from 'react';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

const RegisterForm = () => {
  const [uniqueId, setUniqueId] = useState(false);
  const [showEmailVerifyCodeInput, setShowEmailVerifyCodeInput] =
    useState(false);
  const [showPhoneVerifyCodeInput, setShowPhoneVerifyCodeInput] =
    useState(false);

  const formSchema = z
    .object({
      id: z
        .string({ message: '아이디를 입력해주세요.' })
        .min(2, {
          message: '아이디는 2자 이상 16자 이하로 입력하세요.',
        })
        .max(16, {
          message: '아이디는 2자 이상 16자 이하로 입력하세요.',
        }),
      password: z
        .string({ message: '비밀번호를 입력해주세요.' })
        .regex(
          passwordRegex,
          '비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 20자 이하여야 합니다.',
        ),
      passwordConfirm: z.string({
        message: '비밀번호를 한번 더 입력해주세요.',
      }),
      email: z
        .string({ message: '이메일을 입력해주세요.' })
        .email({ message: '이메일 형식이 올바르지 않습니다.' }),
      emailVerifyCode: z.string({
        message: '이메일로 전송된 인증번호를 입력해주세요.',
      }),
      location: z.string({ message: '지역을 선택해주세요.' }).min(2).max(10),
      nickname: z
        .string({ message: '닉네임을 입력해주세요.' })
        .min(2, {
          message: '닉네임은 2자 이상 8자 이하로 입력하세요.',
        })
        .max(8, {
          message: '닉네임은 2자 이상 8자 이하로 입력하세요.',
        }),
      phone: z
        .string({ message: '핸드폰 번호를 입력해주세요.' })
        .regex(phoneRegex, '01012345678 형식에 맞춰 입력해주세요.'),
      phoneVerifyCode: z.string({
        message: '휴대폰으로 전송된 인증번호를 입력해주세요.',
      }),
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
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // TODO: form submit logic
  };

  const verifyId = async () => {
    // TODO: id verification logic
    setUniqueId(true);
  };

  const sendEmailCertificationNumber = async () => {
    setShowEmailVerifyCodeInput(true);
  };

  const sendPhoneCertificationNumber = async () => {
    setShowPhoneVerifyCodeInput(true);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="아이디 입력" {...field} />
                </FormControl>
                <Button
                  type="button"
                  className="text-white font-semibold"
                  onClick={verifyId}
                >
                  중복확인
                </Button>
              </div>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="비밀번호 입력" type="password" {...field} />
              </FormControl>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
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
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="이메일 입력" {...field} />
                </FormControl>
                <Button
                  type="button"
                  className="text-white font-semibold"
                  onClick={sendEmailCertificationNumber}
                >
                  인증번호 전송
                </Button>
              </div>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        {showEmailVerifyCodeInput && (
          <FormField
            control={form.control}
            name="emailVerifyCode"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input placeholder="이메일 인증번호 입력" {...field} />
                  </FormControl>
                  <Button type="button" className="text-white font-semibold">
                    인증번호 확인
                  </Button>
                </div>
                <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="닉네임 입력" {...field} />
              </FormControl>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="지역 선택" {...field} />
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
                  <Input placeholder="01012345678" {...field} />
                </FormControl>
                <Button
                  type="button"
                  className="text-white font-semibold"
                  onClick={sendPhoneCertificationNumber}
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
                    <Input placeholder="핸드폰 인증번호 입력" {...field} />
                  </FormControl>
                  <Button type="button" className="text-white font-semibold">
                    인증번호 확인
                  </Button>
                </div>
                <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
              </FormItem>
            )}
          />
        )}
        <Button
          type="submit"
          className={cn('bg-primary text-white font-bold text-lg w-full h-12')}
        >
          회원가입
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
