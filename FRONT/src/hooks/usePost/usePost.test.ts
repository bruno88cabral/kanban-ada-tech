import { renderHook } from '@testing-library/react-hooks';
import usePost from './index';

describe('usePost', () => {
  const url = 'https://example.com';
  const token = '1234';

  it('should return initial state', () => {
    const { result } = renderHook(() => usePost(url));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.post).toBeInstanceOf(Function);
  });

  it('should make a POST request and update state', async () => {
    const responseData = { id: 1, title: 'Post title' };
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(responseData),
    });
    global.fetch = mockFetch;

    const { result, waitForNextUpdate } = renderHook(() => usePost(url, token));

    expect(result.current.isLoading).toBeFalsy();

    result.current.post({ title: 'Post title' });

    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(mockFetch).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual(responseData);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('should handle POST request error', async () => {
    const error = new Error('Error message');
    const mockFetch = jest.fn().mockRejectedValueOnce(error);
    global.fetch = mockFetch;

    const { result, waitForNextUpdate } = renderHook(() => usePost(url));

    expect(result.current.isLoading).toBeFalsy();

    result.current.post({ title: 'Post title' });

    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(mockFetch).toHaveBeenCalledTimes(1);

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(error);
    expect(result.current.isLoading).toBeFalsy();
  });
});
