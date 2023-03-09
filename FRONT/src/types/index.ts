export interface ICard {
  titulo: string;
  id: string;
  conteudo: string;
  lista: string;
}

export enum EColumns {
  todo = 'ToDo',
  doing = 'Doing',
  done = 'Done',
}

export const Columns = ['ToDo', 'Doing', 'Done'];
