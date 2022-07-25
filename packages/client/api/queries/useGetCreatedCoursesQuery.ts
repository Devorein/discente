import { apiConstants } from '@constants';
import { GetPaginatedCourses } from '@types';
import { useInfiniteQueryApi } from 'hooks';

export function useGetCreatedCoursesQuery(
  payload: GetPaginatedCourses['payload']
) {
  return useInfiniteQueryApi<GetPaginatedCourses>(
    apiConstants.getCreatedCourses.key(payload),
    apiConstants.getCreatedCourses.endpoint,
    payload
  );
}
