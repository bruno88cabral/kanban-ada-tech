import { useState } from 'react';

interface PostState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

type PostResponse<T> = PostState<T> & {
  post: (body: unknown) => Promise<void>;
};

const usePost = <T>(url: string, token?: string): PostResponse<T> => {
  const [state, setState] = useState<PostState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const post = async (body: unknown): Promise<void> => {
    setState({ data: null, error: null, isLoading: true });

    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();
      setState({ data: responseData, error: null, isLoading: false });
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
    }
  };

  return { ...state, post };
};

export default usePost;
