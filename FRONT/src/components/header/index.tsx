import React, { Dispatch, SetStateAction } from 'react';
import Alert, { IAlert } from '../alert';
import Button from '../button';
import * as S from './styles';

interface IHeader {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
  alertVariant: IAlert['variant'];
  alertMessage: string;
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const Header = ({
  setIsOpenModal,
  setShowAddForm,
  alertVariant,
  alertMessage,
  showAlert,
  setShowAlert,
}: IHeader) => (
  <S.Section>
    <S.Title>Kanban Board</S.Title>
    {alertVariant && alertMessage && showAlert && (
      <Alert
        variant={alertVariant}
        message={alertMessage}
        setShowAlert={setShowAlert}
      />
    )}
    <Button
      variant="success"
      onClick={() => {
        setIsOpenModal(true);
        setShowAddForm(true);
      }}
    >
      <S.AddIcon />
      Novo
    </Button>
  </S.Section>
);

export default Header;
