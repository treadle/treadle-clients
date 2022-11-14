import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import type * as nearAPI from 'near-api-js';
import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';

export const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log('storage.getItem', name);
    return (await getItemAsync(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log('storage.setItem', name, value);
    await setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log('storage.removeItem', name);
    await deleteItemAsync(name);
  },
};

interface UseAccountStore {
  account: nearAPI.Account | null;
  privateKey: string | null;
  masterAccount: nearAPI.Account | null;
  setAccount: (account: nearAPI.Account | null) => void;
  setMasterAccount: (account: nearAPI.Account | null) => void;
  setPrivateKey: (privateKey: string | null) => void;
}

export const useAccountStore = create<UseAccountStore>()(
  persist(
    (set) => ({
      account: null,
      masterAccount: null,
      privateKey: null,
      setAccount: (account) => set({ account }),
      setMasterAccount: (masterAccount) => set({ masterAccount }),
      setPrivateKey: (privateKey) => set({ privateKey }),
    }),
    {
      name: 'account-storage', // unique name
      getStorage: () => storage,
    }
  )
);
