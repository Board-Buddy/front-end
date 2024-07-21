import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const page = () => {
  return (
    <>
      <div>
        <span className="font-bold text-xl">보드버디 회원가입</span>
        <p className="text-gray-600 font-semibold">
          서비스를 이용하려면 약관 동의가 필요합니다.
        </p>
      </div>
      <div className="flex flex-col gap-3 my-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="all" className="rounded-full transition-all" />
          <Label htmlFor="all">전체 동의</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="service" className="transition-all" />
          <Label htmlFor="service">[필수] 보드버디 서비스 이용약관 동의</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="privacy" className="transition-all" />
          <Label htmlFor="privacy">[선택] 개인정보 수집 및 이용 동의</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="thirdparty" className="transition-all" />
          <Label htmlFor="thirdparty">[선택] 개인정보 제3자 제공 동의</Label>
        </div>
      </div>
      <Button className="bg-primary text-white font-bold text-lg w-full h-12 mt-4">
        다음
      </Button>
    </>
  );
};

export default page;
