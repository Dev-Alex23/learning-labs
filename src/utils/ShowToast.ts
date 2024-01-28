import { toast } from 'react-toastify';

type ToastType = 'info' | 'warning' | 'success' | 'error' | 'default';

export const ShowToast = (message: string, type: ToastType = 'default') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
};
