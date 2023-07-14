'use client';

import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center w-screen h-screen">
      <h1 className="font-bold text-2xl">404. Oops! Page not found.</h1>
      <Link href={'/'} className="underline hover:text-muted-foreground">
        Go To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
