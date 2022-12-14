import createStore from "zustand"

type storeType = {
    auth: boolean;
    token: string | null;
}

const useAuthStore = createStore<storeType>((set) => ({
    auth:false,
    token: null,
}));

export default useAuthStore;