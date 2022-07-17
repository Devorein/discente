import { API_VERSION, SERVER_URL } from '@constants';
import { ApiRequest, ErrorApiResponse } from '@types';
import axios, { AxiosError } from 'axios';
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from 'react-query';

export function useApiQuery<QueryApi extends ApiRequest<any, any> = ApiRequest>(
  key: QueryKey,
  endpoint: string,
  useQueryOptions?: Omit<
    UseQueryOptions<QueryApi['response'], Error, QueryApi['response']>,
    'queryFn'
  >
): UseQueryResult<QueryApi['response'], Error> {
  return useQuery<QueryApi['response'], Error, QueryApi['response']>({
    ...useQueryOptions,
    queryKey: useQueryOptions?.queryKey ?? key,
    async queryFn() {
      try {
        const { data: response } = await axios.request<QueryApi['response']>({
          url: `${SERVER_URL}/${API_VERSION}/${endpoint}`,
          method: 'GET',
          withCredentials: true
        });
        if (response.status === 'error') {
          throw new Error(response.error.toString());
        }
        return response;
      } catch (err: any) {
        throw new Error(
          (
            err as AxiosError<ErrorApiResponse>
          )?.response?.data?.error?.toString() ?? err.message
        );
      }
    }
  });
}
