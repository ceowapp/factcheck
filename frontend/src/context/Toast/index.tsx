import { createContext } from 'react';
import { IToastContextType } from '../../types/toast';

const ToastContext = createContext({} as IToastContextType);

export default ToastContext;
