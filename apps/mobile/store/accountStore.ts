import create from 'zustand';
import { persist } from 'zustand/middleware';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import type * as nearAPI from 'near-api-js';

interface AccountStore {
  account: nearAPI.Account | null;
  setAccount: (account: nearAPI.Account | null) => void;
}

export const useAccountStore = create(
  persist<AccountStore>(
    (set) => ({
      account: null,
      setAccount: (account) => set({ account }),
    }),
    {
      name: 'account-storage', // unique name
      getStorage: () => ({
        getItem: getItemAsync,
        setItem: setItemAsync,
        removeItem: deleteItemAsync,
      })
    },
  ),
);