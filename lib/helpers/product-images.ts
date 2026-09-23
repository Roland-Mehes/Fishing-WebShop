type PrimaryImageCandidate = {
  sortOrder: number;
  isPrimary: boolean;
};

export function getPrimaryProductImage<T extends PrimaryImageCandidate>(
  images: T[],
) {
  return (
    images.find((image) => image.isPrimary) ??
    [...images].sort((a, b) => a.sortOrder - b.sortOrder)[0]
  );
}
