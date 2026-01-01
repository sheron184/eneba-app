import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { GameDTO } from "@/lib/api/game.dto";

const GameCard = ({ game }: { game: GameDTO }) => {
  return (
    <Card className="h-[560px] gap-0 border-0 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 pt-0 pb-0">
      <div className="relative w-full h-[360px] min-h-[360px] bg-gray-100">
        <Image
          src={`/${game.image}`}
          alt={game.title}
          fill
          className="object-cover w-full h-full rounded-t-lg"
          sizes="(max-width: 600px) 100vw, 400px"
          priority
        />
        <div className="absolute bottom-[20%] left-0 px-2 w-fit bg-emerald-400 rounded-r-full py-1 text-xs font-semibold text-white">
          ↺ Cashback: €{game.cashbackAmount?.toFixed(2)}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between px-0 pt-2 from-slate-600 to-cyan-700 text-slate-50 bg-linear-60">
        <div className="px-4">
          <CardHeader className="p-0 pb-2 gap-1">
            <CardTitle className="text-lg font-bold line-clamp-1">{game.title}</CardTitle>
            <span className="text-xs italic">{game.description}</span>
          </CardHeader>
          <CardContent className="p-0">
            <CardDescription className="text-xs text-slate-100 flex flex-wrap gap-x-2 gap-y-1">
              <span>🎮 {game.platform}</span>
              <span>🌍 {game.region}</span>
              <span>⭐ {game.rating?.toFixed(1)}</span>
              <span>🧩 {game.genre}</span>
              <span>📦 {game.stock} in stock</span>
            </CardDescription>
          </CardContent>
        </div>
        <CardFooter className="p-0 pb-3 pt-1 inline-block">
          <div className="px-4">
            <h2 className="mb-3 text-sm">
              From <span className="line-through">${game.price}</span>
              <span className="text-green-500"> -{game.discountPercent}%</span>
            </h2>
            <h2 className="text-xl font-bold text-white bg-red-700 rounded-lg w-fit px-2">${game.discountedPrice}</h2>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default GameCard;
