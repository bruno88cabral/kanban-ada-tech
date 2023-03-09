import React from 'react';
import * as S from './styles';

interface IInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  errorMessage?: string;
}

const Input = ({
  label,
  value,
  onChange,
  maxLength,
  errorMessage,
}: IInputProps) => (
  <S.FormGroup error={errorMessage}>
    <S.Label>{label}</S.Label>
    <S.InputField
      data-testid="title-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      error={errorMessage}
    />
    {maxLength && (
      <S.CharCounter>
        {value.length}/{maxLength}
      </S.CharCounter>
    )}
    {errorMessage && <S.ErrorLabel>{errorMessage}</S.ErrorLabel>}
  </S.FormGroup>
);

export default Input;
