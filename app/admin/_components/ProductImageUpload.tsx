'use client';

import { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

type ProductImage = {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
};

type ProductImageUploadProps = {
  productId: string;
  productName: string;
  images: ProductImage[];
};

const ProductImageUpload = ({
  productId,
  productName,
  images: initialImages,
}: ProductImageUploadProps) => {
  const [isPending, startTransition] = useTransition();

  const [images, setImages] = useState(initialImages);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);

    if (!selectedFiles.length) return;

    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviews(previewUrls);

    e.target.value = '';
  };

  const handleRemovePreview = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setFiles((current) => current.filter((_, i) => i !== index));
    setPreviews((current) => current.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (!files.length) {
      toast.error('Selecteaza cel putin o imagine.');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();

      formData.append('productId', productId);

      files.forEach((file) => {
        formData.append('images', file);
      });

      // const result = await uploadProductImages(formData);

      // if (!result.success) {
      //   toast.error(result.error);
      //   return;
      // }

      toast.success('Imaginile au fost incarcate.');

      setFiles([]);
      setPreviews([]);
    });
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [previews]);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Imagini produs</CardTitle>

        <CardDescription>
          Gestioneaza imaginile pentru produsul {productName}.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Existing images */}
        {images.length > 0 && (
          <Field>
            <FieldLabel>Imagini existente</FieldLabel>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
                >
                  <Image
                    src={image.imageUrl}
                    alt={productName}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain"
                  />

                  {image.isPrimary && (
                    <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Principala
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Field>
        )}

        {/* Upload */}
        <Field>
          <FieldLabel>Adauga imagini</FieldLabel>

          {previews.length === 0 ? (
            <label
              htmlFor="product-images"
              className="
                flex
                min-h-40
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

              <span>Apasa sau trage imaginile aici</span>

              <span className="mt-1 text-xs">PNG, JPG, WEBP</span>
            </label>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {previews.map((preview, index) => (
                <div
                  key={preview}
                  className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
                >
                  <Image
                    src={preview}
                    alt={`${productName} ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain"
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 size-7"
                    onClick={() => handleRemovePreview(index)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Input
            id="product-images"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />

          <FieldDescription>
            Egy vagy tobb kepet is kivalaszthatsz.
          </FieldDescription>
        </Field>

        {files.length > 0 && (
          <div className="flex justify-end">
            <Button type="button" disabled={isPending} onClick={handleUpload}>
              {isPending
                ? 'Feltoltes...'
                : `Kepek feltoltese (${files.length})`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductImageUpload;
