import FileResizer from 'react-image-file-resizer';

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1500,
      1500,
      'JPEG',
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });
