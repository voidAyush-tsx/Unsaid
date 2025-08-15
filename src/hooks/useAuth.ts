import { useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  AuthError // Import AuthError type
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // If there is a stored remember expiry, and it's passed, force sign out
      if (user && typeof window !== 'undefined') {
        try {
          const expiryStr = localStorage.getItem('unsaid_remember_expiry');
          if (expiryStr) {
            const expiry = Number(expiryStr);
            if (!Number.isNaN(expiry) && Date.now() > expiry) {
              // expiry passed -> clear storage and sign out
              localStorage.removeItem('unsaid_remember_expiry');
              await signOut(auth);
              setUser(null);
              setLoading(false);
              return;
            }
          }
        } catch {
          // ignore localStorage failures
        }
      }

      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error) {
      const err = error as AuthError;
      return { user: null, error: err.message };
    }
  };

  // rememberFor30Days: when true uses local persistence; otherwise session persistence
  const signIn = async (email: string, password: string, rememberFor30Days = false) => {
    try {
      // choose persistence based on remember flag
      await setPersistence(
        auth,
        rememberFor30Days ? browserLocalPersistence : browserSessionPersistence
      );

      const result = await signInWithEmailAndPassword(auth, email, password);

      // when remembering, store an expiry timestamp (ms) for 30 days
      if (rememberFor30Days && typeof window !== 'undefined') {
        try {
          const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
          localStorage.setItem('unsaid_remember_expiry', String(expiry));
        } catch {
          // ignore localStorage failures
        }
      }

      return { user: result.user, error: null };
    } catch (error) {
      const err = error as AuthError;
      return { user: null, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('unsaid_remember_expiry');
        } catch {}
      }
      return { error: null };
    } catch (error) {
      const err = error as AuthError;
      return { error: err.message };
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    logout
  };
};
