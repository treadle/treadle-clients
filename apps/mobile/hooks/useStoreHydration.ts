import { useEffect, useState } from 'react';

import { useAccountStore } from '../store/useAccountStore';

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useAccountStore.persist.hasHydrated);

  useEffect(() => {
    const unsubFinishHydration = useAccountStore.persist.onFinishHydration(() => setHydrated(true));

    setHydrated(useAccountStore.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
