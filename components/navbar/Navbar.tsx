'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ModeToggle } from './ModeToggle';
import { UserAvatar } from './Avatar';
import { Icons } from '../ui/icons';

const Navbar = () => {
  type TLinks = { name: string; href: string }[];

  const links: TLinks = [
    {
      name: 'Dashboard',
      href: '/'
    },
    {
      name: 'Products',
      href: '/products'
    }
  ];

  const session = useSession();

  return (
    <nav className="flex h-20 border-b justify-between items-center px-10">
      <Link
        href={'/'}
        className="underline font-bold hover:text-muted-foreground"
      >
        admin dashboard
      </Link>

      <div className="gap-x-4 flex">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:underline hover:text-muted-foreground"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-x-4 justify-center items-center">
        <ModeToggle />

        {session.status === 'loading' && (
          <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
        )}
        {session.status !== 'loading' && (
          <UserAvatar
            url={session.data?.user?.image!}
            name={session.data?.user?.name!}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
