'use client';

import { CategoryTreeItem } from './category-tree-item';

export type Category = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  active: boolean;
  image?: string;
  children?: Category[];
};

type CategoryTreeProps = {
  categories: Category[];
};

export function CategoryTree({ categories }: CategoryTreeProps) {
  return (
    <div className="divide-y divide-border">
      {categories.map((category) => (
        <CategoryTreeItem key={category.id} category={category} level={0} />
      ))}
    </div>
  );
}
