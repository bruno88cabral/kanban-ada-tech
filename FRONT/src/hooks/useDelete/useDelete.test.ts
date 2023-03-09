import { renderHook, act } from '@testing-library/react-hooks';
import useDelete from './index';

describe('useDelete', () => {
  it('should remove data correctly', async () => {
    const dataMock = {
      conteudo: 'conteudo',
      id: '1',
      lista: 'lista',
      titulo: 'titulo',
    };
    const fetchMock = jest.fn(() => ({
      json: () => Promise.resolve(dataMock),
    }));

    global.fetch = fetchMock as jest.Mock;

    const url = 'http://localhost:5000/cards';
    const token = 'token';
    const id = '1';

    const { result, waitForNextUpdate } = renderHook(() =>
      useDelete({ url, token, id })
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.data).toEqual({
      conteudo: '',
      id: '',
      lista: '',
      titulo: '',
    });

    act(() => {
      result.current.remove();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(fetchMock).toHaveBeenCalledWith(`${url}/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.data).toEqual(dataMock);
  });
});
