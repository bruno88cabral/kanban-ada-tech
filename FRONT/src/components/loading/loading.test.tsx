import React from 'react';
import { render } from '@testing-library/react';
import Loading from './index';
import theme from '../../theme';

describe('Loading component', () => {
  it('should render the spinner icon', () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId('spinner-icon')).toBeInTheDocument();
  });

  it('should apply the light color variant', () => {
    const { getByTestId } = render(<Loading variant="light" />);
    expect(getByTestId('spinner-icon')).toHaveStyle(
      `color: ${theme.palette.layout.white}`
    );
  });

  it('should apply the dark color variant', () => {
    const { getByTestId } = render(<Loading variant="dark" />);
    expect(getByTestId('spinner-icon')).toHaveStyle(
      `color: ${theme.palette.layout.black}`
    );
  });

  it('should apply the grey color variant', () => {
    const { getByTestId } = render(<Loading variant="grey" />);
    expect(getByTestId('spinner-icon')).toHaveStyle(
      `color: ${theme.palette.layout.grey}`
    );
  });
});
