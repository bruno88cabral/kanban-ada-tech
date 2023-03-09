import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import styled from 'styled-components';
import theme from '../../theme';

interface LoadingProps {
  variant?: 'light' | 'dark' | 'grey';
}

const color = {
  light: theme.palette.layout.white,
  dark: theme.palette.layout.black,
  grey: theme.palette.layout.grey,
};

const Spinner = styled(ImSpinner9)<{ variant: LoadingProps['variant'] }>`
  color: ${({ variant = 'light' }) => color[variant]};
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = ({ variant = 'light' }: LoadingProps) => (
  <Spinner data-testid="spinner-icon" variant={variant} />
);

export default Loading;
