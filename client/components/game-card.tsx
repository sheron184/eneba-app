import {
  Card,
  CardAction,
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
    <Card>
      <CardHeader>
        <CardTitle>{game.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{game.description}</CardDescription>
        <p className="mt-2 font-semibold">Price: ${game.price}</p>
        <Image
          src={`/${game.image}`}
          alt={game.title}
          width={128}
          height={128}
          className="mt-2 w-32 h-32 object-cover"
        />
      </CardContent>
    </Card>
  );
}

export default GameCard;