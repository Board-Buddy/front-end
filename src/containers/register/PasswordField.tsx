import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterFormValues } from '@/hooks/custom/useRegisterForm';
import { useFormContext } from 'react-hook-form';

const PasswordField = () => {
  const { control } = useFormContext<RegisterFormValues>();

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder="비밀번호 입력" type="password" {...field} />
          </FormControl>
          <FormMessage className="ml-1 mt-1 text-sm text-red-600" />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
