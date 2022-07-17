import { ApiRequest } from '@types';

export type QueryCacheHitFn<
  QueryApi extends ApiRequest<any, any> = ApiRequest
> = (
  queryResponse: QueryApi['response'] | null | undefined
) => QueryApi['response'] | null | undefined;
