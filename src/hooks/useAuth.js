import { useCallback } from 'react';

function useAuth() {
  const signInWithCredentials = useCallback(async (options) => {
    console.log('signInWithCredentials mocked', options);
    return Promise.resolve({ ok: true });
  }, []);

  const signUpWithCredentials = useCallback(async (options) => {
    console.log('signUpWithCredentials mocked', options);
    return Promise.resolve({ ok: true });
  }, []);

  const signInWithGoogle = useCallback(async (options) => {
    console.log('signInWithGoogle mocked', options);
    return Promise.resolve({ ok: true });
  }, []);

  const signInWithFacebook = useCallback(async (options) => {
    console.log('signInWithFacebook mocked', options);
    return Promise.resolve({ ok: true });
  }, []);

  const signInWithTwitter = useCallback(async (options) => {
    console.log('signInWithTwitter mocked', options);
    return Promise.resolve({ ok: true });
  }, []);

  const signOut = useCallback(async () => {
    console.log('signOut mocked');
    return Promise.resolve({ ok: true });
  }, []);

  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signOut,
  }
}

export default useAuth;
