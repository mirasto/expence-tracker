      if (user) {
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/shared/api/firebase';
import { useAppDispatch } from '@/app/providers/store/store';
import { setUser, setLoading } from '@/entities/user/model/slice';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
import { useEffect, ReactNode } from 'react';
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          providers: user.providerData.map((p) => p.providerId),
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};