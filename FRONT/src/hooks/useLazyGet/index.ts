import { useCallback, useMemo, useState } from 'react';
import { ICard } from '../../types';

export type TFetchResponse = {
  data?: ICard[] | undefined;
  error?: boolean;
  loading?: boolean;
};

type TUseLazyGetResponse = {
  fetchData: (token: string) => Promise<void>;
  result: TFetchResponse;
};

interface IUseLazyGetOptions<T> {
  url: string;
  initialState?: T;
}

const useLazyGet = <T>(options: IUseLazyGetOptions<T>): TUseLazyGetResponse => {
  const [data, setData] = useState<ICard[]>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(
    async (token: string) => {
      try {
        setLoading(true);
        const headers = new Headers();
        if (token) {
          headers.append('Authorization', `Bearer ${token}`);
        }
        const response = await fetch(options.url, { headers });
        const responseData = await response.json();
        setData(responseData);
      } catch (e) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [options.url]
  );

  const result = useMemo(
    () => ({ data, error, loading }),
    [data, error, loading]
  );

  return { fetchData, result };
};

export default useLazyGet;
