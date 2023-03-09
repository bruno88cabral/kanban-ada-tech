import React from 'react';
import * as S from './styles';

interface ITextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  errorMessage?: string;
}

const TextArea = ({
  label,
  value,
  onChange,
  maxLength,
  errorMessage,
}: ITextAreaProps) => (
  <S.FormGroup error={errorMessage}>
    <S.Label>{label}</S.Label>
    <S.TextAreaField
      data-testid="content-input"
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

export default TextArea;
