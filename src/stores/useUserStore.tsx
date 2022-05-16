import { current } from 'immer';
import create, { State } from 'zustand';

import { User } from '../models/types';

interface UserStore extends State {
  currentUser: User | null,
  userSetAuth: (userinfo: any) => void,
}

const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  userSetAuth: (userinfo) => {
    set((s) => ({ currentUser: userinfo }))
  },
}));

export default useUserStore;