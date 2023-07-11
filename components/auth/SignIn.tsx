'use client';

import OAuthForm from './OAuthForm';

const SignIn = () => {
  return (
    <div className="mx-auto flex flex-col w-full h-screen items-center justify-center space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>

      <OAuthForm />
    </div>
  );
};

export default SignIn;
