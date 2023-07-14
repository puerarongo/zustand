import { create } from "zustand";
import { devtools } from "zustand/middleware";
import getData from "../helpers/api/getdData";
import filterArr from "../helpers/filterArr";

export const useBearStore = create(
  devtools((set) => ({
    bears: [],
    page: 1,
    fetchBears: (method: string) =>
      set(async (state: any) => {
        if (method === "start") {
          const res = await getData(1);
          set({ bears: [...res] });
        } else {
          const res = await getData(state.page + 1);
          set({ bears: [...state.bears, ...res], page: state.page + 1 });
        }
      }),
    removeBears: (idArr: number[]) =>
      set((state: any) => {
        const newArr = filterArr(state.bears, idArr);
        return { bears: newArr };
      }),
    removePages: () => set({ page: 0 }),
  }))
);
