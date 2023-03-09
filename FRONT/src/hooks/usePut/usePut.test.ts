import { renderHook } from '@testing-library/react-hooks';
import usePut, { IFetchData } from './index';

describe('usePut', () => {
  const url = 'https://example.com/api/cards';
  const token = 'abc123';
  const mockCard: IFetchData['body'] = {
    id: '1',
    titulo: 'Test Card',
    conteudo: 'This is a test card.',
    lista: 'Doing',
  };
  const mockResponse = {
    ...mockCard,
    updatedAt: '2022-03-07T19:08:38.593Z',
  };
  const mockErrorResponse = {
    error: 'Error message',
  };

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePut({ url }));
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('should call fetch with the correct arguments', async () => {
    const fetchMock = jest.fn(() => ({
      json: () => Promise.resolve(mockResponse),
    }));
    global.fetch = fetchMock as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      usePut({ url, token })
    );
    expect(result.current.loading).toBe(false);
    result.current.fetchData(mockCard);
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(`${url}/${mockCard.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(mockCard),
    });
  });

  it('should set error message when response has an error', async () => {
    const fetchMock = jest.fn(() => ({
      json: () => Promise.resolve(mockErrorResponse),
    }));
    global.fetch = fetchMock as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() => usePut({ url }));
    expect(result.current.loading).toBe(false);
    result.current.fetchData(mockCard);
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockErrorResponse.error);
    expect(result.current.data).toBeUndefined();
  });

  it('should set generic error message when there is a network error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error()));
    const { result, waitForNextUpdate } = renderHook(() => usePut({ url }));
    expect(result.current.loading).toBe(false);
    result.current.fetchData(mockCard);
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao tentar conectar com servidor');
    expect(result.current.data).toBeUndefined();
  });
});
