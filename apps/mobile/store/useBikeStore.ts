import type { TRDLBJsonToken } from 'treadle-mockup-server';
import create from 'zustand';

interface UseBikeStore {
  bikes: TRDLBJsonToken[];
  setBikes: (bikes: TRDLBJsonToken[]) => void;
  selectedBike: TRDLBJsonToken | null;
  setSelectedBike: (bike: TRDLBJsonToken | null) => void;
}

export const useBikeStore = create<UseBikeStore>((set) => ({
  bikes: [],
  setBikes: (bikes) => set({ bikes }),
  selectedBike: null,
  setSelectedBike: (bike) => set({ selectedBike: bike }),
}));