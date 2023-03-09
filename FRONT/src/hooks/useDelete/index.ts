import { useState } from 'react';
import { ICard } from '../../types';

interface IUseDeleteParams {
  url: string;
  token?: string;
  id: string;
}

interface IUseDeleteResponse {
  data: ICard;
  error?: boolean;
  loading: boolean;
  remove: () => void;
}

const useDelete = ({
  url,
  token,
  id,
}: IUseDeleteParams): IUseDeleteResponse => {
  const [data, setData] = useState<ICard>({
    conteudo: '',
    id: '',
    lista: '',
    titulo: '',
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  const requestOptions = {
    method: 'DELETE',
    headers,
  };

  const remove = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, requestOptions);
      const responseData = await response.json();
      setError(false);
      setData(responseData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, remove };
};

export default useDelete;
