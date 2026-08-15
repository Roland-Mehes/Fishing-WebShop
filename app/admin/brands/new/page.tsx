'use client';

import { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { createBrand } from '@/actions/brands/create-brand';
import {
  createBrandSchema,
  CreateBrandInput,
} from '@/lib/validation/brands/brand-schema';
import { toast } from 'sonner';

const AddNewBrand = () => {
  const [isPending, startTransition] = useTransition();

  const [preview, setPreview] = useState<string | null>(null);

  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBrandInput>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: CreateBrandInput) => {
    startTransition(async () => {
      const formData = new FormData();

      formData.append('name', data.name);

      if (image) {
        formData.append('image', image);
      }

      const result = await createBrand(formData);

      if (!result.success) {
        throw new Error('Baj van! : ' + result.error);
        // return;
      }
      toast.success(`Producatorul ${data.name} salvat`);
      reset();
      setImage(null);
      setPreview(null);
    });
  };

  const handleReset = () => {
    reset();
    setImage(null);
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Card className="max-w-4xl gap-6 ">
      <CardHeader>
        <CardTitle>Adauga Producator</CardTitle>
        <CardDescription>
          Creeaza un nou producator pentru magazin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6">
            <Field>
              <FieldLabel htmlFor="brand-name">Nume Producator</FieldLabel>

              <Input
                id="brand-name"
                placeholder="Daiwa"
                {...register('name')}
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </Field>

            {!preview ? (
              <Field>
                <FieldLabel>Logo Producator</FieldLabel>

                <label
                  htmlFor="image"
                  className="
                    flex
                    h-40
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-dashed
                    text-muted-foreground
                    transition-colors
                    hover:bg-accent/50
                  "
                >
                  <Upload className="mb-3 size-6" />

                  <span>Apasa sau trage imaginea aici</span>

                  <span className="text-xs">PNG, JPG, WEBP</span>
                </label>

                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />

                <FieldDescription>
                  Logo-ul va fi afisat pe pagina produselor.
                </FieldDescription>
              </Field>
            ) : (
              <Image
                src={preview}
                alt="Brand Logo"
                width={100}
                height={100}
                className="h-24 w-24 object-contain"
              />
            )}

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Se salveaza...' : 'Salveaza Producatorul'}
              </Button>

              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewBrand;
