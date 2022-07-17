import { ApiRequest } from '@types';
import { useSnackbar } from 'notistack';
import { MutateOptions } from 'react-query';
import { QueryCacheHitFn } from 'types';

interface PostMutationOptions<
  MutationApi extends ApiRequest<any, any> = ApiRequest,
  QueryApi extends ApiRequest<any, any> = ApiRequest
> {
  successMessage?: string;
  errorMessage?: string;
  queryDataFn: (queryCacheHitFn: QueryCacheHitFn<QueryApi>) => void;
  cacheUpdate: (
    mutationResponseData: MutationApi['data'],
    queryResponse: QueryApi['response'] | null | undefined
  ) => QueryApi['response'] | null | undefined;
}

export function usePostMutation<
  MutationApi extends ApiRequest<any, any> = ApiRequest,
  QueryApi extends ApiRequest<any, any> = ApiRequest
>({
  successMessage,
  errorMessage,
  queryDataFn,
  cacheUpdate
}: PostMutationOptions<MutationApi, QueryApi>) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    onSuccess?: (
      response: MutationApi['data'],
      payload: MutationApi['payload']
    ) => void,
    _successMessage?: string
  ): MutateOptions<
    MutationApi['response'],
    string,
    MutationApi['payload'],
    unknown
  > => ({
    onSuccess: (mutationResponse, payload) => {
      if (mutationResponse.status === 'success') {
        onSuccess?.(mutationResponse.data as Response, payload);
        queryDataFn((queryResponse) =>
          cacheUpdate(mutationResponse.data, queryResponse)
        );
        if (successMessage || _successMessage) {
          enqueueSnackbar(_successMessage || successMessage, {
            variant: 'success'
          });
        }
      }
    },
    onError(err: any) {
      enqueueSnackbar(errorMessage ?? err.message, {
        variant: 'error'
      });
    }
  });
}
