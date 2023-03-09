import React from 'react';
import * as S from './styles';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: IModalProps) => (
  <div>
    {isOpen && (
      <S.ModalWrapper>
        <S.Modal>{children}</S.Modal>
      </S.ModalWrapper>
    )}
  </div>
);

export default Modal;
