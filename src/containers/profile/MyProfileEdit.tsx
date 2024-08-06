'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IMAGE_MAX_SIZE } from '@/constants/image';
import { EditProfileDTO } from '@/types/profile';
import { resizeFile } from '@/utils/image';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEditProfile } from '@/hooks/useEditProfile';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MyProfileEdit = () => {
  const editProfileMutation = useEditProfile();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<EditProfileDTO>({
    nickname: '',
    password: '',
    phoneNumber: '',
    description: '',
    profileImageFile: '',
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = (await resizeFile(e.target.files[0])) as File;

      if (image.size > IMAGE_MAX_SIZE) {
        alert('이미지 용량이 너무 큽니다.');
        return;
      }

      if (image) {
        setImageFile(image);
        setFormData({
          ...formData,
          profileImageFile: URL.createObjectURL(image),
        });
      }
    }
  };

  const handleAddImageButtonClick = () => {
    if (imageInputRef.current !== null) {
      (imageInputRef.current as HTMLInputElement).click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 서버 요청 시에 사용할 폼 데이터
    const formDataRequest = new FormData();

    // 이미지가 있다면 이미지 추가
    if (imageFile) {
      formDataRequest.append('profileImageFile', imageFile!);
    }

    const updateProfileDTO = {
      nickname: formData.nickname,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      description: formData.description,
    };

    formDataRequest.append(
      'UpdateProfileDTO',
      new Blob([JSON.stringify(updateProfileDTO)], {
        type: 'application/json',
      }),
    );

    editProfileMutation.mutate(formDataRequest);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center pt-4"
      >
        <Avatar
          className="overflow-visible size-24 mb-4"
          onClick={handleAddImageButtonClick}
        >
          <AvatarImage
            src={formData.profileImageFile || '/images/default_profile.png'}
            className="rounded-full"
          />
          <AvatarFallback>
            <Image src="/images/default_profile.png" alt="avatar_image" fill />
          </AvatarFallback>
        </Avatar>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="pt-4 w-full">
          <Label className="self-start">닉네임</Label>
          <Input
            value={formData.nickname || ''}
            className="mt-1"
            onChange={(e) => {
              setFormData({ ...formData, nickname: e.target.value });
            }}
          />
        </div>
        <div className="pt-4 w-full">
          <Label className="self-start">자기소개</Label>
          <Input
            value={formData.description || ''}
            className="mt-1"
            placeholder="자기소개 입력"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
        </div>
        <div className="pt-4 w-full">
          <Label className="self-start">비밀번호</Label>
          <Input
            value={formData.password || ''}
            type="password"
            placeholder="변경할 비밀번호"
            className="mt-1"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>
        <Button type="submit" className="text-white font-semibold w-full mt-8">
          프로필 수정
        </Button>
      </form>
    </div>
  );
};

export default MyProfileEdit;
