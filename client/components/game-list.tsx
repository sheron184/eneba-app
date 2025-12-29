import { GameDTO } from "@/lib/api/game.dto";
import { useGames } from "@/lib/queries/use-games";
import useGameStore from "@/store/game-store";
import { useEffect } from "react";
import GameCard from "./game-card";
import { Suspense } from "react";

const GameList = () => {
  const { data, isLoading, error } = useGames();
  const games = useGameStore((state) => state.games);
  const setGames = useGameStore((state) => state.setGames);
  const setAllGameList = useGameStore((state) => state.setAllGameList);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setGames(data);
      // Using an original copy to reset filters/search later
      setAllGameList(data);
    }
  }, [data, setGames, setAllGameList]);

  if (isLoading) {
    return <div>Loading games...</div>;
  }

  if (!isLoading && !games?.length) {
    return <div>No games found.</div>;
  }

  if (error) {
    return <div>Error loading games.</div>;
  }

  return (
    <Suspense fallback={<div>Loading games...</div>}>
      <div className="grid grid-cols-4 gap-4">
        {games?.map((game: GameDTO) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </Suspense>
  );
}

export default GameList;