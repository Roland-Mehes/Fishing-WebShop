'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      router.refresh();

      if (result.data?.user.role === 'super_admin') {
        router.push('/admin');
      } else if (result.data?.user.role === 'customer') {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl">Garnai Fishing</h1>

          <p className="mt-3">
            Sign in to access your account and manage your orders.
          </p>
        </div>

        {/* Form Card */}
        <Card
          className="
            border-border
            bg-card/95
            backdrop-blur-xl
            shadow-2xl
          "
        >
          <CardContent className="p-6">
            <form onSubmit={login} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm text-muted-foreground"
                >
                  Email
                </label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    bg-background
                    border-border
                    focus-visible:ring-primary/40
                  "
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm text-muted-foreground"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="
                      text-sm
                      text-primary
                      hover:opacity-80
                      transition-opacity
                    "
                  >
                    Forgot?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    bg-background
                    border-border
                    focus-visible:ring-primary/40
                  "
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="my-6 h-px bg-border" />

            <p className="text-center text-sm text-muted-foreground">
              Dont have an account?
              <Link
                href="/signup"
                className="
                  text-primary
                  font-medium
                  hover:opacity-80
                  transition-opacity
                "
              >
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
