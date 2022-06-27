import { API_VERSION, SERVER_URL } from '@constants';
import { ApiResponse, ErrorApiResponse } from '@types';
import axios, { AxiosError, Method } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

export function useApiMutation<Response = null, Payload = null>(
  keys: string[],
  endpoint: string,
  method?: Method,
  options?: UseMutationOptions<ApiResponse<Response>, string, Payload>
) {
  return useMutation<ApiResponse<Response>, string, Payload>(
    keys,
    async (payload) => {
      try {
        const { data: response } = await axios.request<ApiResponse<Response>>({
          url: `${SERVER_URL}/${API_VERSION}/${endpoint}`,
          data: payload,
          method: method ?? 'post',
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
          )?.response?.data.error.toString() ?? err.message
        );
      }
    },
    options
  );
}
