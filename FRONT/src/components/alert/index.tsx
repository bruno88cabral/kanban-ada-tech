import React, { Dispatch, SetStateAction } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import theme from '../../theme';
import Loading from '../loading';
import * as S from './styles';

export interface IAlert {
  variant: 'success' | 'info' | 'error' | 'loading';
  message: string;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const variants = {
  success: {
    backgroundColor: theme.palette.feedback.lighten.success,
    borderColor: theme.palette.feedback.darken.success,
    Icon: FaCheckCircle,
  },
  info: {
    backgroundColor: theme.palette.feedback.lighten.info,
    borderColor: theme.palette.feedback.darken.info,
    Icon: FaExclamationCircle,
  },
  error: {
    backgroundColor: theme.palette.feedback.lighten.error,
    borderColor: theme.palette.feedback.darken.error,
    Icon: FaTimesCircle,
  },
  loading: {
    backgroundColor: theme.palette.feedback.lighten.info,
    borderColor: theme.palette.feedback.darken.info,
    Icon: Loading,
  },
};

const Alert = ({ variant = 'success', message, setShowAlert }: IAlert) => {
  const { Icon } = variants[variant];
  return (
    <S.Container variant={variants[variant]} data-testid="alert">
      <Icon />
      <S.Message>{message}</S.Message>
      <S.CloseIcon
        data-testid="close-icon"
        onClick={() => setShowAlert(false)}
      />
    </S.Container>
  );
};

export default Alert;
