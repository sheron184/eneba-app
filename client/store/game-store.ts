import { create } from "zustand";
import type { GameDTO } from "@/lib/api/game.dto";

interface GameStoreState {
  games: GameDTO[];
  setGames: (games: GameDTO[]) => void;
}

const useGameStore = create<GameStoreState>((set) => ({
  games: [],
  setGames: (games: GameDTO[]) => set({ games }),
}));

export default useGameStore;