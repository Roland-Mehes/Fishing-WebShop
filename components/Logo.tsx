import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
  className?: string;
};

const sizeMap = {
  sm: 'h-6',
  md: 'h-10',
  lg: 'h-14',
};

const Logo = ({ size = 'lg', priority = false, className }: LogoProps) => {
  return (
    <Link href="/" className="inline-flex items-center ">
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={200}
        priority={priority}
        className={clsx(sizeMap[size], 'w-auto', className)}
      />
    </Link>
  );
};

export default Logo;
