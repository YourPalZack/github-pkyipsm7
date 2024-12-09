export function determineJobCategory(title: string): string {
  const titleLower = title.toLowerCase();
  
  const categoryMatches = {
    'Cultivation': ['grow', 'cultiva'],
    'Retail': ['retail', 'dispensary'],
    'Processing': ['process', 'extract'],
    'Marketing': ['market'],
    'Administration': ['admin', 'manage'],
  } as const;

  for (const [category, keywords] of Object.entries(categoryMatches)) {
    if (keywords.some(keyword => titleLower.includes(keyword))) {
      return category;
    }
  }

  return 'Other';
}