import { roleEnum } from '@/db/schemas/auth-schema';
type Role = (typeof roleEnum.enumValues)[number];

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;

  // permission gate
  roles?: Role[];

  // optional grouping
  children?: NavItem[];
};
