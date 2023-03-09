import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent, screen } from '@testing-library/react';
import Card from './index';
import theme from '../../theme';

describe('Card', () => {
  const title = 'Card Title';
  const description = 'Card Description';
  const onClick = jest.fn();

  it('should render title and description', () => {
    render(
      <ThemeProvider theme={theme}>
        <Card title={title} description={description} onClick={onClick} />
      </ThemeProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
  });

  it('should call onClick function when clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <Card title={title} description={description} onClick={onClick} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('card-wrapper'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
