'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authClient } from '@/lib/auth-client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  signupSchema,
  SignupSchema,
} from '@/lib/validation/auth/signup-schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Field } from '@/components/ui/field';

import { Feature } from '@/components/Feature';

const Signup = () => {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      setErrorMsg(undefined);

      const result = await authClient.signUp.email({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      if (result.error) {
        setErrorMsg(result.error.message);
        return;
      }

      router.push('/');
    } catch {
      setErrorMsg('A apărut o eroare neașteptată. Încearcă din nou.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid min-h-[calc(100vh-10rem)] items-center gap-20 lg:grid-cols-2">
        {/* LEFT */}
        <section className="hidden max-w-lg flex-col justify-center lg:flex">
          <h1 className="font-heading text-5xl leading-tight text-foreground">
            Creează un cont.
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Accesează mai rapid comenzile, produsele favorite și istoricul
            achizițiilor tale.
          </p>

          <div className="mt-12 space-y-5">
            <Feature
              title="Comenzi mai rapide"
              description="Datele tale sunt salvate pentru checkout mai rapid."
            />

            <Feature
              title="Wishlist personal"
              description="Salvează produsele pe care vrei să le cumperi mai târziu."
            />

            <Feature
              title="Istoric complet"
              description="Vezi toate comenzile și produsele cumpărate anterior."
            />

            <Feature
              title="Oferte dedicate"
              description="Primești acces la promoții și beneficii pentru clienții fideli."
            />
          </div>
        </section>

        {/* RIGHT */}
        <section className="flex justify-center">
          <Card className="w-full max-w-lg border-border bg-card/90 shadow-2xl backdrop-blur-xl">
            <CardContent>
              <div className="mb-8">
                <h2 className="text-center text-3xl font-heading text-foreground">
                  Creează cont
                </h2>

                <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
                  Înregistrează-te și începe cumpărăturile.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Field className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm text-muted-foreground"
                  >
                    Nume
                  </Label>

                  <Input
                    id="name"
                    placeholder="Numele tău"
                    {...register('name', {
                      onChange: () => setErrorMsg(undefined),
                    })}
                  />

                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </Field>

                <Field className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm text-muted-foreground"
                  >
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="Adresa de email"
                    {...register('email', {
                      onChange: () => setErrorMsg(undefined),
                    })}
                  />

                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </Field>

                <Field className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm text-muted-foreground"
                  >
                    Parolă
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password', {
                      onChange: () => setErrorMsg(undefined),
                    })}
                  />

                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}

                  {errorMsg && (
                    <p className="text-sm text-destructive">{errorMsg}</p>
                  )}
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Se creează contul...' : 'Creează cont'}
                </Button>
              </form>

              <div className="my-6 h-px bg-border" />

              <div className="text-center text-sm text-muted-foreground">
                Ai deja cont?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary transition-opacity hover:opacity-80"
                >
                  Intră în cont.
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Signup;
