import { apiConstants } from '@constants';
import { CreateCourse } from '@types';
import { useApiMutation } from 'hooks';

export function useCreateCourseMutation() {
  return useApiMutation<CreateCourse>(
    apiConstants.createCourse.key(),
    apiConstants.createCourse.endpoint,
    'post'
  );
}
