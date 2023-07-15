import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import getData from "../helpers/api/getdData";
import filterArr from "../helpers/filterArr";

export const useBeerStore = create(
  persist(
    devtools((set) => ({
      beers: [],
      page: 1,
      fetchBeers: (method: string) =>
        set(async (state: any) => {
          if (method === "start") {
            const res = await getData(state.page);
            set({ beers: [...res] });
          } else {
            const res = await getData(state.page + 1);
            set({ beers: [...state.beers, ...res], page: state.page + 1 });
          }
        }),
      removeBeers: (idArr: number[]) =>
        set((state: any) => {
          const newArr = filterArr(state.beers, idArr);
          return { beers: newArr };
        }),
      removePages: () => set({ page: 0 }),
    })),
    {
      name: "beer-storage",
    }
  )
);

export const useItemsStore = create(
  persist(
    devtools((set) => ({
      items: [],
    })),
    { name: "items-storage" }
  )
);
