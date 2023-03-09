/* eslint-disable no-nested-ternary */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from '@testing-library/react';
import Alert, { IAlert } from './index';
import theme from '../../theme';

const mockAlert: IAlert = {
  variant: 'success',
  message: 'Test message',
  setShowAlert: jest.fn(),
};

describe('Alert', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={theme}>
        <Alert {...mockAlert} />
      </ThemeProvider>
    );
    const alertElement = getByTestId('alert');
    const messageElement = getByText('Test message');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveStyle(`
      background-color: ${
        mockAlert.variant === 'success'
          ? theme.palette.feedback.lighten.success
          : mockAlert.variant === 'info'
          ? theme.palette.feedback.lighten.info
          : theme.palette.feedback.lighten.error
      };
      border-color: ${
        mockAlert.variant === 'success'
          ? theme.palette.feedback.darken.success
          : mockAlert.variant === 'info'
          ? theme.palette.feedback.darken.info
          : theme.palette.feedback.darken.error
      };
    `);
    expect(messageElement).toBeInTheDocument();
  });

  it('should call setShowAlert when close icon is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Alert {...mockAlert} />
      </ThemeProvider>
    );
    const closeIcon = getByTestId('close-icon');
    fireEvent.click(closeIcon);
    expect(mockAlert.setShowAlert).toHaveBeenCalledWith(false);
  });
});
