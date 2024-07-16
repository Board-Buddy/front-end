import { checkUserLogin } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

export const useUserLoginCheck = () => {
  return useQuery({ queryKey: ['userLoginCheck'], queryFn: checkUserLogin });
};
