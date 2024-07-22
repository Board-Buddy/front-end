'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TermForm = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [serviceChecked, setServiceChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [thirdPartyChecked, setThirdPartyChecked] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);

  useEffect(() => {
    setAllAgreed(serviceChecked && privacyChecked && thirdPartyChecked);
  }, [serviceChecked, privacyChecked, thirdPartyChecked]);

  const handleAllChange = (checked: boolean) => {
    setAllChecked(checked);
    setServiceChecked(checked);
    setPrivacyChecked(checked);
    setThirdPartyChecked(checked);
  };

  return (
    <>
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="all"
            className="rounded-full transition-all"
            checked={allChecked}
            onCheckedChange={(checked: boolean) => handleAllChange(checked)}
          />
          <Label htmlFor="all">전체 동의</Label>
        </div>
        <div className="flex items-center space-x-2 mr-1">
          <Checkbox
            id="service"
            className="transition-all"
            checked={serviceChecked}
            onCheckedChange={(checked: boolean) => setServiceChecked(checked)}
          />
          <Label htmlFor="service" className="flex-1">
            [필수] 보드버디 서비스 이용약관 동의
          </Label>
          <Button className="bg-transparent underline text-gray-600 p-0 h-fit">
            보기
          </Button>
        </div>
        <div className="flex items-center space-x-2 mr-1">
          <Checkbox
            id="privacy"
            className="transition-all"
            checked={privacyChecked}
            onCheckedChange={(checked: boolean) => setPrivacyChecked(checked)}
          />
          <Label htmlFor="privacy" className="flex-1">
            [필수] 개인정보 수집 및 이용 동의
          </Label>
          <Button className="bg-transparent underline text-gray-600 p-0 h-fit">
            보기
          </Button>
        </div>
        <div className="flex items-center space-x-2 mr-1">
          <Checkbox
            id="thirdparty"
            className="transition-all"
            checked={thirdPartyChecked}
            onCheckedChange={(checked: boolean) =>
              setThirdPartyChecked(checked)
            }
          />
          <Label htmlFor="thirdparty" className="flex-1">
            [필수] 개인정보 제3자 제공 동의
          </Label>
          <Button className="bg-transparent underline text-gray-600 p-0 h-fit">
            보기
          </Button>
        </div>
      </div>
      <Link href={allAgreed ? '/register/accounts' : '#'}>
        <Button
          className="bg-primary text-white font-bold text-lg w-full h-12 mt-4"
          disabled={!allAgreed}
        >
          다음
        </Button>
      </Link>
    </>
  );
};

export default TermForm;
