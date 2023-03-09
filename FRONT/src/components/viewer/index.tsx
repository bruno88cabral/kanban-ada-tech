import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useDelete from '../../hooks/useDelete';
import usePut from '../../hooks/usePut';
import { Columns, ICard } from '../../types';
import { IAlert } from '../alert';
import Button from '../button';
import Edit from '../edit';
import Loading from '../loading';
import Markdown from '../markdown';

import * as S from './styles';

interface IViewer {
  content: ICard;
  token: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setAlertVariant: Dispatch<SetStateAction<IAlert['variant']>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const Viewer = ({
  content,
  token,
  setShowModal,
  setAlertMessage,
  setAlertVariant,
  setShowAlert,
}: IViewer) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [cardData, setCardData] = useState<ICard>(content);
  const url = `${process.env.REACT_APP_API_URL}/cards`;
  const {
    remove,
    error: removeError,
    loading: removeLoading,
  } = useDelete({
    url,
    token,
    id: cardData.id,
  });

  const {
    fetchData: editCard,
    error,
    data: editCardData,
    loading: editLoading,
  } = usePut({
    url,
    token,
  });

  const getNext = () => {
    const currentIndex = Columns.indexOf(cardData.lista);
    return currentIndex < Columns.length - 1 ? Columns[currentIndex + 1] : '';
  };

  const getPreview = () => {
    const currentIndex = Columns.indexOf(cardData.lista);
    return currentIndex > 0 ? Columns[currentIndex - 1] : '';
  };

  const onClickRemove = () => {
    remove();
    setShowModal(false);
  };

  const onClickEdit = () => {
    setShowEditForm(true);
  };

  const onClickNext = () => {
    editCard({
      ...cardData,
      lista: getNext(),
    });
    setShowModal(false);
  };

  const onClickPreview = () => {
    editCard({
      ...cardData,
      lista: getPreview(),
    });
    setShowModal(false);
  };

  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setAlertVariant('error');
      setShowAlert(true);
      setShowModal(false);
    }
  }, [error]);

  useEffect(() => {
    if (removeError) {
      setAlertMessage('Erro ao remover card');
      setAlertVariant('error');
      setShowAlert(true);
      setShowModal(false);
    }
  }, [removeError]);

  return (
    <>
      {showEditForm ? (
        <Edit
          setShowEditForm={setShowEditForm}
          cardData={cardData}
          editCard={editCard}
          setCardData={setCardData}
          editCardData={editCardData}
          editLoading={editLoading}
        />
      ) : (
        <>
          <S.CloseIcon onClick={() => setShowModal(false)} />

          <S.Title>{cardData?.titulo}</S.Title>

          <S.Description>
            <Markdown source={cardData?.conteudo} />
          </S.Description>

          <S.ButtonGroup>
            <Button
              variant={getPreview() ? 'secondary' : 'disabled'}
              onClick={getPreview() ? onClickPreview : undefined}
            >
              <S.PreviousIcon />
              Mover
            </Button>

            <Button variant="danger" onClick={onClickRemove}>
              <S.RemoveIcon />
              {removeLoading ? <Loading /> : 'Remover'}
            </Button>

            <Button variant="primary" onClick={onClickEdit}>
              <S.EditIcon />
              Editar
            </Button>

            <Button
              variant={getNext() ? 'secondary' : 'disabled'}
              onClick={getNext() ? onClickNext : undefined}
            >
              Mover
              <S.NextIcon />
            </Button>
          </S.ButtonGroup>
        </>
      )}
    </>
  );
};

export default Viewer;
