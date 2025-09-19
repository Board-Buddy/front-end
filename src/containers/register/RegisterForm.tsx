'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { Form } from '@/components/ui/form';
import CustomAlert from '@/components/CustomAlert';
import useAppRouter from '@/hooks/custom/useAppRouter';
import useRegisterForm from '@/hooks/custom/useRegisterForm';
import IdField from './IdField';
import PasswordField from './PasswordField';
import PasswordConfirmField from './PasswordConfirmField';
import EmailField from './EmailField';
import NicknameField from './NicknameField';
import PhoneField from './PhoneField';
import PhoneVerifyField from './PhoneVerifyField';

const RegisterForm = () => {
  const router = useAppRouter();

  const {
    form,
    state,
    setState,
    verifyId,
    verifyNickname,
    sendPhoneCertificationNumber,
    verifyPhone,
    onSubmit,
  } = useRegisterForm();

  const {
    uniqueId,
    uniqueNickname,
    showPhoneVerifyCodeInput,
    verifiedPhone,
    openRegisterSuccess,
    openRegisterError,
    errorMessage,
  } = state;

  const {
    setUniqueId,
    setUniqueNickname,
    setShowPhoneVerifyCodeInput,
    setVerifiedPhone,
    setOpenRegisterSuccess,
    setOpenRegisterError,
  } = setState;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <IdField
            uniqueId={uniqueId}
            setUniqueId={setUniqueId}
            verifyId={verifyId}
          />
          <PasswordField />
          <PasswordConfirmField />
          <EmailField />
          <NicknameField
            uniqueNickname={uniqueNickname}
            setUniqueNickname={setUniqueNickname}
            verifyNickname={verifyNickname}
          />
          <PhoneField
            setShowPhoneVerifyCodeInput={setShowPhoneVerifyCodeInput}
            setVerifiedPhone={setVerifiedPhone}
            sendPhoneCertificationNumber={sendPhoneCertificationNumber}
            showPhoneVerifyCodeInput={showPhoneVerifyCodeInput}
          />
          {showPhoneVerifyCodeInput && (
            <PhoneVerifyField
              setVerifiedPhone={setVerifiedPhone}
              verifyPhone={verifyPhone}
              verifiedPhone={verifiedPhone}
            />
          )}
          <Button
            type="submit"
            className={cn(
              'bg-primary text-white font-bold text-lg w-full h-12',
            )}
            disabled={!form.formState.isDirty || !form.formState.isValid}
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
        onConfirm={() => router.push({ href: '/login' })}
      />
      <CustomAlert
        open={openRegisterError}
        setOpen={setOpenRegisterError}
        title="로그인 실패"
        description={errorMessage}
        confirmText="다시 시도"
        onConfirm={() => router.push({ href: '/' })}
      />
    </>
  );
};

export default RegisterForm;
