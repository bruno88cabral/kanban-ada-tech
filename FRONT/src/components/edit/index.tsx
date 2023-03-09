import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ICard } from '../../types';
import Button from '../button';
import Input from '../input';
import Loading from '../loading';
import TextArea from '../textarea';
import * as S from './styles';

interface EditProps {
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  editCard: (arg0: ICard) => Promise<void>;
  cardData: ICard;
  setCardData: Dispatch<SetStateAction<ICard>>;
  editCardData?: ICard | undefined;
  editLoading: boolean;
}

const Edit = ({
  setShowEditForm,
  editCard,
  cardData,
  setCardData,
  editCardData,
  editLoading,
}: EditProps) => {
  const [title, setTitle] = useState<string>(cardData.titulo);
  const [description, setDescription] = useState<string>(cardData.conteudo);
  const [titleError, setTitleError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onEdit = useCallback(async () => {
    const hasTitle = !!title;
    const hasdescription = !!description;

    if (!hasTitle) {
      setTitleError('Campo obrigatório');
    }

    if (!hasdescription) {
      setDescriptionError('Campo obrigatório');
    }

    if (hasTitle && hasdescription) {
      await editCard({
        titulo: title,
        conteudo: description,
        lista: cardData.lista,
        id: cardData.id,
      });
      setIsSubmit(true);
    }
  }, [title, description]);

  useEffect(() => {
    if (editCardData && isSubmit) {
      setShowEditForm(false);
      setCardData(editCardData);
    }
  }, [editCardData, isSubmit]);

  return (
    <>
      <S.Title>Editar card</S.Title>

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
          setDescription(text);
          setDescriptionError('');
        }}
        value={description}
        errorMessage={descriptionError}
        maxLength={350}
      />

      <S.ButtonGroup>
        <Button variant="primary" onClick={onEdit}>
          {editLoading ? <Loading /> : 'Editar'}
        </Button>

        <Button variant="secondary" onClick={() => setShowEditForm(false)}>
          Fechar
        </Button>
      </S.ButtonGroup>
    </>
  );
};

export default Edit;
