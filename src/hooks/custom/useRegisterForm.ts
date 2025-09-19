import { passwordRegex, phoneRegex } from '@/utils/regex';
import { z } from 'zod';
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
  register,
  smsCertificationSend,
  smsCertificationVerify,
} from '@/services/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomAxiosError } from '@/types/api';

export const registerFormSchema = z
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
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }).max(8, {
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

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

const useRegisterForm = () => {
  const [openRegisterSuccess, setOpenRegisterSuccess] = useState(false);
  const [openRegisterError, setOpenRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [uniqueId, setUniqueId] = useState(false);
  const [uniqueNickname, setUniqueNickname] = useState(false);
  const [showPhoneVerifyCodeInput, setShowPhoneVerifyCodeInput] =
    useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      email: '',
      nickname: '',
      phone: '',
      phoneVerifyCode: '',
    },
  });

  const verifyId = async () => {
    const idValue = form.getValues('id');
    const validation =
      registerFormSchema._def.schema.shape.id.safeParse(idValue);

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
      registerFormSchema._def.schema.shape.nickname.safeParse(nicknameValue);

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
      registerFormSchema._def.schema.shape.phone.safeParse(phoneNumberValue);

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

  const onSubmit = async (values: RegisterFormValues) => {
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
      });

      setOpenRegisterSuccess(true);
    } catch (error: unknown) {
      if (error instanceof CustomAxiosError) {
        setErrorMessage(error.message);
        setOpenRegisterError(true);
      }
    }
  };

  return {
    form,
    state: {
      uniqueId,
      uniqueNickname,
      showPhoneVerifyCodeInput,
      verifiedPhone,
      openRegisterSuccess,
      openRegisterError,
      errorMessage,
    },
    setState: {
      setUniqueId,
      setUniqueNickname,
      setShowPhoneVerifyCodeInput,
      setVerifiedPhone,
      setOpenRegisterSuccess,
      setOpenRegisterError,
    },
    verifyId,
    verifyNickname,
    sendPhoneCertificationNumber,
    verifyPhone,
    onSubmit,
  };
};

export default useRegisterForm;
