import React from 'react';
import Markdown from '../markdown';
import * as S from './styles';

interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const Card = ({ title, description, onClick }: CardProps) => (
  <S.CardWrapper data-testid="card-wrapper" onClick={onClick}>
    <S.Title>{title}</S.Title>
    <S.Description>
      <Markdown source={description} />
    </S.Description>
  </S.CardWrapper>
);

export default Card;
