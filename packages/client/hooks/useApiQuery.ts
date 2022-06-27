import { API_VERSION, SERVER_URL } from '@constants';
import { ApiResponse, ErrorApiResponse } from '@types';
import axios, { AxiosError } from 'axios';
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from 'react-query';

export function useApiQuery<
  ResponseData,
  ModifiedData = ApiResponse<ResponseData>
>(
  key: QueryKey,
  endpoint: string,
  useQueryOptions?: Omit<
    UseQueryOptions<ApiResponse<ResponseData>, Error, ModifiedData>,
    'queryFn'
  >
): UseQueryResult<ModifiedData, Error> {
  return useQuery<ApiResponse<ResponseData>, Error, ModifiedData>({
    ...useQueryOptions,
    queryKey: useQueryOptions?.queryKey ?? key,
    async queryFn() {
      try {
        const { data: response } = await axios.request<
          ApiResponse<ResponseData>
        >({
          url: `${SERVER_URL}/${API_VERSION}/${endpoint}`,
          method: 'GET',
          withCredentials: true
        });
        if (response.status === 'error') {
          throw new Error(response.error.toString());
        }
        return response;
      }
      catch (err: any) {
        throw new Error(
          (
            err as AxiosError<ErrorApiResponse>
          )?.response?.data?.error?.toString() ?? err.message
        );
      }
    }
  });
}
