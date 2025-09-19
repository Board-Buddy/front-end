import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterFormValues } from '@/hooks/custom/useRegisterForm';
import { useFormContext } from 'react-hook-form';

interface Props {
  setVerifiedPhone: (isVerified: boolean) => void;
  verifiedPhone: boolean;
  verifyPhone: () => void;
}

const PhoneVerifyField = ({
  setVerifiedPhone,
  verifyPhone,
  verifiedPhone,
}: Props) => {
  const { control } = useFormContext<RegisterFormValues>();

  return (
    <FormField
      control={control}
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
  );
};

export default PhoneVerifyField;
