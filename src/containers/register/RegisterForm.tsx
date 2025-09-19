'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomAlert from '@/components/CustomAlert';
import useAppRouter from '@/hooks/custom/useAppRouter';
import useRegisterForm from '@/hooks/custom/useRegisterForm';

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
