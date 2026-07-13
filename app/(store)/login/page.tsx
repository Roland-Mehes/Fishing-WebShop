'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginSchema } from '@/lib/validation/auth/login-schema';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Feature } from '@/components/Feature';

import { useState } from 'react';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const onSubmit = async (data: LoginSchema) => {
    try {
      setErrorMsg('');

      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error || !result.data) {
        setErrorMsg(result.error.message);
        return;
      }

      if (result.data?.user.role === 'super_admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMsg('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="grid min-h-[calc(100vh-10rem)] lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <section className="hidden lg:flex flex-col justify-center max-w-lg">
          <h1 className="font-heading text-5xl leading-tight text-foreground">
            Bine ai revenit.
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Continuă-ți aventura în pescuit și gestionează totul dintr-un singur
            loc.
          </p>

          <div className="mt-12 space-y-5">
            <Feature
              title="Urmărește comenzile"
              description="Monitorizează fiecare comandă, de la plasarea acesteia până la livrare."
            />

            <Feature
              title="Wishlist"
              description="Salvează echipamentele preferate pentru următoarea ta partidă de pescuit."
            />

            <Feature
              title="Achiziții anterioare"
              description="Comandă din nou rapid produsele tale preferate."
            />

            <Feature
              title="Recompense de fidelitate"
              description="Beneficiază de reduceri exclusive și avantaje dedicate membrilor."
            />
          </div>
        </section>

        {/* RIGHT */}
        <section className="flex justify-center">
          {/* Form Card */}
          <Card
            className="
          w-full max-w-lg border-border bg-card/90 backdrop-blur-xl shadow-2xl
          "
          >
            <CardContent>
              <div className="mb-8">
                <h2 className="text-3xl text-center font-heading text-foreground">
                  Sign in
                </h2>

                <p className="mt-2 text-center text-sm text-muted-foreground leading-6">
                  Accesează-ți contul, comenzile și lista de dorințe.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                      onChange: () => setErrorMsg(''),
                    })}
                    className="
                    bg-background
                    border-border
                    focus-visible:ring-primary/40
                  "
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </Field>

                <Field className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm text-muted-foreground"
                    >
                      Parolă
                    </Label>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password', {
                      onChange: () => setErrorMsg(''),
                    })}
                    className="
                    bg-background
                    border-border
                    focus-visible:ring-primary/40
                  "
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {' '}
                      {errors.password.message}
                    </p>
                  )}
                  {errorMsg && (
                    <p className="text-sm text-destructive">{errorMsg} </p>
                  )}
                </Field>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full mt-2"
                >
                  {isSubmitting ? 'Se încarcă...' : 'Intră în cont'}
                </Button>
              </form>

              <div className="my-6 h-px bg-border" />

              <div className="mt-8 space-y-3 text-center text-sm">
                <p className="text-center text-sm text-muted-foreground">
                  Nu ai încă un cont?{' '}
                  <Link
                    href="/signup"
                    className="
                  text-primary
                  font-medium
                  hover:opacity-80
                  transition-opacity
                "
                  >
                    Creează unul.
                  </Link>
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Ai uitat parola?{' '}
                  <Link
                    href="/forgot-password"
                    className="
                      text-sm
                      text-primary
                      hover:opacity-80
                      transition-opacity
                    "
                  >
                    Resetează parola.{' '}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Login;
