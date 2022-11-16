import type { MockupServer } from 'treadle-mockup-server';
import create from 'zustand';

interface MockupServerStore {
  mockupServer: MockupServer | null;
  setMockupServer: (mockupServer: MockupServer | null) => void;
}

export const useMockupServerStore = create<MockupServerStore>((set) => ({
  mockupServer: null,
  setMockupServer: (mockupServer) => set({ mockupServer }),
}));
