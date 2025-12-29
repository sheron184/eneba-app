import { useFindGames } from "@/lib/queries/use-games";
import Logo from "./logo";
import SearchInput from "./search-input";
import { useEffect, useState } from "react";
import useGameStore from "@/store/game-store";

const TopBar = () => {
  const [query, setQuery] = useState("");
  const { data } = useFindGames(query);
  const setGames = useGameStore((state) => state.setGames);
  const allGameList = useGameStore((state) => state.allGameList);

  const handleSearch = (query: string) => {
    if (query.length > 0) {
      setQuery(query);
    } else {
      // Reset to original list when query is empty
      setGames(allGameList);
    }
  }

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setGames(data);
    }
  }, [data, setGames]);

  return (
    <div className="w-full h-16 flex items-center px-4 justify-around align-middle">
      <Logo />
      <SearchInput handleSearch={handleSearch} />
      <div className="flex">
        <h1>❤️</h1>
        <h1>🛒</h1>
      </div>
    </div>
  )
}

export default TopBar;