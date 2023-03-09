import { renderHook, act } from '@testing-library/react-hooks';
import useLazyGet from './index';

const url = 'http://localhost:5000/cards';
describe('useLazyGet', () => {
  it('should fetch data when called', async () => {
    const mockData = [
      { id: '1', name: 'Card 1' },
      { id: '2', name: 'Card 2' },
    ];
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useLazyGet({ url }));

    expect(result.current.result.data).toBeUndefined();
    expect(result.current.result.error).toBeFalsy();

    act(() => {
      result.current.fetchData('token');
    });

    await waitForNextUpdate();

    expect(result.current.result.data).toEqual(mockData);
    expect(result.current.result.error).toBeFalsy();
  });

  it('should set error flag if request fails', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject(new Error('Error fetching data'))
      );

    const { result, waitForNextUpdate } = renderHook(() => useLazyGet({ url }));

    expect(result.current.result.data).toBeUndefined();
    expect(result.current.result.error).toBeFalsy();

    act(() => {
      result.current.fetchData('token');
    });

    await waitForNextUpdate();

    expect(result.current.result.data).toBeUndefined();
    expect(result.current.result.error).toBeTruthy();
  });
});
