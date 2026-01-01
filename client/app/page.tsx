'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopBar from "../components/top-bar";
import GameList from "@/components/game-list";
import Footer from "@/components/footer";

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
      <div className="text-white min-h-[500px]">
        <div className="mx-auto bg-[#4517ab]">
          <TopBar />
        </div>
        <div className="w-[80%] mx-auto mt-12">
          <div>
            <GameList />
          </div>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
