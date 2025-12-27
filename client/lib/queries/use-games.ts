import { useQuery } from "@tanstack/react-query";
import { listAllGames, findGame } from "../api/games.api";

const useGames = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: listAllGames,
  });

  return { data, isLoading, error };
};

const useFindGames = (query: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["games", query],
    queryFn: () => findGame(query),
    enabled: !!query,
  });
  return { data, isLoading, error };
};

export { useGames, useFindGames };