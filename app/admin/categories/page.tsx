'use client';

import { useState } from 'react';
import { Plus, Search, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  CategoryTree,
  type Category,
} from '@/app/admin/_components/categories/category-tree';

import { CategoryForm } from '@/app/admin/_components/categories/category-form';

const categories: Category[] = [
  {
    id: '1',
    name: 'Lansete',
    slug: 'lansete',
    productCount: 342,
    active: true,
    image: '/lansete.webp',

    children: [
      {
        id: '1-1',
        name: 'Lansete crap',
        slug: 'lansete-crap',
        productCount: 124,
        active: true,
      },
      {
        id: '1-2',
        name: 'Lansete feeder',
        slug: 'lansete-feeder',
        productCount: 87,
        active: true,
      },
      {
        id: '1-3',
        name: 'Lansete spinning',
        slug: 'lansete-spinning',
        productCount: 131,
        active: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Mulinete',
    slug: 'mulinete',
    productCount: 218,
    active: true,
    children: [
      {
        id: '2-1',
        name: 'Mulinete crap',
        slug: 'mulinete-crap',
        productCount: 91,
        active: true,
      },
      {
        id: '2-2',
        name: 'Mulinete feeder',
        slug: 'mulinete-feeder',
        productCount: 127,
        active: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Fire',
    slug: 'fire',
    productCount: 156,
    active: true,
  },
  {
    id: '4',
    name: 'Momeli',
    slug: 'momeli',
    productCount: 489,
    active: true,
  },
  {
    id: '5',
    name: 'Accesorii',
    slug: 'accesorii',
    productCount: 731,
    active: true,
  },
  {
    id: '6',
    name: 'Crap',
    slug: 'crap',
    productCount: 284,
    active: false,
  },
];

export default function CategoriesPage() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Categorii</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Gestionează categoriile și structura magazinului.
            </p>
          </div>

          <Button onClick={() => setFormOpen(true)}>
            <Plus className="size-4" />
            Adaugă categorie
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input placeholder="Caută categorii..." className="pl-9" />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Toate</SelectItem>

              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label="Reîmprospătează"
          >
            <RefreshCw className="size-4" />
          </Button>
        </div>

        {/* Category container */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* Table header */}
          <div className="hidden items-center gap-3 border-b border-border bg-muted/30 px-4 py-3 text-xs font-medium text-muted-foreground sm:flex">
            <div className="w-16" />

            <div className="flex-1">Categorie</div>

            <div className="w-32 text-right">Produse</div>

            <div className="w-24">Status</div>

            <div className="w-10" />
          </div>

          <CategoryTree categories={categories} />
        </div>
      </div>

      <CategoryForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
}
