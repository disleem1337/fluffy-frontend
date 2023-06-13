import create from "zustand";

type TFollowCache = {
  followsById: Map<string, boolean>;
  hash: string;
  isCached: (id: string) => boolean;
  getCacheValue: (id: string) => undefined | boolean;
  setCacheValue: (id: string, value: boolean) => void;
};

export const useFollowCache = create<TFollowCache>((set, get) => ({
  followsById: new Map(),
  hash: Date.now().toString(),

  isCached: (id: string) => get().followsById.get(id) != undefined,
  getCacheValue: (id: string) => get().followsById.get(id),
  setCacheValue: (id: string, value: boolean) => (
    get().followsById.set(id, value), set({ hash: Date.now().toString() })
  ),
}));
