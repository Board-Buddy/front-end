'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';

const TermForm = () => {
  // 주석 추가
  const [items, setItems] = useState([
    {
      name: 'service',
      value: '보드버디 서비스 이용약관 동의',
      isChecked: false,
      required: true,
    },
    {
      name: 'privacy',
      value: '개인정보 수집 및 이용 동의',
      isChecked: false,
      required: true,
    },
    {
      name: 'thirdparty',
      value: '개인정보 제3자 제공 동의',
      isChecked: false,
      required: true,
    },
    {
      name: 'advertisement',
      value: '마케팅 및 광고활용 동의',
      isChecked: false,
      required: false,
    },
  ]);

  const allRequiredChecked = items
    .filter((item) => item.required)
    .every((item) => item.isChecked);
  const allChecked = items.every((item) => item.isChecked);

  const handleAllChange = (checked: boolean) => {
    setItems((prev) => prev.map((item) => ({ ...item, isChecked: checked })));
  };

  const handleItemChange = (name: string, checked: boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, isChecked: checked } : item,
      ),
    );
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center space-x-2 bg-gray-100 p-4">
          <Checkbox
            id="all"
            className="rounded-full transition-all"
            checked={allChecked}
            onCheckedChange={(checked: boolean) => handleAllChange(checked)}
          />
          <Label htmlFor="all">전체 동의</Label>
        </div>
        {items.map((item) => (
          <div
            key={item.name}
            className="mr-1 flex items-center space-x-2 px-4"
          >
            <Checkbox
              id={item.name}
              className="transition-all"
              checked={item.isChecked}
              onCheckedChange={(checked) =>
                handleItemChange(item.name, Boolean(checked))
              }
            />
            <Label htmlFor={item.name} className="flex-1">
              [{item.required ? '필수' : '선택'}] {item.value}
            </Label>
            <Button className="h-fit bg-transparent p-0 text-gray-600 underline">
              보기
            </Button>
          </div>
        ))}
      </div>
      <Link href={allRequiredChecked ? '/register/accounts' : '#'}>
        <Button
          className="mt-4 h-12 w-full bg-primary text-lg font-bold text-white"
          disabled={!allRequiredChecked}
        >
          다음
        </Button>
      </Link>
    </>
  );
};

export default TermForm;
