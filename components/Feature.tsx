import { CheckCircle2 } from 'lucide-react';

type FeatureProps = {
  title: string;
  description: string;
};

export function Feature({ title, description }: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
        <CheckCircle2 className="h-5 w-5 text-primary" />
      </div>

      <div>
        <h3 className="font-medium text-foreground">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
