import { create } from "zustand";
import type { GameDTO } from "@/lib/api/game.dto";

interface GameStoreState {
  games: GameDTO[];
  allGameList: GameDTO[];
  setGames: (games: GameDTO[]) => void;
  setAllGameList: (games: GameDTO[]) => void;
}

const useGameStore = create<GameStoreState>((set) => ({
  games: [],
  setGames: (games: GameDTO[]) => set({ games }),
  allGameList: [],
  setAllGameList: (games: GameDTO[]) => set({ allGameList: games }),
}));

export default useGameStore;