import { useState } from 'react';
import { ICard } from '../../types';

export interface IUsePutParams {
  url: string;
  token?: string;
}

export interface IFetchData {
  body: ICard;
}

export interface IUsePutResponse {
  data?: ICard;
  error?: string;
  loading: boolean;
  fetchData: (arg0: ICard) => Promise<void>;
}

const usePut = ({ url, token }: IUsePutParams): IUsePutResponse => {
  const [data, setData] = useState<ICard | undefined>(undefined);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  const fetchData = async (body: ICard) => {
    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    };
    setLoading(true);
    try {
      const response = await fetch(`${url}/${body.id}`, requestOptions);
      const responseData = await response.json();

      if (responseData?.error) {
        setError(responseData?.error);
      } else {
        setData(responseData);
      }
    } catch (err) {
      setError(error || 'Erro ao tentar conectar com servidor');
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, error, loading };
};

export default usePut;
