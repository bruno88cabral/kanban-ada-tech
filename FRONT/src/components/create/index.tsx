import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import usePost from '../../hooks/usePost';
import { IAlert } from '../alert';
import Button from '../button';
import Input from '../input';
import Loading from '../loading';
import TextArea from '../textarea';
import * as S from './styles';

interface CreateProps {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  token?: string;
  getCards: (token: string) => void;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setAlertVariant: Dispatch<SetStateAction<IAlert['variant']>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const Create = ({
  setIsOpenModal,
  token = '',
  getCards,
  setAlertMessage,
  setAlertVariant,
  setShowAlert,
}: CreateProps) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const {
    data: successCreateNewCard,
    post: createNewCard,
    isLoading,
    error: NewCardError,
  } = usePost<string>(`${API_URL}/cards/`, token);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [contentError, setContentError] = useState<string>('');

  const onCreate = useCallback(() => {
    const hasTitle = !!title;
    const hasContent = !!content;

    if (!hasTitle) {
      setTitleError('Campo obrigatório');
    }

    if (!hasContent) {
      setContentError('Campo obrigatório');
    }

    if (hasTitle && hasContent) {
      createNewCard({
        titulo: title,
        conteudo: content,
        lista: 'ToDo',
      });
    }
  }, [title, content]);

  useEffect(() => {
    if (successCreateNewCard) {
      getCards(token);
      setIsOpenModal(false);
    }
  }, [successCreateNewCard]);

  useEffect(() => {
    if (NewCardError) {
      setAlertMessage('Erro ao criar um novo card.');
      setAlertVariant('error');
      setShowAlert(true);
      setIsOpenModal(false);
    }
  }, [NewCardError]);

  return (
    <>
      <S.Title>Criar novo card</S.Title>

      <Input
        label="Título"
        onChange={(text) => {
          setTitle(text);
          setTitleError('');
        }}
        value={title}
        errorMessage={titleError}
        maxLength={100}
      />

      <TextArea
        label="Conteúdo"
        onChange={(text) => {
          setContent(text);
          setContentError('');
        }}
        value={content}
        errorMessage={contentError}
        maxLength={350}
      />

      <S.ButtonGroup>
        <Button variant="primary" onClick={onCreate}>
          {isLoading ? <Loading variant="light" /> : 'Criar'}
        </Button>

        <Button variant="secondary" onClick={() => setIsOpenModal(false)}>
          Fechar
        </Button>
      </S.ButtonGroup>
    </>
  );
};

export default Create;
