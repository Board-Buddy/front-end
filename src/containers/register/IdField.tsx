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
  uniqueId: boolean;
  setUniqueId: (isUnique: boolean) => void;
  verifyId: () => void;
}

const IdField = ({ uniqueId, setUniqueId, verifyId }: Props) => {
  const { control } = useFormContext<RegisterFormValues>();

  return (
    <FormField
      control={control}
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
  );
};

export default IdField;
