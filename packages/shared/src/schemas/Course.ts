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

export function getPaginatedCoursesPayloadSchema() {
  return yup
    .object()
    .shape({
      cursor: yup.string(),
      take: yup
        .number()
        .min(5)
        .max(100)
        .positive()
        .transform((value) => parseInt(value, 10))
        .required(),
      sort: yup
        .string()
        .oneOf([
          'createdAt',
          'updatedAt',
          'title',
          'price',
          'ratings',
          'enrolled'
        ])
        .required(),
      order: yup.string().oneOf(['asc', 'desc']).required()
    })
    .noUnknown();
}
