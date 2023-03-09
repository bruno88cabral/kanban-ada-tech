import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from '../modal';
import { Columns, ICard } from '../../types';
import Card from '../card';
import Viewer from '../viewer';
import * as S from './styles';
import { IAlert } from '../alert';

interface ColumnProps {
  token?: string | null;
  cards: ICard[];
  getCards: (token: string) => void;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setAlertVariant: Dispatch<SetStateAction<IAlert['variant']>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const Column = ({
  token,
  cards,
  getCards,
  setAlertMessage,
  setAlertVariant,
  setShowAlert,
}: ColumnProps) => {
  const [viewerContent, setViewerContent] = useState<ICard>({
    titulo: '',
    id: '',
    conteudo: '',
    lista: '',
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClickCard = (card: ICard) => {
    setViewerContent(card);
    setShowModal(true);
  };

  const filterCards = (title: string) =>
    cards?.filter((card: ICard) => card.lista === title);

  const handleGetCards = () => {
    if (token && !showModal) {
      getCards(token);
    }
  };

  useEffect(handleGetCards, [token, showModal]);

  return (
    <S.Container>
      {Columns.map((title) => (
        <S.ColumnWrapper key={title}>
          <S.Title>{`${title} - ${filterCards(title)?.length} card${
            filterCards(title)?.length === 1 ? '' : 's'
          }`}</S.Title>
          <S.CardList>
            {filterCards(title)?.map((card: ICard) => (
              <li key={card.id}>
                <Card
                  title={card.titulo}
                  description={card.conteudo}
                  onClick={() => onClickCard(card)}
                />
              </li>
            ))}
          </S.CardList>
        </S.ColumnWrapper>
      ))}

      <Modal isOpen={showModal}>
        <Viewer
          setShowModal={setShowModal}
          content={viewerContent}
          token={token || ''}
          setAlertMessage={setAlertMessage}
          setAlertVariant={setAlertVariant}
          setShowAlert={setShowAlert}
        />
      </Modal>
    </S.Container>
  );
};

export default Column;
