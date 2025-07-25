'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IMAGE_MAX_SIZE } from '@/constants/image';
import { EditProfileDTO } from '@/types/profile';
import { resizeFile } from '@/utils/image';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditProfile } from '@/hooks/useProfile';
import { ControllerRenderProps, useForm } from 'react-hook-form';
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
import CustomAlert from '@/components/CustomAlert';
import { useExistingProfileInfoContext } from '@/context/ExistingProfileInfoContext';
import { CustomAxiosError } from '@/types/api';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import useRestoreAppState from '@/hooks/custom/useRestoreAppState';
import { saveStateToApp, STATE_KEYS } from '@/utils/appState';

type RestoredFormState = Pick<
  EditProfileDTO,
  'nickname' | 'description' | 'profileImageFile'
> | null;

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

const MyProfileEditForm = () => {
  const [imageSizeAlertOpen, setImageSizeAlertOpen] = useState(false);

  const userInfo = useUserInfo();
  const memberType = userInfo?.memberType;

  const editProfileMutation = useEditProfile();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [uniqueNickname, setUniqueNickname] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [showPhoneVerifyCodeInput, setShowPhoneVerifyCodeInput] =
    useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);

  const { formState } = useExistingProfileInfoContext();
  const [restoredFormState, setRestoredFormState] =
    useState<RestoredFormState>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: undefined,
      nickname: undefined,
      phone: undefined,
      phoneVerifyCode: undefined,
    },
  });

  useRestoreAppState<RestoredFormState>(
    STATE_KEYS.PROFILE_INFO,
    useCallback((state) => state && setRestoredFormState(state), []),
  );

  // placeholder 우선순위 함수
  const getPlaceholder = (
    key: 'nickname' | 'description' | 'profileImageFile',
    fallback: string,
  ) => restoredFormState?.[key] || formState[key] || fallback;

  // 공통 onChange 핸들러
  const handleFieldChange =
    (
      field: ControllerRenderProps<Record<string, unknown>, string>,
      extra?: () => void,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (extra) extra();
      field.onChange(e.target.value);
    };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = (await resizeFile(e.target.files[0])) as File;

      if (image.size > IMAGE_MAX_SIZE) {
        setImageSizeAlertOpen(true);
        return;
      }

      setImageFile(image);
    }
  };

  const handleAddImageButtonClick = () => {
    imageInputRef.current?.click();
  };

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

    try {
      await checkNicknameDuplicate(form.getValues('nickname')!);

      form.clearErrors('nickname');
      setUniqueNickname(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        form.setError('nickname', { type: 'manual', message: error.message });
      }
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

    try {
      await passwordCheck(form.getValues('beforePassword')!);

      form.clearErrors('beforePassword');
      setShowNewPasswordInput(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        form.setError('beforePassword', {
          type: 'manual',
          message: error.message,
        });
      }
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

    try {
      await smsCertificationSend(form.getValues('phone')!);

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
        phoneNumber: form.getValues('phone')!,
        certificationNumber: form.getValues('phoneVerifyCode')!,
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
      nickname: values.nickname ?? null,
      password: values.password ?? null,
      phoneNumber: values.phone ?? null,
      description: values.description ?? null,
    };

    formDataRequest.append(
      'UpdateProfileDTO',
      new Blob([JSON.stringify(updateProfileDTO)], {
        type: 'application/json',
      }),
    );

    editProfileMutation.mutate(formDataRequest);
    saveStateToApp(STATE_KEYS.PROFILE_INFO, null);
  };

  return (
    <div className="p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-4 pb-4 pt-8"
        >
          <Avatar
            className="relative mb-8 size-24 cursor-pointer overflow-hidden"
            onClick={handleAddImageButtonClick}
          >
            <AvatarImage
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : getPlaceholder(
                      'profileImageFile',
                      '/images/default_profile.png',
                    )
              }
              className="rounded-full object-cover"
            />
            <div
              className="absolute bottom-0 left-1/2 w-24 -translate-x-1/2 bg-primary py-1 text-center text-xs font-semibold text-white"
              color="black"
            >
              EDIT
            </div>
            <AvatarFallback>
              <Image
                src="/images/default_profile.png"
                alt="avatar_image"
                fill
              />
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
                <div className="mt-1 flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder={getPlaceholder('nickname', '')}
                      {...field}
                      onChange={handleFieldChange(field, () =>
                        setUniqueNickname(false),
                      )}
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
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>자기소개</FormLabel>
                <FormControl className="mt-1">
                  <Input
                    placeholder={getPlaceholder(
                      'description',
                      '자기소개를 입력해주세요.',
                    )}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
                    <FormControl className="mt-1">
                      <div className="mt-1 flex items-center gap-2">
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="기존 비밀번호 입력"
                            {...field}
                            onChange={handleFieldChange(field, () =>
                              setUniqueNickname(false),
                            )}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          className="font-semibold text-white"
                          onClick={verifyPassword}
                          disabled={showNewPasswordInput || !field.value}
                        >
                          비밀번호 확인
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
                      <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
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
                    <div className="mt-1 flex items-center gap-2">
                      <FormControl>
                        <Input
                          placeholder="01012345678"
                          {...field}
                          onChange={handleFieldChange(field, () => {
                            setShowPhoneVerifyCodeInput(false);
                            form.setValue('phoneVerifyCode', '');
                            setVerifiedPhone(false);
                          })}
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
                    <FormItem className="w-full">
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            placeholder="휴대폰 인증번호 입력"
                            {...field}
                            onChange={handleFieldChange(field, () =>
                              setVerifiedPhone(false),
                            )}
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
            </>
          )}

          <Button
            type="submit"
            className={cn(
              'bg-primary text-white font-bold text-lg w-full h-12',
            )}
          >
            수정
          </Button>
        </form>
      </Form>
      <CustomAlert
        open={imageSizeAlertOpen}
        setOpen={setImageSizeAlertOpen}
        title="이미지 용량이 너무 큽니다."
        description="업로드하신 이미지의 용량이 1MB를 초과합니다. 1MB 이하로 다시 선택주세요."
        confirmText="확인"
        onConfirm={() => setImageSizeAlertOpen(false)}
      />
    </div>
  );
};

export default MyProfileEditForm;
