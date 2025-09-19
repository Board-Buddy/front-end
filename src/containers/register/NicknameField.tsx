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
  uniqueNickname: boolean;
  setUniqueNickname: (isUnique: boolean) => void;
  verifyNickname: () => void;
}

const NicknameField = ({
  uniqueNickname,
  setUniqueNickname,
  verifyNickname,
}: Props) => {
  const { control } = useFormContext<RegisterFormValues>();

  return (
    <FormField
      control={control}
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
  );
};

export default NicknameField;
