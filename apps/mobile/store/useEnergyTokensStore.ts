import create from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from "./useAccountStore"

interface UseEnergyTokensStore {
  energy: number,
  tokens: number,
  setEnergy: (energy: number) => void,
  setTokens: (tokens: number) => void,
}

export const useEnergyTokensStore = create<UseEnergyTokensStore>()(
  persist(
    (set) => ({
      energy: 0,
      tokens: 0,
      setEnergy: (energy) => set({energy}),
      setTokens: (tokens) => set({tokens})
    }),
    {
      name: 'energy-tokens-storage', // unique name
      getStorage: () => storage,
    }
  )
);
