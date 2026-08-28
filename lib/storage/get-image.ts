export function getImageUrl(key: string | null) {
  if (!key) return null;

  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

  if (!baseUrl) {
    throw new Error('R2 PUBLIC URL not set');
  }

  return `${baseUrl}/${key}`;
}
