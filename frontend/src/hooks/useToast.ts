import {useContext} from 'react';
import ToastContext from '../context/Toast';
import {IToastContextType} from '../types/toast';

export default function useToast(): IToastContextType {
  return useContext(ToastContext);
}
