import { API_VERSION, SERVER_URL } from '@constants';
import { ApiRequest, Paginated } from '@types';
import axios from 'axios';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

export function useInfiniteQueryApi<
  QueryApi extends ApiRequest<any, Paginated<any>>
>(
  keys: string[],
  endpoint: string,
  payload?: QueryApi['payload'],
  options?: UseInfiniteQueryOptions<
    QueryApi['response'],
    Error,
    QueryApi['response'],
    QueryApi['response'],
    string[]
  >
) {
  const infiniteQuery = useInfiniteQuery<
    QueryApi['response'],
    Error,
    QueryApi['response'],
    string[]
  >(
    keys,
    async ({ pageParam = payload }) => {
      const urlSearchParams = new URLSearchParams();
      Object.entries(pageParam as Record<string, any>).forEach(
        ([key, value]) => {
          if (value) {
            urlSearchParams.append(key, value.toString());
          }
        }
      );

      const { data: response } = await axios.request<QueryApi['response']>({
        url: `${SERVER_URL}/${API_VERSION}/${endpoint}?${urlSearchParams.toString()}`,
        method: 'GET',
        withCredentials: true
      });
      if (response.status === 'error') {
        throw new Error(response.error.toString());
      }
      return response;
    },
    {
      ...options,
      enabled: Boolean(payload),
      getNextPageParam: (lastPage) =>
        !lastPage || (lastPage?.status === 'success' && lastPage?.data?.next)
    }
  );

  const totalItems =
    infiniteQuery.data && infiniteQuery.data.pages[0]?.status === 'success'
      ? infiniteQuery.data.pages[0].data?.total ?? 0
      : 0;

  const allItems: QueryApi['data']['items'] = [];
  infiniteQuery.data?.pages.forEach((page) => {
    if (page.status === 'success') {
      allItems.push(...(page.data.items ?? []));
    }
  });
  const lastFetchedPage =
    infiniteQuery.data && infiniteQuery.data.pages
      ? infiniteQuery.data.pages[infiniteQuery.data.pages.length - 1]
      : null;
  const lastFetchedItem = lastFetchedPage
    ? lastFetchedPage.status === 'success'
      ? lastFetchedPage.data.items[lastFetchedPage.data.items.length - 1]
      : null
    : null;

  return {
    ...infiniteQuery,
    totalItems,
    allItems,
    lastFetchedPage,
    lastFetchedItem
  };
}
