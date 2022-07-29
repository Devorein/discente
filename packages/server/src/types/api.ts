export interface ErrorApiResponse {
  status: 'error';
  error: string;
}
export interface SuccessApiResponse<data> {
  status: 'success';
  data: data;
}
export type ApiResponse<Data> = SuccessApiResponse<Data> | ErrorApiResponse;
export type Paginated<Data> = {
  items: Data[];
  total: number;
  next: null | string;
};

export type SortOrder = 'asc' | 'desc';

export type PaginationPayload<Sort extends string> = Record<string, any> & {
  cursor: string | null;
  take: number;
  sort: Sort;
  order: SortOrder;
};

export interface ApiRequest<
  Payload = null | undefined,
  Data = null | undefined
> {
  payload: Payload;
  data: Data;
  response: ApiResponse<Data>;
}
