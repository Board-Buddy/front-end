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
  setShowPhoneVerifyCodeInput: (show: boolean) => void;
  setVerifiedPhone: (verifyPhone: boolean) => void;
  sendPhoneCertificationNumber: () => void;
  showPhoneVerifyCodeInput: boolean;
}

const PhoneField = ({
  setShowPhoneVerifyCodeInput,
  setVerifiedPhone,
  sendPhoneCertificationNumber,
  showPhoneVerifyCodeInput,
}: Props) => {
  const { control, setValue } = useFormContext<RegisterFormValues>();

  return (
    <FormField
      control={control}
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
                  setValue('phoneVerifyCode', '');
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
  );
};

export default PhoneField;
