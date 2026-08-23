'use client';

import { ImagePlus, X } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type CategoryFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CategoryForm({ open, onOpenChange }: CategoryFormProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Adaugă categorie</SheetTitle>

          <SheetDescription>
            Creează o categorie nouă pentru magazin.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="category-name">Nume</Label>

            <Input id="category-name" placeholder="Ex. Lansete" />
          </div>

          {/* Parent */}
          <div className="space-y-2">
            <Label>Categoria părinte</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Fără categorie" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">Fără categorie</SelectItem>

                <SelectItem value="lansete">Lansete</SelectItem>

                <SelectItem value="mulinete">Mulinete</SelectItem>

                <SelectItem value="fire">Fire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="category-slug">Slug</Label>

            <Input id="category-slug" placeholder="lansete" />

            <p className="text-xs text-muted-foreground">
              Slug-ul este folosit în URL-ul categoriei.
            </p>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Imagine</Label>

            <div className="relative flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:bg-muted/50">
              <ImagePlus className="mb-3 size-7 text-muted-foreground" />

              <p className="text-sm font-medium">Încarcă o imagine</p>

              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG sau WebP
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Alege imagine
              </Button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="text-sm font-medium">Categorie activă</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Categoria va fi vizibilă în magazin.
              </p>
            </div>

            <Switch defaultChecked />
          </div>
        </div>

        <SheetFooter className="border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Anulează
          </Button>

          <Button type="button">Salvează</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
