import React, { useEffect, useRef, useState } from 'react';
import { IAlert } from './components/alert';
import Columns from './components/columns';
import Create from './components/create';
import Header from './components/header';
import Main from './components/main';
import Modal from './components/modal';
import useLazyGet from './hooks/useLazyGet';
import usePost from './hooks/usePost';

const App = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertVariant, setAlertVariant] =
    useState<IAlert['variant']>('success');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  const { data: token, post } = usePost<string>(`${API_URL}/login/`);

  const {
    fetchData: getCards,
    result: {
      data: cards = [
        {
          titulo: '',
          id: '',
          conteudo: '',
          lista: '',
        },
      ],
      error: errorCards,
      loading,
    },
  } = useLazyGet({
    url: `${API_URL}/cards/`,
  });

  const getToken = () => {
    if (isMountedRef.current) {
      post({
        login: process.env.REACT_APP_LOGIN,
        senha: process.env.REACT_APP_PASSWORD,
      });
    }

    return () => {
      isMountedRef.current = false;
    };
  };

  const handleErrorGetCards = () => {
    if (errorCards) {
      setShowAlert(true);
      setAlertVariant('error');
      setAlertMessage('Erro ao carregar os cards do servidor.');
    }
  };

  const handleLoadingGetCards = () => {
    setShowAlert(!!loading);
    if (loading) {
      setAlertVariant('loading');
      setAlertMessage('Loading...');
    }
  };

  const handleSuccessGetCards = () => {
    if (cards) {
      setShowAlert(false);
    }
  };

  useEffect(getToken, []);

  useEffect(handleErrorGetCards, [errorCards]);

  useEffect(handleLoadingGetCards, [loading]);

  useEffect(handleSuccessGetCards, []);

  return (
    <Main>
      <Header
        setIsOpenModal={setIsOpenModal}
        setShowAddForm={setShowAddForm}
        alertMessage={alertMessage}
        alertVariant={alertVariant}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <Columns
        token={token}
        cards={cards}
        getCards={getCards}
        setAlertMessage={setAlertMessage}
        setAlertVariant={setAlertVariant}
        setShowAlert={setShowAlert}
      />

      <Modal isOpen={isOpenModal}>
        {showAddForm && (
          <Create
            token={token || ''}
            setIsOpenModal={setIsOpenModal}
            getCards={getCards}
            setAlertMessage={setAlertMessage}
            setAlertVariant={setAlertVariant}
            setShowAlert={setShowAlert}
          />
        )}
      </Modal>
    </Main>
  );
};

export default App;
