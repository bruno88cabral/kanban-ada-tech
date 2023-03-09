/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Column from './index';
import theme from '../../theme';

const mockCards = [
  {
    id: '1',
    titulo: 'Card 1',
    conteudo: 'Conteúdo do Card 1',
    lista: 'Doing',
  },
  {
    id: '2',
    titulo: 'Card 2',
    conteudo: 'Conteúdo do Card 2',
    lista: 'Doing',
  },
  {
    id: '3',
    titulo: 'Card 3',
    conteudo: 'Conteúdo do Card 3',
    lista: 'Done',
  },
];

describe('Column', () => {
  it('renders the component', () => {
    render(
      <ThemeProvider theme={theme}>
        <Column
          token="fakeToken"
          cards={mockCards}
          getCards={() => {}}
          setAlertMessage={() => {}}
          setAlertVariant={() => {}}
          setShowAlert={() => {}}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Doing - 2 cards')).toBeInTheDocument();
    expect(screen.getByText('Done - 1 card')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(3);
  });

  it('opens the viewer modal when a card is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <Column
          token="fakeToken"
          cards={mockCards}
          getCards={() => {}}
          setAlertMessage={() => {}}
          setAlertVariant={() => {}}
          setShowAlert={() => {}}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Card 1'));

    waitFor(() => {
      expect(screen.getByText('Conteúdo do Card 1')).toBeInTheDocument();
    });
  });
});
