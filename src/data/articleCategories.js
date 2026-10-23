export const articleCategories = [
  { value: '', label: 'All' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'ai-systems', label: 'AI Systems' },
  { value: 'business', label: 'Business' },
  { value: 'mind', label: 'Mind & Growth' },
];

export function getArticleCategoryLabel(value) {
  return articleCategories.find((category) => category.value === value)?.label || 'General';
}
