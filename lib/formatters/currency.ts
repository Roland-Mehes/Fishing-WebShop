export function formatCurrency(value: number) {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
  }).format(value);
}

// Calculate Price Discount
export type Discount = {
  type: 'percentage' | 'fixed';
  value: number;
  startsAt: Date | null;
  endsAt: Date | null;
  active: boolean;
  deletedAt: Date | null;
};

export function getActiveDiscount(discounts: Discount[]) {
  const now = new Date();

  return (
    discounts.find((discount) => {
      if (!discount.active || discount.deletedAt) return false;

      if (discount.startsAt && discount.startsAt > now) return false;

      if (discount.endsAt && discount.endsAt < now) return false;

      return true;
    }) ?? null
  );
}
export function calculateDiscountedPrice(
  price: number,
  discount: Discount | null,
) {
  if (!discount) {
    return price;
  }

  if (discount.type === 'percentage') {
    return price - price * (discount.value / 100);
  }

  return Math.max(0, price - discount.value);
}
