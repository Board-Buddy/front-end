import toast from 'react-hot-toast';

export const errorToast = (id: string, message: string) => {
  toast.error(message, {
    id,
    style: {
      fontSize: '14px',
      fontWeight: '600',
      border: '1px solid var(--main-color)',
      color: 'var(--main-color)',
    },
    iconTheme: {
      primary: 'var(--main-color)',
      secondary: '#FFFAEE',
    },
  });
};

export const successToast = (id: string, message: string) => {
  toast.success(message, {
    id,
    style: {
      fontSize: '14px',
      fontWeight: '600',
      border: '1px solid var(--main-color)',
      color: 'var(--main-color)',
    },
    iconTheme: {
      primary: 'var(--main-color)',
      secondary: '#FFFAEE',
    },
  });
};
