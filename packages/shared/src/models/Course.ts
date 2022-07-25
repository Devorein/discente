export default {
  sortableFields: [
    'title',
    'createdAt',
    'updatedAt',
    'price',
    'ratings',
    'enrolled',
    'status'
  ] as const,
  language: [
    'english',
    'french',
    'spanish',
    'portuguese',
    'arabic',
    'polish',
    'german',
    'italian',
    'bengali',
    'korean',
    'russian',
    'japanese',
    'hindi'
  ] as const,
  category: [
    'development',
    'business',
    'finance_and_accounting',
    'it_and_software',
    'office_productivity',
    'personal_development',
    'design',
    'marketing',
    'lifestyle',
    'photography_and_video',
    'health_and_fitness',
    'music',
    'teaching_and_academics'
  ] as const,
  level: ['beginner', 'intermediate', 'expert', 'all'] as const
};
