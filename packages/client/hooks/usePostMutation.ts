import { ApiResponse } from '@types';
import { useSnackbar } from 'notistack';
import { MutateOptions } from 'react-query';

export function usePostMutation<Payload = null, Response = null>(
  successMessage?: string,
  errorMessage?: string
) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    onSuccess?: (response: Response, payload: Payload) => void,
    _successMessage?: string
  ): MutateOptions<ApiResponse<Response>, string, Payload, unknown> => ({
    onSuccess: (response, payload) => {
      if (response.status === 'success') {
        onSuccess?.(response.data as Response, payload);
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
