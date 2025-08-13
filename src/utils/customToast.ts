import toast from 'react-hot-toast';
import { postRNMessage } from './webview';
import { MessageType } from '@/types/webview';

export const errorToast = (id: string, message: string) => {
  if (window.ReactNativeWebView) {
    postRNMessage(MessageType.TOAST, {
      type: 'error',
      title: message,
    });

    return;
  }

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
  if (window.ReactNativeWebView) {
    postRNMessage(MessageType.TOAST, {
      type: 'success',
      title: message,
    });

    return;
  }

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
