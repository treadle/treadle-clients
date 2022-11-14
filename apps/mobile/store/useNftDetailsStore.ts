import create from 'zustand';
import type { TRDLBJsonToken } from 'treadle-mockup-server';

interface NftDetailsState {
  nftDetails: TRDLBJsonToken | null;
  setNftDetails: (nft: TRDLBJsonToken) => void;
}

export const useNftDetailsStore = create<NftDetailsState>((set) => ({
  nftDetails: null,
  setNftDetails: (nftDetails: TRDLBJsonToken) => set({ nftDetails }),
}));
