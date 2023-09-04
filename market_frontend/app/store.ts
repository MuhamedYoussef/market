import { create } from "zustand";
import { UserType } from "@/app/types";

type Store = {
	user?: UserType;
	setUser: (user?: UserType) => void;
};

export const useStore = create<Store>()((set) => ({
	user: undefined,
	setUser: (user?: UserType) => set({ user }),
}));
