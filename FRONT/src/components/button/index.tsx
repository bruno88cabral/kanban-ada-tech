import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import theme from '../../theme';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'danger' | 'success' | 'secondary' | 'disabled';
};

const { palette } = theme;

const variants = {
  primary: `
    background-color: ${palette.feedback.lighten.info};
    color: ${palette.layout.white};

    &:hover {
        background-color: ${palette.feedback.darken.info};
    }
    `,
  secondary: `
    background-color: transparent;
    color: ${palette.layout.white};
    border: 1px solid ${palette.layout.white};

    svg {
      color: ${palette.layout.white};  
    }

    &:hover {
        color: ${palette.feedback.lighten.disabled};
        border: 1px solid ${palette.feedback.lighten.disabled};

        svg {
          color: ${palette.feedback.lighten.disabled};
        }
    }
    `,
  danger: `
    background-color:  ${palette.feedback.lighten.error};
    color: ${palette.layout.white};

    &:hover {
        background-color: ${palette.feedback.darken.error};
    }
    `,
  success: `
    background-color: ${palette.feedback.lighten.success};
    color: ${palette.layout.white};

    &:hover {
        background-color: ${palette.feedback.darken.success};
    }
    `,
  disabled: `
    background-color: ${palette.feedback.lighten.disabled};
    color: ${palette.feedback.darken.disabled};
    cursor: not-allowed;

    svg {
          color: #666;  
        }
  `,
};

const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  height: fit-content;

  ${({ variant }) => variants[variant]};
`;

export default Button;
