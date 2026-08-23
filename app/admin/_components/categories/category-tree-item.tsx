'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Category } from './category-tree';
import { CategoryActions } from './category-actions';
import Image from 'next/image';

type CategoryTreeItemProps = {
  category: Category;
  level: number;
};

export function CategoryTreeItem({ category, level }: CategoryTreeItemProps) {
  const [expanded, setExpanded] = useState(level === 0);

  const hasChildren = Boolean(
    category.children && category.children.length > 0,
  );

  return (
    <div>
      <div
        className={cn(
          'group flex min-h-16 items-center gap-3 px-4 py-3 transition-colors',
          'hover:bg-muted/50',
          !category.active && 'opacity-60',
        )}
        style={{
          paddingLeft: `${16 + level * 32}px`,
        }}
      >
        {/* Expand */}
        <div className="flex size-6 shrink-0 items-center justify-center">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          ) : null}
        </div>

        {/* Image / fallback */}
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
          {category.image ? (
            <Image
              width={40}
              height={40}
              alt={category.slug}
              src={category.image}
              className="size-full object-cover"
            />
          ) : (
            <Folder className="size-5 text-muted-foreground" />
          )}
        </div>

        {/* Name */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-foreground">
            {category.name}
          </div>

          <div className="truncate text-xs text-muted-foreground">
            /{category.slug}
          </div>
        </div>

        {/* Product count */}
        <div className="hidden w-32 text-right text-sm text-muted-foreground md:block">
          {category.productCount} produse
        </div>

        {/* Status */}
        <div className="hidden w-24 sm:block">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-medium',
              category.active
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-muted-foreground',
            )}
          >
            <span
              className={cn(
                'size-1.5 rounded-full',
                category.active ? 'bg-emerald-500' : 'bg-muted-foreground/50',
              )}
            />

            {category.active ? 'Activă' : 'Inactivă'}
          </span>
        </div>

        <CategoryActions active={category.active} />
      </div>

      {/* Children */}
      {hasChildren && expanded ? (
        <div>
          {category.children!.map((child) => (
            <CategoryTreeItem
              key={child.id}
              category={child}
              level={level + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
