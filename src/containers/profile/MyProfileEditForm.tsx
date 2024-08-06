'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IMAGE_MAX_SIZE } from '@/constants/image';
import { EditProfileDTO } from '@/types/profile';
import { resizeFile } from '@/utils/image';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditProfile } from '@/hooks/useProfile';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { passwordRegex, phoneRegex } from '@/utils/regex';
import {
  checkNicknameDuplicate,
  passwordCheck,
  smsCertificationSend,
  smsCertificationVerify,
} from '@/services/auth';
import { cn } from '@/utils/tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';

const MyProfileEditForm = () => {
  const queryClient = useQueryClient();
  const { nickname, memberType } = queryClient.getQueryData([
    'userInfo',
  ]) as UserInfo;

  const editProfileMutation = useEditProfile();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [uniqueNickname, setUniqueNickname] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [showPhoneVerifyCodeInput, setShowPhoneVerifyCodeInput] =
    useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);

  const formSchema = z.object({
    nickname: z
      .string()
      .min(2, {
        message: '닉네임은 2자 이상 8자 이하로 입력하세요.',
      })
      .max(8, {
        message: '닉네임은 2자 이상 8자 이하로 입력하세요.',
      })
      .optional(),
    beforePassword: z.string().optional(),
    password: z
      .string()
      .regex(
        passwordRegex,
        '비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 20자 이하여야 합니다.',
      )
      .optional(),
    phone: z
      .string()
      .regex(phoneRegex, '01012345678 형식에 맞춰 입력해주세요.')
      .optional(),
    phoneVerifyCode: z.string().optional(),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: undefined,
      nickname: undefined,
      phone: undefined,
      phoneVerifyCode: undefined,
    },
  });

  const [formData, setFormData] = useState<EditProfileDTO>({
    nickname: '',
    password: '',
    phoneNumber: '',
    description: '',
    profileImageFile: '',
  });

  const verifyNickname = async () => {
    const nicknameValue = form.getValues('nickname');
    const validation = formSchema.shape.nickname.safeParse(nicknameValue);

    if (!validation.success) {
      form.setError('nickname', {
        type: 'manual',
        message: validation.error.errors[0].message,
      });
      return;
    }
    const { status, message } = await checkNicknameDuplicate(
      form.getValues('nickname')!,
    );

    if (status === 'success') {
      form.clearErrors('nickname');
      setUniqueNickname(true);
    } else {
      form.setError('nickname', { type: 'manual', message });
    }
  };

  const verifyPassword = async () => {
    const nicknameValue = form.getValues('beforePassword');
    const validation = formSchema.shape.beforePassword.safeParse(nicknameValue);

    if (!validation.success) {
      form.setError('beforePassword', {
        type: 'manual',
        message: validation.error.errors[0].message,
      });
      return;
    }
    const { status, message } = await passwordCheck(
      form.getValues('beforePassword')!,
    );

    if (status === 'success') {
      form.clearErrors('beforePassword');
      setShowNewPasswordInput(true);
    } else {
      form.setError('beforePassword', { type: 'manual', message });
    }
  };

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
      form.getValues('phone')!,
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
      phoneNumber: form.getValues('phone')!,
      certificationNumber: form.getValues('phoneVerifyCode')!,
    });

    if (status === 'success') {
      form.clearErrors('phoneVerifyCode');
      setVerifiedPhone(true);
    } else {
      form.setError('phoneVerifyCode', { type: 'manual', message });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = (await resizeFile(e.target.files[0])) as File;

      if (image.size > IMAGE_MAX_SIZE) {
        alert('이미지 용량이 너무 큽니다.');
        return;
      }

      if (image) {
        setImageFile(image);
        setFormData({
          ...formData,
          profileImageFile: URL.createObjectURL(image),
        });
      }
    }
  };

  const handleAddImageButtonClick = () => {
    if (imageInputRef.current !== null) {
      (imageInputRef.current as HTMLInputElement).click();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.nickname && !uniqueNickname) {
      form.setError('nickname', {
        type: 'manual',
        message: '닉네임 중복확인이 필요합니다.',
      });
      return;
    }

    if (values.phone && !showPhoneVerifyCodeInput) {
      form.setError('phone', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다.',
      });
      return;
    }

    if (values.phoneVerifyCode && !verifiedPhone) {
      form.setError('phoneVerifyCode', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다.',
      });
      return;
    }

    // 서버 요청 시에 사용할 폼 데이터
    const formDataRequest = new FormData();

    // 이미지가 있다면 이미지 추가
    if (imageFile) {
      formDataRequest.append('profileImageFile', imageFile!);
    }

    const updateProfileDTO = {
      nickname: values.nickname ? values.nickname : null,
      password: values.password ? values.password : null,
      phoneNumber: values.phone ? values.phone : null,
      description: values.description ? values.description : null,
    };

    formDataRequest.append(
      'UpdateProfileDTO',
      new Blob([JSON.stringify(updateProfileDTO)], {
        type: 'application/json',
      }),
    );

    editProfileMutation.mutate(formDataRequest);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center pt-8 pb-4"
      >
        <Avatar
          className="overflow-visible size-24 mb-8"
          onClick={handleAddImageButtonClick}
        >
          <AvatarImage
            src={formData.profileImageFile || '/images/default_profile.png'}
            className="rounded-full"
          />
          <AvatarFallback>
            <Image src="/images/default_profile.png" alt="avatar_image" fill />
          </AvatarFallback>
        </Avatar>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>닉네임</FormLabel>
              <div className="flex items-center gap-2 mt-1">
                <FormControl>
                  <Input
                    placeholder={nickname}
                    {...field}
                    onChange={(e) => {
                      setUniqueNickname(false);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  className="text-white font-semibold"
                  onClick={verifyNickname}
                  disabled={uniqueNickname || !field.value}
                >
                  중복확인
                </Button>
              </div>
              {uniqueNickname && (
                <p className="text-sm text-green-600 ml-1 mt-1">
                  사용 가능한 닉네임입니다.
                </p>
              )}
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>자기소개</FormLabel>
              <FormControl className="mt-2">
                <Input
                  placeholder="변경할 자기소개 입력"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
            </FormItem>
          )}
        />
        {memberType === 'REGULAR' && (
          <>
            <FormField
              control={form.control}
              name="beforePassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl className="mt-2">
                    <div className="flex items-center gap-2 mt-1">
                      <FormControl>
                        <Input
                          placeholder="기존 비밀번호 입력"
                          {...field}
                          onChange={(e) => {
                            setUniqueNickname(false);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        className="text-white font-semibold"
                        onClick={verifyPassword}
                        disabled={showNewPasswordInput || !field.value}
                      >
                        비밀번호 확인
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
                </FormItem>
              )}
            />
            {showNewPasswordInput && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="변경할 비밀번호 입력"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-sm text-red-600 ml-1 mt-1" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>휴대폰 번호</FormLabel>
                  <div className="flex items-center gap-2 mt-2">
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
                  <FormItem className="w-full">
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
          </>
        )}

        <Button
          type="submit"
          className={cn('bg-primary text-white font-bold text-lg w-full h-12')}
        >
          수정
        </Button>
      </form>
    </Form>
  );
};

export default MyProfileEditForm;
