export function getImageUrl(key: string | null) {
  if (!key) return null;

  return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
}
