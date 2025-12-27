'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopBar from "../components/top-bar";
import GameList from "@/components/game-list";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#4517ab] text-white">
        <div className="w-[80%] mx-auto">
          <TopBar />
        </div>
        <div className="w-[80%] mx-auto mt-4">
          <div>
            <GameList />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
