import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import getData from "../helpers/api/getdData";
import filterArr from "../helpers/filterArr";
import takeData from "../helpers/takeData";

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
      refreshBeersList: () => set({ bears: [], page: 1 }),
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
      addItems: (beersArr: any, point: number) => {
        const newItems = takeData(beersArr, point);
        console.log(newItems);
        set({ items: [...newItems] });
      },
      refreshItems: () => set({ items: [] }),
    })),
    { name: "items-storage" }
  )
);

export const usePointStore = create(
  persist(
    devtools((set) => ({
      point: 0,
      pointOperation: (point: number) => {
        set({ point });
      },
      refreshPoint: () => set({ point: 0 }),
    })),
    { name: "point-storage" }
  )
);
