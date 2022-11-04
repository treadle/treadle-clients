import create from 'zustand';
import { persist } from 'zustand/middleware';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

interface AccountIdStore {
  accountId: string | null;
  setAccountId: (accountId: string | null) => void;
}

export const useAccountIdStore = create(
  persist<AccountIdStore>(
    (set) => ({
      accountId: null,
      setAccountId: (accountId) => set({ accountId }),
    }),
    {
      name: 'account-id-storage', // unique name
      getStorage: () => ({
        getItem: getItemAsync,
        setItem: setItemAsync,
        removeItem: deleteItemAsync,
      })
    },
  ),
);