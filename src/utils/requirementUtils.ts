export function extractRequirements(description: string): string[] {
  const requirements: string[] = [];
  const sentences = description.split(/[.!?]+/);
  
  const requirementKeywords = [
    'require',
    'must have',
    'qualification',
    'experience',
    'skills',
  ];

  for (const sentence of sentences) {
    const sentenceLower = sentence.toLowerCase();
    if (requirementKeywords.some(keyword => sentenceLower.includes(keyword))) {
      const requirement = sentence.trim();
      if (requirement) requirements.push(requirement);
    }
  }

  return requirements.length > 0 
    ? requirements 
    : ['Experience in cannabis industry preferred'];
}