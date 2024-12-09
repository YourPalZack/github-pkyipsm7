import { PlaceholderLogoUrl } from '../config/constants';

export function generateCompanyLogo(companyName: string | null): string {
  if (!companyName) return PlaceholderLogoUrl;

  const sanitizedName = companyName.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `https://source.unsplash.com/random/100x100?cannabis,${sanitizedName}`;
}

export function isValidImageUrl(url: string): boolean {
  return url.startsWith('http') && (
    url.includes('unsplash.com') || 
    url.endsWith('.jpg') || 
    url.endsWith('.png') || 
    url.endsWith('.jpeg') || 
    url.endsWith('.svg')
  );
}