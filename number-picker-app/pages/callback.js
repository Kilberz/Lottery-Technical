import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useHandleSignInCallback } from '@logto/react';

const SSOCallback = () => {
  const router = useRouter();
  const { isLoading, error, handleSignIn } = useHandleSignInCallback();

  useEffect(() => {
    if (!isLoading && !error) {
      // Navigate to the root path when the sign-in process is finished
      router.push('/');
    }
  }, [isLoading, error, router]);

  // Show a loading message while the sign-in process is ongoing
  if (isLoading) {
    return <div>Redirecting...</div>;
  }

  // Optionally handle errors if needed
  if (error) {
    return <div>Error during sign-in: {error.message}</div>;
  }

  return null;
};

export default SSOCallback;
