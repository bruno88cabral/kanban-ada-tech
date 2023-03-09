import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render, screen } from '@testing-library/react';
import theme from '../../theme';
import Button from './index';

const { palette } = theme;

describe('Button', () => {
  it('render component with primary variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button variant="primary">Click me!</Button>
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(`
      background-color: ${palette.feedback.lighten.info};
      color: ${palette.layout.white};
    `);
  });

  it('render component with secondary variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button variant="secondary">Click me!</Button>
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(`
      background-color: transparent;
      color: ${palette.layout.white};
      border: 1px solid ${palette.layout.white};
    `);
  });

  it('render component with danger variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button variant="danger">Click me!</Button>
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(`
      background-color: ${palette.feedback.lighten.error};
      color: ${palette.layout.white};
    `);
  });

  it('render component with success variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button variant="success">Click me!</Button>
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(`
      background-color: ${palette.feedback.lighten.success};
      color: ${palette.layout.white};
    `);
  });

  it('render component with disabled variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button variant="disabled">Click me!</Button>
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(`
      background-color: ${palette.feedback.lighten.disabled};
      color: ${palette.feedback.darken.disabled};
      cursor: not-allowed;
    `);
  });

  it('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Button onClick={handleClick} variant="primary">
          Click me!
        </Button>
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
