import { GameDTO } from "@/lib/api/game.dto";
import { useGames } from "@/lib/queries/use-games";
import useGameStore from "@/store/game-store";
import { useEffect } from "react";
import GameCard from "./game-card";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

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
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-75 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (!isLoading && !games?.length) {
    return <div className="h-[75vh]">No games found.</div>;
  }

  if (error) {
    return <div>Error loading games.</div>;
  }

  return (
    <Suspense fallback={<div>Loading games...</div>}>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4">
        {games?.map((game: GameDTO) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </Suspense>
  );
}

export default GameList;
