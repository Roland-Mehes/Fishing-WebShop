import sharp from 'sharp';
import { randomUUID } from 'crypto';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { r2 } from './r2';

export async function uploadImage(file: File, folder: string) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const webpBuffer = await sharp(buffer)
    .webp({
      quality: 80,
    })
    .toBuffer();

  const fileName = `${randomUUID()}.webp`;

  const key = `${folder}/${fileName}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: webpBuffer,
      ContentType: 'image/webp',
    }),
  );

  return {
    key,
  };
}
