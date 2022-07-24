import * as yup from 'yup';

export function createCoursePayloadSchema() {
  return yup
    .object()
    .shape({
      image: yup.string().required(),
      description: yup.string().required(),
      title: yup.string().required(),
      status: yup
        .string()
        .required()
        .oneOf(['public', 'private'], 'Status can only be public or private'),
      price: yup.number().required(),
      tags: yup.array().of(yup.string()).required()
    })
    .strict()
    .noUnknown();
}
