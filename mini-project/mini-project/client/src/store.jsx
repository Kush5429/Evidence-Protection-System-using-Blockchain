import {create} from 'zustand';
import { persist } from 'zustand/middleware'

const useUserStore = create(persist((set) => ({
    user: {},
    setUser: (objUser) => set((state) => ({user: objUser})),
    loggedIn: false,
    setLoggedIn: (isLogin) => set((state) => ({loggedIn: isLogin})),
    }), {
        name: 'user-store',
        getStorage: () => localStorage,
    }));

export default useUserStore;