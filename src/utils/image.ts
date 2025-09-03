import FileResizer from 'react-image-file-resizer';

const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
];

export const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve, reject) => {
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('지원하지 않는 이미지 포맷입니다.');
    }

    try {
      FileResizer.imageFileResizer(
        file,
        1500,
        1500,
        'WEBP',
        80,
        0,
        (resized) => {
          if (resized instanceof File) {
            resolve(resized);
          } else {
            reject(new Error('이미지 리사이징에 실패했습니다.'));
          }
        },
        'file',
      );
    } catch (error) {
      reject(error);
    }
  });
