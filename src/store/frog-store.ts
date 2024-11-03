import { create } from "zustand";
import { initialBoard as board } from "../lib/board";
import { femaleFrog, maleFrog } from "../lib/frog";
import { calculateAvailableFields, coordinateToKey } from "../utils/board";
import { generateBabyFrog, generateFrogPath } from "../utils/frog";

type FrogStoreT = {
  board: Map<BoardCoordinateKey, BoardValue>;
  getBoardValue: (coord: BoardCoordinateKey) => BoardValue | undefined;
  setBoardValue: (coord: BoardCoordinateKey, value: BoardValue) => void;
  population: FrogT[];
  selectedFrog: number | null;
  selectFrog: (id: number) => void;
  selectedField: [BoardCoordinateKey, BoardValue] | null;
  selectField: (coord: BoardCoordinateKey | null) => void;
  breed: (firstFrogId: number, secondFrogId: number) => void;
  getFrogById: (id: number) => FrogT | undefined;
  changeFrogPosition: (id: number, coord: BoardCoordinateKey) => void;
  findAvailableFields: (type: "jump" | "born") => BoardCoordinateKey[];
  checkBreedingPossibility: () => void;
  frogsAvailableForBreeding: number[];
  selectForBreeding: (id: number | null) => void;
  selectedForBreeding: number | null;
  error: string | null;
  setError: (error: string | null) => void;
};

export const useFrogStore = create<FrogStoreT>((set, get) => ({
  board: board,
  getBoardValue: (coord: BoardCoordinateKey) => get().board.get(coord),
  setBoardValue: (coord: BoardCoordinateKey, value: BoardValue) =>
    set((state) => ({ board: new Map(state.board).set(coord, value) })),
  population: [maleFrog, femaleFrog],
  selectedFrog: null,
  selectFrog: (id: number) => set(() => ({ selectedFrog: id })),
  selectedField: null,
  selectField: (coord: BoardCoordinateKey | null) =>
    set((state) => ({
      selectedField: coord ? [coord, state.board.get(coord) || null] : null,
    })),
  breed: (firstFrogId: number, secondFrogId: number) => {
    const firstFrog = get().getFrogById(firstFrogId) as FrogT;
    const secondFrog = get().getFrogById(secondFrogId) as FrogT;

    const availableBornSpot = calculateAvailableFields(
      "born",
      get().board,
      firstFrog.gender === "female" ? firstFrog : secondFrog
    );

    if (availableBornSpot.length) {
      const babyFrog = generateBabyFrog(
        firstFrog,
        secondFrog,
        get().population.length + 1,
        availableBornSpot[0]
      );

      console.log(babyFrog);

      set((state) => ({
        population: [...state.population, babyFrog],
        board: new Map(state.board).set(babyFrog.position, babyFrog.id),
      }));
    } else {
      get().setError(import.meta.env.VITE_NO_PLACE_FOR_KIDS);
    }
  },

  getFrogById: (id: number) => get().population.find((frog) => frog.id === id),
  changeFrogPosition: (id: number, coord: BoardCoordinateKey) => {
    const frog = get().getFrogById(id);

    if (frog) {
      const steps = generateFrogPath(frog.position, coord);
      const population = get().population;

      console.log(steps);
      let i = 0;
      setTimeout(() => {
        get().setBoardValue(frog.position, null);
      }, 250);

      for (const step of steps) {
        const movedFrog = { ...frog, position: JSON.stringify(step) };
        const filteredPopulation = population.filter((it) => it.id !== frog.id);
        const prev = get().board.get(movedFrog.position) as BoardValue;

        setTimeout(() => {
          set({ population: [...filteredPopulation, movedFrog] });

          get().setBoardValue(JSON.stringify(step), movedFrog.id);
        }, 250 + 250 * i);

        if (movedFrog.position !== JSON.stringify(steps[steps.length - 1])) {
          setTimeout(() => {
            get().setBoardValue(movedFrog.position, prev);
          }, 500 + 250 * i);
        }
        i++;
      }
    }
  },
  findAvailableFields: (type: "jump" | "born") => {
    const selectedFrogId = get().selectedFrog;
    if (selectedFrogId) {
      const frog = get().getFrogById(selectedFrogId) as FrogT;
      return calculateAvailableFields(type, get().board, frog);
    } else return [];
  },
  checkBreedingPossibility: () => {
    get().selectForBreeding(null);
    const selectedFrogId = get().selectedFrog;
    if (selectedFrogId) {
      const availableFrogIds: number[] = [];
      const selectedFrog = get().getFrogById(selectedFrogId) as FrogT;
      const frogCoord = JSON.parse(selectedFrog.position) as [number, number];

      for (let x = frogCoord[0] - 1; x <= frogCoord[0] + 1; x++) {
        for (let y = frogCoord[1] - 1; y <= frogCoord[1] + 1; y++) {
          const anotherFrogId = get().board.get(coordinateToKey([x, y]));

          if (anotherFrogId && anotherFrogId !== selectedFrogId) {
            const anotherFrog = get().getFrogById(anotherFrogId);

            if (anotherFrog?.gender !== selectedFrog.gender) {
              availableFrogIds.push(anotherFrogId);
            }
          }
        }
      }

      set({ frogsAvailableForBreeding: availableFrogIds });
    }
  },
  frogsAvailableForBreeding: [],
  selectedForBreeding: null,
  selectForBreeding: (id: number | null) => {
    set({ selectedForBreeding: id });
  },
  error: null,
  setError: (error: string | null) => {
    set({ error: error });
  },
}));
