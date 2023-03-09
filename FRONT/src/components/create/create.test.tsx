/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Create from './index';
import theme from '../../theme';

describe('Create', () => {
  const setIsOpenModal = jest.fn();
  const getCards = jest.fn();
  const token = 'token';

  beforeEach(() => {
    setIsOpenModal.mockClear();
    getCards.mockClear();
  });

  it('should render the create form', () => {
    render(
      <ThemeProvider theme={theme}>
        <Create
          setIsOpenModal={setIsOpenModal}
          token={token}
          getCards={getCards}
          setAlertMessage={() => {}}
          setAlertVariant={() => {}}
          setShowAlert={() => {}}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Criar novo card')).toBeInTheDocument();
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('content-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Criar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
  });

  it('should validate required fields when clicking the "Criar" button', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Create
          setIsOpenModal={setIsOpenModal}
          token={token}
          getCards={getCards}
          setAlertMessage={() => {}}
          setAlertVariant={() => {}}
          setShowAlert={() => {}}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Criar' }));

    await waitFor(() => {
      const arr = screen.getAllByText('Campo obrigatório');
      expect(arr[0]).toBeInTheDocument();
      expect(arr[1]).toBeInTheDocument();
    });
  });

  it('should create a new card when clicking the "Criar" button with valid inputs', () => {
    const createNewCard = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Create
          setIsOpenModal={setIsOpenModal}
          token={token}
          getCards={getCards}
          setAlertMessage={() => {}}
          setAlertVariant={() => {}}
          setShowAlert={() => {}}
        />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByTestId('title-input'), {
      target: { value: 'Title' },
    });
    fireEvent.change(screen.getByTestId('content-input'), {
      target: { value: 'Content' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Criar' }));

    waitFor(() => {
      expect(createNewCard).toHaveBeenCalledWith({
        titulo: 'Title',
        conteudo: 'Content',
        lista: 'ToDo',
      });
      expect(getCards).toHaveBeenCalledWith(token);
      expect(setIsOpenModal).toHaveBeenCalledWith(false);
    });
  });

  it('should close the modal when clicking the "Fechar" button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Create
          setIsOpenModal={setIsOpenModal}
          token={token}
          getCards={getCards}
          setAlertMessage={() => {}}
          setAlertVariant={() => {}}
          setShowAlert={() => {}}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));

    expect(setIsOpenModal).toHaveBeenCalledWith(false);
  });
});
